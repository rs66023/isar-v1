import React from 'react';

function ActionRequiredIndicator({ isActionRequired }) {
  return (
    <div>
      <h2>Action Required</h2>
      <p>{isActionRequired ? 'Yes' : 'No'}</p>
    </div>
  );
}

export default ActionRequiredIndicator;
