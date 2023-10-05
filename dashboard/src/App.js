import React from 'react';
import './App.css';

function App() {
  return (
    <div className="App">
      <nav className="navbar">
        <div className="navbar-brand">Scout</div>
        <ul className="navbar-nav">
          <li><a href="/">Home</a></li>
          <li><a href="/about-us">About Us</a></li>
          <li><a href="/invite">Invite</a></li>
          <li><a href="/support">Support Server</a></li>
        </ul>
        <button class="dashboard-button">Dashboard</button>
      </nav>

      <div className="splashtext">
        <h2 className='splashtexttop'>Introducing the next Discord Moderation and Utility Bot...</h2>
        <h1>Scout</h1>
        <h2 className='motto'>"Guiding Your Server's Journey with Precision and Care"</h2>

      </div>
      <div className="features">
      </div>
    </div>

  );
}

export default App;
