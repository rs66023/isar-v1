import React from 'react';

function TemperatureGauge({ temperature }) {
  return (
    <div className="gauge-placeholder">
      <h2>Temperature</h2>
      <p>{temperature} °C</p> {/* Display the temperature */}
    </div>
  );
}

export default TemperatureGauge;
