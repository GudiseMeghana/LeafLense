import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#1abc9c', // Neon green/cyan
    },
    secondary: {
      main: '#ff9800', // Neon orange
    },
    background: {
      default: '#1a222b',
      paper: 'rgba(30,40,50,0.85)',
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

export default theme;
