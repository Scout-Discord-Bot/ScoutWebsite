import Navigation from '../../../components/navigation';
import { useParams, Link } from 'react-router-dom';
import './server_settings.css';
import axios from 'axios';
import { useEffect, useState } from 'react';
import Notification from '../../../components/notification';
import Select from 'react-select';
import { getTimezones } from 'timezone-list';
import { Helmet } from 'react-helmet';


const timezoneOptions = getTimezones().map(tz => ({ value: tz, label: tz }));

const sortedTimezoneOptions = timezoneOptions.sort((a, b) => (a.label < b.label ? -1 : 1));

const DEFAULT_COLORS = {
  default: '#69dc9e',
  success: '#bcf7cb',
  error: '#f6786a',
  warning: '#f8c57c',
};

function ServerSettings() {
  const { guildId } = useParams();
  const [guild, setGuild] = useState(null);
  const [selectedTimezone, setSelectedTimezone] = useState(null);
  const [defaultColor, setDefaultColor] = useState(DEFAULT_COLORS.default);
  const [successColor, setSuccessColor] = useState(DEFAULT_COLORS.success);
  const [errorColor, setErrorColor] = useState(DEFAULT_COLORS.error);
  const [warningColor, setWarningColor] = useState(DEFAULT_COLORS.warning);
  const [hasChanges, setHasChanges] = useState(false);
  const [notificationData, setNotificationData] = useState([]);

  const resetColors = () => {
    setDefaultColor(DEFAULT_COLORS.default);
    setSuccessColor(DEFAULT_COLORS.success);
    setErrorColor(DEFAULT_COLORS.error);
    setWarningColor(DEFAULT_COLORS.warning);
    setHasChanges(true);
  };

  const addNotification = (type, text) => {
    setNotificationData(oldArray => [...oldArray, { type, text }]);
  };

  const clearNotification = (index) => {
    setNotificationData(notificationData.filter((_, i) => i !== index));
  };

  const handleColorChange = (setColor, newColor) => {
    setColor(newColor);
    setHasChanges(true);
  };

  const saveChanges = () => {
    axios.post(
      'https://api.scoutbot.xyz/guildsettings/serversettings/update',
      {
        guildId: guildId,
        setting: 'colours',
        value: {
          default: defaultColor,
          success: successColor,
          error: errorColor,
          warning: warningColor
        }
      },
      { withCredentials: true }
    )
      .then(response => {
        console.log('Changes saved!');

        addNotification('success', 'Bot colour changes saved successfully.');
      })
      .catch(error => {
        console.error('Error saving changes:', error);
        addNotification('error', 'There was an error saving changes to the bot colours.');
        setNotificationData([...notificationData, { type: 'error', text: 'There was an error saving changes' }]);
      });

    setHasChanges(false);
  };

  const saveTimezone = (selectedTimezone) => {
    axios.post(
      'https://api.scoutbot.xyz/guildsettings/serversettings/update',
      {
        guildId: guildId,
        setting: 'timezone',
        value: selectedTimezone.value // Send the selected timezone as the value
      },
      { withCredentials: true }
    )
      .then(response => {
        console.log('Timezone changes saved!');
        addNotification('success', 'Timezone changes saved successfully.');
        setNotificationData(notificationData.filter(notif => notif.type !== 'error'));
      })
      .catch(error => {
        console.error('Error saving timezone changes:', error);
        addNotification('error', 'There was an error saving timezone changes.');
        setNotificationData([...notificationData, { type: 'error', text: 'There was an error saving timezone changes' }]);
      });
  };

  useEffect(() => {
    axios.get(`https://api.scoutbot.xyz/userdata`, { withCredentials: true })
      .then(response => {
        const guilds = response.data.guilds;
        const guild = guilds.find(g => g.id === guildId);

        if (guild) {
          setGuild(guild.name);
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

        const timezone = response.data.serverSettings.timezone;
        setSelectedTimezone(timezoneOptions.find(tz => tz.value === timezone));
      })
      .catch(error => {
        console.error('Error fetching colors:', error);
      });
  }, [guildId]);

  return (
    <div id='serverSettings'>
      <Helmet>
        <title>Scout | Server Config - Server Settings</title>
      </Helmet>
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
        <button className="reset" onClick={resetColors}>Reset Colours</button>
      </section>
      <section>
        <h2>Server Timezone</h2>
        <h3>Select your timezone</h3>
        <Select
          value={selectedTimezone}
          onChange={(selectedOption) => {
            setSelectedTimezone(selectedOption);
            saveTimezone(selectedOption);
          }}
          options={sortedTimezoneOptions}
          menuPortalTarget={document.body}
          isSearchable={true}
          styles={{
            input: (provided) => ({
              ...provided,
              textAlign: 'left',
            }),
            placeholder: (provided) => ({
              ...provided,
              position: 'absolute',
              left: '5px',
            }),
            singleValue: (provided) => ({
              ...provided,
              position: 'absolute',
              left: '5px',
            }),
          }}
        />
      </section>
      <section>
        <h2>Nickname</h2>
        <h3>Set the bot's nickname in your server.</h3>
        <input
          className='nickname'
          type="text"
          placeholder="Nickname"
        />
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
