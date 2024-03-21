import React, { useState, useEffect } from 'react';
import './notification.css';

function Notification({ type, text, clearNotification }) {

    

    if (!['warning', 'error', 'success'].includes(type)) {
        throw new Error('Invalid type prop in Notification component');
    }
    const [show, setShow] = useState(true);


    const handleClose = () => {
        setShow(false);
        clearNotification(); // Call clearNotification when the notification is dismissed
    };
    // Add this useEffect hook
    useEffect(() => {
        setShow(true);
    }, [type, text]);

    const iconPaths = {
        error: '/images/notifIcons/errorImage.png',
        warning: '/images/notifIcons/warningImage.png',
        success: '/images/notifIcons/successImage.png'
    };

    const iconSrc = iconPaths[type];

    if (!show) {
        return null;
    }

    return (
        <div className={`notification ${type}`}>
            <img className="icon" src={iconSrc} alt="Notification Icon" />
            <p className='notifText'>{text}</p>
            <button className="close-button" onClick={handleClose}>X</button>
        </div>
    );
}

export default Notification;