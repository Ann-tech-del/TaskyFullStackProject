import _React from 'react'
import { AppBar, Toolbar, Typography, Button, Box, IconButton } from '@mui/material';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';

const Header = () => {
  return (
    <AppBar position="static" color="inherit" elevation={0} sx={{ borderBottom: 1, borderColor: 'divider', background: 'transparent' }}>
      <Toolbar>
        <Box display="flex" alignItems="center" flexGrow={1}>
          <IconButton edge="start" color="primary" aria-label="logo" sx={{ mr: 1 }}>
            <AssignmentTurnedInIcon fontSize="large" />
          </IconButton>
          <Typography variant="h5" color="secondary" fontWeight={900} sx={{ fontFamily: 'serif' }}>
            Tasky
          </Typography>
        </Box>
        <Box>
          <Button color="primary" variant="outlined" sx={{ mr: 2, fontWeight: 700 }} href="/login">
            Login
          </Button>
          <Button color="primary" variant="contained" sx={{ fontWeight: 700 }} href="/signup">
            Sign Up
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  )
}

export default Header