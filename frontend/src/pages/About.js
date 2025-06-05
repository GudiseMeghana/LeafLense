import React, { useState } from 'react';
import { Typography, Box, Button, Grid, Avatar, Tooltip, useMediaQuery, useTheme, IconButton } from '@mui/material';
import EmojiObjectsIcon from '@mui/icons-material/EmojiObjects';
import StorageIcon from '@mui/icons-material/Storage';
import CodeIcon from '@mui/icons-material/Code';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import GitHubIcon from '@mui/icons-material/GitHub';

const team = [
  { name: 'Meghana', color: '#00FFA3', github: 'https://github.com/GudiseMeghana' },
  { name: 'Pruthan', color: '#00C4FF', github: 'https://github.com/JPruthan' },
  { name: 'Sankrishna', color: '#b388ff', github: 'https://github.com/sankrishna2004' },
  { name: 'Rithvika', color: '#ff9800', github: 'https://github.com/Punnamrithvika' },
  { name: 'Vaagdevi', color: '#1abc9c', github: 'https://github.com/vaagdevi-challa' },
  { name: 'Vishwajitha', color: '#00e5ff', github: 'https://github.com/VISHWAJITHA28' },
];

const About = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [showScrollTop, setShowScrollTop] = useState(false);

  const handleScrollTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  React.useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.pageYOffset > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
  <Box id="about" sx={{
    display: 'flex',
    flexDirection: { xs: 'column', md: 'row' },
    alignItems: 'stretch',
    justifyContent: 'center',
    minHeight: '70vh',
    background: theme.palette.mode === 'dark'
      ? 'radial-gradient(circle at top left, #00FFA322 0%, #121212 60%), linear-gradient(120deg, #121212 60%, #00C4FF11 100%)'
      : 'radial-gradient(circle at top left, #00FFA322 0%, #fff 60%), linear-gradient(120deg, #fff 60%, #00C4FF11 100%)',
    backdropFilter: 'blur(10px)',
    borderRadius: 6,
    boxShadow: '0 8px 40px 0 rgba(26,188,156,0.18)',
    mt: 8,
    px: { xs: 2, md: 6 },
    py: 4,
    gap: 4,
  }}>
    {/* Left: Content */}
    <Box sx={{ flex: 1, minWidth: 320, pr: { md: 6 } }}>
      <Typography variant="h3" gutterBottom sx={{ 
        color: theme.palette.primary.main, 
        fontWeight: 900, 
        textShadow: `0 0 16px ${theme.palette.primary.main}55` 
      }}>
        About Leaf-Lense
      </Typography>
      <Typography variant="body1" sx={{ 
        mb: 3,
        color: theme.palette.text.secondary, 
        fontSize: { xs: 16, md: 18 },
        lineHeight: 1.75,
        letterSpacing: 0.3
      }}>
        <strong style={{ color: theme.palette.primary.main }}>Leaf-Lense</strong> is a lightweight AI system designed to assist retailers and farmers in identifying vegetables and fruits through image recognition, tagging local names, and integrating barcodes — all accessible via a simple web interface and REST API.
      </Typography>
      
      <Typography variant="h5" sx={{ 
        color: theme.palette.primary.main, 
        fontWeight: 700, 
        mt: 2, 
        mb: 1, 
        textShadow: `0 0 8px ${theme.palette.primary.main}55` 
      }}>
        Key Technologies
      </Typography>
      <Grid 
        container 
        spacing={{ xs: 1, md: 2 }} 
        sx={{ 
          mb: 2,
          maxWidth: { xs: '100%', md: '80%' }
        }}
      >
        <Grid item xs={6} sm="auto">
          <Button 
            startIcon={<EmojiObjectsIcon />} 
            variant="outlined" 
            color="primary" 
            size={isMobile ? "small" : "medium"}
            sx={{ 
              borderRadius: 2,
              border: '1px solid rgba(255,255,255,0.1)',
              boxShadow: '0 4px 12px rgba(0,255,163,0.1)',
              backdropFilter: 'blur(8px)',
              '&:hover': {
                transform: 'translateY(-2px)',
                boxShadow: '0 8px 16px rgba(0,255,163,0.2)',
              },
              transition: 'all 0.2s ease-in-out'
            }}
          >
            EfficientNet/MobileNet
          </Button>
        </Grid>
        <Grid item xs={6} sm="auto">
          <Button 
            startIcon={<CodeIcon />} 
            variant="contained" 
            color="primary"
            size={isMobile ? "small" : "medium"}
            sx={{ 
              borderRadius: 2,
              boxShadow: '0 4px 12px rgba(0,196,255,0.2)',
              '&:hover': {
                transform: 'translateY(-2px)',
                boxShadow: '0 8px 16px rgba(0,196,255,0.3)',
              },
              transition: 'all 0.2s ease-in-out'
            }}
          >
            FastAPI
          </Button>
        </Grid>
        <Grid item xs={6} sm="auto">
          <Button 
            startIcon={<StorageIcon />} 
            variant="outlined" 
            color="secondary"
            size={isMobile ? "small" : "medium"}
            sx={{ 
              borderRadius: 2,
              border: '1px solid rgba(255,255,255,0.1)',
              boxShadow: '0 4px 12px rgba(179,136,255,0.1)',
              backdropFilter: 'blur(8px)',
              '&:hover': {
                transform: 'translateY(-2px)',
                boxShadow: '0 8px 16px rgba(179,136,255,0.2)',
              },
              transition: 'all 0.2s ease-in-out'
            }}
          >
            PostgreSQL
          </Button>
        </Grid>
        <Grid item xs={6} sm="auto">
          <Button 
            startIcon={<CameraAltIcon />} 
            variant="contained" 
            color="secondary"
            size={isMobile ? "small" : "medium"}
            sx={{ 
              borderRadius: 2,
              boxShadow: '0 4px 12px rgba(179,136,255,0.2)',
              '&:hover': {
                transform: 'translateY(-2px)',
                boxShadow: '0 8px 16px rgba(179,136,255,0.3)',
              },
              transition: 'all 0.2s ease-in-out'
            }}
          >
            React
          </Button>
        </Grid>
      </Grid>

      <Typography variant="h5" sx={{ 
        color: theme.palette.primary.main, 
        fontWeight: 700, 
        mt: 2, 
        mb: 1, 
        textShadow: `0 0 8px ${theme.palette.primary.main}55` 
      }}>
        Why Leaf-Lense?
      </Typography>
      <ul style={{ color: theme.palette.text.secondary, fontSize: 16, marginBottom: 16 }}>
        <li>10× faster than manual tagging</li>
        <li>Supports 25+ fruits & vegetables (more extensible)</li>
        <li>Local language inclusivity (multilingual support)</li>
        <li>Perfect fit for Point of Sale (POS) systems</li>
      </ul>
      <Typography variant="h5" sx={{ 
        color: theme.palette.secondary.main, 
        fontWeight: 700, 
        mt: 2, 
        mb: 1, 
        textShadow: `0 0 8px ${theme.palette.secondary.main}55` 
      }}>
        Team
      </Typography>
      <Grid container spacing={4} justifyContent="center">
        {team.map((member) => (
          <Grid item key={member.name}>
            <Tooltip
              title={
                <Box>
                  <Typography variant="subtitle2" fontWeight="bold">
                    {member.name}
                  </Typography>
                  <Typography variant="caption">Click to view GitHub</Typography>
                </Box>
              }
              arrow
            >
              <a
                href={member.github}
                target="_blank"
                rel="noopener noreferrer"
                style={{ textDecoration: 'none' }}
              >
                <Box
                  sx={{
                    position: 'relative',
                    textAlign: 'center',
                    cursor: 'pointer',
                    transition: 'transform 0.3s ease-in-out',
                    '&:hover': {
                      transform: 'translateY(-6px)',
                      '& .github-icon': {
                        opacity: 1
                      }
                    }
                  }}
                >
                  <Avatar
                    sx={{
                      bgcolor: member.color,
                      width: 72,
                      height: 72,
                      fontSize: 32,
                      fontWeight: 700,
                      color: '#0d1117',
                      boxShadow: `0 0 12px ${member.color}, 0 0 25px ${member.color}`,
                    }}
                  >
                    {member.name[0]}
                  </Avatar>

                  <IconButton
                    className="github-icon"
                    sx={{
                      position: 'absolute',
                      right: -8,
                      bottom: -8,
                      bgcolor: theme.palette.mode === 'dark' ? '#121212' : '#fff',
                      border: `2px solid ${theme.palette.primary.main}`,
                      color: theme.palette.primary.main,
                      opacity: 0,
                      pointerEvents: 'none',
                      transition: 'opacity 0.3s ease',
                    }}
                    size="small"
                  >
                    <GitHubIcon fontSize="small" />
                  </IconButton>

                  <Typography
                    variant="body2"
                    sx={{
                      mt: 1,
                      color: theme.palette.text.primary,
                      fontWeight: 500
                    }}
                  >
                    {member.name}
                  </Typography>
                </Box>
              </a>
            </Tooltip>
          </Grid>
        ))}
      </Grid>
    </Box>

    {/* Right: Logo with animation */}
    <Box sx={{
      flex: 1,
      minWidth: 320,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: theme.palette.mode === 'dark'
        ? 'radial-gradient(circle at 60% 40%, #00C4FF22 0%, #121212 80%)'
        : 'radial-gradient(circle at 60% 40%, #00C4FF22 0%, #fff 80%)',
      borderRadius: 6,
      boxShadow: '0 0 32px #00C4FF33',
      position: 'relative',
      overflow: 'hidden',
      transition: 'transform 0.3s ease-in-out',
      '&:hover': {
        transform: 'scale(1.02)',
      }
    }}>
      <Box
        sx={{
          background: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.03)',
          backdropFilter: 'blur(10px)',
          borderRadius: '24px',
          border: '1px solid rgba(255,255,255,0.1)',
          padding: '2rem',
          transition: 'all 0.3s ease-in-out',
          '&:hover': {
            transform: 'translateY(-5px)',
            boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
          }
        }}
      >
        <img 
          src="/logo.png"
          alt="Leaf-Lense Logo" 
          style={{ 
            width: '100%',
            maxWidth: isMobile ? 260 : 340,
            filter: 'drop-shadow(0 0 20px rgba(0, 255, 163, 0.3))',
            animation: 'float 6s ease-in-out infinite',
            transition: 'transform 0.3s ease-in-out',
          }} 
        />
      </Box>
      <style>{`
        @keyframes float {
          0% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(2deg); }
          100% { transform: translateY(0px) rotate(0deg); }
        }
      `}</style>
    </Box>

    {/* Scroll to Top Button */}
    {showScrollTop && (
      <IconButton
        onClick={handleScrollTop}
        sx={{
          position: 'fixed',
          bottom: 20,
          right: 20,
          bgcolor: 'rgba(0,255,163,0.1)',
          borderRadius: '50%',
          width: 48,
          height: 48,
          boxShadow: '0 0 20px rgba(0,255,163,0.2)',
          border: '1px solid rgba(0,255,163,0.2)',
          color: '#00FFA3',
          transition: 'all 0.3s ease-in-out',
          '&:hover': {
            bgcolor: 'rgba(0,255,163,0.2)',
            transform: 'translateY(-5px)',
          }
        }}
      >
        <ArrowUpwardIcon />
      </IconButton>
    )}
  </Box>
  );
};

export default About;