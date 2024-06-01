import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Cadastro from './Cadastro.tsx';
import Home from './Home.tsx';
import Index from './Index.tsx';
import Servico from './Servico.tsx';
import User from './User.tsx'
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
        <Route path="/servico/:id" element={<Servico />} />
        <Route path="/user" element={<User />} />
      </Routes>
    </Router>
  </React.StrictMode>,
);
