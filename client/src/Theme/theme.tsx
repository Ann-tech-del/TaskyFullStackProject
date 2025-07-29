import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#d7263d', 
    },
    secondary: {
      main: '#6d3b09',
    },
    background: {
      default: '#fff1e6', 
      paper: '#fff',
    },
  },
  typography: {
    fontFamily: '"Open Sans", sans-serif',  
    h2: {
      fontWeight: 900,
      color: '#6d3b09',
    },
    h3: {
      fontWeight: 900,
      color: '#d7263d',
    },
    subtitle1: {
      color: '#6d3b09',
    },
    button: {
      fontWeight: 700,
    },
  },
});

export default theme;
