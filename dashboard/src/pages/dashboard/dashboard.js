import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './dashboard.css';
import Navigation from '../../components/navigation';
import Footer from '../../components/footer';

const Dashboard = () => {
  const [userGuilds, setUserGuilds] = useState([]);
  const [botGuilds, setBotGuilds] = useState([]);
  const [userData, setUserData] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!document.cookie.includes('connect.sid')) {
        navigate('/login');
        return;
      }
    
      axios.get('https://api.scoutbot.me/api/user-data', { withCredentials: true })
      .then(response => {
        setUserData(response.data);
        setUserGuilds(response.data.guilds);
      })
      .catch(error => {
        console.error('Error fetching user data:', error);
        navigate('/login');
      });
    
      axios.get('https://api.scoutbot.me/api/guilds', { withCredentials: true })
      .then(response => {
        setBotGuilds(response.data);
      })
      .catch(error => {
        console.error('Error fetching bot guilds:', error);
        navigate('/login');
      });
    // Close the dropdown if clicked outside
    const closeDropdown = (e) => {
        if (!e.target.matches('.profile-pic')) {
          setDropdownOpen(false);
        }
      };
  
      // Add an event listener to the window
      window.addEventListener('click', closeDropdown);
  
      // Cleanup the event listener
      return () => {
        window.removeEventListener('click', closeDropdown);
      };
    }, [navigate]);
  
    // Toggle dropdown visibility
    const toggleDropdown = () => {
      setDropdownOpen(!dropdownOpen);
    };
  
    return (
      <div>
        <Navigation></Navigation>
        <div className="guild-selection">
          <h2>Select a server</h2>
          <div className="guilds-container">
            {userGuilds.map(guild => (
              <div key={guild.id} className="guild-card">
                <img src={`https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}.png`}
                  alt={`${guild.name} Logo`}
                  className="guild-logo"
                  onError={(e) => e.target.src = 'https://via.placeholder.com/150'} // Placeholder if image fails to load
                />
                <div className="guild-details">
                  <div className="guild-name">{guild.name}</div>
                  <div className="guild-id">{guild.id}</div>
                  <button className="guild-button">
                    {botGuilds.some(botGuild => botGuild.id === guild.id) ? 'Go' : 'Setup'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
        <Footer></Footer>
      </div>
    );
  };
  
  export default Dashboard;