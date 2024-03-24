import React, { useState, useEffect, useNavigate } from 'react'; // Corrected import
import axios from 'axios';
import { BrowserRouter as Router, Routes, Route, Navigate, useParams } from 'react-router-dom'; // Removed unused imports
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

const useAuth = (checkGuildAccess = false, guildId = null) => {
  const [hasAccess, setHasAccess] = useState(false);
  const navigate = useNavigate(); // Corrected to use useNavigate hook

  useEffect(() => {
    const checkAccess = async () => {
      try {
        const userRes = await axios.get(`https://api.scoutbot.xyz/userdata`, { withCredentials: true });
        
        if (userRes.status !== 200) {
          navigate("/");
          return;
        }

        if (checkGuildAccess && guildId) {
          const accessRes = await axios.get(`https://api.scoutbot.xyz/guild/useraccess`, {
            withCredentials: true,
            params: { guildId }
          });

          if (['Owner', 'Admin'].includes(accessRes.data.role)) {
            setHasAccess(true);
          } else {
            navigate("/");
          }
        } else {
          setHasAccess(true);
        }
      } catch (error) {
        console.error('Error checking access:', error);
        navigate("/");
      }
    };

    checkAccess();
  }, [navigate, checkGuildAccess, guildId]);

  return hasAccess;
};

const DashboardRoute = () => {
  const hasAccess = useAuth();

  return hasAccess ? <Dashboard /> : <Navigate to="/" />;
};

const GuildSpecificRoutes = ({ component: Component }) => {
  const { guildId } = useParams();
  const hasAccess = useAuth(true, guildId);

  return hasAccess ? <Component /> : <Navigate to="/dashboard" />;
};

const App = () => {
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
        <Route path="/dashboard" element={<DashboardRoute />} />
        <Route path="/dashboard/:guildId" element={<GuildSpecificRoutes component={ServerConfig} />} />
        <Route path="/dashboard/:guildId/serverSettings" element={<GuildSpecificRoutes component={ServerSettings} />} />
        <Route path="/dashboard/:guildId/welcomeMessages" element={<GuildSpecificRoutes component={WelcomeMessages} />} />
        <Route path="/dashboard/:guildId/leaveMessages" element={<GuildSpecificRoutes component={LeaveMessages} />} />
        <Route path="/dashboard/:guildId/moderation" element={<GuildSpecificRoutes component={Moderation} />} />
        <Route path="/dashboard/:guildId/fun" element={<GuildSpecificRoutes component={Fun} />} />
        <Route path="/dashboard/:guildId/utility" element={<GuildSpecificRoutes component={Utility} />} />
        <Route path="/dashboard/:guildId/levels" element={<GuildSpecificRoutes component={Levels} />} />
        <Route path="/dashboard/:guildId/logging" element={<GuildSpecificRoutes component={Logging} />} />
      </Routes>
    </Router>
  );
};

export default App;
