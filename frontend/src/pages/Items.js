import React, { useState, useEffect } from 'react';
import { Card, CardContent, Typography, Button, TextField, Box } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';
import { toast } from 'react-toastify';

const API = 'http://127.0.0.1:8000';

export default function Items() {
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState('');
  const [search, setSearch] = useState('');

  const fetchItems = async () => {
    const res = await axios.get(`${API}/items`);
    setItems(res.data);
  };

  useEffect(() => { fetchItems(); }, []);

  const handleAddItem = async (e) => {
    e.preventDefault();
    if (!newItem) return;
    try {
      await axios.post(`${API}/items`, { name: newItem });
      setNewItem('');
      fetchItems();
      toast.success('Item added!');
    } catch (e) {
      toast.error('Failed to add item');
    }
  };

  const filteredItems = items.filter(item =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Card sx={{ bgcolor: 'background.paper', color: '#fff', mb: 3, boxShadow: 6, maxWidth: 700, mx: 'auto', mt: 5 }}>
      <CardContent>
        <Typography variant="h5" gutterBottom>Items Database</Typography>
        <Box component="form" onSubmit={handleAddItem} sx={{ display: 'flex', gap: 2, mb: 2 }}>
          <TextField value={newItem} onChange={e => setNewItem(e.target.value)} label="New item name" size="small" sx={{ flex: 2 }} required />
          <Button type="submit" variant="contained" color="primary">Add Item</Button>
        </Box>
        <TextField value={search} onChange={e => setSearch(e.target.value)} label="Search items" size="small" sx={{ mb: 2, width: '100%' }} />
        <div style={{ height: 350, width: '100%', background: 'rgba(30,40,50,0.7)', borderRadius: 8 }}>
          <DataGrid
            rows={filteredItems.map(i => ({ ...i, id: i.id }))}
            columns={[
              { field: 'id', headerName: 'ID', width: 80 },
              { field: 'name', headerName: 'Name', width: 200 },
              { field: 'local_name', headerName: 'Local Name', width: 180 },
              { field: 'sku', headerName: 'SKU', width: 120 },
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
