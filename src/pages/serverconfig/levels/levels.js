// Levels.js
import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import Select from 'react-select';
import Navigation from '../../../components/navigation';
import Notification from '../../../components/notification';
import './levels.css';

function Levels() {
  const { guildId } = useParams();
  const [guild, setGuild] = useState(null);
  const [roles, setRoles] = useState([]);
  const [selectedRoles, setSelectedRoles] = useState([]);
  const [notificationData, setNotificationData] = useState([]);

  useEffect(() => {
    axios.get(`https://api.scoutbot.xyz/guild/roles`, {
      params: {
        guildId: guildId
      },
      withCredentials: true
    })
      .then(response => {
        const roleOptions = response.data.map(role => ({
          value: role.id,
          label: role.name
        }));
        setRoles(roleOptions);
      })
      .catch(error => {
        console.error('There was an error fetching the roles!', error);
      });
  }, [guildId]);

  useEffect(() => {
    axios.get(`https://api.scoutbot.xyz/userdata`, { withCredentials: true })
      .then(response => {
        const guilds = response.data.guilds;
        const guild = guilds.find(g => g.id === guildId);
        if (guild) {
          setGuild(guild.name);
        } else {
          console.error('Guild not found!');
        }
      })
      .catch(error => {
        console.error('There was an error retrieving the data!', error);
      });
  }, [guildId]);

  const handleRoleChange = selectedOptions => {
    setSelectedRoles(selectedOptions);
  };

  //const addNotification = (type, text) => {
 ///   setNotificationData(oldArray => [...oldArray, { type, text }]);
 // };

  const clearNotification = index => {
    setNotificationData(notificationData.filter((_, i) => i !== index));
  };

  return (
    <div id='serverSettings'>
      <Helmet>
        <title>Scout | Server Config - Levels</title>
      </Helmet>
      <Navigation />
      <header>
        <h1>Levels</h1>
        <p>Server Configuration for {guild} ({guildId})</p>
        <button className='backButton'><Link to={`/dashboard/${guildId}`}>Back to Server Dashboard</Link></button>
      </header>
      <div className='rolemultipliers'>
        <h2>Role Multipliers</h2>
        <p>Role multipliers are used to calculate the amount of XP a user receives when they send a message. The multiplier is the amount of XP a user will receive for each message they send. If a user has multiple roles, the highest multiplier will be used.</p>
        <Select
          value={selectedRoles}
          onChange={handleRoleChange}
          options={roles}
          isMulti
        />
      </div>
      <div className="notification-container">
        {notificationData.map((notif, index) =>
          <Notification key={index} type={notif.type} text={notif.text} clearNotification={() => clearNotification(index)} />
        )}
      </div>
    </div>
  );
}

export default Levels;
