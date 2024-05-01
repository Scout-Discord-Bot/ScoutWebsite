// Fun.js
import React from 'react';
import { Helmet } from 'react-helmet';

function Fun() {
  return (
    <div>
      <Helmet>
        <title>Scout | Server Config - Fun</title>
      </Helmet>
      
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