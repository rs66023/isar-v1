import React from 'react';

function RefreshButton({ onRefresh }) {
  return (
    <button onClick={onRefresh}>Refresh Data</button>
  );
}

export default RefreshButton;
