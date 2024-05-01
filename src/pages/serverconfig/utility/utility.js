// Utility.js
import React from 'react';
import { Helmet } from 'react-helmet';

function Utility() {
  return (
    <div>
      <Helmet>
        <title>Scout | Server Config - Utility</title>
      </Helmet>
      <h1>Utility</h1>
      <form>
        <label>
          Utility Setting:
          <input type="text" name="utilitySetting" />
        </label>
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
}

export default Utility;