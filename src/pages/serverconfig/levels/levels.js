import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Navigation from '../../../components/navigation';
import { Link, useParams } from 'react-router-dom';
import Select from 'react-select';
import axios from 'axios';
import './levels.css';

function Levels() {
  const { guildId } = useParams();
  const [guild] = useState(null);
  const [roles, setRoles] = useState([]);
  const [selectedRole, setSelectedRole] = useState(null);

  useEffect(() => {
    // Fetch roles from the server
    axios.get(`https://api.scoutbot.xyz/guild/roles`, {guildId: guildId}, { withCredentials: true })
      .then(response => {
        const rolesData = response.data.map(role => ({
          value: role.id,
          label: role.name,
        }));
        setRoles(rolesData);
      })
      .catch(error => {
        console.error('There was an error fetching the roles!', error);
      });
  }, [guildId]);

  const handleRoleChange = selectedOption => {
    setSelectedRole(selectedOption);
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
        <button className='backButton'>
          <Link to={`/dashboard/${guildId}`}>Back to Server Dashboard</Link>
        </button>
      </header>
      <div className='rolemultipliers'>
        <h2>Role Multipliers</h2>
        <p>Role multipliers are used to calculate the amount of XP a user receives when they send a message. The multiplier is the amount of XP a user will receive for each message they send. If a user has multiple roles, the highest multiplier will be used.</p>
        <Select
          options={roles}
          value={selectedRole}
          onChange={handleRoleChange}
          placeholder="Select a role"
        />
      </div>
    </div>
  );
}

export default Levels;
