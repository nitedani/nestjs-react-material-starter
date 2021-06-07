import { blue } from '@material-ui/core/colors';
import { createTheme } from '@material-ui/core/styles';
export const drawerWidth = 240;
export const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: blue,
    background: {
      default: '#f9f9f9',
      paper: '#fff',
    },
    text: {
      primary: '#030303',
    },
  },
});

export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: blue,
    background: {
      paper: '#202020',
      default: '#181818',
    },
    text: {
      primary: '#fff',
    },
  },
});

// Create a theme instance.
