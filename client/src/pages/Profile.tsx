import React, { useState, useEffect } from 'react';
import useUser from '../store/userStore';
import {
  Box, Typography, TextField, Button, Avatar, Stack, Alert, CircularProgress
} from '@mui/material';
import { useMutation } from '@tanstack/react-query';
import axiosInstance from '../api/axiosInstance';
import axios from 'axios';
import LayOut from '../components/Layout';
const Profile = () => {
  const { user, setUser } = useUser();
  const [form, setForm] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    email: user?.email || '',
    username: user?.username || '',
  });
  const [avatarUrl, setAvatarUrl] = useState<string | null>(user?.avatar || null);
  const [_fileInputState, setFileInputState] = useState('');
  const [previewSource, setPreviewSource] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<string>('');

  useEffect(() => {
    setForm({
      firstName: user?.firstName || '',
      lastName: user?.lastName || '',
      email: user?.email || '',
      username: user?.username || '',
    });
    setAvatarUrl(user?.avatar || null);
  }, [user]);

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        setError('Please select an image file.');
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        setError('Image size should be less than 5MB.');
        return;
      }
      setFileInputState(e.target.value);
      previewFile(file);
    }
  };

  const previewFile = (file: File) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      if (typeof reader.result === 'string') {
        setPreviewSource(reader.result);
      }
    };
  };

  async function uploadToCloudinary(base64Image: string): Promise<string> {
    const data = new FormData();
    data.append('file', base64Image);
    data.append('upload_preset', 'tasky_preset'); 
    const res = await axios.post('https://api.cloudinary.com/v1_1/dltynolf6/image/upload', data);
    return res.data.secure_url;
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  
  const mutation = useMutation({
    mutationFn: async (payload: any) => {
      const res = await axiosInstance.put('/api/user', payload);
      return res.data;
    },
    onSuccess: (updatedUser) => {
      setUser({ ...user, ...updatedUser });
      setSuccess('Profile updated successfully!');
      setError('');
    },
    onError: (err: any) => {
      setError(err?.response?.data?.message || 'Failed to update profile.');
      setSuccess('');
    }
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    let imageUrl = avatarUrl;
    if (previewSource) {
      try {
        imageUrl = await uploadToCloudinary(previewSource);
        setAvatarUrl(imageUrl);
      } catch (err) {
        setError('Failed to upload image.');
        return;
      }
    }

    mutation.mutate({ ...form, avatar: imageUrl });
  };

  
  const getInitials = () => {
    if (!form.firstName && !form.lastName) return '';
    return (
      (form.firstName?.[0] || '') +
      (form.lastName?.[0] || '')
    ).toUpperCase();
  };

  return (
    <LayOut>
      <Box sx={{ maxWidth: 500, mx: 'auto', mt: 6, p: 3, background: '#fff', borderRadius: 3, boxShadow: 3 }}>
      <Typography variant="h4" fontWeight={700} mb={2}>Profile</Typography>
      <Stack alignItems="center" mb={2}>
        <Avatar
          src={previewSource || avatarUrl || undefined}
          sx={{ width: 96, height: 96, fontSize: 40, bgcolor: '#d7263d' }}
        >
          {(!previewSource && !avatarUrl) ? getInitials() : ''}
        </Avatar>
        <Button variant="outlined" component="label" sx={{ mt: 1 }}>
          Upload Photo
          <input type="file" hidden accept="image/*" onChange={handleFileInputChange} />
        </Button>
      </Stack>
      <form onSubmit={handleSubmit}>
        <Stack spacing={2}>
          <TextField label="First Name" name="firstName" value={form.firstName} onChange={handleInputChange} required />
          <TextField label="Last Name" name="lastName" value={form.lastName} onChange={handleInputChange} required />
          <TextField label="Email" name="email" value={form.email} onChange={handleInputChange} required />
          <TextField label="Username" name="username" value={form.username} onChange={handleInputChange} required />
          {error && <Alert severity="error">{error}</Alert>}
          {success && <Alert severity="success">{success}</Alert>}
          <Button type="submit" variant="contained" color="primary" disabled={mutation.status === 'pending'}>
            {mutation.status === 'pending' ? <CircularProgress size={24} /> : 'Save Changes'}
          </Button>
        </Stack>
      </form>
    </Box>
    </LayOut>
  );
};

export default Profile;