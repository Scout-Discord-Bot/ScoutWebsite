import React from 'react';
import './App.css';

function App() {
  return (
    <div className="App">
      <nav className="navbar">
        <div className="navbar-brand">Scout</div>
        <ul className="navbar-nav">
          <li><a href="/">Home</a></li>
          <li><a href="/settings">Settings</a></li>
          <li><a href="/profile">Profile</a></li>
        </ul>
      </nav>
      {/* Add other components and content here */}
    </div>
  );
}

export default App;
