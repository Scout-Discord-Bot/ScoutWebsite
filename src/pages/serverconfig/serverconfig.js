import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import Navigation from '../../components/navigation';
import './serverconfig.css';
import Notification from '../../components/notification';
import Cookies from 'js-cookie';

function ServerConfig() {
    const { guildId } = useParams();
    const [toggleState, setToggleState] = useState({});
    const [notificationData, setNotification] = useState([]);
    const [guild, setGuild] = useState(null); // New state variable for the guild

    const clearNotification = (index) => {
        setNotification(oldArray => oldArray.filter((_, i) => i !== index));
    };

    const addNotification = (newNotification) => {
        setNotification(oldArray => [...oldArray, newNotification]);
    };

    useEffect(() => {
        const dataKey = Cookies.get('dataKey'); // Get dataKey from cookies

        if (dataKey) {
            axios.get(`https://api.scoutbot.xyz/userdata`, { headers: { Authorization: `Bearer ${Cookies.get('token')}` }, params: { dataKey: dataKey } })
                .then(response => {
                    const guilds = response.data.guilds;
                    const guild = guilds.find(g => g.id === guildId); // Find the guild with the matching guildId

                    if (guild) {
                        setGuild(guild.name); // Set the guild's name to state
                    } else {
                        console.error('Guild not found!');
                    }
                })
                .catch(error => {
                    console.error('There was an error retrieving the data!', error);
                });
        }
    }, [guildId]);


    useEffect(() => {
        axios.get('https://api.scoutbot.xyz/guildsettings', { headers: { Authorization: `Bearer ${Cookies.get('token')}` }, params: { guildId: guildId } })
            .then(response => {
                const modules = response.data.modules;
                setToggleState({
                    welcomeMessages: modules.welcomeMessages?.enabled,
                    leaveMessages: modules.leaveMessages?.enabled,
                    moderation: modules.moderation,
                    fun: modules.fun,
                    utility: modules.utility,
                    levels: modules.levels?.enabled,
                    logging: modules.logging?.enabled
                });
            })
            .catch(error => {
                console.error('There was an error retrieving the data!', error);
            });
    }, [guildId]);


    const getDisplayName = (module) => {
        switch (module) {
            case 'welcomeMessages':
                return 'Welcome Messages';
            case 'leaveMessages':
                return 'Leave Messages';
            case 'moderation':
                return 'Moderation';
            case 'fun':
                return 'Fun';
            case 'utility':
                return 'Utility';
            case 'levels':
                return 'Levels';
            case 'logging':
                return 'Logging';
            // Add more cases as needed
            default:
                return module.replace('_', ' ');
        }
    };


    const handleToggle = (module) => {
        setToggleState(prevState => {
            const newState = { ...prevState, [module]: !prevState[module] };

            if (newState[module]) {
                // Logic for when the switch is toggled to true
                axios.post(
                    `https://api.scoutbot.xyz/guildsettings/update`,
                    {
                        guildId: guildId,
                        module: module,
                        enabled: newState[module]
                    },
                    {
                        headers: {
                            Authorization: `Bearer ${Cookies.get('token')}`
                        }
                    }
                )
                    .then(response => {
                        addNotification({ type: 'success', text: `${getDisplayName(module)} has been Enabled!` });
                        console.log(response.data);
                    })
                    .catch(error => {
                        console.error('There was an error updating the module!', error);
                        addNotification({ type: 'error', text: `There was an error updating the module!` });
                    });
            } else {
                // Logic for when the switch is toggled to false
                axios.post(
                    `https://api.scoutbot.xyz/guildsettings/update`,
                    {
                        guildId: guildId,
                        module: module,
                        enabled: newState[module]
                    },
                    {
                        headers: {
                            Authorization: `Bearer ${Cookies.get('token')}`
                        }
                    }
                )
                    .then(response => {
                        addNotification({ type: 'success', text: `${getDisplayName(module)} has been Disabled!` });
                    })
                    .catch(error => {
                        addNotification({ type: 'error', text: `There was an error updating the module!` });
                        console.error('There was an error updating the module!', error);
                    });
            }

            return newState;
        });
    };

    const ModuleCard = ({ module, description, enabled }) => {
        return (
            <div className="dashboard-home-card">
                <h2>{getDisplayName(module)}</h2>
                <p>{description}</p>
                <label className={`switch switch-${module}`} htmlFor={module}>
                    <input type="checkbox" id={module} checked={enabled} onChange={() => handleToggle(module)} />
                    <span className="slider round"></span>
                </label>
                {enabled && (
                    <div>
                        <a href={`/dashboard/${guildId}/${module}`}>
                            <button className="button">Configure Module</button>
                        </a>
                    </div>
                )}
            </div>
        );
    };


    const ServerSettingsCard = () => {
        return (
            <Link to="server_settings" className="dashboard-home-card">
                <h2>Server Settings</h2>
                <p>Configure your server settings here.</p>
                <button className="button">Configure Server Settings</button>
            </Link>
        );
    };

    return (
        <div id='config'>
            <Navigation></Navigation>
            <header>
                <h1>Server Dashboard</h1>
                <p>Server Configuration for {guild} ({guildId})</p>
            </header>


            <div className='content'>
                <h1>Modules</h1>
                <div className="dashboard-home-grid">
                    <ServerSettingsCard />
                    <ModuleCard
                        module="welcomeMessages"
                        description="This is the message that is sent when a user joins the server."
                        enabled={toggleState.welcomeMessages}
                    />

                    <ModuleCard
                        module="leaveMessages"
                        description="This is the message that is sent when a user leaves the server."
                        enabled={toggleState.leaveMessages}
                    />

                    <ModuleCard
                        module="moderation"
                        description="This module handles various moderation actions within the server."
                        enabled={toggleState.moderation}
                    />

                    <ModuleCard
                        module="fun"
                        description="This module provides various fun commands and features."
                        enabled={toggleState.fun}
                    />

                    <ModuleCard
                        module="utility"
                        description="This module provides utility commands for server management."
                        enabled={toggleState.utility}
                    />

                    <ModuleCard
                        module="levels"
                        description="This module tracks user activity and assigns levels."
                        enabled={toggleState.levels}
                    />

                    <ModuleCard
                        module="logging"
                        description="This module logs various events and actions within the server."
                        enabled={toggleState.logging}
                    />

                </div>
                <div className="notification-container">
                    {notificationData.map((notif, index) =>
                        <Notification key={index} type={notif.type} text={notif.text} clearNotification={() => clearNotification(index)} />
                    )}
                </div>
            </div>
        </div>

    );
}

export default ServerConfig;