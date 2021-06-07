import React from 'react';
import './logo.svg';
import './App.css';
import { Box } from '@material-ui/core';
import { Routes } from './router/Router';
import AppBar from './components/AppBar';
import Drawer from './components/Drawer';
import { BrowserRouter } from 'react-router-dom';

function App() {
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

export default App;
