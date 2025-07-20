import _React from 'react'
import {
  Box,
  Button,
  Stack,
  TextField,
  Typography,
  Paper,
  Divider,
  Link,
  InputAdornment
} from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';


const Signup = () => {
  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: { xs: 'column', md: 'row' }, backgroundColor: '#fff1e6' }}>
      
      <Box
        sx={{
          flex: 1,
          display: { xs: 'none', md: 'flex' },
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'rgba(255,255,255,0.5)',
        }}
      >
        <Box sx={{ width: '80%', maxWidth: 400, height: 500, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Box sx={{ width: '100%', height: '100%', borderRadius: 8,  boxShadow: 3, background: '#fff' }}>
            <img
              src="./img4.png"
              alt="Sign Up Illustration"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </Box>
        </Box>
      </Box>
      
      <Box
        component={Paper}
        elevation={0}
        
        sx={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          minWidth: 0,
          p: { xs: 2, md: 4 },
          backgroundColor: 'transparent',
        }}
      >
        <Box sx={{ width: '100%', maxWidth: 420, mx: 'auto' }}>
          <Typography variant="h3" fontWeight={900} sx={{ mb: 1 ,color:'' }}>
            Register
          </Typography>
          <Typography variant="subtitle1" sx={{ mb: 3, color: '#6d3b09' ,fontSize:'1.2rem' }}>
            Create an Account to access all the features.
          </Typography>
          <Box component="form">
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ mb: 2 }}>
              <TextField 
                fullWidth 
                label="First Name" 
               required
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PersonIcon />
                    </InputAdornment>
                  ),
                }}
              />
              <TextField 
                fullWidth 
                label="Last Name" 
                 
                required
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PersonIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </Stack>
             <TextField 
              fullWidth 
              label="Username" 
               required
             
              sx={{ mb: 2 }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PersonIcon />
                  </InputAdornment>
                ),
              }}
            />
            <TextField 
              fullWidth 
              label="Email" 
             required
              type="email" 
               
              sx={{ mb: 2 }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <EmailIcon />
                  </InputAdornment>
                ),
              }}
            />
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ mb: 3 }}>
              <TextField 
                fullWidth 
                label="Password" 
                 required
                type="password" 
               
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockIcon />
                    </InputAdornment>
                  ),
                }}
              />
              <TextField 
                fullWidth 
                label="Confirm Password" 
                 
                type="password" 
                required
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </Stack>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              size="large"
              sx={{ fontWeight: 700, borderRadius: 2, mb: 2,  color: '#fff', '&:hover': { backgroundColor: '#ff6d00' } }}
            >
              REGISTER
            </Button>
            <Divider sx={{ my: 2 }}>OR</Divider>
            <Typography variant="body2" align="center">
              Already have an Account?{' '}
              <Link href="/login" color="primary" underline="hover" fontWeight={700}>
                LOGIN
              </Link>
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

export default Signup