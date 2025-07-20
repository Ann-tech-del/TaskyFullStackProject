import _react from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from './pages/Landing'
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

function App() {
  

  return (
    <>
    <ThemeProvider theme={theme}>
     <BrowserRouter>
     <Routes>
       <Route path='/' index element={<Landing/>}/>
       <Route path='/SignUp' element={<Signup/>}/>
       <Route path='/Login' element={< Login/>}/>
     </Routes>
     </BrowserRouter>
     </ThemeProvider>
    </>
  )
}

export default App
