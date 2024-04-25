import Navigation from '../../../components/navigation';
import { useParams, Link } from 'react-router-dom';
import './server_settings.css';
import axios from 'axios';
import { useEffect, useState } from 'react';
import Notification from '../../../components/notification';

const DEFAULT_COLORS = {
  default: '#69dc9e',
  success: '#bcf7cb',
  error: '#f6786a',
  warning: '#f8c57c',
};


function ServerSettings() {
  const { guildId } = useParams();
  const [guild, setGuild] = useState(null);

  const [defaultColor, setDefaultColor] = useState('#000000');
  const [successColor, setSuccessColor] = useState('#00FF00');
  const [errorColor, setErrorColor] = useState('#FF0000');
  const [warningColor, setWarningColor] = useState('#FFFF00');

  const [hasChanges, setHasChanges] = useState(false);

  const [notificationData, setNotificationData] = useState([]);

  const resetColors = () => {
    setDefaultColor(DEFAULT_COLORS.default);
    setSuccessColor(DEFAULT_COLORS.success);
    setErrorColor(DEFAULT_COLORS.error);
    setWarningColor(DEFAULT_COLORS.warning);
    setHasChanges(true);
  };

  

  const clearNotification = (index) => {
    setNotificationData(notificationData.filter((_, i) => i !== index));
  };

  const handleColorChange = (setColor, newColor) => {
    setColor(newColor);
    setHasChanges(true);
  };

  const saveChanges = () => {
    axios.post('https://api.scoutbot.xyz/guildsettings', { guildId: guildId, colours: { default: defaultColor, success: successColor, error: errorColor, warning: warningColor } }, { withCredentials: true })
      .then(response => {
        console.log('Changes saved!');
        // Clear any previous error notifications
        setNotificationData(notificationData.filter(notif => notif.type !== 'error'));
      })
      .catch(error => {
        console.error('Error saving changes:', error);
        // Add a new error notification
        setNotificationData([...notificationData, { type: 'error', text: 'There was an error saving changes' }]);
      });

    setHasChanges(false);
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
        const colors = response.data.serverSettings.colours;
        setDefaultColor(colors.default);
        setSuccessColor(colors.success);
        setErrorColor(colors.error);
        setWarningColor(colors.warning);
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
        <h2>Bot Colours</h2>
        <div>
          <div>
            <h3>Default</h3>
            <input type="color" value={defaultColor} onChange={(e) => handleColorChange(setDefaultColor, e.target.value)} />
          </div>
          <div>
            <h3>Success</h3>
            <input type="color" value={successColor} onChange={(e) => handleColorChange(setSuccessColor, e.target.value)} />
          </div>
          <div>
            <h3>Error</h3>
            <input type="color" value={errorColor} onChange={(e) => handleColorChange(setErrorColor, e.target.value)} />
          </div>
          <div>
            <h3>Warning</h3>
            <input type="color" value={warningColor} onChange={(e) => handleColorChange(setWarningColor, e.target.value)} />
          </div>
        </div>

        <button className={`button ${hasChanges ? 'has-changes' : 'no-changes'}`} disabled={!hasChanges} onClick={saveChanges}>Save Changes</button>
        <button className="reset" onClick={resetColors}>Reset Colors</button>
      </section>

      <div className="notification-container">
        {notificationData.map((notif, index) =>
          <Notification key={index} type={notif.type} text={notif.text} clearNotification={() => clearNotification(index)} />
        )}
      </div>

    </div>
  );
}

export default ServerSettings;