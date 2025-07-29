import _react from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient,QueryClientProvider} from '@tanstack/react-query'
import Landing from './pages/Landing'
import Protected from './components/Protected';
import Trash from './pages/Trash'
import Profile from './pages/Profile'
import NewTasks from './pages/NewTasks'
import CompletedTasks from './pages/CompletedTasks'

import AllTasks from './pages/AllTasks'
import Login from './pages/Login'
import Signup from './pages/Signup'
import {ThemeProvider,} from "@mui/material";
import theme from './Theme/theme';

import './App.css'
const client = new QueryClient()

function App() {
  

  return (
    <>
    <QueryClientProvider client={client}>
    <ThemeProvider theme={theme}>
     <BrowserRouter>
     <Routes>
       <Route path='/' index element={<Landing/>}/>
       <Route path='/SignUp' element={<Signup/>}/>
       <Route path='/Login' element={< Login/>}/>
       <Route path="/tasks">
  <Route
    path=""
    element={
      <Protected>
        <AllTasks />
      </Protected>
    }
  />
  <Route
    path="new"
    element={
      <Protected>
        <NewTasks />
      </Protected>
    }
  />
  <Route
    path="trash"
    element={
      <Protected>
        <Trash />
      </Protected>
    }
  />
  <Route
    path="profile"
    element={
      <Protected>
        <Profile />
      </Protected>
    }
  />
  <Route
    path="complete"
    element={
      <Protected>
        <CompletedTasks />
      </Protected>
    }
  />
 
</Route>

     </Routes>
     </BrowserRouter>
     </ThemeProvider>
     </QueryClientProvider>
    </>
  )
}

export default App
