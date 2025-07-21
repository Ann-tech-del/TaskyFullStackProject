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
  Divider,
  Chip,
  Tooltip,
  Link,
} from "@mui/material";
import LayOut from '../components/Layout';

const NewTasks = () => {
  const [title,setTitle] =useState("")
  const [description,setDescription] = useState("")
  return (
    <LayOut>
      <Stack
        justifyItems={"center"}
        component={"form"}
        spacing={2}
        width={"40%"}
        sx={{ p: 4, borderRadius: "15px", justifyContent:"center" }}
      >
        <TextField
          label="Task Title"
          required
          InputProps={{ style: { fontSize: "1.8rem" } }}
          InputLabelProps={{ style: { fontSize: "1.6rem" } }}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
         <TextareaAutosize
          placeholder="Tasks Description"
          required
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          style={{
            width: "100%",
            fontSize: "1.6rem",
            padding: "1rem",
            color: "inherit",
            backgroundColor: "transparent",
            borderRadius: "8px",
          }}
        />
         <Button
                  type='submit'
                  variant='contained'
                  size='large'
                 
                  sx={{ mt: 2 }}
                >
                 
                    Create Blog
                  
                </Button>
      </Stack>
    </LayOut>
  )
}

export default NewTasks