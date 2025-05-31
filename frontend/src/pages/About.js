import React from 'react';
import { Card, CardContent, Typography, Box, Chip, Link } from '@mui/material';
import EmojiObjectsIcon from '@mui/icons-material/EmojiObjects';
import StorageIcon from '@mui/icons-material/Storage';
import CodeIcon from '@mui/icons-material/Code';
import CameraAltIcon from '@mui/icons-material/CameraAlt';

const About = () => (
  <Box sx={{ maxWidth: 700, mx: 'auto', mt: 8 }}>
    <Card sx={{ bgcolor: 'background.paper', color: '#fff', boxShadow: 8 }}>
      <CardContent>
        <Typography variant="h4" gutterBottom sx={{ color: 'primary.main', fontWeight: 700 }}>
          About Leaf-Lense
        </Typography>
        <Typography variant="body1" sx={{ mb: 2, color: '#b2dfdb' }}>
          <b>Leaf-Lense</b> is a professional web platform for identifying fruits and vegetables using AI, and managing multilingual metadata and barcodes. Built for produce management, retail, and educational use.
        </Typography>
        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', mb: 2 }}>
          <Chip icon={<CameraAltIcon />} label="Image Recognition" color="primary" />
          <Chip icon={<StorageIcon />} label="PostgreSQL" color="secondary" />
          <Chip icon={<CodeIcon />} label="FastAPI & React" color="primary" variant="outlined" />
          <Chip icon={<EmojiObjectsIcon />} label="AI/ML" color="secondary" variant="outlined" />
        </Box>
        <Typography variant="body2" sx={{ color: '#eee', mb: 2 }}>
          <ul style={{ margin: 0, paddingLeft: 20 }}>
            <li>Image classification using a fine-tuned MobileNetV2 model</li>
            <li>CRUD for items, tags, languages, and barcodes</li>
            <li>Modern, responsive UI with dark theme and neon accents</li>
            <li>API documentation and test guide included</li>
            <li>Ready for deployment (Docker, cloud, or on-premise)</li>
          </ul>
        </Typography>
        <Typography variant="body2" sx={{ color: '#aaa', mt: 2 }}>
          Project by <b>Meghana Gudise</b> &mdash; <Link href="https://github.com/GudiseMeghana/LeafLense" target="_blank" rel="noopener" sx={{ color: 'primary.main' }}>GitHub</Link>
        </Typography>
      </CardContent>
    </Card>
  </Box>
);

export default About;
