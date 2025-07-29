import _React, { useState } from 'react';
import {
  TextField,
  Typography,
  Button,
  Alert,
  Box,
} from "@mui/material";
import LayOut from '../components/Layout';
import { useMutation } from '@tanstack/react-query';
import axiosInstance from '../api/axiosInstance';
import axios from 'axios';
const Testimonial = () => {
  const [message, setMessage] = useState("");
  const [formError, setFormError] = useState('');
  const [isSuccessFull, setIsSuccessFull] = useState('');

  const { isPending, mutate } = useMutation({
    mutationKey: ["create-testimonial"],
    mutationFn: async (newTestimonial:{message:string}) => {
      const res = await axiosInstance.post("/api/testimonials", newTestimonial);
      return res.data;
    },
    onError: (err) => {
  if (axios.isAxiosError(err)) {
    setFormError(err.response?.data?.message);
  } else {
    setFormError('Something went wrong');
  }
},
    onSuccess: () => {
      setIsSuccessFull("Testimonial submitted successfully.");
      setMessage("");
    }
  });

  const handleCreateTestimonial = () => {
    setFormError("");
    mutate({ message });
  };

  return (
    <LayOut>
      <Box
        minHeight="100vh"
        display="flex"
        alignItems="center"
        justifyContent="center"
        sx={{ backgroundColor: '#fff1e6' }}
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
            Add Your Testimonial
          </Typography>
          {formError && (
            <Alert severity="error" sx={{ fontSize: "1.1rem" }}>
              {formError}
            </Alert>
          )}
          {isSuccessFull && (
            <Alert severity="success" sx={{ fontSize: "1.1rem" }}>
              {isSuccessFull}
            </Alert>
          )}
          <TextField
            label="Enter your message"
            multiline
            rows={5}
            variant="outlined"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
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
            onClick={handleCreateTestimonial}
            disabled={isPending}
          >
            Submit Testimonial
          </Button>
        </Box>
      </Box>
    </LayOut>
  );
};

export default Testimonial;