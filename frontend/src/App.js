import React, { useState } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Identify from './pages/Identify';
import Items from './pages/Items';
import Tags from './pages/Tags';
import Languages from './pages/Languages';
import Barcodes from './pages/Barcodes';
import About from './pages/About';
import Footer from './components/Footer';

function App() {
  const [page, setPage] = useState('home');
  const [darkMode, setDarkMode] = useState(false);

  const theme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
    },
  });

  let content;
  switch (page) {
    case 'identify':
      content = <Identify />;
      break;
    case 'items':
      content = <Items />;
      break;
    case 'tags':
      content = <Tags />;
      break;
    case 'languages':
      content = <Languages />;
      break;
    case 'barcodes':
      content = <Barcodes />;
      break;
    case 'about':
      content = <About />;
      break;
    default:
      content = <Home setPage={setPage} />;
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div style={{ background: theme.palette.background.default, minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <Navbar setPage={setPage} darkMode={darkMode} setDarkMode={setDarkMode} activePage={page} />
        <div style={{ maxWidth: 900, margin: 'auto', padding: 24, flex: 1 }}>
          {content}
        </div>
        <Footer />
      </div>
    </ThemeProvider>
  );
}

export default App;
