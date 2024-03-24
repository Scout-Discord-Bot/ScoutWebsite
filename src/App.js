import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation, useNavigate } from 'react-router-dom';
import Home from './pages/home/home';
import Support from './pages/support/support';
import PrivacyPolicy from './pages/privacypolicy/privacypolicy';
import TermsOfService from './pages/termsofservice/termsofservice';
import NotFound from './pages/notfound/notfound';
import Team from './pages/team/team';
import Callback from './components/callback';
import Dashboard from './pages/dashboard/dashboard';
import ServerConfig from './pages/serverconfig/serverconfig';
import ServerSettings from './pages/serverconfig/server_settings/server_settings';
import WelcomeMessages from './pages/serverconfig/welcome_messages/welcome_messages';
import LeaveMessages from './pages/serverconfig/leave_messages/leave_messages';
import Moderation from './pages/serverconfig/moderation/moderation';
import Fun from './pages/serverconfig/fun/fun';
import Utility from './pages/serverconfig/utility/utility';
import Levels from './pages/serverconfig/levels/levels';
import Logging from './pages/serverconfig/logging/logging';
import Login from './components/login';
import Logout from './components/logout';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userAccess, setUserAccess] = useState('None');
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuthentication = async () => {
      const response = await axios.get(`https://api.scoutbot.xyz/userdata`, { withCredentials: true });
      setIsLoggedIn(response.status === 200);

      if (response.status === 200 && location.pathname.startsWith('/dashboard/')) {
        const guildId = location.pathname.split('/')[2];
        const accessResponse = await axios.get(`https://api.scoutbot.xyz/guild/useraccess`, {
          withCredentials: true,
          params: { guildId: guildId }
        });
        setUserAccess(accessResponse.data.role);
      } else if (response.status !== 200) {
        navigate("/");
      }
    };

    checkAuthentication();
  }, [location, navigate]);

  const userHasAccess = userAccess === 'Owner' || userAccess === 'Admin';

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/support" element={<Support />} />
        <Route path="/legal/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/legal/terms-of-service" element={<TermsOfService />} />
        <Route path="/ourteam" element={<Team />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/oauth/callback" element={<Callback />} />
        <Route path="/logout" element={<Logout />} />

        <Route path="/dashboard" element={isLoggedIn ? <Dashboard /> : <Navigate to="/" />} />
        <Route path="/dashboard/:guildId" element={userHasAccess ? <ServerConfig /> : <Navigate to="/dashboard" />} />
        <Route path="/dashboard/:guildId/serverSettings" element={userHasAccess ? <ServerSettings /> : <Navigate to="/dashboard" />} />
        <Route path="/dashboard/:guildId/welcomeMessages" element={userHasAccess ? <WelcomeMessages /> : <Navigate to="/dashboard" />} />
        <Route path="/dashboard/:guildId/leaveMessages" element={userHasAccess ? <LeaveMessages /> : <Navigate to="/dashboard" />} />
        <Route path="/dashboard/:guildId/moderation" element={userHasAccess ? <Moderation /> : <Navigate to="/dashboard" />} />
        <Route path="/dashboard/:guildId/fun" element={userHasAccess ? <Fun /> : <Navigate to="/dashboard" />} />
        <Route path="/dashboard/:guildId/utility" element={userHasAccess ? <Utility /> : <Navigate to="/dashboard" />} />
        <Route path="/dashboard/:guildId/levels" element={userHasAccess ? <Levels /> : <Navigate to="/dashboard" />} />
        <Route path="/dashboard/:guildId/logging" element={userHasAccess ? <Logging /> : <Navigate to="/dashboard" />} />
      </Routes>
    </Router>
  );
};

export default App;