import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
//import Cookies from 'js-cookie';

const Callback = () => {
  const navigate = useNavigate();

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
          if (error.response && error.response.status === 400) {
            console.error('Invalid code');
            navigate('/');
          }
          console.error('Authentication error:', error);
        });
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
  );
}
export default Callback;