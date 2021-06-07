import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { CssBaseline, ThemeProvider } from '@material-ui/core';
import { IoProvider } from 'socket.io-react-hook';
import { QueryClient, QueryClientProvider } from 'react-query';
import { StoreProvider } from 'easy-peasy';
import { useTheme } from './hooks/useTheme';
import store from './store/store';
import { BrowserRouter } from 'react-router-dom';
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

ReactDOM.render(
  <React.StrictMode>
    <Providers>
      <App />
    </Providers>
  </React.StrictMode>,
  document.getElementById('root'),
);

if (module.hot) {
  module.hot.accept();
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
