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
  const [localName, setLocalName] = useState('');
  const [sku, setSku] = useState('');
  const [tagValue, setTagValue] = useState('');
  const [tagLanguage, setTagLanguage] = useState('en');
  const [tagSuccess, setTagSuccess] = useState(false);
  const [tagLoading, setTagLoading] = useState(false);

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

  const handleTagSubmit = async (e) => {
    e.preventDefault();
    if (!result?.prediction) return;
    setTagLoading(true);
    try {
      // Add or update item with local name and SKU
      const itemRes = await axios.post(`${API}/items`, {
        name: result.prediction,
        local_name: localName,
        sku: sku
      });
      // Add tag if provided
      if (tagValue) {
        await axios.post(`${API}/tags`, {
          item_id: itemRes.data.id,
          language: tagLanguage,
          value: tagValue
        });
      }
      setTagSuccess(true);
      setLocalName("");
      setSku("");
      setTagValue("");
      setTagLanguage("en");
      setTimeout(() => setTagSuccess(false), 2000);
    } catch (e) {
      if (e.response && e.response.data && e.response.data.detail) {
        toast.error('Failed to tag item: ' + e.response.data.detail);
      } else {
        toast.error('Failed to tag item');
      }
    }
    setTagLoading(false);
  };

  const handleClear = () => {
    setFile(null);
    setResult(null);
    setLocalName("");
    setSku("");
    setTagValue("");
    setTagLanguage("en");
    setTagSuccess(false);
  };

  return (
    <Card sx={{
      bgcolor: 'background.paper',
      color: 'text.primary',
      mb: 3,
      boxShadow: 8,
      maxWidth: 520,
      mx: 'auto',
      mt: { xs: 2, md: 5 },
      borderRadius: 5,
      border: theme => `1.5px solid ${theme.palette.primary.main}33`,
      backdropFilter: 'blur(8px)',
      transition: 'box-shadow 0.2s',
      '&:hover': {
        boxShadow: '0 8px 32px 0 rgba(26,188,156,0.18)',
      },
    }}>
      <CardContent>
        <Typography variant="h5" gutterBottom sx={{ color: 'primary.main', fontWeight: 900, letterSpacing: 1, textShadow: '0 0 8px #00FFA355' }}>
          <CameraAltIcon sx={{ mr: 1, mb: -0.5, fontSize: 32, color: 'primary.main' }} />
          Image Recognition
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2, fontSize: 16, fontWeight: 500 }}>
          1. Upload or capture an image of a fruit/vegetable.<br/>
          2. Click <b>Scan</b> to identify.<br/>
          3. Fill in local name, SKU/barcode, and tag (optional), then click <b>Save Tag</b>.
        </Typography>
        <Stack direction="row" spacing={2} justifyContent="center" mb={2}>
          <Button variant="outlined" color="primary" onClick={startCamera} startIcon={<CameraAltIcon />} sx={{ fontWeight: 700, borderRadius: 3 }}>Use Camera</Button>
          <Button variant="outlined" color="secondary" {...getRootProps()} sx={{ fontWeight: 700, borderRadius: 3 }}>
            <input {...getInputProps()} />
            Upload Image
          </Button>
          <Button variant="outlined" color="error" onClick={handleClear} disabled={loading || tagLoading} sx={{ fontWeight: 700, borderRadius: 3 }}>Clear</Button>
        </Stack>
        {showCamera && (
          <Box sx={{ textAlign: 'center', mb: 2 }}>
            <video ref={videoRef} autoPlay playsInline style={{ width: '100%', maxHeight: 300, borderRadius: 12, marginBottom: 8, boxShadow: '0 2px 16px #00FFA355' }} />
            <Stack direction="row" spacing={2} justifyContent="center" mt={1}>
              <Button variant="contained" color="primary" onClick={capturePhoto} sx={{ fontWeight: 700, borderRadius: 3 }}>Capture</Button>
              <Button variant="outlined" color="secondary" onClick={stopCamera} sx={{ fontWeight: 700, borderRadius: 3 }}>Cancel</Button>
            </Stack>
            <canvas ref={canvasRef} style={{ display: 'none' }} />
          </Box>
        )}
        {file && !showCamera && (
          <Box sx={{ textAlign: 'center', mb: 2 }}>
            <Typography variant="body2" color="secondary.main" sx={{ fontWeight: 500 }}>Selected: {file.name}</Typography>
            <img src={URL.createObjectURL(file)} alt="preview" style={{ maxWidth: '100%', maxHeight: 200, marginTop: 8, borderRadius: 12, boxShadow: '0 2px 16px #00FFA355' }} />
          </Box>
        )}
        <Button variant="contained" color="primary" onClick={handleIdentify} disabled={!file || loading} fullWidth sx={{ mt: 1, fontWeight: 700, borderRadius: 3, fontSize: 18, boxShadow: '0 0 16px #00FFA355' }}>
          {loading ? <CircularProgress size={24} color="inherit" /> : 'Scan'}
        </Button>
        {result && (
          <Box mt={3}>
            <Typography variant="h6" sx={{ color: 'primary.main', fontWeight: 800, letterSpacing: 1, mb: 1 }}>Prediction: {result.prediction}</Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
              <Typography variant="body2" color="secondary.main" sx={{ fontWeight: 600 }}>Confidence:</Typography>
              <Box sx={{ width: 100 }}>
                <Box sx={{ bgcolor: 'grey.200', borderRadius: 2, height: 10, width: '100%' }}>
                  <Box sx={{ bgcolor: 'success.main', height: 10, borderRadius: 2, width: `${(Math.max(...result.probabilities) * 100).toFixed(0)}%`, transition: 'width 0.4s' }} />
                </Box>
              </Box>
              <Typography variant="body2" color="secondary.main" sx={{ fontWeight: 600 }}>
                {(Math.max(...result.probabilities) * 100).toFixed(2)}%
              </Typography>
            </Box>
            {/* Tagging Form */}
            <Box component="form" onSubmit={handleTagSubmit} sx={{ mt: 2, p: 2, borderRadius: 3, bgcolor: 'background.default', boxShadow: 2, border: theme => `1.5px solid ${theme.palette.primary.main}22` }}>
              <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 700, color: 'primary.main' }}>Tag this item</Typography>
              <Stack spacing={2} direction="column">
                <Box>
                  <label htmlFor="localNameInput"><Typography variant="body2" sx={{ fontWeight: 600 }}>Local Name</Typography></label>
                  <input id="localNameInput" value={localName} onChange={e => setLocalName(e.target.value)} placeholder="e.g. బనానా" style={{ width: '100%', padding: 8, borderRadius: 6, border: '1.5px solid #1abc9c55', fontSize: 16, background: 'rgba(0,255,163,0.03)' }} aria-label="Local Name" />
                </Box>
                <Box>
                  <label htmlFor="skuInput"><Typography variant="body2" sx={{ fontWeight: 600 }}>SKU / Barcode</Typography></label>
                  <input id="skuInput" value={sku} onChange={e => setSku(e.target.value)} placeholder="e.g. BNN-001" style={{ width: '100%', padding: 8, borderRadius: 6, border: '1.5px solid #1abc9c55', fontSize: 16, background: 'rgba(0,255,163,0.03)' }} aria-label="SKU or Barcode" />
                </Box>
                <Box>
                  <label htmlFor="tagValueInput"><Typography variant="body2" sx={{ fontWeight: 600 }}>Tag (optional)</Typography></label>
                  <input id="tagValueInput" value={tagValue} onChange={e => setTagValue(e.target.value)} placeholder="e.g. Banana" style={{ width: '100%', padding: 8, borderRadius: 6, border: '1.5px solid #1abc9c55', fontSize: 16, background: 'rgba(0,255,163,0.03)' }} aria-label="Tag" />
                </Box>
                <Box>
                  <label htmlFor="tagLanguageSelect"><Typography variant="body2" sx={{ fontWeight: 600 }}>Language</Typography></label>
                  <select id="tagLanguageSelect" value={tagLanguage} onChange={e => setTagLanguage(e.target.value)} style={{ width: '100%', padding: 8, borderRadius: 6, border: '1.5px solid #1abc9c55', fontSize: 16, background: 'rgba(0,255,163,0.03)' }} aria-label="Language">
                    <option value="en">English</option>
                    <option value="te">Telugu</option>
                    <option value="hi">Hindi</option>
                    <option value="ta">Tamil</option>
                    <option value="kn">Kannada</option>
                  </select>
                </Box>
                <Button type="submit" variant="contained" color="primary" disabled={tagLoading} sx={{ fontWeight: 700, borderRadius: 3, fontSize: 16, boxShadow: '0 0 12px #00FFA355' }}>
                  {tagLoading ? <CircularProgress size={20} color="inherit" /> : 'Save Tag'}
                </Button>
                {tagSuccess && <Typography color="success.main" sx={{ fontWeight: 700 }}>Tagging saved!</Typography>}
              </Stack>
            </Box>
          </Box>
        )}
      </CardContent>
    </Card>
  );
}
