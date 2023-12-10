import logo from './logo.svg';
import './App.css';

// Importing React and Router components
import React, { useState, useEffect } from 'react';  // useState and useEffect added for state management and side effects
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

// Importing custom components
import Home from './Components/Home';
import About from './Components/About';

// Importing dashboard components
import ActionRequiredIndicator from './Components/ActionRequiredIndicator/ActionRequiredIndicator';
import AltitudeChart from './Components/AltitudeChart/AltitudeChart';
import AscentDescentIndicator from './Components/AscentDescentIndicator/AscentDescentIndicator';
import RefreshButton from './Components/RefreshButton/RefreshButton';
import StatusMessage from './Components/StatusMessage/StatusMessage';
import TemperatureGauge from './Components/TemperatureGauge/TemperatureGauge';
import VelocityChart from './Components/VelocityChart/VelocityChart';

function App() {
  // State to store sensor data
  const [sensorData, setSensorData] = useState({ 
    velocity: 0,
    altitude: 0,
    temperature: 0,
    statusMessage: 'Waiting for data',
    isAscending: false,
    isActionRequired: false,
  });

  const [isLoading, setIsLoading] = useState(false);
  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('https://webfrontendassignment-isaraerospace.azurewebsites.net/api/SpectrumStatus');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setSensorData(data);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Implementing polling for real-time updates
  useEffect(() => {
    fetchData();

    const interval = setInterval(() => {
      fetchData();
    }, 5000); // Adjust interval as needed

    return () => clearInterval(interval); // Clear interval on component unmount
  }, []);

  // In your component, conditionally render a loading message if isLoading is true
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={ 
              <div className="dashboard-container">
                <div className='top-bar'>
                  <StatusMessage statusMessage={sensorData.statusMessage} />
                </div>
                <div className='mid-section mid-right'>
                  <AltitudeChart altitude={sensorData.altitude} />
                  <VelocityChart velocity={sensorData.velocity} />
                </div>
                <div className='mid-section mid-left'>
                  <TemperatureGauge temperature={sensorData.temperature} />
                  <AscentDescentIndicator isAscending={sensorData.isAscending} />
                </div>
                <div className='top-bar'>
                <ActionRequiredIndicator isActionRequired={sensorData.isActionRequired} />
                </div>
              
              </div>
          } />
        </Routes>
      </div>
    </Router>
  );
}


export default App;

