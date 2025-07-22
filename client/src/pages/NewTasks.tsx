import React, { useState } from 'react'
import {
  Stack,
  TextField,
  Typography,
  Button,
  Alert,
  TextareaAutosize,
  InputLabel,
  Box,
  
} from "@mui/material";
import LayOut from '../components/Layout';
import { useMutation } from '@tanstack/react-query';
import axiosInstance from '../api/axiosInstance';
import axios from 'axios';

const NewTasks = () => {
  const [title,setTitle] =useState("")
  const [description,setDescription] = useState("")
  const [formError,setFormError]=useState('')
  const [isSuccessFull,setIsSuccessFull]=useState('')
   const { isPending,mutate } = useMutation({
    mutationKey: ["create-task"],
    mutationFn: async (newTask: {
      title: string;
      description: string;
      
    }) => {
      const res = await axiosInstance.post("/api/tasks", newTask);
      return res.data;
    },
         onError: (err) => {
  if (axios.isAxiosError(err)) {
    setFormError(err.response?.data.message);
  } else {
    setFormError('Something went wrong');
  }
},
    onSuccess: () => {
      setIsSuccessFull("Task created successfully.");
      // clearForm();
    },

    });
      const handleCreateTask = async () => {
    setFormError("");
   
  
    const blogData = { title, description,   };
    mutate(blogData);
  };

  return (

    <LayOut>
      <Box
        minHeight="100vh"
        display="flex"
        alignItems="center"
        justifyContent="center"
        sx={{backgroundColor: '#fff1e6' }}
      >
        <Box
          component="form"
          sx={{
            width: { xs: "90%", sm: "400px" },
            p: 4,
            borderRadius: 3,
            boxShadow: 3,
            background: "#fff",
            display: "flex",
            flexDirection: "column",
            gap: 3,
          }}
        >
          <Typography variant="h4" fontWeight={700} textAlign="center" mb={2}>
            Create New Task
          </Typography>
           {formError && (
          <Alert severity="error" sx={{ fontSize: "1.6rem" }}>
            {formError}
          </Alert>
        )}
        {isSuccessFull && (
          <Alert severity="success" sx={{ fontSize: "1.6rem" }}>
            {isSuccessFull}
          </Alert>
        )}
          <TextField
            label="Task Title"
            required
            InputProps={{ style: { fontSize: "1.2rem" } }}
            InputLabelProps={{ style: { fontSize: "1rem" } }}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <TextField
            label="Description"
            multiline
            rows={5}
            variant="outlined"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            fullWidth
          />
          <Button
            
            variant="contained"
            size="large"
            sx={{
              mt: 1,
              fontWeight: 600,
              fontSize: "1.1rem",
              
              boxShadow: 2,
              
             
            }}
            onClick={handleCreateTask}
              loading={isPending}
          >
            Create Task
          </Button>
        </Box>
      </Box>
    </LayOut>
  )
}

export default NewTasks