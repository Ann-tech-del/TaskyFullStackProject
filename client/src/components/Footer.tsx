import _React from 'react'
import { Box, Typography } from '@mui/material';

const Footer = () => {
  return (
   <Box component="footer" sx={{ py: 2, px: 1, mt: 'auto', backgroundColor: '#f5f5f5', textAlign: 'center' }}>
      <Typography variant="body2" color="textSecondary">
        © 2025 Tasky. All rights reserved.
      </Typography>
    </Box>
  )
}

export default Footer