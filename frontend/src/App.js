import React, { useState } from 'react';
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
      content = <Home />;
  }

  return (
    <div style={{ background: '#f6f8fa', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar setPage={setPage} />
      <div style={{ maxWidth: 900, margin: 'auto', padding: 24, flex: 1 }}>
        {content}
      </div>
      <Footer />
    </div>
  );
}

export default App;
