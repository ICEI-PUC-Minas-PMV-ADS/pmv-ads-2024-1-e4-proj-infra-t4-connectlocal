import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Cadastro from './Cadastro';
import Home from './Home';
import Index from './Index';
import './index.css';

const container = document.getElementById('root');
const root = createRoot(container!); 
root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/index" element={<Index />} />
      </Routes>
    </Router>
  </React.StrictMode>,
);
