import _React from 'react'
import LayOut from '../components/Layout'
import { Box, Button, Container, Typography, Stack,Card,Divider,Avatar } from '@mui/material';
import { useQuery, } from '@tanstack/react-query';
import axiosInstance from '../api/axiosInstance';
import FormatQuoteIcon from '@mui/icons-material/FormatQuote';


type Testimonial = {
  id: string;
  message: string;
  user: {
    firstName: string;
    lastName: string;
    username: string;
    avatar: string;
  };
};
const Landing = () => {
  const { data, isLoading } = useQuery<Testimonial[]>({
    queryKey: ['testimonials'],
    queryFn: async () => {
      const res = await axiosInstance.get('/api/testimonials');
      return res.data.testimonials;
    },
  });
  if (isLoading) return <div>Loading...</div>;
  return (
    <LayOut>

<Box sx={{ minHeight: '100vh', background: 'linear-gradient(135deg, #ffe5d9 0%, #fff1e6 100%)', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
      <Container maxWidth="md" sx={{ textAlign: 'center', pt: 8 }}>
        <Typography variant="h2" component="h1" fontWeight={900} sx={{ mb: 2, color: '#6d3b09', fontFamily: 'serif' }}>
          Easy Manage Your Task
        </Typography>
        <Typography variant="h3" component="div" fontWeight={900} sx={{ mb: 2, color: '#d7263d', fontFamily: 'serif' }}>
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
    <Box>
     
      <Stack direction="row" spacing={4} flexWrap="wrap" justifyContent="center">
  {data?.map((t) => (
    <Card key={t.id} sx={{ borderRadius: 4, boxShadow: 2, p: 3, maxWidth: 350, minWidth: 300 }}>
      <Typography variant="body1" mb={2}>
      <FormatQuoteIcon sx={{ fontSize: 40, color: '#d7263d', mr: 1, verticalAlign: 'middle' }} />
        {t.message}
      </Typography>
      <Divider sx={{ my: 2 }} />
      <Stack direction="row" alignItems="center" spacing={2}>
        <Avatar src={t.user.avatar} />
        <Box>
          <Typography fontWeight={700}>
            {t.user.firstName} {t.user.lastName}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            {t.user.username}
          </Typography>
        </Box>
      </Stack>
    </Card>
  ))}
</Stack>
    </Box>
    </LayOut>
  )
}

export default Landing