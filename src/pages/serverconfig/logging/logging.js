// Logging.js
import React from 'react';

function Logging() {
  return (
    <div>
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