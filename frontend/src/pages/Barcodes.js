import React, { useState } from 'react';
import { Card, CardContent, Typography, Button, TextField, Box } from '@mui/material';
import axios from 'axios';
import { toast } from 'react-toastify';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

const API = 'http://127.0.0.1:8000';

export default function Barcodes() {
  const [barcodeItemId, setBarcodeItemId] = useState('');
  const [barcodeCode, setBarcodeCode] = useState('');
  const [barcodeResult, setBarcodeResult] = useState(null);
  const [barcodes, setBarcodes] = useState([]);

  const handleAddBarcode = async (e) => {
    e.preventDefault();
    if (!barcodeItemId || !barcodeCode) return;
    try {
      const res = await axios.post(`${API}/barcodes`, {
        code: barcodeCode,
        item_id: Number(barcodeItemId),
      });
      setBarcodeResult(res.data);
      toast.success('Barcode added!');
      fetchBarcodes(barcodeItemId);
    } catch (e) {
      toast.error('Failed to add barcode');
    }
  };

  const fetchBarcodes = async (itemId) => {
    if (!itemId) return;
    const res = await axios.get(`${API}/items/${itemId}/barcodes`);
    setBarcodes(res.data);
  };

  const handleDeleteBarcode = async (barcodeId) => {
    try {
      await axios.delete(`${API}/barcodes/${barcodeId}`);
      if (barcodeItemId) fetchBarcodes(barcodeItemId);
      toast.success('Barcode deleted!');
    } catch (e) {
      toast.error('Failed to delete barcode');
    }
  };

  return (
    <Card sx={{ bgcolor: 'background.paper', color: 'text.primary', mb: 3, boxShadow: 8, maxWidth: 700, mx: 'auto', mt: 5 }}>
      <CardContent>
        <Typography variant="h4" gutterBottom sx={{ color: 'primary.main', fontWeight: 700 }}>
          Barcodes
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          Link barcodes to items for POS and inventory. Enter the item ID and barcode, then click Add Barcode.
        </Typography>
        <Box component="form" onSubmit={handleAddBarcode} sx={{ display: 'flex', gap: 2, mb: 2, flexWrap: 'wrap' }}>
          <TextField value={barcodeItemId} onChange={e => setBarcodeItemId(e.target.value)} label="Item ID" type="number" size="small" sx={{ flex: 1, bgcolor: 'background.paper', borderRadius: 1 }} required />
          <TextField value={barcodeCode} onChange={e => setBarcodeCode(e.target.value)} label="Barcode" size="small" sx={{ flex: 2, bgcolor: 'background.paper', borderRadius: 1 }} required />
          <Button type="submit" variant="contained" color="primary" startIcon={<AddCircleOutlineIcon />}>Add Barcode</Button>
        </Box>
        <Button onClick={() => fetchBarcodes(barcodeItemId)} disabled={!barcodeItemId} variant="outlined" color="secondary" sx={{ mb: 2 }}>Show Barcodes for Item</Button>
        <Box sx={{ maxHeight: 250, overflow: 'auto', borderRadius: 2, background: 'rgba(30,40,50,0.04)', boxShadow: '0 2px 16px 0 rgba(26,188,156,0.10)' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', color: 'inherit' }}>
            <thead>
              <tr style={{ background: 'background.paper', color: 'text.primary' }}>
                <th style={{ padding: 8, border: '1px solid #333' }}>ID</th>
                <th style={{ padding: 8, border: '1px solid #333' }}>Barcode</th>
                <th style={{ padding: 8, border: '1px solid #333' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {barcodes.length === 0 ? (
                <tr>
                  <td colSpan={3} style={{ textAlign: 'center', color: '#888', padding: 16 }}>
                    No barcodes found. Enter an item ID and click Show Barcodes.
                  </td>
                </tr>
              ) : barcodes.map(b => (
                <tr key={b.id} style={{ color: 'inherit' }}>
                  <td style={{ padding: 8, border: '1px solid #333' }}>{b.id}</td>
                  <td style={{ padding: 8, border: '1px solid #333' }}>{b.code}</td>
                  <td style={{ padding: 8, border: '1px solid #333' }}>
                    <Button color="error" size="small" variant="outlined" onClick={() => handleDeleteBarcode(b.id)} sx={{ borderRadius: 2 }}>Delete</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Box>
      </CardContent>
    </Card>
  );
}
