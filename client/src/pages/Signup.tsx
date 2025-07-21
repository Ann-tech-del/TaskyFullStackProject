import _React, { useState } from 'react'
import {
  Box,
  Button,
  Stack,
  TextField,
  Typography,
  Paper,
  Divider,
  Link,
  InputAdornment,
  Alert
} from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import {useMutation} from '@tanstack/react-query'
import axios from 'axios';
import {useNavigate}  from 'react-router-dom'
import axiosInstance from '../api/axiosInstance';

interface User {
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  password: string;
}



const Signup = () => {
  const [firstName, setFirstName] = useState("");
const [lastName, setLastName] = useState("");
const [email, setEmail] = useState("");
const [username, setUsername] = useState("");
const [password, setPassword] = useState("");
const [confPass, setConfPass] = useState("");
const [formError, setFormError] = useState("");
const navigate =useNavigate()
 const {isPending , mutate} = useMutation({
  mutationKey:["register_user"],
  mutationFn: async(newUser:User)=>{
    const response = await axiosInstance.post("/api/auth/register", newUser)
    console.log(response)
    return response.data
  },
  onError: (err)=>{
    if(axios.isAxiosError(err)){
    setFormError(err.response?.data.message)
    }
    else {
      setFormError('Something went wrong')
    }
  },
  onSuccess:()=>{
    navigate("/Login")
  }
})



function handleSignUp() {
  setFormError("")
  if (password !==confPass){
    setFormError('password and confirm password must match')
    return
  }
  const newUser = { firstName, lastName, email, username, password };
  
  mutate(newUser)

}

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
                { formError && <Alert severity='error'>{formError}</Alert>}
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
                value={firstName}
                onChange={(e)=>setFirstName(e.target.value)}
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
                value={lastName}
                onChange={(e)=>setLastName(e.target.value)}
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
              value={username}
              onChange={(e)=>setUsername(e.target.value)}
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
              value={email}
              onChange={(e)=>setEmail (e.target.value)}
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
                value={password}
                onChange={(e)=>setPassword (e.target.value)}
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
                value={confPass}
                onChange={(e)=>setConfPass(e.target.value)}
              />
            </Stack>
            <Button
              fullWidth
              variant="contained"
              color="primary"
              size="large"
              sx={{ fontWeight: 700, borderRadius: 2, mb: 2,  color: '#fff', '&:hover': { backgroundColor: '#ff6d00' } }}
              onClick={handleSignUp}
              loading ={isPending}
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