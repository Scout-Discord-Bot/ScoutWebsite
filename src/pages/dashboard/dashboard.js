import React, { useEffect, useState } from 'react';
import './dashboard.css';
import axios from 'axios';
import Navigation from '../../components/navigation';
import Cookies from 'js-cookie';

const Dashboard = (props) => {
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        const dataKey = Cookies.get('dataKey');

        axios.get('https://api.scoutbot.xyz/userdata', {
            withCredentials: true,
        })
            .then(response => {
                setUserData(response.data); // Store the response data in your state variable

                // Make an additional API request with the guild IDs
                const guildIds = response.data.guilds.map(guild => guild.id);
                return axios.get('https://api.scoutbot.xyz/bot/guilds', {
                    withCredentials: true,
                    params: { 'guildIds': guildIds }
                });
            })
            .then(response => {

                // Add an isBotInGuild property to each guild
                setUserData(prevUserData => {
                    const guildsWithBotStatus = prevUserData.guilds.map(guild => ({
                        ...guild,
                        isBotInGuild: response.data[guild.id] || false
                    }));
                    return { ...prevUserData, guilds: guildsWithBotStatus };
                });
            })
            .catch(error => console.error('Error:', error));
    }, []);

    const ServerCard = ({ guild }) => {
        return (
            <div className="server-card">
                <img src={guild.icon ? `https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}.png` : '/images/default-server-icon.png'} alt="Server Icon" className="server-icon" />
                <div className="server-info">
                    <h3>{guild.name}</h3>
                    <p>{guild.owner ? 'Owner' : (guild.permissions & 0x8) === 0x8 || (guild.permissions & 0x20) === 0x20 ? 'Bot Administrator' : ''}</p>
                </div>

                <a className='serverButton' href={guild.isBotInGuild ? `/dashboard/${guild.id}` : `https://discord.com/oauth2/authorize?client_id=1157304018939424970&permissions=8&response_type=code&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Foauth%2Fcallback&scope=identify+email+guilds+bot&guild_id=${guild.id}`} rel="noopener noreferrer">
                    {guild.isBotInGuild ? 'Configure' : 'Invite'}
                </a>

            </div>
        );
    };

    return (
        <div id='dash'>
            <Navigation></Navigation>

            <header>
                <h2>Hey There, {userData && userData.userData ? userData.userData.global_name : 'Loading'}!</h2>
                <h1>Select a Server</h1>
            </header>


            {userData && userData.userData && (
                userData.guilds.length > 0 ? (
                    <div className="server-cards-container">
                        {userData.guilds
                            .filter(guild => guild.owner || (guild.permissions & 0x8) === 0x8 || (guild.permissions & 0x20) === 0x20)
                            .sort((a, b) => b.isBotInGuild - a.isBotInGuild) // Sort the servers
                            .map((guild, index) => (
                                <ServerCard key={index} guild={guild} />
                            ))}
                    </div>
                ) : (
                    <p>No servers found.</p>
                )
            )}

        </div>
    );
};

export default Dashboard;