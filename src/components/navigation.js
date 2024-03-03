import './navigation.css';
//import './navigationjs.js';
import React, { useEffect } from 'react';

function Navigation() {
  useEffect(() => {
    const toggle = document.querySelector('.navbar-toggle');
    const nav = document.querySelector('.navbar-nav');
  
    if (toggle && nav) {
      toggle.addEventListener('click', function() {
        nav.classList.toggle('open');
      });
    }
  }, []);
  return(
    <nav className="navbar">
      <div className="navbar-brand">Scout</div>
      <div className="navbar-toggle">
        <span>&#9776;</span>
      </div>
      <ul className={`navbar-nav`}>
        <li><a href="/">Home</a></li>
        <li><a href="/support">Support</a></li>
        <li><a href="/docs">Documentation</a></li>
      </ul>
      <a href="https://discord.gg/BwD7MgVMuq" className="loginbutton" role="button">Discord Server</a>
    </nav>
  );
};

//<li><a href="/about">About Us</a></li>
//<li><a href="/invite">Invite</a></li>
export default Navigation;