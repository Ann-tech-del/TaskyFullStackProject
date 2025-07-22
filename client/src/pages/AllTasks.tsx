import React from 'react'
import LayOut from '../components/Layout'
import { Box, Typography, Button, IconButton, Stack,  } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { useQuery } from '@tanstack/react-query';
import axiosInstance from '../api/axiosInstance';
import Alert from '@mui/material/Alert';


const AllTasks = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['all-tasks'],
    queryFn: async () => {
      const res = await axiosInstance.get('/api/tasks');
      // Adjust this if your backend response shape is different
      return res.data.allTasks;
    }
  });

  return (
    <LayOut>
<Box sx={{ p: 4, background: '#fff1e6', minHeight: '100vh' }}>
  {isLoading && <Alert severity="info">Loading tasks...</Alert>}
  {isError && <Alert severity="error">Failed to load tasks.</Alert>}
  <Stack
    direction="row"
    flexWrap="wrap"
    gap={4}
    justifyContent={{ xs: 'center', md: 'flex-start' }}
    sx={{
      // Ensure at least 3 cards per row on desktop
      '& > *': {
        flex: '1 1 300px',
        maxWidth: '340px',
        minWidth: '280px',
      },
    }}
  >
    {data?.map((task: any) => (
      <Box
        key={task.id}
        sx={{
          background: '#fff',
          borderRadius: 3,
          boxShadow: 3,
          p: 3,
          mb: 2,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          minHeight: 260,
          transition: 'box-shadow 0.2s',
          '&:hover': { boxShadow: 6 },
        }}
      >
        <Typography variant="h6" fontWeight={900} color="primary" gutterBottom sx={{ mb: 1, fontSize: '1.3rem' }}>
          {task.title}
        </Typography>
        <Typography variant="body1" color="text.secondary" mb={2} sx={{ minHeight: 48, fontSize: '1.05rem' }}>
          {task.description}
        </Typography>
        <Stack direction="row" alignItems="center" spacing={1} mb={1}>
          <CalendarTodayIcon fontSize="small" sx={{ color: '#6d3b09' }} />
          <Typography variant="body2" color="#222">
            {new Date(task.dateCreated).toLocaleDateString()}
          </Typography>
        </Stack>
        <Button
          variant="outlined"
          startIcon={<CheckCircleIcon />}
          color="success"
          sx={{ fontWeight: 700, borderColor: '#388e3c', color: '#388e3c', mb: 2, mt: 1 }}
          fullWidth
        >
          Mark as Complete
        </Button>
        <Stack direction="row" spacing={1} mt={1}>
          <Button
            variant="outlined"
            startIcon={<EditIcon />}
            sx={{ fontWeight: 700, borderColor: '#222', color: '#222', flex: 1 }}
            fullWidth
          >
            UPDATE
          </Button>
          <Button
            variant="contained"
            color="error"
            startIcon={<DeleteIcon />}
            sx={{ fontWeight: 700, flex: 1, bgcolor: '#d7263d', '&:hover': { bgcolor: '#b91c2e' } }}
            fullWidth
          >
            DELETE
          </Button>
        </Stack>
      </Box>
    ))}
  </Stack>
</Box>

    </LayOut>
  )
}

export default AllTasks