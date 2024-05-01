// Logging.js
import React from 'react';
import { Helmet } from 'react-helmet';

function Logging() {
  return (
    <div>
      <Helmet>
        <title>Scout | Server Config - Logging</title>
      </Helmet>
      <h1>Logging</h1>
      <form>
        <label>
          Logging Setting:
          <input type="text" name="loggingSetting" />
        </label>
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
}

export default Logging;