import React, { useState, useRef } from 'react';
import { Card, CardContent, Typography, Button, CircularProgress, Box, Avatar, Stack } from '@mui/material';
import { useDropzone } from 'react-dropzone';
import axios from 'axios';
import { toast } from 'react-toastify';
import CameraAltIcon from '@mui/icons-material/CameraAlt';

const API = 'http://127.0.0.1:8000';

export default function Identify() {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showCamera, setShowCamera] = useState(false);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [stream, setStream] = useState(null);

  const onDrop = acceptedFiles => setFile(acceptedFiles[0]);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop, accept: { 'image/*': [] } });

  const handleIdentify = async () => {
    if (!file) return;
    setLoading(true);
    const formData = new FormData();
    formData.append('file', file);
    try {
      const res = await axios.post(`${API}/identify`, formData);
      setResult(res.data);
      toast.success(`Identified: ${res.data.prediction}`);
    } catch (e) {
      toast.error('Prediction failed');
    }
    setLoading(false);
  };

  const startCamera = async () => {
    setShowCamera(true);
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({ video: true });
      setStream(mediaStream);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
    } catch (err) {
      toast.error('Camera access denied or not available');
    }
  };

  const stopCamera = () => {
    setShowCamera(false);
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
  };

  const capturePhoto = () => {
    if (!videoRef.current || !canvasRef.current) return;
    const video = videoRef.current;
    const canvas = canvasRef.current;
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    canvas.toBlob(blob => {
      setFile(new File([blob], 'captured.jpg', { type: 'image/jpeg' }));
      stopCamera();
    }, 'image/jpeg');
  };

  return (
    <Card sx={{ bgcolor: 'background.paper', color: '#fff', mb: 3, boxShadow: 6, maxWidth: 500, mx: 'auto', mt: 5 }}>
      <CardContent>
        <Typography variant="h5" gutterBottom>Image Recognition</Typography>
        <Stack direction="row" spacing={2} justifyContent="center" mb={2}>
          <Button variant="outlined" color="primary" onClick={startCamera} startIcon={<CameraAltIcon />}>Use Camera</Button>
          <Button variant="outlined" color="secondary" {...getRootProps()}>
            <input {...getInputProps()} />
            Upload Image
          </Button>
        </Stack>
        {showCamera && (
          <Box sx={{ textAlign: 'center', mb: 2 }}>
            <video ref={videoRef} autoPlay playsInline style={{ width: '100%', maxHeight: 300, borderRadius: 8, marginBottom: 8 }} />
            <Stack direction="row" spacing={2} justifyContent="center" mt={1}>
              <Button variant="contained" color="primary" onClick={capturePhoto}>Capture</Button>
              <Button variant="outlined" color="secondary" onClick={stopCamera}>Cancel</Button>
            </Stack>
            <canvas ref={canvasRef} style={{ display: 'none' }} />
          </Box>
        )}
        {file && !showCamera && (
          <Box sx={{ textAlign: 'center', mb: 2 }}>
            <Typography variant="body2" color="secondary">Selected: {file.name}</Typography>
            <img src={URL.createObjectURL(file)} alt="preview" style={{ maxWidth: '100%', maxHeight: 200, marginTop: 8, borderRadius: 8 }} />
          </Box>
        )}
        <Button variant="contained" color="primary" onClick={handleIdentify} disabled={!file || loading} fullWidth sx={{ mt: 1 }}>
          {loading ? <CircularProgress size={24} color="inherit" /> : 'Scan'}
        </Button>
        {result && (
          <Box mt={3}>
            <Typography variant="h6">Prediction: {result.prediction}</Typography>
            <Typography variant="body2" color="secondary">
              Confidence: {(Math.max(...result.probabilities) * 100).toFixed(2)}%
            </Typography>
          </Box>
        )}
      </CardContent>
    </Card>
  );
}
