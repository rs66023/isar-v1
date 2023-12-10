import React from 'react';
import './StatusMessage.css'; // CSS file for styling

function StatusMessage({ statusMessage }) {
  return (
    <div className="status-message">
      <p>{statusMessage}</p>
    </div>
  );
}

export default StatusMessage;
