// Moderation.js
import React from 'react';
import { Helmet } from 'react-helmet';

function Moderation() {
  return (
    <div>
      <Helmet>
        <title>Scout | Server Config - Moderation</title>
      </Helmet>
      <h1>Moderation</h1>
      <form>
        <label>
          Moderation Setting:
          <input type="text" name="moderationSetting" />
        </label>
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
}

export default Moderation;