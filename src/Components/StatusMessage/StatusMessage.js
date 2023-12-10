import React from 'react';

function StatusMessage({ statusMessage }) {
  return (
    <div className="status-message">
      <h2>Status Message</h2>
      <p>{statusMessage}</p> {/* Display the status message */}
    </div>
  );
}

export default StatusMessage;
