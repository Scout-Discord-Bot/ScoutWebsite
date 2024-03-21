import React, { useEffect } from 'react';

const Login = () => {
  const handleLogin = () => {
    window.location.href = `https://discord.com/oauth2/authorize?client_id=1157304018939424970&response_type=code&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Foauth%2Fcallback&scope=identify+guilds+email`;
  };

  useEffect(() => {
    handleLogin();
  }, []);

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
};

export default Login;