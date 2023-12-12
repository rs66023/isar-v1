import React from 'react';

function RefreshButton({ onRefresh, toggleWebSocket, useWebSocket }) {
  return (
    <div>
      <button onClick={onRefresh}>Refresh Data</button>
      <button onClick={toggleWebSocket}>
        {useWebSocket ? 'Switch to HTTP Polling' : 'Switch to WebSocket'}
      </button>
    </div>
  );
}

export default RefreshButton;
