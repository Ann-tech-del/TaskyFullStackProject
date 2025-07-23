import React from 'react'
import LayOut from '../components/Layout'
import { Box, Typography, Button, Stack } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axiosInstance from '../api/axiosInstance';
import Alert from '@mui/material/Alert';

const CompletedTasks = () => {
  const queryClient = useQueryClient();
  const { data, isLoading, isError } = useQuery({
    queryKey: ['completed-tasks'],
    queryFn: async () => {
      const res = await axiosInstance.get('/api/tasks');
      return res.data.allTasks.filter((task:any) => task.isCompleted);
    }
  });

  // Mark as incomplete mutation
  const incompleteMutation = useMutation({
    mutationFn: async (id: string) => {
      await axiosInstance.patch(`/api/tasks/${id}/incomplete`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['completed-tasks'] });
      queryClient.invalidateQueries({ queryKey: ['all-tasks'] });
    }
  });

  const handleMarkIncomplete = (id: string) => {
    incompleteMutation.mutate(id);
  };

  return (
    <LayOut>
      <Box sx={{ p: 4, background: '#fff1e6', minHeight: '100vh' }}>
        {isLoading && <Alert severity="info">Loading completed tasks...</Alert>}
        {isError && <Alert severity="error">Failed to load completed tasks.</Alert>}
        <Stack
          direction="row"
          flexWrap="wrap"
          gap={4}
          justifyContent={{ xs: 'center', md: 'flex-start' }}
          sx={{
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
                minHeight: 220,
                transition: 'box-shadow 0.2s',
                '&:hover': { boxShadow: 6 },
              }}
            >
              <Typography variant="h6" fontWeight={900} color="primary" gutterBottom sx={{ mb: 1, fontSize: '1.3rem', textTransform: 'uppercase' }}>
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
                variant="contained"
                color="success"
                startIcon={<CheckCircleIcon />}
                sx={{ fontWeight: 700, mt: 1 }}
                fullWidth
                onClick={() => handleMarkIncomplete(task.id)}
                disabled={incompleteMutation.status === 'pending'}
              >
                Mark as Incomplete
              </Button>
            </Box>
          ))}
        </Stack>
      </Box>
    </LayOut>
  )
}

export default CompletedTasks