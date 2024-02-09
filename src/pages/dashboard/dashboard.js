// Dashboard.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Dashboard = () => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    // Fetch user data from Discord's API using the stored access token
    const accessToken = localStorage.getItem('accessToken');
    axios.get('https://discord.com/api/users/@me', {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    }).then(response => {
      setUserData(response.data);
    }).catch(error => {
      console.error('Error fetching user data:', error);
      // Handle error
    });
  }, []);

  return (
    <div>
      <h1>Welcome to Your Dashboard!</h1>
      {userData && (
        <div>
          <img src={userData.avatar} alt="User Avatar" />
          <h2>{userData.username}</h2>
          <p>Discriminator: {userData.discriminator}</p>
          <p>ID: {userData.id}</p>
          {/* Add more user information as needed */}
        </div>
      )}
      {/* Add other dashboard content here */}
    </div>
  );
};

export default Dashboard;
