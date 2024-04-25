import Navigation from '../../../components/navigation';
import { useParams, Link } from 'react-router-dom';
import './server_settings.css';
import axios from 'axios';
import { useEffect, useState } from 'react';



function ServerSettings() {
  const { guildId } = useParams();
  const [guild, setGuild] = useState(null);

  const [defaultColor, setDefaultColor] = useState('#000000');
  const [successColor, setSuccessColor] = useState('#00FF00');
  const [errorColor, setErrorColor] = useState('#FF0000');
  const [warningColor, setWarningColor] = useState('#FFFF00');

  const handleDefaultColorChange = (newColor) => {
    setDefaultColor(newColor);
  };

  const handleSuccessColorChange = (newColor) => {
    setSuccessColor(newColor);
  };

  const handleErrorColorChange = (newColor) => {
    setErrorColor(newColor);
  };

  const handleWarningColorChange = (newColor) => {
    setWarningColor(newColor);
  };

  useEffect(() => {

    axios.get(`https://api.scoutbot.xyz/userdata`, { withCredentials: true })
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
  }, [guildId]);

  useEffect(() => {
    axios.get('https://api.scoutbot.xyz/guildsettings', { withCredentials: true, params: { guildId: guildId } })
      .then(response => {
        const colors = response.data;
        if (colors.length >= 4) {
          setDefaultColor(colors[0]);
          setSuccessColor(colors[1]);
          setErrorColor(colors[2]);
          setWarningColor(colors[3]);
        }
      })
      .catch(error => {
        console.error('Error fetching colors:', error);
      });
  }, [guildId]);


  return (
    <div id='serverSettings'>
      <Navigation />

      <header>

        <h1>Server Settings</h1>
        <p>Server Configuration for {guild} ({guildId})</p>
        <button className='backButton'><Link to={`/dashboard/${guildId}`}>Back to Server Dashboard</Link></button>
      </header>

      <section>
        <h2>Default Colours</h2>
        <div>
          <h3>Default</h3>
          <input type="color" value={defaultColor} onChange={(e) => handleDefaultColorChange(e.target.value)} />
        </div>
        <div>
          <h3>Success</h3>
          <input type="color" value={successColor} onChange={(e) => handleSuccessColorChange(e.target.value)} />
        </div>
        <div>
          <h3>Error</h3>
          <input type="color" value={errorColor} onChange={(e) => handleErrorColorChange(e.target.value)} />
        </div>
        <div>
          <h3>Warning</h3>
          <input type="color" value={warningColor} onChange={(e) => handleWarningColorChange(e.target.value)} />
        </div>
      </section>

    </div>
  );
}

export default ServerSettings;