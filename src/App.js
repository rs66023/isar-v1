import logo from './logo.svg';
import './App.css';

// Importing React and Router components
import React, { useState, useEffect } from 'react';  // useState and useEffect added for state management and side effects
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Home from './Components/Home';
import About from './Components/About';

// Importing custom components


// Importing dashboard components

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
        const response = await fetch('https://webfrontendassignment-isaraerospace.azurewebsites.net/api/SpectrumStatus', {
          method: 'GET', 
        });
        const data = await response.json();
        setSensorData(data); 
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData(); // Execute the fetch operation
  }, []); // Empty dependency array to run only once


  return (
    <Router>
      <div>
        <Routes>
          {/* Route for the About page */}
          <Route path="/about" element={<About />} />
          
          {/* Route for the Home page */}
          <Route path="/" element={
          <Home>
            {/* Pass sensor data as props to components */}
            <VelocityChart velocity={sensorData.velocity} />
            <AltitudeChart altitude={sensorData.altitude} />
            {/* ... other components with their respective props */}
          </Home>
          } />
        </Routes>
      </div>
    </Router>
  );
}


export default App;