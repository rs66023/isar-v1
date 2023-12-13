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
  const [useWebSocket, setUseWebSocket] = useState(false);
  const [error, setError] = useState('');

  // Function to fetch data
  const fetchData = async () => {
    setIsLoading(true);
    setError(''); // Reset error state
    try {
      const response = await fetch('https://webfrontendassignment-isaraerospace.azurewebsites.net/api/SpectrumStatus');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setSensorData(data);
    } catch (error) {
      console.error('Error:', error);
      setError('Failed to fetch data.'); // Set error message

    } finally {
      setIsLoading(false);
    }
  };

  // Function to handle manual refresh
  const handleRefresh = () => {
    fetchData();
  };

  const toggleWebSocket = () => {
    setUseWebSocket(!useWebSocket);
  };

  // Function to handle action required
  const handleActionRequired = () => {
    fetch('https://webfrontendassignment-isaraerospace.azurewebsites.net/api/ActOnSpectrum', {
      method: 'POST',
      // Additional settings may be required depending on the API
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Response error');
      }
      console.log("Action taken");
    })
    .catch(error => {
      console.error("Action error:", error);
    });
  };

  useEffect(() => {

    let webSocket;

    if (useWebSocket) {
      const connectWebSocket = () => {
        const webSocket = new WebSocket('wss://webfrontendassignment-isaraerospace.azurewebsites.net/api/SpectrumWS');

        webSocket.onmessage = (event) => {
          const data = JSON.parse(event.data);
          setSensorData(data);
        };

        webSocket.onerror = (error) => {
          console.error('WebSocket Error:', error);
          setError('WebSocket connection error.'); // Set error message
          webSocket.close();
        };

        webSocket.onclose = () => {
          console.log("WebSocket Disconnected. Attempting to reconnect...");
          setTimeout(connectWebSocket, 5000); // Reconnect after 5 seconds
        };
      };

      connectWebSocket();
      return () => {
        if (webSocket) {
          webSocket.close();
        }
      };
    } else {
      fetchData();
      const interval = setInterval(fetchData, 5000);
      return () => clearInterval(interval);
    }
  }, [useWebSocket, fetchData]);


  // In your component, conditionally render a loading message if isLoading is true
  return (
    <Router>
      <div className="App">
        {isLoading && <div className="loading-indicator">Loading...</div>}
        {error && <div className="error-message">{error}</div>}
        <Routes>
          <Route path="/" element={ 
            <div className="dashboard-container">
              {/* WebSocket status indicator */}
              <div className='websocket-status'>
                {useWebSocket ? 'WebSocket Connected' : 'WebSocket Disconnected'}
              </div>
              <div className='top-bar'>
                <StatusMessage statusMessage={sensorData.statusMessage} />
              </div>
              <div className='mid-section'>
                <div className='left-section'>
                  <VelocityChart velocity={sensorData.velocity} />
                  <AltitudeChart altitude={sensorData.altitude} />
                </div>
                <div className='right-section'>
                  <div className='temperature-gauge-container'>
                    <TemperatureGauge temperature={sensorData.temperature} />
                  </div>
                  <div className='ascent-descent-indicator-container'>
                    <AscentDescentIndicator isAscending={sensorData.isAscending} />
                  </div>
                  <div className='action-required-indicator-container'>
                    <ActionRequiredIndicator 
                      isActionRequired={sensorData.isActionRequired}
                      onAction={handleActionRequired} 
                    />
                  </div>
                </div>
              </div>
              <div className='bottom-bar'>
                <div className='buttons-container'>
                  <RefreshButton
                    onRefresh={fetchData} 
                    toggleWebSocket={toggleWebSocket} 
                    useWebSocket={useWebSocket} 
                  />
                </div>
              </div>
            </div>
          } />
        </Routes>
      </div>
    </Router>
  );
}
  


export default App;

