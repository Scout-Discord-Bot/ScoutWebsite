import React from 'react';
import './dashboard.css';

const About = () => (
  <div>
    <nav className="navbar">
      <div className="navbar-brand">Scout</div>
      <ul className="navbar-nav">
        <li><a href="/">Home</a></li>
        <li><a href="/about-us">About Us</a></li>
        <li><a href="/invite">Invite</a></li>
        <li><a href="/support">Support Server</a></li>
      </ul>
      <a href="https://discord.com/api/oauth2/authorize?client_id=1157304018939424970&redirect_uri=https%3A%2F%2Fscoutbot.me%2Fapi%2Fauth%2Fdiscord%2Fredirect&response_type=code&scope=identify%20guilds%20email" class="loginbutton" role="button">Log In</a>
    </nav>
  </div>
);

export default Dashboard;