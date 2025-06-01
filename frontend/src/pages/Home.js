import React, { useState } from 'react';
import { Card, CardContent, Typography, Box, Button, Grid, Stack, useTheme, CircularProgress } from '@mui/material';
import EmojiObjectsIcon from '@mui/icons-material/EmojiObjects';
import TranslateIcon from '@mui/icons-material/Translate';
import QrCodeIcon from '@mui/icons-material/QrCode';
import HistoryEduIcon from '@mui/icons-material/HistoryEdu';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const featureCards = [
  {
    icon: <EmojiObjectsIcon sx={{ fontSize: 40, color: '#1abc9c', filter: 'drop-shadow(0 0 8px #1abc9c)' }} />,
    title: 'AI Image Recognition',
    desc: 'Identify produce from images with high accuracy.'
  },
  {
    icon: <TranslateIcon sx={{ fontSize: 40, color: '#00e5ff', filter: 'drop-shadow(0 0 8px #00e5ff)' }} />,
    title: 'Multi-language Tagging',
    desc: 'Add local names in Telugu, Hindi, Tamil, and more.'
  },
  {
    icon: <QrCodeIcon sx={{ fontSize: 40, color: '#ff9800', filter: 'drop-shadow(0 0 8px #ff9800)' }} />,
    title: 'Barcode Integration',
    desc: 'Link produce to SKU/barcode for retail use.'
  },
  {
    icon: <HistoryEduIcon sx={{ fontSize: 40, color: '#b388ff', filter: 'drop-shadow(0 0 8px #b388ff)' }} />,
    title: 'Live Preview & History',
    desc: 'See predictions, manage items, track tagging history.'
  }
];

const Home = ({ setPage }) => {
  const theme = useTheme();
  const [loading, setLoading] = useState(false);

  const handleStart = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      if (setPage) setPage('identify');
    }, 700);
  };

  return (
    <Box sx={{ textAlign: 'center', mt: { xs: 4, md: 8 }, px: 2 }}>
      <Box sx={{
        maxWidth: 700,
        mx: 'auto',
        mb: 4,
        p: { xs: 2, md: 4 },
        borderRadius: 6,
        background: 'rgba(30,40,50,0.7)',
        boxShadow: '0 8px 40px 0 rgba(26,188,156,0.18)',
        backdropFilter: 'blur(12px)',
        border: '1.5px solid #1abc9c44',
      }}>
        <img src="/favicon.ico" alt="Leaf-Lense Logo" style={{ width: 90, marginBottom: 18, filter: 'drop-shadow(0 0 16px #1abc9c)' }} />
        <Typography variant="h2" sx={{ fontWeight: 800, color: '#1abc9c', mb: 1, letterSpacing: 1, fontFamily: 'Roboto, Arial, sans-serif', textShadow: '0 0 16px #1abc9c55' }}>
          Welcome to Leaf-Lense <span role="img" aria-label="leaf">🌿</span>
        </Typography>
        <Typography variant="h5" sx={{ color: '#00e5ff', mb: 2, fontWeight: 500, textShadow: '0 0 8px #00e5ff55' }}>
          AI-powered produce identification and management
        </Typography>
        <Typography variant="body1" sx={{ color: '#b2dfdb', mb: 3, fontSize: 18 }}>
          Scan vegetables and fruits. Tag with local names. Integrate with your POS system easily.
        </Typography>
        {/* Illustration placeholder */}
        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
          <img src="https://assets-global.website-files.com/63e3e7e7e7e7e7e7e7e7e7e7/63e3e7e7e7e7e7e7e7e7e7e7_ai-vegetable-scanner.png" alt="AI Scanner Illustration" style={{ width: '100%', maxWidth: 340, borderRadius: 18, boxShadow: '0 0 32px #1abc9c33' }} />
        </Box>
        <Button
          variant="contained"
          color="primary"
          size="large"
          endIcon={<ArrowForwardIosIcon />}
          onClick={handleStart}
          sx={{
            fontWeight: 700,
            fontSize: 20,
            px: 5,
            py: 1.5,
            borderRadius: 3,
            boxShadow: '0 0 24px #1abc9c',
            background: 'linear-gradient(90deg, #1abc9c 0%, #00e5ff 100%)',
            color: '#fff',
            transition: 'all 0.2s',
            '&:hover': {
              background: 'linear-gradient(90deg, #00e5ff 0%, #1abc9c 100%)',
              transform: 'scale(1.04)',
              boxShadow: '0 0 32px #00e5ff',
            },
          }}
          disabled={loading}
        >
          {loading ? <CircularProgress size={28} sx={{ color: '#fff' }} /> : 'Start Scanning'}
        </Button>
      </Box>

      {/* Features Section */}
      <Grid container spacing={3} justifyContent="center" sx={{ maxWidth: 1100, mx: 'auto', mb: 6 }}>
        {featureCards.map((f, i) => (
          <Grid item xs={12} sm={6} md={3} key={f.title}>
            <Card
              sx={{
                p: 2,
                borderRadius: 4,
                background: 'rgba(30,40,50,0.6)',
                boxShadow: '0 2px 24px 0 rgba(26,188,156,0.10)',
                border: `1.5px solid ${theme.palette.primary.main}33`,
                transition: 'transform 0.18s, box-shadow 0.18s',
                '&:hover': {
                  transform: 'scale(1.04)',
                  boxShadow: '0 0 32px #1abc9c',
                  backdropFilter: 'blur(8px)',
                },
              }}
            >
              <Box sx={{ mb: 1 }}>{f.icon}</Box>
              <Typography variant="h6" sx={{ color: '#1abc9c', fontWeight: 700, mb: 0.5 }}>{f.title}</Typography>
              <Typography variant="body2" sx={{ color: '#b2dfdb', fontSize: 15 }}>{f.desc}</Typography>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Footer is handled globally */}
    </Box>
  );
};

export default Home;
