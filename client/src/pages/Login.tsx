import _React from 'react'
import {
  Box,
  Button,
  Stack,
  TextField,
  Typography,
  Paper,
  Link
} from '@mui/material';

const Login = () => {
  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: { xs: 'column', md: 'row' , bgcolor:'red'} }}>
      
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
          backgroundColor: '#fff1e6'
        }}
      >
        <Box sx={{ width: '100%', maxWidth: 400, mx: 'auto' }}>
          <Typography variant="h3" fontWeight={900} sx={{ mb: 1 ,}}>
            Holla, <br />Welcome Back
          </Typography>
          <Typography variant="subtitle1" sx={{ mb: 4, color: '#6d3b09',fontSize:'1.2rem' }}>
            Hey, welcome back to your special place
          </Typography>
          <Box component="form">
            <Stack spacing={2} sx={{ mb: 4 }}>
              <TextField
                fullWidth
                label="Email or username"
                type="email"
              
              />
              <TextField
                fullWidth
                label="Password"
               
                type="password"
                
              />
            </Stack>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              size="large"
              sx={{ fontWeight: 700, borderRadius: 2, mb: 2 }}
            >
              Sign In
            </Button>
            <Typography variant="body2" align="center" sx={{color:'#6d3b09'}}>
              Don't have an account?
              <Link href="/Signup" color="primary" underline="hover">
                Sign Up
              </Link>
            </Typography>
          </Box>
        </Box>
      </Box>
      
      <Box
        sx={{
          flex: 1,
          display: { xs: 'none', md: 'flex' },
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#fff1e6',
        }}
      >
        <Box sx={{ width: '80%', maxWidth: 500, height: 500, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Box sx={{ width: '100%', height: '100%', backgroundColor: 'rgba(255,255,255,0.2)', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: 3,  }}>
            <img
              src="./img.png"
              alt="Login Illustration"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

export default Login