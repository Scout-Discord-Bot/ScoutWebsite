// LeaveMessages.js
import React from 'react';

function LeaveMessages() {
  return (
    <div>
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