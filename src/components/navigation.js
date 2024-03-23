import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import './navigation.css';

function Navigation() {
  const [userData, setUserData] = useState(null);
  const [authUrl, setAuthUrl] = useState('');



  useEffect(() => {
    const toggle = document.querySelector('.navbar-toggle');
    const nav = document.querySelector('.navbar-nav');

    if (toggle && nav) {
      toggle.addEventListener('click', function () {
        nav.classList.toggle('open');
      });
    }

    const dataKey = Cookies.get('dataKey');
    if (dataKey) {
      axios.get(`https://api.scoutbot.xyz/userdata`, {
        params: { dataKey: dataKey }
  
      }).then(response => {
        if (response.status === 404) {
          // The token has expired or is invalid
          // Redirect the user to the login page, or show a message asking them to log in again
          window.location.href = '/login'; // Redirect to login page
        } else {
          setUserData(response.data);
        }
      })
        .catch(error => {
          console.error('Error fetching user data', error);
        });
    }
  }, []);


  useEffect(() => {
    axios.get('https://api.scoutbot.xyz/oauth/authorize', { withCredentials: true })
      .then(response => {
        const url = new URL(response.data.authUrl);
        const params = new URLSearchParams(url.search);
        const state = params.get('state');
  
        setAuthUrl(response.data.authUrl);
      })
      .catch(error => {
        console.error('Authorization error:', error);
      });
  }, []); // Empty dependency array to run the hook only once


  return (
    <nav className="navbar">
      <div className="navbar-brand">Scout</div>
      <div className="navbar-toggle">
        <span>&#9776;</span>
      </div>
      <ul className={`navbar-nav`}>
        <li><a href="/">Home</a></li>
        <li><a href="/support">Support</a></li>
        <li><a href="https://docs.scoutbot.xyz">Docs</a></li>
        <li><a href="/ourteam">Our Team</a></li>
      </ul>
      {userData ? (
        <div className="user-profile">
          <img src={`https://cdn.discordapp.com/avatars/${userData.userData.id}/${userData.userData.avatar}.png`} alt="User Avatar" className="user-avatar" onClick={(e) => {
            const dropdownContent = e.target.nextElementSibling;
            dropdownContent.classList.toggle('show');
          }} />
          <div className="dropdown-content">
            <a href="/dashboard">Dashboard</a>
            <a href="/account">Account Settings</a>
            <a href="/signout">Sign Out</a>
          </div>
        </div>
      ) : (
        <a href={authUrl} className="loginbutton" role="button">Sign In</a>)}
    </nav>
  );
};

export default Navigation;