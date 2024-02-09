// AuthButton.js (Component for Login Button)
import React from 'react';

const AuthButton = () => {
  const handleLogin = () => {
    window.location.href = `https://discord.com/api/oauth2/authorize?client_id=1157304018939424970&response_type=code&redirect_uri=https%3A%2F%2Fscoutbot.me%2Fauth%2Fcallback&scope=identify+guilds+email`;
  };

  return (
    <button onClick={handleLogin}>Login with Discord</button>
  );
};

export default AuthButton;
