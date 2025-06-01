import React from 'react';
import { Card, CardContent, Typography, Box, Button } from '@mui/material';
import EmojiObjectsIcon from '@mui/icons-material/EmojiObjects';
import StorageIcon from '@mui/icons-material/Storage';
import CodeIcon from '@mui/icons-material/Code';
import CameraAltIcon from '@mui/icons-material/CameraAlt';

const About = () => (
  <Box sx={{ maxWidth: 700, mx: 'auto', mt: 8 }}>
    <Card sx={{ bgcolor: 'background.paper', color: '#fff', boxShadow: 8, borderRadius: 4 }}>
      <CardContent>
        <Typography variant="h3" gutterBottom sx={{ color: 'primary.main', fontWeight: 700 }}>
          About Leaf-Lense
        </Typography>
        <Typography variant="body1" sx={{ mb: 2, color: '#b2dfdb', fontSize: 18 }}>
          <b>Leaf-Lense</b> is a professional web platform for identifying fruits and vegetables using AI, and managing multilingual metadata and barcodes. Built for produce management, retail, and educational use.
        </Typography>
        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', mb: 2 }}>
          <Button startIcon={<CameraAltIcon />} variant="outlined" color="primary" sx={{ borderRadius: 2 }}>Image Recognition</Button>
          <Button startIcon={<StorageIcon />} variant="outlined" color="secondary" sx={{ borderRadius: 2 }}>PostgreSQL</Button>
          <Button startIcon={<CodeIcon />} variant="contained" color="primary" sx={{ borderRadius: 2 }}>FastAPI & React</Button>
          <Button startIcon={<EmojiObjectsIcon />} variant="contained" color="secondary" sx={{ borderRadius: 2 }}>AI/ML</Button>
        </Box>
        <Typography variant="body2" sx={{ color: '#eee', mb: 2, fontSize: 16 }}>
          <ul style={{ margin: 0, paddingLeft: 20 }}>
            <li>Image classification using a fine-tuned MobileNetV2 model</li>
            <li>CRUD for items, tags, languages, and barcodes</li>
            <li>Modern, responsive UI with dark theme and neon accents</li>
            <li>API documentation and test guide included</li>
            <li>Ready for deployment (Docker, cloud, or on-premise)</li>
          </ul>
        </Typography>
        <Typography variant="body2" sx={{ color: '#aaa', mt: 2, fontSize: 15 }}>
          <b>Leaf-Lense</b> &mdash; <a href="https://github.com/GudiseMeghana/LeafLense" target="_blank" rel="noopener" style={{ color: '#1abc9c' }}>GitHub</a>
        </Typography>
      </CardContent>
    </Card>
  </Box>
);

export default About;
