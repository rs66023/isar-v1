import React from 'react';

function AscentDescentIndicator({ isAscending }) {
  return (
    <div className={`indicator ${isAscending ? 'ascent' : 'descent'}`}>
      {isAscending ? 'Ascending' : 'Descending'}
    </div>
  );
}

export default AscentDescentIndicator;
