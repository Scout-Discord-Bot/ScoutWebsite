import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/home';
import About from './pages/about';
import Contact from './pages/support';
import Dashboard from './pages/dashboard';

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