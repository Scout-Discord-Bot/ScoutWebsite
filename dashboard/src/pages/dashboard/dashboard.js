import './dashboard.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Dashboard = () => {
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const token = urlParams.get('token');
        if (token) {
            axios.get('/api/user-data', {
                headers: { Authorization: `Bearer ${token}` }
            })
            .then(response => {
                setUserData(response.data.user);
                window.history.pushState({}, document.title, "/dashboard");
            })
            .catch(error => {
                console.error('Error fetching user data:', error);
                // Handle error
            });
        }
    }, []);

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
