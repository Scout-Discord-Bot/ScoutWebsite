import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/home/home';
//import About from './pages/about/about';
//import Dashboard from './pages/dashboard/dashboard';
//import Login from './pages/login/login';

import './App.css';

const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<Home/>} />
    </Routes>
  </Router>
);

export default App;