import { createTheme } from '@mui/material/styles';

const getTheme = (mode) => createTheme({
  palette: {
    mode,
    primary: {
      main: '#1abc9c', // Neon green/cyan
    },
    secondary: {
      main: '#ff9800', // Neon orange
    },
    background: {
      default: mode === 'dark' ? '#1a222b' : '#ffffff',
      paper: mode === 'dark' ? 'rgba(30,40,50,0.85)' : '#f5f5f5',
    },
    text: {
      primary: mode === 'dark' ? '#ffffff' : '#000000',
      secondary: mode === 'dark' ? '#b2dfdb' : '#4f4f4f',
    },
  },
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif',
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          boxShadow: '0 4px 32px 0 rgba(26,188,156,0.15)',
          backdropFilter: 'blur(6px)',
        },
      },
    },
  },
});

export default getTheme;
