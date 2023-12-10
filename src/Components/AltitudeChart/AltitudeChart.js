import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import Chart from 'chart.js/auto';

function AltitudeChart({ altitude }) {
  const [altitudeData, setAltitudeData] = useState([]);
  const [timeLabels, setTimeLabels] = useState([]);

  useEffect(() => {
    setAltitudeData(oldData => [...oldData, altitude]);
    setTimeLabels(oldLabels => [...oldLabels, new Date().toLocaleTimeString()]);
  }, [altitude]);

  const data = {
    labels: timeLabels,
    datasets: [
      {
        label: 'Altitude (meters)',
        data: altitudeData,
        fill: false,
        backgroundColor: 'rgb(255, 99, 132)',
        borderColor: 'rgba(255, 99, 132, 0.2)',
      },
    ],
  };

  const options = {
    scales: {
      y: {

      }
    },
    animation: {
      duration: 0 // general animation time
    },
  };

  return (
    <div className="chart-container">
      <h2>Altitude</h2>
      <Line data={data} options={options} />
    </div>
  );
}

export default AltitudeChart;
