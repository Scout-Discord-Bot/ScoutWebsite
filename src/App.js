import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation, useNavigate } from 'react-router-dom';import Cookies from 'js-cookie';
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

function withAuthorization(Component, userHasAccess) {
  return function (props) {
    if (userHasAccess) {
      return <Component {...props} />;
    } else {
      return <Navigate to="/dashboard" />;
    }
  };
}


const RoutesComponent = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [userAccess, setUserAccess] = useState('None');
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuthentication = async () => {
      if (location.pathname.startsWith('/dashboard')) {
        const dataKey = Cookies.get('dataKey');
        const token = Cookies.get('token');
    
        if (!token) {
          navigate("/");
          return;
        }
    
        const response = await axios.get(`https://api.scoutbot.xyz/userdata`)
    
        setIsLoggedIn(response.status === 200);
    
        if (response.status === 200) {
          const guildId = location.pathname.split('/')[2]; // Extract guildId from the path
          const accessResponse = await axios.get(`https://api.scoutbot.xyz/guild/useraccess`, { params: { guildId: guildId} });
          setUserAccess(accessResponse.data.role); // Set userAccess to the role from the response
        }
      }
      setIsLoading(false);
    };
    
    checkAuthentication();
  }, [location, navigate]);

  if (isLoading) {
    return <div><div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      backgroundColor: 'white'
    }}>
      <div style={{
        border: '16px solid #f3f3f3',
        borderRadius: '50%',
        borderTop: '16px solid #69dc9e',
        width: '120px',
        height: '120px',
        animation: 'spin 2s linear infinite'
      }} />
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
    </div>; // Replace with your actual loading component
  }

  const userHasAccess = userAccess === 'Owner' || userAccess === 'Admin';

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/support" element={<Support />} />
      <Route path="/legal/privacy-policy" element={<PrivacyPolicy />} />
      <Route path="/legal/terms-of-service" element={<TermsOfService />} />
      <Route path="/ourteam" element={<Team />} />
      <Route path="*" element={<NotFound />} />
      <Route path="/oauth/callback" element={<Callback />} />
      <Route path="/dashboard" element={isLoggedIn ? <Dashboard /> : <Navigate to="/" />} />
      <Route path="/signout" element={<Logout />} />

      <Route path="/dashboard/:guildId" element={isLoggedIn ? withAuthorization(ServerConfig, userHasAccess)() : <Navigate to="/" />} />
      <Route path="/dashboard/:guildId/*" element={isLoggedIn ? withAuthorization(ServerConfig, userHasAccess)() : <Navigate to="/" />} />
      <Route path="/dashboard/:guildId/serverSettings" element={isLoggedIn ? withAuthorization(ServerSettings, userHasAccess)() : <Navigate to="/" />} />
      <Route path="/dashboard/:guildId/welcomeMessages" element={isLoggedIn ? withAuthorization(WelcomeMessages, userHasAccess)() : <Navigate to="/" />} />
      <Route path="/dashboard/:guildId/leaveMessages" element={isLoggedIn ? withAuthorization(LeaveMessages, userHasAccess)() : <Navigate to="/" />} />
      <Route path="/dashboard/:guildId/moderation" element={isLoggedIn ? withAuthorization(Moderation, userHasAccess)() : <Navigate to="/" />} />
      <Route path="/dashboard/:guildId/fun" element={isLoggedIn ? withAuthorization(Fun, userHasAccess)() : <Navigate to="/" />} />
      <Route path="/dashboard/:guildId/utility" element={isLoggedIn ? withAuthorization(Utility, userHasAccess)() : <Navigate to="/" />} />
      <Route path="/dashboard/:guildId/levels" element={isLoggedIn ? withAuthorization(Levels, userHasAccess)() : <Navigate to="/" />} />
      <Route path="/dashboard/:guildId/logging" element={isLoggedIn ? withAuthorization(Logging, userHasAccess)() : <Navigate to="/" />} />
    </Routes>
  );
};

const App = () => (
  <Router>
    <RoutesComponent />
  </Router>
);

export default App;