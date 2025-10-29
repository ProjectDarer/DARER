import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
// Import a global CSS file that sets up the base styling
import './styles/global.css'; 

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);