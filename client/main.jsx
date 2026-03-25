import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import App from './App';
import './styles/index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />

      <Toaster
        position="top-center"
        reverseOrder={false}
        gutter={8}
        toastOptions={{
          duration: 3000,
          style: {
            background: '#161a23',
            color: '#f8f5ed',
            border: '1px solid rgba(215, 173, 57, 0.35)',
            borderRadius: '10px',
            fontSize: '14px',
          },
        }}
      />
    </BrowserRouter>
  </React.StrictMode>
);