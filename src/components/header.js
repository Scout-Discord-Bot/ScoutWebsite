// Header.js
import React, { useState, useEffect } from 'react';
import Navigation from './navigation'; // Assuming this is the path to your Navigation component

const Header = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        // Insert your authentication check logic here
        // For example, check for a token and set isAuthenticated to true if present
    }, []);

    return (
        <Navigation 
            isAuthenticated={isAuthenticated} 
            userData={userData} 
            onLogout={() => setIsAuthenticated(false)} // Placeholder for your logout function
        />
    );
};

export default Header;
