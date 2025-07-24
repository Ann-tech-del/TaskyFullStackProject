import _React, { useState } from 'react'
import LayOut from '../components/Layout'
import { Box, Typography, Button, Stack } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axiosInstance from '../api/axiosInstance';
import Alert from '@mui/material/Alert';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import TaskModal from '../components/TaskModal';
import { useNavigate } from 'react-router-dom';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';

const CompletedTasks = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { data, isLoading, isError } = useQuery({
    queryKey: ['completed-tasks'],
    queryFn: async () => {
      const res = await axiosInstance.get('/api/tasks');
      return res.data.allTasks.filter((task:any) => task.isCompleted);
    }
  });

  
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

  
  const [modalOpen, setModalOpen] = useState(false);
  const [editingTask, setEditingTask] =useState<any>(null);
  const updateMutation = useMutation({
    mutationFn: async ({ id, title, description }: { id: string; title: string; description: string }) => {
      await axiosInstance.put(`/api/tasks/${id}`, { title, description });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['completed-tasks'] });
      setModalOpen(false);
    }
  });
  const handleEdit = (task: any) => {
    setEditingTask(task);
    setModalOpen(true);
  };
  const handleUpdate = (data: { title: string; description: string }) => {
    if (editingTask) {
      updateMutation.mutate({ id: editingTask.id, ...data });
    }
  };
  
  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      await axiosInstance.delete(`/api/tasks/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['completed-tasks'] });
      queryClient.invalidateQueries({ queryKey: ['all-tasks'] });
    }
  });
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deleteTaskId, setDeleteTaskId] = useState<string | null>(null);
  const handleDelete = (id: string) => {
    setDeleteTaskId(id);
    setDeleteDialogOpen(true);
  };
  const handleDeleteConfirm = () => {
    if (deleteTaskId) {
      deleteMutation.mutate(deleteTaskId);
    }
    setDeleteDialogOpen(false);
    setDeleteTaskId(null);
  };
  const handleDeleteCancel = () => {
    setDeleteDialogOpen(false);
    setDeleteTaskId(null);
  };

  return (
    <LayOut>
      <Box sx={{ p: 4, background: '#fff1e6', minHeight: '100vh' }}>
        {isLoading && <Alert severity="info">Loading completed tasks...</Alert>}
        {isError && <Alert severity="error">Failed to load completed tasks.</Alert>}
        {data?.length === 0 && !isLoading && !isError && (
          <Box textAlign="center" width="100%" my={4}>
            <Typography variant="h6" mb={2}>No completed tasks yet.</Typography>
            <Button
              variant="contained"
              color="primary"
              onClick={() => navigate('/tasks')}
            >
              View active tasks
            </Button>
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
                variant="outlined"
                color="success"
                startIcon={<CheckCircleIcon />}
                sx={{ fontWeight: 700, mt: 1 }}
                fullWidth
                onClick={() => handleMarkIncomplete(task.id)}
                disabled={incompleteMutation.status === 'pending'}
              >
                Mark as Incomplete
              </Button>
              <Stack direction="row" spacing={1} mt={1}>
                <Button
                  variant="outlined"
                  startIcon={<EditIcon />}
                  sx={{ fontWeight: 700, borderColor: 'fuchsia', color: '#6d3b09', flex: 1 }}
                  fullWidth
                  onClick={() => handleEdit(task)}
                  disabled={updateMutation.status === 'pending'}
                >
                  UPDATE
                </Button>
                <Button
                  variant="contained"
                  color="error"
                  startIcon={<DeleteIcon />}
                  sx={{ fontWeight: 700, flex: 1, bgcolor: '#d7263d', '&:hover': { bgcolor: '#b91c2e' } }}
                  fullWidth
                  onClick={() => handleDelete(task.id)}
                  disabled={deleteMutation.status === 'pending'}
                >
                  DELETE
                </Button>
              </Stack>
            </Box>
          ))}
        </Stack>
      </Box>
      <TaskModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSave={handleUpdate}
        initialTitle={editingTask?.title}
        initialDescription={editingTask?.description}
      />
      <Box sx={{backdropFilter:"blur(5px)"}}>
        <Dialog open={deleteDialogOpen} onClose={handleDeleteCancel} >
        <DialogTitle>Delete Task</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to delete this task?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteCancel} color="secondary" variant="outlined">Cancel</Button>
          <Button onClick={handleDeleteConfirm} color="error" variant="contained">Delete</Button>
        </DialogActions>
      </Dialog>
      </Box>
    </LayOut>
  )
}

export default CompletedTasks