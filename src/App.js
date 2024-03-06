import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/home/home';
import Support from './pages/support/support';
import PrivacyPolicy from './pages/privacypolicy/privacypolicy';
import './App.css';
import TermsOfService from './pages/termsofservice/termsofservice';
import NotFound from './pages/notfound/notfound';
import Team from './pages/team/team';

const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/support" element={<Support/>} />
      <Route path="/legal/privacy-policy" element={<PrivacyPolicy/>} />
      <Route path="/legal/terms-of-service" element={<TermsOfService/>} />
      <Route path="/ourteam" element={<Team/>} />
      <Route path="*" element={<NotFound/>} />

    </Routes>
  </Router>
);

export default App;