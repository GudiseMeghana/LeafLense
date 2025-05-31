import React, { useState } from 'react';
import { Card, CardContent, Typography, Button, TextField, Box, MenuItem } from '@mui/material';
import axios from 'axios';
import { toast } from 'react-toastify';

const API = 'http://127.0.0.1:8000';

const languageOptions = [
  { code: 'en', name: 'English' },
  { code: 'te', name: 'Telugu' },
  { code: 'hi', name: 'Hindi' },
  { code: 'ta', name: 'Tamil' },
  { code: 'kn', name: 'Kannada' },
  // Add more as needed
];

export default function Tags() {
  const [tagItemId, setTagItemId] = useState('');
  const [tagLanguage, setTagLanguage] = useState('');
  const [tagValue, setTagValue] = useState('');
  const [tagResult, setTagResult] = useState(null);
  const [tags, setTags] = useState([]);

  const handleAddTag = async (e) => {
    e.preventDefault();
    if (!tagItemId || !tagLanguage || !tagValue) return;
    try {
      const res = await axios.post(`${API}/tags`, {
        item_id: Number(tagItemId),
        language: tagLanguage,
        value: tagValue,
      });
      setTagResult(res.data);
      toast.success('Tag added!');
      fetchTags(tagItemId);
    } catch (e) {
      toast.error('Failed to add tag');
    }
  };

  const fetchTags = async (itemId) => {
    if (!itemId) return;
    const res = await axios.get(`${API}/items/${itemId}/tags`);
    setTags(res.data);
  };

  return (
    <Card sx={{ bgcolor: 'background.paper', color: '#fff', mb: 3, boxShadow: 6, maxWidth: 600, mx: 'auto', mt: 5 }}>
      <CardContent>
        <Typography variant="h5" gutterBottom>Tagging Panel</Typography>
        <Box component="form" onSubmit={handleAddTag} sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', mb: 2 }}>
          <TextField label="Item ID" value={tagItemId} onChange={e => setTagItemId(e.target.value)} type="number" size="small" sx={{ flex: 1 }} required />
          <TextField label="Language" select value={tagLanguage} onChange={e => setTagLanguage(e.target.value)} size="small" sx={{ flex: 1 }} required>
            {languageOptions.map(opt => (
              <MenuItem key={opt.code} value={opt.code}>{opt.name}</MenuItem>
            ))}
          </TextField>
          <TextField label="Value" value={tagValue} onChange={e => setTagValue(e.target.value)} size="small" sx={{ flex: 2 }} required />
          <Button type="submit" variant="contained" color="primary">Add Tag</Button>
        </Box>
        <Button onClick={() => fetchTags(tagItemId)} disabled={!tagItemId} variant="outlined" color="secondary" sx={{ mb: 2 }}>Show Tags for Item</Button>
        <Box sx={{ maxHeight: 200, overflow: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', background: 'rgba(30,40,50,0.7)' }}>
            <thead>
              <tr style={{ background: '#222' }}>
                <th style={{ padding: 8, border: '1px solid #333' }}>ID</th>
                <th style={{ padding: 8, border: '1px solid #333' }}>Language</th>
                <th style={{ padding: 8, border: '1px solid #333' }}>Value</th>
              </tr>
            </thead>
            <tbody>
              {tags.map(tag => (
                <tr key={tag.id}>
                  <td style={{ padding: 8, border: '1px solid #333' }}>{tag.id}</td>
                  <td style={{ padding: 8, border: '1px solid #333' }}>{tag.language}</td>
                  <td style={{ padding: 8, border: '1px solid #333' }}>{tag.value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Box>
      </CardContent>
    </Card>
  );
}
