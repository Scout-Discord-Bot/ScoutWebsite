// Levels.js
import React from 'react';

function Levels() {
  return (
    <div>
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