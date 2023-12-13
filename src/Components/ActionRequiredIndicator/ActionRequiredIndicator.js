import React from 'react';

function ActionRequiredIndicator({ isActionRequired }) {
  return (
    <div className={`action-required-indicator ${isActionRequired ? 'active' : ''}`}>
      {isActionRequired ? 'Action Required!' : 'No Action Required'}
    </div>
  );
}

export default ActionRequiredIndicator;
