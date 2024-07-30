// script.js
const { useState } = React;
const { TransformWrapper, TransformComponent } = ReactZoomPanPinch;

const NeuralNetworkVisualization = () => {
    const [layers, setLayers] = useState([
        { id: 1, type: 'input', neurons: 3 },
        { id: 2, type: 'hidden', neurons: 4 },
        { id: 3, type: 'output', neurons: 2 },
    ]);
    const [darkMode, setDarkMode] = useState(false);

    const addLayer = () => {
        const newLayer = {
            id: layers.length + 1,
            type: 'hidden',
            neurons: 4,
        };
        setLayers([...layers.slice(0, -1), newLayer, layers[layers.length - 1]]);
    };

    const removeLayer = () => {
        if (layers.length > 3) {
            setLayers(layers.slice(0, -2).concat(layers[layers.length - 1]));
        }
    };

    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
    };

    const getLayerDescription = (type) => {
        switch (type) {
            case 'input': return 'Input Layer: Receives initial data';
            case 'hidden': return 'Hidden Layer: Processes intermediate features';
            case 'output': return 'Output Layer: Produces final predictions';
            default: return '';
        }
    };

    return (
        <div className={`container ${darkMode ? 'dark-mode' : ''}`}>
            <h1>Neural Network Visualization</h1>
            <div>
                <button className="btn btn-primary" onClick={addLayer}>Add Layer</button>
                <button className="btn btn-secondary" onClick={removeLayer} disabled={layers.length <= 3}>Remove Layer</button>
                <button className="btn btn-secondary" onClick={toggleDarkMode}>
                    {darkMode ? 'Light Mode' : 'Dark Mode'}
                </button>
            </div>
            <TransformWrapper
                initialScale={1}
                initialPositionX={0}
                initialPositionY={0}
            >
                {({ zoomIn, zoomOut, resetTransform }) => (
                    <React.Fragment>
                        <div className="tools">
                            <button className="btn btn-primary" onClick={() => zoomIn()}>Zoom In</button>
                            <button className="btn btn-primary" onClick={() => zoomOut()}>Zoom Out</button>
                            <button className="btn btn-secondary" onClick={() => resetTransform()}>Reset</button>
                        </div>
                        <TransformComponent>
                            <div className="neural-network">
                                {layers.map((layer, index) => (
                                    <div key={layer.id} className="layer">
                                        <div className="layer-description">{getLayerDescription(layer.type)}</div>
                                        {Array.from({ length: layer.neurons }).map((_, neuronIndex) => (
                                            <div key={neuronIndex} className="neuron" title={`Neuron ${neuronIndex + 1} in ${layer.type} layer`}></div>
                                        ))}
                                    </div>
                                ))}
                            </div>
                        </TransformComponent>
                    </React.Fragment>
                )}
            </TransformWrapper>
        </div>
    );
};

ReactDOM.render(<NeuralNetworkVisualization />, document.getElementById('root'));
