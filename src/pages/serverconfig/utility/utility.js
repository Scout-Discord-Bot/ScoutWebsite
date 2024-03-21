// Utility.js
import React from 'react';

function Utility() {
  return (
    <div>
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