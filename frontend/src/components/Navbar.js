import React from 'react';

const Navbar = ({ setPage }) => (
  <nav style={{
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    background: '#2d3e50',
    color: '#fff',
    padding: '0.5rem 2rem',
    marginBottom: 32,
  }}>
    <div style={{ fontWeight: 'bold', fontSize: 24, letterSpacing: 1 }}>Leaf-Lense</div>
    <div style={{ display: 'flex', gap: 24 }}>
      <button className="nav-btn" onClick={() => setPage('home')}>Home</button>
      <button className="nav-btn" onClick={() => setPage('about')}>About</button>
      <button className="nav-btn" onClick={() => setPage('identify')}>Identify</button>
      <button className="nav-btn" onClick={() => setPage('items')}>Items</button>
      <button className="nav-btn" onClick={() => setPage('tags')}>Tags</button>
      <button className="nav-btn" onClick={() => setPage('languages')}>Languages</button>
      <button className="nav-btn" onClick={() => setPage('barcodes')}>Barcodes</button>
      <a className="nav-btn" href="http://127.0.0.1:8000/docs" target="_blank" rel="noopener noreferrer">API Docs</a>
    </div>
    <style>{`
      .nav-btn {
        background: none;
        border: none;
        color: #fff;
        font-size: 1rem;
        cursor: pointer;
        padding: 0.5rem 1rem;
        border-radius: 4px;
        transition: background 0.2s;
      }
      .nav-btn:hover {
        background: #1abc9c;
      }
      a.nav-btn {
        text-decoration: none;
      }
    `}</style>
  </nav>
);

export default Navbar;
