import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
//import Cookies from "js-cookie";
import axios from "axios";

const Logout = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const handleLogout = () => {
            axios.post(
                "https://api.scoutbot.xyz/oauth/logout",
                {}, // Data object, which is empty in this case
                { withCredentials: true } // Axios config options
            )
                .then(() => {
                    navigate("/");
                })
                .catch((error) => {
                    console.error("Logout failed:", error);
                    // Don't navigate to "/" here
                });
        };
    
        // Wait for 2 seconds before calling handleLogout
        setTimeout(handleLogout, 2000);
    }, [navigate]);

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
        }}>
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                position: 'relative',
                width: '120px',
                height: '120px',
            }}>
                <div style={{
                    position: 'absolute',
                    border: '8px solid transparent',
                    borderTop: '8px solid #69dc9e',
                    borderRadius: '50%',
                    width: '120px',
                    height: '120px',
                    animation: 'spin 2s linear infinite',
                }}></div>
                <div style={{
                    position: 'absolute',
                    border: '8px solid transparent',
                    borderTop: '8px solid #f3f3f3',
                    borderRadius: '50%',
                    width: '90px',
                    height: '90px',
                    animation: 'spin 1.5s linear infinite reverse',
                }}></div>
                <div style={{
                    position: 'absolute',
                    border: '8px solid transparent',
                    borderTop: '8px solid #69dc9e',
                    borderRadius: '50%',
                    width: '60px',
                    height: '60px',
                    animation: 'spin 1s linear infinite',
                }}></div>
            </div>
            <div style={{
                marginTop: '20px',
                fontSize: '24px',
                fontWeight: 'bold',
                color: '#69dc9e',
                animation: 'fade 1.5s ease-in-out infinite',
            }}>Logging out...</div>
            <style>{`
              @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
              }
              @keyframes fade {
                0%, 100% { opacity: 1; }
                50% { opacity: 0.5; }
              }
            `}</style>
        </div>

    );
}
export default Logout;
