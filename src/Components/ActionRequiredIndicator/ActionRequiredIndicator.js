import React from 'react';
import './ActionRequiredIndicator.css'; // CSS file for styling

function ActionRequiredIndicator({ isActionRequired }) {
  return (
    <div className={`action-required-indicator ${isActionRequired ? 'active' : ''}`}>
      {isActionRequired ? 'Action Required!' : 'No Action Required'}
    </div>
  );
}

export default ActionRequiredIndicator;
