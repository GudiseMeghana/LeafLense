import React, { useState, useEffect } from 'react';
import { Card, CardContent, Typography, Button, TextField, Box } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';
import { toast } from 'react-toastify';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import SearchIcon from '@mui/icons-material/Search';

const API = 'http://127.0.0.1:8000';

export default function Items() {
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState('');
  const [newLocalName, setNewLocalName] = useState('');
  const [newSku, setNewSku] = useState('');
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
      await axios.post(`${API}/items`, { name: newItem, local_name: newLocalName, sku: newSku });
      setNewItem('');
      setNewLocalName('');
      setNewSku('');
      fetchItems();
      toast.success('Item added!');
    } catch (e) {
      toast.error('Failed to add item');
    }
  };

  const handleUpdateItem = async (id, updatedFields) => {
    try {
      await axios.put(`${API}/items/${id}`, updatedFields);
      fetchItems();
      toast.success('Item updated!');
    } catch (e) {
      toast.error('Failed to update item');
    }
  };

  const handleDeleteItem = async (id) => {
    try {
      await axios.delete(`${API}/items/${id}`);
      fetchItems();
      toast.success('Item deleted!');
    } catch (e) {
      toast.error('Failed to delete item');
    }
  };

  const filteredItems = items.filter(item =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Card sx={{ bgcolor: 'background.paper', color: 'text.primary', mb: 3, boxShadow: 8, maxWidth: 800, mx: 'auto', mt: 5 }}>
      <CardContent>
        <Typography variant="h4" gutterBottom sx={{ color: 'primary.main', fontWeight: 700 }}>
          Items Database
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          Add, edit, or search for produce items. Use the search bar to filter. All changes are saved instantly.
        </Typography>
        <Box component="form" onSubmit={handleAddItem} sx={{ display: 'flex', gap: 2, mb: 2, flexWrap: 'wrap' }}>
          <TextField value={newItem} onChange={e => setNewItem(e.target.value)} label="New item name" size="small" sx={{ flex: 2, bgcolor: 'background.paper', borderRadius: 1 }} required />
          <TextField value={newLocalName} onChange={e => setNewLocalName(e.target.value)} label="Local name" size="small" sx={{ flex: 2, bgcolor: 'background.paper', borderRadius: 1 }} />
          <TextField value={newSku} onChange={e => setNewSku(e.target.value)} label="SKU" size="small" sx={{ flex: 1, bgcolor: 'background.paper', borderRadius: 1 }} />
          <Button type="submit" variant="contained" color="primary" startIcon={<AddCircleOutlineIcon />}>Add Item</Button>
        </Box>
        <TextField value={search} onChange={e => setSearch(e.target.value)} label="Search items" size="small" sx={{ mb: 2, width: '100%', bgcolor: 'background.paper', borderRadius: 1 }} InputProps={{ startAdornment: <SearchIcon sx={{ mr: 1, color: 'primary.main' }} /> }} />
        <div style={{ height: 400, width: '100%', background: 'rgba(30,40,50,0.04)', borderRadius: 12, boxShadow: '0 2px 16px 0 rgba(26,188,156,0.10)' }}>
          <DataGrid
            rows={filteredItems.map(i => ({ ...i, id: i.id }))}
            columns={[
              { field: 'id', headerName: 'ID', width: 80 },
              { field: 'name', headerName: 'Name', width: 200, editable: true },
              { field: 'local_name', headerName: 'Local Name', width: 180, editable: true },
              { field: 'sku', headerName: 'SKU', width: 120, editable: true },
              {
                field: 'actions',
                headerName: 'Actions',
                width: 150,
                renderCell: (params) => (
                  <Button color="error" size="small" variant="outlined" onClick={() => handleDeleteItem(params.row.id)} sx={{ borderRadius: 2 }}>Delete</Button>
                ),
              },
            ]}
            pageSize={5}
            rowsPerPageOptions={[5]}
            disableSelectionOnClick
            processRowUpdate={(newRow, oldRow) => {
              handleUpdateItem(newRow.id, {
                name: newRow.name,
                local_name: newRow.local_name,
                sku: newRow.sku,
              });
              return newRow;
            }}
            experimentalFeatures={{ newEditingApi: true }}
            sx={{ color: 'text.primary', border: 0, fontSize: 16, bgcolor: 'background.paper' }}
            getRowClassName={(params) => params.indexRelativeToCurrentPage % 2 === 0 ? 'even-row' : 'odd-row'}
          />
          {filteredItems.length === 0 && (
            <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center', mt: 4 }}>
              No items found. Try adding a new item above.
            </Typography>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
