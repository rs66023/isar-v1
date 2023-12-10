import React from 'react';
import './AscentDescentIndicator.css'; // CSS file for styling

function AscentDescentIndicator({ isAscending }) {
  return (
    <div className={`indicator ${isAscending ? 'ascent' : 'descent'}`}>
      {isAscending ? 'Ascending' : 'Descending'}
    </div>
  );
}

export default AscentDescentIndicator;
