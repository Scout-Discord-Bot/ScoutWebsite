// Levels.js
import React from 'react';
import { Helmet } from 'react-helmet';

function Levels() {
  return (
    <div>
      <Helmet>
        <title>Scout | Server Config - Levels</title>
      </Helmet>
      <h1>Levels</h1>
      <form>
        <label>
          Levels Setting:
          <input type="text" name="levelsSetting" />
        </label>
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
}

export default Levels;