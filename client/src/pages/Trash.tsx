import _React from 'react'
import LayOut from '../components/Layout'
import { Box, Typography, Button, Stack, Alert } from '@mui/material';
import RestoreIcon from '@mui/icons-material/Restore';
import axiosInstance from '../api/axiosInstance';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

const Trash = () => {
  const queryClient = useQueryClient();
  const { data, isLoading, isError } = useQuery({
    queryKey: ['trash-tasks'],
    queryFn: async () => {
      const res = await axiosInstance.get('/api/tasks/trash');
      return res.data.trashTasks;
    }
  });

  const restoreMutation = useMutation({
    mutationFn: async (id: string) => {
      await axiosInstance.patch(`/api/tasks/${id}/restore`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['trash-tasks'] });
      queryClient.invalidateQueries({ queryKey: ['all-tasks'] });
      queryClient.invalidateQueries({ queryKey: ['completed-tasks'] });
    }
  });

  const handleRestore = (id: string) => {
    restoreMutation.mutate(id);
  };

  return (
    <LayOut>
      <Box sx={{ p: 4, background: '#fff1e6', minHeight: '100vh' }}>
        <Typography variant="body1" color="error" mb={3}>
          Items in trash will be deleted after 30 days.
        </Typography>
        {isLoading && <Alert severity="info">Loading deleted tasks...</Alert>}
        {isError && <Alert severity="error">Failed to load deleted tasks.</Alert>}
        {data?.length === 0 && !isLoading && !isError && (
          <Box textAlign="center" width="100%" my={4}>
            <Typography variant="h6" mb={2}>Trash is empty.</Typography>
          </Box>
        )}
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
                minHeight: 180,
                transition: 'box-shadow 0.2s',
                '&:hover': { boxShadow: 6 },
              }}
            >
              <Typography variant="h6" fontWeight={900} color="primary" gutterBottom sx={{ mb: 1, fontSize: '1.2rem', textTransform: 'uppercase' }}>
                {task.title}
              </Typography>
              <Typography variant="body2" color="text.secondary" mb={2} sx={{ minHeight: 32 }}>
                {task.description}
              </Typography>
              <Button
                variant="outlined"
                startIcon={<RestoreIcon />}
                color="success"
                sx={{ fontWeight: 700, mt: 1 }}
                fullWidth
                onClick={() => handleRestore(task.id)}
                disabled={restoreMutation.status === 'pending'}
              >
                Restore
              </Button>
            </Box>
          ))}
        </Stack>
      </Box>
    </LayOut>
  )
}

export default Trash