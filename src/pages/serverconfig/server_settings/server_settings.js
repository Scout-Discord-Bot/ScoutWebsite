import React from 'react';

function ServerSettings() {
  return (
    <div>
      <h1>Server Settings</h1>
      <form>
        <label>
          Server Name:
          <input type="text" name="name" />
        </label>
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
}

export default ServerSettings;