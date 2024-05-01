// LeaveMessages.js
import React from 'react';
import { Helmet } from 'react-helmet';

function LeaveMessages() {
  return (
    <div>
      <Helmet>
        <title>Scout | Server Config - Leave Messages</title>
      </Helmet>
      <h1>Leave Messages</h1>
      <form>
        <label>
          Leave Message:
          <input type="text" name="leaveMessage" />
        </label>
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
}

export default LeaveMessages;