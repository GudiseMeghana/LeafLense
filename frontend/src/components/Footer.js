import React from 'react';

const Footer = () => (
  <footer style={{
    background: '#2d3e50',
    color: '#fff',
    textAlign: 'center',
    padding: '1rem 0',
    marginTop: 40,
    fontSize: 16,
  }}>
    <div>
      &copy; {new Date().getFullYear()} Leaf-Lense &mdash; <a href="https://github.com/GudiseMeghana/LeafLense" style={{ color: '#1abc9c' }}>GitHub</a>
    </div>
    <div style={{ fontSize: 13, color: '#aaa', marginTop: 4 }}>
      Leaf-Lense &middot; AI-powered produce identification and management
    </div>
  </footer>
);

export default Footer;
