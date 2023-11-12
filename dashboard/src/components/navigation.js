// Navigation.js
import React from 'react';
import { Link } from 'react-router-dom';
import ProfileDropdown from './profiledropdown'; // Your profile info dropdown component

const Navigation = ({ isAuthenticated, userData, onLogout }) => (

    <nav className="navbar">
        <div className="navbar-brand">Scout</div>
        <ul className="navbar-nav">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/invite">Invite</Link></li>
            <li><a href="https://discord.gg/invite/BwD7MgVMuq">Support Server</a></li>
        </ul>
        {isAuthenticated ? (
            <ProfileDropdown userData={userData} onLogout={onLogout} />
        ) : (
            <a href="https://discord.com/api/oauth2/authorize?client_id=1157304018939424970&redirect_uri=https%3A%2F%2Fapi.scoutbot.me%2Fapi%2Fauth%2Fdiscord%2Fredirect&response_type=code&scope=identify%20guilds%20email" className="loginbutton" role="button">Log In</a>
        )}
    </nav>
);

export default Navigation;
