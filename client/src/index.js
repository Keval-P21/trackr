import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './styles/index.css';
import './styles/navbar.css';
import './styles/card.css';
import './styles/formfields.css';
import { BrowserRouter } from 'react-router-dom';

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
