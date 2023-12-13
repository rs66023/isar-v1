import React from 'react';

function Thermometer({ temperature }) {
  // Calculate the height of the mercury based on the temperature
  // Assuming the temperature ranges from -50 to 50 degrees Celsius
  const minTemp = -50;
  const maxTemp = 50;
  const mercuryHeight = ((temperature - minTemp) / (maxTemp - minTemp)) * 100;

  return (
    <div className="thermometer-container">
      <div className="thermometer">
        <div 
          className="mercury" 
          style={{ height: `${mercuryHeight}%` }}
        ></div>
      </div>
      <div className="temperature-label">{temperature}°C</div>
    </div>
  );
}

export default Thermometer;
