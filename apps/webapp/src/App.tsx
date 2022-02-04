import './logo.svg';
import './App.css';
import { Box, CssBaseline, ThemeProvider } from '@mui/material';
import { Routes } from './router/Router';
import AppBar from './components/AppBar';
import Drawer from './components/Drawer';
import { StoreProvider } from 'easy-peasy';
import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter } from 'react-router-dom';
import { IoProvider } from 'socket.io-react-hook';
import store from './store/store';
import { useTheme } from './hooks/useTheme';

const queryClient = new QueryClient();

const MyThemeProvider: React.FC = ({ children }) => {
  const [theme] = useTheme();
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};

const Providers: React.FC = ({ children }) => (
  <StoreProvider store={store}>
    <QueryClientProvider client={queryClient}>
      <IoProvider>
        <BrowserRouter>
          <MyThemeProvider>{children}</MyThemeProvider>
        </BrowserRouter>
      </IoProvider>
    </QueryClientProvider>
  </StoreProvider>
);

function DrawerApp() {
  return (
    <div className="App">
      <Box sx={{ display: 'flex' }}>
        <AppBar />
        <Drawer />
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <div style={{ paddingTop: 64 }}>
            <Routes />
          </div>
        </Box>
      </Box>
    </div>
  );
}

export const AppWithProviders = () => (
  <React.StrictMode>
    <Providers>
      <DrawerApp />
    </Providers>
  </React.StrictMode>
);

export default AppWithProviders;
