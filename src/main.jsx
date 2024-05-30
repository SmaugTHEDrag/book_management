import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Router from './routers/router.jsx';
import AuthProvider from './contexts/AuthProvider.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
    <Router />
    </AuthProvider>
  </React.StrictMode>,
);
