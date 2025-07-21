import _React from 'react';
import { AppBar, Toolbar, Typography, Button, Box, IconButton, Stack, Avatar } from '@mui/material';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import { Link, useNavigate } from "react-router-dom";
import useUserStore from "../store/userStore";

const navLinks = [
  {
    label: "Tasks",
    path: "/tasks"
  },
  {
    label: "New Task", 
    path: "/tasks/new"
  },
  {
    label: "Completed Tasks",
    path: "/tasks/complete"
  },
  {
    label: "Trash",
    path: "/tasks/trash"
  },
  {
    label: "Profile",
    path: "/tasks/Profile"
  }
];

const Header = () => {
  const { user,logoutUser } = useUserStore();
   const navigate = useNavigate();
  function handleLogout() {
    localStorage.clear();
    logoutUser();
    navigate("/login");
  }
  
  if (user) {
    return (
      <AppBar position="static" color="inherit" elevation={0} sx={{ borderBottom: 1, borderColor: 'divider', background: '#fff' }}>
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          
          <Box display="flex" alignItems="center">
            <IconButton edge="start" sx={{ mr: 1, color: '#d7263d' }} aria-label="logo">
              <AssignmentTurnedInIcon fontSize="large" />
            </IconButton>
            <Typography variant="h5" sx={{ color: '#6d3b09', fontWeight: 900, fontFamily: 'serif' }}>
              Tasky
            </Typography>
          </Box>

          
          <Stack direction="row" component="nav" spacing={3} alignItems="center">
            {navLinks.map((link) => (
              <Link key={link.label} to={link.path} style={{ textDecoration: "none" }}>
                <Typography variant="body1" fontWeight="600" sx={{ color: '#6d3b09' }}>
                  {link.label}
                </Typography>
              </Link>
            ))}
          </Stack>

          
          <Box display="flex" alignItems="center" gap={2}>
            <Typography variant="body1" fontWeight="600" sx={{ color: '#6d3b09' }}>
              Welcome {user.firstName}
            </Typography>
               {user.profileImageUrl ? (
              <Avatar sx={{ height: 50, width: 50 }}>
                {" "}
                <img src={user.profileImageUrl} alt="" width={80} />
              </Avatar>
            ) :
            <Avatar sx={{ bgcolor: '#d7263d', color: '#fff' }}>
              {user.firstName[0].toUpperCase()}
              {user.lastName[0].toUpperCase()}
            </Avatar>}
            <Button color="error" onClick={handleLogout}>
              Logout
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
    );
  } else {
    return (
      <AppBar position="static" color="inherit" elevation={0} sx={{ borderBottom: 1, borderColor: 'divider', background: '#fff' }}>
        <Toolbar>
          <Box display="flex" alignItems="center" flexGrow={1}>
            <IconButton edge="start" sx={{ mr: 1, color: '#d7263d' }} aria-label="logo">
              <AssignmentTurnedInIcon fontSize="large" />
            </IconButton>
            <Typography variant="h5" sx={{ color: '#6d3b09', fontWeight: 900, fontFamily: 'serif' }}>
              Tasky
            </Typography>
          </Box>
          <Box>
            <Button 
              variant="outlined" 
              sx={{ 
                mr: 2, 
                fontWeight: 700, 
                color: '#d7263d',
                borderColor: '#d7263d',
                '&:hover': {
                  borderColor: '#d7263d',
                  backgroundColor: 'rgba(215, 38, 61, 0.1)'
                }
              }} 
              href="/login"
            >
              Login
            </Button>
            <Button 
              variant="contained" 
              sx={{ 
                fontWeight: 700, 
                backgroundColor: '#d7263d',
                '&:hover': {
                  backgroundColor: '#b91c2e'
                }
              }} 
              href="/signup"
            >
              Sign Up
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
    );
  }
};

export default Header;