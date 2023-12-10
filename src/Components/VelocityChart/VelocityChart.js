import React from 'react';

function VelocityChart({ velocity }) {
  return (
    <div className="chart-placeholder">
      <h2>Velocity</h2>
      <p>{velocity} m/s</p> {/* Display the velocity */}
      {/* Placeholder for chart */}
    </div>
  );
}

export default VelocityChart;
