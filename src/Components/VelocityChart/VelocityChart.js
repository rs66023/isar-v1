import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import Chart from 'chart.js/auto';

function VelocityChart({ velocity }) {
  const [velocityData, setVelocityData] = useState([]);
  const [timeLabels, setTimeLabels] = useState([]);

  useEffect(() => {
    setVelocityData(oldData => [...oldData, velocity]);
    setTimeLabels(oldLabels => [...oldLabels, new Date().toLocaleTimeString()]);
  }, [velocity]);

  const data = {
    labels: timeLabels,
    datasets: [
      {
        label: 'Velocity (m/s)',
        data: velocityData,
        fill: false,
        backgroundColor: 'rgb(75, 192, 192)',
        borderColor: 'rgba(75, 192, 192, 0.2)',
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true
      }
    },
    animation: {
      duration: 0 // general animation time
    },
  };

  return (
    <div className="chart-container">
      <h2>Velocity</h2>
      <Line data={data} options={options} />
    </div>
  );
}

export default VelocityChart;
