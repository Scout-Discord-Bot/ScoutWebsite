import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";

const Logout = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const handleLogout = () => {
            axios.post(
                "https://api.scoutbot.xyz/oauth/logout", 
                { dataKey: Cookies.get("dataKey") }, 
                { headers: { Authorization: `Bearer ${Cookies.get("token")}` } }
            )
            .then(() => {
                Cookies.remove("token");
                Cookies.remove("dataKey");
                navigate("/");
            })
            .catch((error) => {
                console.error("Logout failed:", error);
                navigate("/");
            });
        };
    
        handleLogout();
    }, [navigate]);

    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
            backgroundColor: 'white'
        }}>
            <div style={{
                border: '16px solid #f3f3f3',
                borderRadius: '50%',
                borderTop: '16px solid #69dc9e',
                width: '120px',
                height: '120px',
                animation: 'spin 2s linear infinite'
            }} />
            <style>{`
              @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
              }
            `}</style>
        </div>
    );
}
export default Logout;
