import React from 'react';
import Switch from '@mui/material/Switch';
import { useTheme } from '@mui/material/styles';
import HomeIcon from '@mui/icons-material/Home';
import InfoIcon from '@mui/icons-material/Info';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import ListAltIcon from '@mui/icons-material/ListAlt';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import LanguageIcon from '@mui/icons-material/Language';
import QrCodeIcon from '@mui/icons-material/QrCode';

const Navbar = ({ setPage, darkMode, setDarkMode, activePage }) => {
  const theme = useTheme();
  const navLinks = [
    { label: 'Home', page: 'home', icon: <HomeIcon /> },
    { label: 'About', page: 'about', icon: <InfoIcon /> },
    { label: 'Identify', page: 'identify', icon: <CameraAltIcon /> },
    { label: 'Items', page: 'items', icon: <ListAltIcon /> },
    { label: 'Tags', page: 'tags', icon: <LocalOfferIcon /> },
    { label: 'Languages', page: 'languages', icon: <LanguageIcon /> },
    { label: 'Barcodes', page: 'barcodes', icon: <QrCodeIcon /> },
  ];
  return (
    <nav style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      background: '#2d3e50',
      color: '#fff',
      padding: '0.5rem 2rem',
      marginBottom: 32,
      position: 'sticky',
      top: 0,
      zIndex: 1000,
      boxShadow: '0 2px 16px 0 rgba(26,188,156,0.10)',
    }}>
      <div style={{ fontWeight: 'bold', fontSize: 24, letterSpacing: 1, display: 'flex', alignItems: 'center', gap: 8 }}>
        <img src="/logo.png" alt="Leaf-Lense Logo" style={{ width: 36, height: 36, marginRight: 8 }} />
        Leaf-Lense
      </div>
      <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
        {navLinks.map(link => (
          <button
            key={link.page}
            className="nav-btn"
            onClick={() => setPage(link.page)}
            style={{
              background: activePage === link.page ? theme.palette.primary.main : 'none',
              color: activePage === link.page ? '#fff' : '#fff',
              fontWeight: activePage === link.page ? 700 : 400,
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              border: 'none',
              fontSize: '1rem',
              cursor: 'pointer',
              padding: '0.5rem 1rem',
              borderRadius: 6,
              transition: 'background 0.2s, color 0.2s',
              boxShadow: activePage === link.page ? '0 0 8px #1abc9c55' : 'none',
            }}
            aria-current={activePage === link.page ? 'page' : undefined}
          >
            {link.icon}
            {link.label}
          </button>
        ))}
        <a className="nav-btn" href="http://127.0.0.1:8000/docs" target="_blank" rel="noopener noreferrer" style={{ color: '#fff', textDecoration: 'none' }}>API Docs</a>
        <Switch
          checked={darkMode}
          onChange={() => setDarkMode(!darkMode)}
          color="default"
          inputProps={{ 'aria-label': 'dark mode toggle' }}
        />
      </div>
      <style>{`
        .nav-btn:hover {
          background: #1abc9c;
          color: #fff;
        }
        .nav-btn[aria-current='page'] {
          background: #1abc9c;
          color: #fff;
        }
      `}</style>
    </nav>
  );
};

export default Navbar;
