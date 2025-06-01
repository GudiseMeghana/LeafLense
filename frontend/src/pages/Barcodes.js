import React, { useState } from 'react';
import { Card, CardContent, Typography, Button, TextField, Box } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';
import { toast } from 'react-toastify';

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
    <Card sx={{ bgcolor: 'background.paper', color: '#fff', mb: 3, boxShadow: 6, maxWidth: 600, mx: 'auto', mt: 5 }}>
      <CardContent>
        <Typography variant="h5" gutterBottom>Barcodes</Typography>
        <Box component="form" onSubmit={handleAddBarcode} sx={{ display: 'flex', gap: 2, mb: 2 }}>
          <TextField value={barcodeItemId} onChange={e => setBarcodeItemId(e.target.value)} label="Item ID" type="number" size="small" sx={{ flex: 1 }} required />
          <TextField value={barcodeCode} onChange={e => setBarcodeCode(e.target.value)} label="Barcode" size="small" sx={{ flex: 2 }} required />
          <Button type="submit" variant="contained" color="primary">Add Barcode</Button>
        </Box>
        <Button onClick={() => fetchBarcodes(barcodeItemId)} disabled={!barcodeItemId} variant="outlined" color="secondary" sx={{ mb: 2 }}>Show Barcodes for Item</Button>
        <div style={{ height: 250, width: '100%', background: 'rgba(30,40,50,0.7)', borderRadius: 8 }}>
          <DataGrid
            rows={barcodes.map(b => ({ ...b, id: b.id }))}
            columns={[
              { field: 'id', headerName: 'ID', width: 80 },
              { field: 'code', headerName: 'Barcode', width: 200 },
              {
                field: 'action',
                headerName: 'Action',
                width: 120,
                renderCell: (params) => (
                  <Button color="error" size="small" onClick={() => handleDeleteBarcode(params.row.id)}>Delete</Button>
                ),
              },
            ]}
            pageSize={5}
            rowsPerPageOptions={[5]}
            disableSelectionOnClick
            sx={{ color: '#fff', border: 0 }}
          />
        </div>
      </CardContent>
    </Card>
  );
}
