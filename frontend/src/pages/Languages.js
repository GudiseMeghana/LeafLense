import React, { useState, useEffect } from 'react';
import { Card, CardContent, Typography, Button, TextField, Box, MenuItem } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';
import { toast } from 'react-toastify';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

const API = 'http://127.0.0.1:8000';

export default function Languages() {
  const [languages, setLanguages] = useState([]);
  const [newLangCode, setNewLangCode] = useState('');
  const [newLangName, setNewLangName] = useState('');

  const fetchLanguages = async () => {
    const res = await axios.get(`${API}/languages`);
    setLanguages(res.data);
  };

  useEffect(() => { fetchLanguages(); }, []);

  const handleAddLanguage = async (e) => {
    e.preventDefault();
    if (!newLangCode || !newLangName) return;
    try {
      await axios.post(`${API}/languages`, { code: newLangCode, name: newLangName });
      setNewLangCode('');
      setNewLangName('');
      fetchLanguages();
      toast.success('Language added!');
    } catch (e) {
      toast.error('Failed to add language');
    }
  };

  const handleDeleteLanguage = async (langId) => {
    try {
      await axios.delete(`${API}/languages/${langId}`);
      fetchLanguages();
      toast.success('Language deleted!');
    } catch (e) {
      toast.error('Failed to delete language');
    }
  };

  return (
    <Card sx={{ bgcolor: 'background.paper', color: 'text.primary', mb: 3, boxShadow: 8, maxWidth: 600, mx: 'auto', mt: 5 }}>
      <CardContent>
        <Typography variant="h4" gutterBottom sx={{ color: 'primary.main', fontWeight: 700 }}>
          Languages
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          Add or remove supported languages for tagging. Use the form below to add a new language.
        </Typography>
        <Box component="form" onSubmit={handleAddLanguage} sx={{ display: 'flex', gap: 2, mb: 2, flexWrap: 'wrap' }}>
          <TextField value={newLangCode} onChange={e => setNewLangCode(e.target.value)} label="Code (e.g. en)" size="small" sx={{ flex: 1, bgcolor: 'background.paper', borderRadius: 1 }} required />
          <TextField value={newLangName} onChange={e => setNewLangName(e.target.value)} label="Name (e.g. English)" size="small" sx={{ flex: 2, bgcolor: 'background.paper', borderRadius: 1 }} required />
          <Button type="submit" variant="contained" color="primary" startIcon={<AddCircleOutlineIcon />}>Add Language</Button>
        </Box>
        <div style={{ height: 300, width: '100%', background: 'rgba(30,40,50,0.04)', borderRadius: 12, boxShadow: '0 2px 16px 0 rgba(26,188,156,0.10)' }}>
          <DataGrid
            rows={languages.map(l => ({ ...l, id: l.id }))}
            columns={[
              { field: 'id', headerName: 'ID', width: 80 },
              { field: 'code', headerName: 'Code', width: 120 },
              { field: 'name', headerName: 'Name', width: 200 },
              {
                field: 'actions',
                headerName: 'Actions',
                width: 120,
                renderCell: (params) => (
                  <Button color="error" size="small" variant="outlined" onClick={() => handleDeleteLanguage(params.row.id)} sx={{ borderRadius: 2 }}>Delete</Button>
                ),
              },
            ]}
            pageSize={5}
            rowsPerPageOptions={[5]}
            disableSelectionOnClick
            sx={{ color: 'text.primary', border: 0, fontSize: 16, bgcolor: 'background.paper' }}
            getRowClassName={(params) => params.indexRelativeToCurrentPage % 2 === 0 ? 'even-row' : 'odd-row'}
          />
          {languages.length === 0 && (
            <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center', mt: 4 }}>
              No languages found. Add a new language above.
            </Typography>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
