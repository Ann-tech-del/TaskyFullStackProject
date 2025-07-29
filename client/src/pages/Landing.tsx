import _React from 'react'
import LayOut from '../components/Layout'
import { Box, Button, Container, Typography, Stack } from '@mui/material';




const Landing = () => {
  
  return (
    <LayOut>

<Box sx={{ minHeight: '100vh', background: 'linear-gradient(135deg, #ffe5d9 0%, #fff1e6 100%)', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
      <Container maxWidth="md" sx={{ textAlign: 'center', pt: 8 }}>
        <Typography variant="h2" component="h1" fontWeight={900} sx={{ mb: 2, color: '#6d3b09', fontFamily: '"Open Sans", sans-serif' }}>
          Easily Manage Your Task
        </Typography>
        <Typography variant="h3" component="div" fontWeight={900} sx={{ mb: 2, color: '#d7263d', fontFamily: '"Open Sans", sans-serif' }}>
          <span style={{ color: '#d7263d', background: 'rgba(255,255,255,0.5)', borderRadius: 4, padding: '0 8px' }}>
            anywhere and anytime<br />quickly
          </span>
        </Typography>
        <Typography variant="subtitle1" sx={{ mb: 4, color: '#6d3b09' }}>
          Manage your task, and make it be priority then<br />complete it quickly with tasky
        </Typography>
        <Stack direction="row" spacing={2} justifyContent="center" sx={{ mb: 6 }}>
          <Button variant="contained" color="error" size="large"  href='/SignUp' sx={{ fontWeight: 700, px: 4 }}>
            Get Started
          </Button>
          <Button variant="outlined" color="error" size="large" href='/Login' sx={{ fontWeight: 700, px: 4 }}>
            Log In
          </Button>
        </Stack>
        
         <Box sx={{ mt: 6, display: 'flex', justifyContent: 'center' }}>
          <Box sx={{ width: 320, height: 200, background: '#fff', borderRadius: 4, boxShadow: 3, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
             <img
              src="./img2.png"
              alt="Login Illustration"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </Box>
        </Box> 
      </Container>
    </Box>
    
    </LayOut>
  )
}

export default Landing