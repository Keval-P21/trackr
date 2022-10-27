import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './styles/index.css';
import './styles/navbar.css';
import './styles/card.css';
import './styles/formfields.css';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './components/context/AuthContext';

const container: HTMLElement = document.getElementById('root') as HTMLElement;
const root = createRoot(container);

root.render(
  <AuthProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </AuthProvider>
);
