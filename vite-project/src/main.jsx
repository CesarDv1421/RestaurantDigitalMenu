import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { NextUIProvider } from '@nextui-org/react';
import { AuthProvider } from '../context/AuthContext';
import { CartOrdersProvider } from '../context/CartOrdersContext';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <NextUIProvider>
    <AuthProvider>
      <CartOrdersProvider>
        <App />
      </CartOrdersProvider>
    </AuthProvider>
  </NextUIProvider>
);
