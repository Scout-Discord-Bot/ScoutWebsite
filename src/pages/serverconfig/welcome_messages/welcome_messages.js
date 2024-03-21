import Navigation from '../../../components/navigation';
import { useParams, Link } from 'react-router-dom';
import './welcome_messages.css';
import Cookies from 'js-cookie';
import axios from 'axios';
import { useEffect, useState, useRef } from 'react';



function WelcomeMessages() {
    const { guildId } = useParams();
    const [guild, setGuild] = useState(null);
    const [messageType, setMessageType] = useState('text');
    const [messageContent, setMessageContent] = useState('');

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [thumbnail, setThumbnail] = useState('');
    const [url, setUrl] = useState('');
    const [color, setColor] = useState('#ffffff');

    const colorInputRef = useRef();

    const handleButtonClick = () => {
        colorInputRef.current.click();
    };

    useEffect(() => {
        const dataKey = Cookies.get('dataKey'); // Get dataKey from cookies

        if (dataKey) {
            axios.get('https://api.scoutbot.xyz/userdata', {
                headers: { Authorization: `Bearer ${Cookies.get('token')}` },
                params: { dataKey: dataKey }
            })
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

    return (
        <div id='welcomeMessages'>
            <Navigation />

            <header>

                <h1>Welcome Messages Configuration</h1>
                <p>Server Configuration for {guild} ({guildId})</p>
                <button className='backButton'><Link to={`/dashboard/${guildId}`}>Back to Server Dashboard</Link></button>
            </header>

            <div id='welcomeMessages' className='content'>
                <div className="tab-container">
                    <div className="tab">
                        <input type="radio" id="text" value="text" checked={messageType === 'text'} onChange={() => setMessageType('text')} />
                        <label htmlFor="text">Text</label>
                    </div>
                    <div className="tab">
                        <input type="radio" id="embed" value="embed" checked={messageType === 'embed'} onChange={() => setMessageType('embed')} />
                        <label htmlFor="embed">Embed</label>
                    </div>
                </div>

                {messageType === 'text' && (
                    <textarea className='textInput' value={messageContent} onChange={e => setMessageContent(e.target.value)} />
                )}

                {messageType === 'embed' && (
                    <div>
                        <label>
                            Title:
                            <input className="input-field" type="text" value={title} onChange={e => setTitle(e.target.value)} />
                        </label>
                        <label>
                            Description:
                            <textarea className="input-field" value={description} onChange={e => setDescription(e.target.value)} />
                        </label>
                        <label>
                            Thumbnail:
                            <select className="select-field" value={thumbnail} onChange={e => setThumbnail(e.target.value)}>
                                <option value="none">None</option>
                                <option value="profilePicture">Profile Picture</option>
                                <option value="serverIcon">Server Icon</option>
                                <option value="url">URL</option>
                            </select>
                        </label>
                        {thumbnail === 'url' && (
                            <label>
                                URL:
                                <input className="input-field" type="text" value={url} onChange={e => setUrl(e.target.value)} />
                            </label>
                        )}
                        <label style={{ display: 'flex', alignItems: 'center', marginTop: '10px' }}>
                            <button className="colourSelectorButton" type="button" onClick={handleButtonClick} style={{ margin: '0 10px' }}>Choose Color</button>
                            <div style={{ borderRadius: '5px', backgroundColor: color, width: '20px', height: '20px', border: '1px solid black' }}></div>
                            <input
                                ref={colorInputRef}
                                className="input-field"
                                type="color"
                                value={color}
                                onChange={e => setColor(e.target.value)}
                                style={{ display: 'none' }}
                            />
                        </label>
                    </div>
                )}
            </div>

        </div>
    );
}

export default WelcomeMessages;