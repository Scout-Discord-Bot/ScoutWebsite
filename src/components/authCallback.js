// AuthCallback.js (Component for Callback Route)
import React, { useEffect } from 'react';
import axios from 'axios';

const AuthCallback = () => {
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get('code');

    // Exchange authorization code for access token
    axios.post('https://discord.com/api/oauth2/token', {
      client_id: process.env.CLIENT_ID,
      client_secret: process.env.CLIENT_SECRET,
      grant_type: 'authorization_code',
      code: code,
      redirect_uri: 'https://scoutbot.me/auth/callback'
    }).then(response => {
      const accessToken = response.data.access_token;
      // Store the access token securely (e.g., in local storage)
      localStorage.setItem('accessToken', accessToken);
      // Redirect to desired page
      window.location.href = '/dashboard';
    }).catch(error => {
      console.error('Error exchanging code for token:', error);
      // Handle error
    });
  }, []);

  return <div>Logging in...</div>;
};

export default AuthCallback;
