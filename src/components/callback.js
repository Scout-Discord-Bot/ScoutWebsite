import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
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
      setTimeout(() => {
        const authTimeout = setTimeout(() => {
          console.log('Timeout');
          navigate('/');
        }, 20000); // 20 seconds

        axios.post('https://api.scoutbot.xyz/oauth/callback', {
          oauth2state: state,
          code: code
        }, {
          withCredentials: true
        })
          .then(response => {
            clearTimeout(authTimeout); // Clear the timeout if the request succeeds
            if (response.status === 200) {
              console.log('Authentication successful');
              navigate('/dashboard');
            }
          })
          .catch(error => {
            clearTimeout(authTimeout); // Clear the timeout in case of an error
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
      }, 2000); // 2 seconds
    }
  }, [navigate]);

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
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
            <p>You have been blacklisted from using all services owned by Scout.</p>
            <p>Your attempt to use our services has been logged.</p>
            <p>If you believe this is a mistake, or wish to appeal, please contact us at <a href="mailto:support@scoutbot.xyz">support@scoutbot.xyz</a>.</p>
            <div>
              <h3>Information</h3>
              <p>User ID: {userId}</p>
              <p>Reason: {reason}</p>
              <p>Timestamp: {timestamp}</p>
            </div>
            <button
              style={{
                backgroundColor: 'lightgray',
                borderRadius: '10px',
                transition: 'background-color 0.3s ease',
                padding: '5px',
              }}
              onMouseOver={(e) => e.target.style.backgroundColor = 'gray'}
              onMouseOut={(e) => e.target.style.backgroundColor = 'lightgray'}
              onClick={() => navigate('/')}
            >
              Return to Home
            </button>
          </content>
        </div>
      ) : (
        <div style={{
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
          }}>Logging in...</div>
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
      )}
    </div>
  );
}

export default Callback;
