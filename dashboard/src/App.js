import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/home.js';
import About from './pages/about.js';
import Contact from './pages/support.js';
import Dashboard from './pages/dashboard.js';

const App = () => (
  
  <Router>
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/about" element={<About/>} />
      <Route path="/contact" element={<Contact/>} />
      <Route path="/dashboard" element={<Dashboard/>} />
    </Routes>
  </Router>
);

export default App;