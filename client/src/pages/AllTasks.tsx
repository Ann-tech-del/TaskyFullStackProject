import React from 'react'
import LayOut from '../components/Layout'
import { Box, Typography, Button, IconButton, Stack,  } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

const tasks = [
  {
    id: 1,
    title: 'Take the trash out',
    description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia, necessitatibus!',
    date: '7/2/2025',
    time: '11:09:28 AM',
  },
  {
    id: 2,
    title: 'Take the trash out',
    description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia, necessitatibus!',
    date: '7/2/2025',
    time: '11:09:28 AM',
  },
  {
    id: 3,
    title: 'Take the trash out',
    description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia, necessitatibus!',
    date: '7/2/2025',
    time: '11:09:28 AM',
  },
  {
    id: 4,
    title: 'Take the trash out',
    description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia, necessitatibus!',
    date: '7/2/2025',
    time: '11:09:28 AM',
  },
  {
    id: 5,
    title: 'Take the trash out',
    description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia, necessitatibus!',
    date: '7/2/2025',
    time: '11:09:28 AM',
  },
  {
    id: 6,
    title: 'Take the trash out',
    description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia, necessitatibus!',
    date: '7/2/2025',
    time: '11:09:28 AM',
  },
];


const AllTasks = () => {
  return (
    <LayOut>
<Box sx={{ p: 4, background: '#fff1e6', minHeight: '100vh' }}>
      <Stack direction="row" flexWrap="wrap" gap={4} justifyContent="flex-start">
        {tasks.map((task) => (
          <Box
            key={task.id}
            sx={{
              width: 340,
              background: '#fff',
              borderRadius: 2,
              boxShadow: 2,
              p: 3,
              mb: 2,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
          >
            <Box>
              <Typography variant="h6" fontWeight={900} color="#222" gutterBottom>
                {task.title}
              </Typography>
              <Typography variant="body2" color="#666" mb={2}>
                {task.description}
              </Typography>
              <Stack direction="row" alignItems="center" spacing={1} mb={0.5}>
                <CalendarTodayIcon fontSize="small" sx={{ color: '#6d3b09' }} />
                <Typography variant="body2" color="#222">{task.date}</Typography>
              </Stack>
              <Stack direction="row" alignItems="center" spacing={1} mb={2}>
                <AccessTimeIcon fontSize="small" sx={{ color: '#6d3b09' }} />
                <Typography variant="body2" color="#222">{task.time}</Typography>
              </Stack>
            </Box>
            <Stack direction="row" spacing={1} mt={2}>
              <Button
                variant="outlined"
                startIcon={<EditIcon />}
                sx={{ fontWeight: 700, borderColor: '#222', color: '#222', flex: 1 }}
              >
                UPDATE
              </Button>
              <IconButton
                color="success"
                sx={{ border: '1.5px solid #388e3c', mx: 0.5, bgcolor: '#e8f5e9', '&:hover': { bgcolor: '#c8e6c9' } }}
                aria-label="mark as complete"
              >
                <CheckCircleIcon />
              </IconButton>
              <Button
                variant="contained"
                color="error"
                startIcon={<DeleteIcon />}
                sx={{ fontWeight: 700, flex: 1, bgcolor: '#d7263d', '&:hover': { bgcolor: '#b91c2e' } }}
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