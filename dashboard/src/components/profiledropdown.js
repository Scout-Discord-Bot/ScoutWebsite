// ProfileDropdown.js
import React from 'react';
import './profiledropdown.css';

const ProfileDropdown = ({ userData, onLogout }) => {
    return (
        <div className="profile-dropdown">
            <img src={userData.profilePicture} alt={`${userData.username}'s avatar`} />
            <span>{userData.username}</span>
            {/* Add more user info and links as needed */}
            <button onClick={onLogout}>Logout</button>
        </div>
    );
};

export default ProfileDropdown;
