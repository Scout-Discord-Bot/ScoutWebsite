// Fun.js
import React from 'react';

function Fun() {
  return (
    <div>
      <h1>Fun</h1>
      <form>
        <label>
          Fun Setting:
          <input type="text" name="funSetting" />
        </label>
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
}

export default Fun;