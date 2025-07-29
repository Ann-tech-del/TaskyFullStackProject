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
  const [editMode, setEditMode] = useState(false);
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmNewPassword: '',
  });
  const [passwordError, setPasswordError] = useState('');
  const [passwordSuccess, setPasswordSuccess] = useState('');

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

  const passwordMutation = useMutation({
    mutationFn: async (payload: any) => {
      const res = await axiosInstance.put('/api/auth/password', payload);
      return res.data;
    },
    onSuccess: (data) => {
      setPasswordSuccess(data.message || 'Password updated successfully!');
      setPasswordError('');
      setPasswordForm({ currentPassword: '', newPassword: '', confirmNewPassword: '' });
      setShowPasswordForm(false);
    },
    onError: (err: any) => {
      setPasswordError(err?.response?.data?.message || 'Failed to update password.');
      setPasswordSuccess('');
    }
  });

  const handlePasswordInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordForm({ ...passwordForm, [e.target.name]: e.target.value });
  };

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordError('');
    setPasswordSuccess('');
    if (passwordForm.newPassword !== passwordForm.confirmNewPassword) {
      setPasswordError('New passwords do not match.');
      return;
    }
    passwordMutation.mutate({
      currentPassword: passwordForm.currentPassword,
      newPassword: passwordForm.newPassword,
    });
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
      <Box sx={{ maxWidth: 900, mx: 'auto', mt: 6, p: 0, backgroundColor: '#fff1e6' }}>
        
        <Box sx={{ background: '#fff', borderRadius: 3, boxShadow: 2, p: 3, mb: 4, position: 'relative' }}>
          <Stack alignItems="center" mb={3}>
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
          <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
            <Typography variant="h6" fontWeight={700} sx={{color:'#6d3b09'}} >Personal Information</Typography>
            <Button
              variant="outlined"
              
              size="small"
              sx={{ borderRadius: 2, textTransform: 'none', fontWeight: 600,color:'#6d3b09' }}
              onClick={() => setEditMode((prev) => !prev)}
            >
              {editMode ? 'Cancel' : 'Edit'}
            </Button>
          </Stack>
          {editMode ? (
            <form onSubmit={handleSubmit}>
              <Stack direction="row" spacing={3} mb={2}>
                <TextField label="First Name" name="firstName" value={form.firstName} onChange={handleInputChange} required fullWidth />
                <TextField label="Last Name" name="lastName" value={form.lastName} onChange={handleInputChange} required fullWidth />
              </Stack>
              <Stack direction="row" spacing={3} mb={2}>
                <TextField label="Email Address" name="email" value={form.email} onChange={handleInputChange} required fullWidth />
                <TextField label="Username" name="username" value={form.username} onChange={handleInputChange} required fullWidth />
              </Stack>
              <Stack direction="row" spacing={2}>
                <Button type="submit" variant="contained" color="primary" disabled={mutation.status === 'pending'}>
                  {mutation.status === 'pending' ? <CircularProgress size={24} /> : 'Save Changes'}
                </Button>
                {error && <Alert severity="error" sx={{ ml: 2 }}>{error}</Alert>}
                {success && <Alert severity="success" sx={{ ml: 2 }}>{success}</Alert>}
              </Stack>
            </form>
          ) : (
            <Stack direction="row" spacing={3}>
              <Stack spacing={1} flex={1}>
                <Typography  color="text.secondary" sx={{fontWeight:500 ,fontSize:'1.2rem'}}>First Name</Typography>
                <Typography fontWeight={600} color='secondary.main' sx={{textTransform:'capitalize'}}>{form.firstName}</Typography>
              </Stack>
              <Stack spacing={1} flex={1}>
                <Typography   color="text.secondary" sx={{fontWeight:500,fontSize:'1.2rem'}}>Last Name</Typography>
                <Typography fontWeight={600} color='secondary.main' sx={{textTransform:'capitalize'}}>{form.lastName}</Typography>
              </Stack>
              <Stack spacing={1} flex={1}>
                <Typography  color="text.secondary" sx={{fontSize:'1.2rem',fontWeight:500}}>Email Address</Typography>
                <Typography fontWeight={600} color='secondary.main'>{form.email}</Typography>
              </Stack>
              <Stack spacing={1} flex={1}>
                <Typography  color="text.secondary" sx={{fontSize:'1.2rem',textTransform:'capitalize',fontWeight:500}}>User Name</Typography>
                <Typography fontWeight={600} color='secondary.main'>{form.username}</Typography>
              </Stack>
            </Stack>
          )}
        </Box>

        
        <Box sx={{ background: '#fff', borderRadius: 3, boxShadow: 2, p: 3, position: 'relative' }}>
          <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
            <Typography variant="h6" fontWeight={700} color="secondary.main">Change Password</Typography>
            <Button
              variant="outlined"
              color="secondary"
              size="small"
              sx={{ borderRadius: 2, textTransform: 'none', fontWeight: 600 }}
              onClick={() => setShowPasswordForm((prev) => !prev)}
            >
              {showPasswordForm ? 'Cancel' : 'Edit'}
            </Button>
          </Stack>
          {showPasswordForm ? (
            <form onSubmit={handlePasswordSubmit}>
              <Stack direction="row" spacing={3} mb={2}>
                <TextField
                  label="Current Password"
                  name="currentPassword"
                  type="password"
                  value={passwordForm.currentPassword}
                  onChange={handlePasswordInputChange}
                  required
                  fullWidth
                />
                <TextField
                  label="New Password"
                  name="newPassword"
                  type="password"
                  value={passwordForm.newPassword}
                  onChange={handlePasswordInputChange}
                  required
                  fullWidth
                />
                <TextField
                  label="Confirm New Password"
                  name="confirmNewPassword"
                  type="password"
                  value={passwordForm.confirmNewPassword}
                  onChange={handlePasswordInputChange}
                  required
                  fullWidth
                />
              </Stack>
              <Stack direction="row" spacing={2}>
                <Button type="submit" variant="contained" color="secondary" disabled={passwordMutation.status === 'pending'}>
                  {passwordMutation.status === 'pending' ? <CircularProgress size={24} /> : 'Update Password'}
                </Button>
                {passwordError && <Alert severity="error" sx={{ ml: 2 }}>{passwordError}</Alert>}
                {passwordSuccess && <Alert severity="success" sx={{ ml: 2 }}>{passwordSuccess}</Alert>}
              </Stack>
            </form>
          ) : (
            <Typography color="text.secondary" sx={{fontSize:"1.2rem"}}>Click Edit to update your password.</Typography>
          )}
        </Box>
      </Box>
    </LayOut>
  );
};

export default Profile;