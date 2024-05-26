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

      if (process.env.NODE_ENV === 'development') {
        setIsLoggedIn(true);
        setUserAccess('Owner');
        setIsLoading(false);
        return;
      }

      try {
        if (location.pathname.startsWith('/dashboard')) {
          const response = await axios.get(`https://api.scoutbot.xyz/userdata`, { withCredentials: true });

          setIsLoggedIn(response.status === 200);

          if (response.status === 200) {
            const pathParts = location.pathname.split('/');
            const guildId = pathParts[2]; // Extract guildId from the path
            const moduleName = pathParts[3]; // Extract module name from the path

            const accessResponse = await axios.get(`https://api.scoutbot.xyz/guild/useraccess`, {
              params: { guildId: guildId },
              withCredentials: true
            });
            setUserAccess(accessResponse.data.role); // Set userAccess to the role from the response

            // Check if the module is enabled
            if (moduleName) {
              const moduleResponse = await axios.get(`https://api.scoutbot.xyz/guildsettings`, {
                params: { guildId: guildId },
                withCredentials: true
              });
              const moduleEnabled = moduleResponse.data.modules[moduleName].enabled;
              if (!moduleEnabled) {
                return navigate(`/dashboard/${guildId}`);
              }
            }
          }
        }
      }
      catch (error) {
        if (error.response && error.response.status === 404) {
          navigate("/");
        } else {
          console.error('Error checking access:', error);
        }
      }
      setIsLoading(false);
    };

    checkAuthentication();
  }, [location, navigate]);

  if (isLoading) {
    return <div><div style={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
    }}>
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        width: '120px',
        height: '120px',
      }}>
        <div style={{
          position: 'absolute',
          border: '8px solid transparent',
          borderTop: '8px solid #69dc9e',
          borderRadius: '50%',
          width: '120px',
          height: '120px',
          animation: 'spin 2s linear infinite',
        }}></div>
        <div style={{
          position: 'absolute',
          border: '8px solid transparent',
          borderTop: '8px solid #f3f3f3',
          borderRadius: '50%',
          width: '90px',
          height: '90px',
          animation: 'spin 1.5s linear infinite reverse',
        }}></div>
        <div style={{
          position: 'absolute',
          border: '8px solid transparent',
          borderTop: '8px solid #69dc9e',
          borderRadius: '50%',
          width: '60px',
          height: '60px',
          animation: 'spin 1s linear infinite',
        }}></div>
      </div>
      <div style={{
        marginTop: '20px',
        fontSize: '24px',
        fontWeight: 'bold',
        color: '#69dc9e',
        animation: 'fade 1.5s ease-in-out infinite',
      }}>Loading Data...</div>
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes fade {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
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
      <Route path="/logout" element={<Logout />} />

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