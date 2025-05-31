import React from 'react';
import { Card, CardContent, Typography, Box, Button } from '@mui/material';

const Home = ({ setPage }) => (
  <Box sx={{ textAlign: 'center', mt: 8 }}>
    <img src="/favicon.ico" alt="Leaf-Lense Logo" style={{ width: 100, marginBottom: 24, filter: 'drop-shadow(0 0 12px #1abc9c)' }} />
    <Card sx={{ maxWidth: 600, mx: 'auto', bgcolor: 'background.paper', color: '#fff', boxShadow: 8 }}>
      <CardContent>
        <Typography variant="h3" gutterBottom sx={{ fontWeight: 700, color: 'primary.main' }}>
          Leaf-Lense
        </Typography>
        <Typography variant="h5" sx={{ mb: 2, color: 'secondary.main' }}>
          AI-powered Vegetable & Fruit Scanner
        </Typography>
        <Typography variant="body1" sx={{ mb: 3, color: '#b2dfdb' }}>
          Instantly identify produce from images, manage multilingual tags, barcodes, and more. Built for shopkeepers, staff, and developers.
        </Typography>
        <Button variant="contained" color="primary" size="large" onClick={() => setPage ? setPage('identify') : null} sx={{ boxShadow: '0 0 16px #1abc9c' }}>
          Try Image Recognition
        </Button>
      </CardContent>
    </Card>
    <Typography variant="caption" sx={{ mt: 4, display: 'block', color: '#888' }}>
      Project by Meghana Gudise &mdash; <a href="https://github.com/GudiseMeghana/LeafLense" style={{ color: '#1abc9c' }}>GitHub</a>
    </Typography>
  </Box>
);

export default Home;
