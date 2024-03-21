// Moderation.js
import React from 'react';

function Moderation() {
  return (
    <div>
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