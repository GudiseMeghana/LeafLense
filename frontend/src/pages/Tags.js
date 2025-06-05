import React, { useState } from 'react';
import { Card, CardContent, Typography, Button, TextField, Box, MenuItem, Stack } from '@mui/material';
import axios from 'axios';
import { toast } from 'react-toastify';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import CameraAltIcon from '@mui/icons-material/CameraAlt';

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

  const handleDeleteTag = async (tagId) => {
    try {
      await axios.delete(`${API}/tags/${tagId}`);
      fetchTags(tagItemId);
      toast.success('Tag deleted!');
    } catch (e) {
      toast.error('Failed to delete tag');
    }
  };

  return (
    <Card sx={{ bgcolor: 'background.paper', color: 'text.primary', mb: 3, boxShadow: 8, maxWidth: 700, mx: 'auto', mt: 5 }}>
      <CardContent>
        <Typography variant="h4" gutterBottom sx={{ color: 'primary.main', fontWeight: 700 }}>
          Tagging Panel
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          Add tags in any language for your items. Enter the item ID, language, and value, then click Add Tag.
        </Typography>
        <Box component="form" onSubmit={handleAddTag} sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', mb: 2 }}>
          <TextField label="Item ID" value={tagItemId} onChange={e => setTagItemId(e.target.value)} type="number" size="small" sx={{ flex: 1, bgcolor: 'background.paper', borderRadius: 1 }} required />
          <TextField label="Language" select value={tagLanguage} onChange={e => setTagLanguage(e.target.value)} size="small" sx={{ flex: 1, bgcolor: 'background.paper', borderRadius: 1 }} required>
            {languageOptions.map(opt => (
              <MenuItem key={opt.code} value={opt.code}>{opt.name}</MenuItem>
            ))}
          </TextField>
          <TextField label="Value" value={tagValue} onChange={e => setTagValue(e.target.value)} size="small" sx={{ flex: 2, bgcolor: 'background.paper', borderRadius: 1 }} required />
          <Button type="submit" variant="contained" color="primary" startIcon={<AddCircleOutlineIcon />}>Add Tag</Button>
        </Box>
        <Button onClick={() => fetchTags(tagItemId)} disabled={!tagItemId} variant="outlined" color="secondary" sx={{ mb: 2 }}>Show Tags for Item</Button>
        <Box sx={{ maxHeight: 250, overflow: 'auto', borderRadius: 2, background: 'rgba(30,40,50,0.04)', boxShadow: '0 2px 16px 0 rgba(26,188,156,0.10)' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', color: 'inherit' }}>
            <thead>
              <tr style={{ background: 'background.paper', color: 'text.primary' }}>
                <th style={{ padding: 8, border: '1px solid #333' }}>ID</th>
                <th style={{ padding: 8, border: '1px solid #333' }}>Language</th>
                <th style={{ padding: 8, border: '1px solid #333' }}>Value</th>
                <th style={{ padding: 8, border: '1px solid #333' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {tags.length === 0 ? (
                <tr>
                  <td colSpan={4} style={{ textAlign: 'center', color: '#888', padding: 16 }}>
                    No tags found. Enter an item ID and click Show Tags.
                  </td>
                </tr>
              ) : tags.map(tag => (
                <tr key={tag.id} style={{ color: 'inherit' }}>
                  <td style={{ padding: 8, border: '1px solid #333' }}>{tag.id}</td>
                  <td style={{ padding: 8, border: '1px solid #333' }}>{tag.language}</td>
                  <td style={{ padding: 8, border: '1px solid #333' }}>{tag.value}</td>
                  <td style={{ padding: 8, border: '1px solid #333' }}>
                    <Button color="error" size="small" variant="outlined" onClick={() => handleDeleteTag(tag.id)} sx={{ borderRadius: 2 }}>Delete</Button>
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
