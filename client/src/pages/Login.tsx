import _React, { useState } from 'react'
import {
  Box,
  Button,
  Stack,
  TextField,
  Typography,
  Paper,
  Link,
  Alert
} from '@mui/material';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../api/axiosInstance';
import axios from 'axios';
import useUser from '../store/userStore';
interface LogInDetails{
  identifier:string,
  password : string
}

const Login = () => {
  const {setUser}= useUser()
  const navigate =useNavigate()
  const [identifier, setIdentifier] = useState("")
  const [password,setPassword] = useState('')
  const [formError,setFormError] = useState('')
  const {isPending,mutate} = useMutation({
    mutationKey:["Login_User"],
    mutationFn: async (LogInDetails :LogInDetails) =>{
    const response = await axiosInstance.post("/api/auth/login",LogInDetails)
    console.log(response)
    return response.data
    },
        onError: (err) => {
  if (axios.isAxiosError(err)) {
    setFormError(err.response?.data.message);
  } else {
    setFormError('Something went wrong');
  }
},
onSuccess:(data)=>{
  setUser(data)
   navigate('/tasks')
 }
  })
  function handleLogIn(){
    setFormError ("")
    mutate({identifier,password})
  }
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
              {formError && <Alert severity="error">{formError}</Alert>}
              <TextField
                fullWidth
                label="Email or username"
                
              value={identifier}
              onChange={(e)=>setIdentifier(e.target.value)}
              />
              <TextField
                fullWidth
                label="Password"
               
                type="password"
                value={password}
                onChange={(e)=> setPassword(e.target.value)}
              />
            </Stack>
            <Button
              
              fullWidth
              variant="contained"
              color="primary"
              size="large"
              sx={{ fontWeight: 700, borderRadius: 2, mb: 2 }}
              onClick={handleLogIn}
              loading={isPending}
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