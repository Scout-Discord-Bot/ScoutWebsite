import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
//import Cookies from 'js-cookie';
import { Helmet } from 'react-helmet';

const Callback = () => {
  const [userId, setUserId] = useState('');
  const [reason, setReason] = useState('');
  const [timestamp, setTimestamp] = useState('');
  const navigate = useNavigate();
  const [isBlacklisted, setIsBlacklisted] = useState(false); // New state variable

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get('code');
    const state = params.get('state');

    console.log(state);


    if (code) {
      axios.post('https://api.scoutbot.xyz/oauth/callback', {
        oauth2state: state,
        code: code
      }, {
        withCredentials: true
      })
        .then(response => {
          if (response.status === 200) {
            console.log('Authentication successful');
            navigate('/dashboard');
          }

        })
        .catch(error => {
          if (error.response && error.response.status === 403 && error.response.data.message === "User attempting to authenticate is blacklisted") {
            // Redirect to the /blacklisted route
            setUserId(error.response.data.data.userid);
            setReason(error.response.data.data.reason);
            const timestampInSeconds = error.response.data.data.timestamp;
            const date = new Date(timestampInSeconds * 1000);
            const utcDate = date.toUTCString();
            setTimestamp(utcDate);
            setIsBlacklisted(true); // Set isBlacklisted to true
          } else {
            if (error.response && error.response.status === 400) {
              console.error('Invalid code');
              navigate('/');
            }
            console.error('Authentication error:', error);
          }
        });
    }
  }, [navigate]);

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'white'
    }}>
      <Helmet>
        <title>Scout | OAuth Callback</title>
      </Helmet>
      {isBlacklisted ? (
        // Content to show when the user is blacklisted
        <div>

          <content>
            <h1>Access Denied</h1>
            <p>You have been blacklisted from using all services offered by Scout.</p>
            <p>If you believe this is a mistake, please contact us at <a href="mailto:support@scoutbot.xyz">support@scoutbot.xyz</a></p>
            <div>
              <h3>Information</h3>
              <p>User ID: {userId}</p>
              <p>Reason: {reason}</p>
              <p>Timestamp: {timestamp}</p>
            </div>
          </content>
        </div>
      ) : (
        // Existing content
        <div style={{
          border: '16px solid #f3f3f3',
          borderRadius: '50%',
          borderTop: '16px solid #69dc9e',
          width: '120px',
          height: '120px',
          animation: 'spin 2s linear infinite'
        }} />
      )}
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
export default Callback;