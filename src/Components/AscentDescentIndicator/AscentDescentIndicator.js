import React from 'react';

function AscentDescentIndicator({ isAscending }) {
  return (
    <div>
      <h2>Ascent/Descent</h2>
      <p>{isAscending ? 'Ascending' : 'Descending'}</p>
    </div>
  );
}

export default AscentDescentIndicator;
