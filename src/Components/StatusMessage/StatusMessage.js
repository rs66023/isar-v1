import React from 'react';

function StatusMessage({ statusMessage }) {
  return (
    <div className="status-message">
      <p>{statusMessage}</p>
    </div>
  );
}

export default StatusMessage;
