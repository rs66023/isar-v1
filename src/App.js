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
    statusMessage: '',
    isAscending: false,
    isActionRequired: false,
  }); 

  // Effect to fetch sensor data from the API
  useEffect(() => { 
    const fetchData = async () => { 
      try {
        const response = await fetch('https://webfrontendassignment-isaraerospace.azurewebsites.net/api/SpectrumStatus');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setSensorData(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData(); // Execute the fetch operation
  }, []); // Empty dependency array to run only once


  // Add a new state variable for tracking loading state
  const [isLoading, setIsLoading] = useState(false);

  // Modify fetchData to set isLoading to true when it starts fetching and to false when it finishes
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

  // In your component, conditionally render a loading message if isLoading is true
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={
            <Home>
              <div className="sensor-data">
                {isLoading ? (
                  <p>Loading...</p>
                ) : (
                  <>
                    <AltitudeChart altitude={sensorData.altitude} />
                    <TemperatureGauge temperature={sensorData.temperature} />
                    <StatusMessage statusMessage={sensorData.statusMessage} />
                    <AscentDescentIndicator isAscending={sensorData.isAscending} />
                    <ActionRequiredIndicator isActionRequired={sensorData.isActionRequired} />
                    <RefreshButton onRefresh={fetchData} />
                  </>
                )}
              </div>
            </Home>
          } />
        </Routes>
      </div>
    </Router>
  );
}


export default App;

