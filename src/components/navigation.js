import './navigation.css';
import './navigationjs.js';




function Navigation() {

  
  return (
    <nav className="navbar">
      <div className="navbar-brand">Scout</div>
      <div className="navbar-toggle">
        <span>&#9776;</span>
      </div>
      <ul className={`navbar-nav`}>
        <li><a href="/">Home</a></li>
        <li><a href="/support">Support Server</a></li>
        <li><a href="/docs">Documentation</a></li>
      </ul>
      <a href="/support" className="loginbutton" role="button">Discord Server</a>
    </nav>
  );
};

//<li><a href="/about">About Us</a></li>
//<li><a href="/invite">Invite</a></li>
export default Navigation;