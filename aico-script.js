import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const NeuralNetwork = () => {
  const [layers, setLayers] = useState([
    { id: 1, type: 'input', neurons: 3 },
    { id: 2, type: 'hidden', neurons: 4 },
    { id: 3, type: 'output', neurons: 2 }
  ]);
  const [darkMode, setDarkMode] = useState(false);
  const [activeNeuron, setActiveNeuron] = useState(null);
  const [learningData, setLearningData] = useState([]);

  useEffect(() => {
    // Simulate learning progress
    const interval = setInterval(() => {
      setLearningData(prevData => {
        const newData = [...prevData, { epoch: prevData.length, error: Math.random() * 0.5 }];
        return newData.slice(-20); // Keep last 20 points
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const addLayer = () => {
    setLayers(prevLayers => [
      ...prevLayers.slice(0, -1),
      { id: prevLayers.length, type: 'hidden', neurons: 4 },
      prevLayers[prevLayers.length - 1]
    ]);
  };

  const removeLayer = () => {
    if (layers.length > 3) {
      setLayers(prevLayers => [...prevLayers.slice(0, -2), prevLayers[prevLayers.length - 1]]);
    }
  };

  const toggleDarkMode = () => setDarkMode(prev => !prev);

  const handleNeuronHover = (layerId, neuronId) => {
    setActiveNeuron({ layerId, neuronId });
  };

  const handleNeuronLeave = () => {
    setActiveNeuron(null);
  };

  return (
    <div className={`container ${darkMode ? 'dark-mode' : ''}`}>
      <h1 className="text-2xl font-bold mb-4">Interactive Neural Network</h1>
      <div className="mb-4">
        <button onClick={addLayer} className="btn btn-add">Add Layer</button>
        <button onClick={removeLayer} className="btn btn-remove">Remove Layer</button>
        <button onClick={toggleDarkMode} className="btn btn-toggle">
          {darkMode ? 'Light Mode' : 'Dark Mode'}
        </button>
      </div>
      <div className="flex justify-between items-center mb-4">
        {layers.map((layer, layerIndex) => (
          <div key={layer.id} className="flex flex-col items-center">
            <div className="mb-2">{layer.type.charAt(0).toUpperCase() + layer.type.slice(1)} Layer</div>
            {Array.from({ length: layer.neurons }).map((_, neuronIndex) => (
              <div
                key={neuronIndex}
                className={`neuron ${activeNeuron?.layerId === layer.id && activeNeuron?.neuronId === neuronIndex
                  ? 'neuron-active'
                  : darkMode ? 'neuron-dark' : 'neuron-light'
                }`}
                onMouseEnter={() => handleNeuronHover(layer.id, neuronIndex)}
                onMouseLeave={handleNeuronLeave}
              />
            ))}
          </div>
        ))}
      </div>
      <div className="chart-container mt-8">
        <h2 className="text-xl font-bold mb-2">Learning Progress</h2>
        <LineChart className="chart" data={learningData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="epoch" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="error" stroke="#8884d8" />
        </LineChart>
      </div>
    </div>
  );
};

// Render the React component
ReactDOM.render(<NeuralNetwork />, document.getElementById('root'));
