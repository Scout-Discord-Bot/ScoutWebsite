import React from 'react';
import './dashboard/dashboard.css';

const Dashboard = (//props
) => {
    
        <div>
            <nav className="navbar">
                <div className="navbar-brand">Scout</div>
                <ul className="navbar-nav">
                    <li><a href="/">Home</a></li>
                    <li><a href="/about">About Us</a></li>
                    <li><a href="/invite">Invite</a></li>
                    <li><a href="/support">Support Server</a></li>
                </ul>
                <h4 class='loggedinuser'>Logged in as USER</h4>
            </nav>
        </div>
     
};

export default Dashboard;