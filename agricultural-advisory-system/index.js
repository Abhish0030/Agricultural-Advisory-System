// frontend/src/index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';  // If you have this file
import App from './App';  // Must match case exactly

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);