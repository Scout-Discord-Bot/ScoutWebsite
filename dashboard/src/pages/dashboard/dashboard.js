import './dashboard.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
    const [userData, setUserData] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('https://api.scoutbot.me/api/user-data', { withCredentials: true })
            .then(response => {
                setUserData(response.data.user);
            })
            .catch(error => {
                console.error('Error fetching user data:', error);
                navigate('/login');
            });
    }, [navigate]);
    
    if (!userData) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <nav className="navbar">
                <div className="navbar-brand">Scout</div>
                <ul className="navbar-nav">
                    <li><a href="/">Home</a></li>
                    <li><a href="/about">About Us</a></li>
                    <li><a href="/invite">Invite</a></li>
                    <li><a href="/support">Support Server</a></li>
                </ul>
                <h4 className='loggedinuser'>Logged in as {userData.username}</h4>
            </nav>
        </div>
    );
};

export default Dashboard;
