import React from 'react';
import './StatusMessage.css';

function StatusMessage({ statusMessage }) {
  return (
    <div className="status-message">
      <h2>Status</h2>
      <p>{statusMessage}</p>
    </div>
  );
}

export default StatusMessage;
