import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';

// Creating a React root and rendering the App component within it
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* Providing BrowserRouter to enable routing */}
    <BrowserRouter>
      {/* Rendering the main App component */}
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
