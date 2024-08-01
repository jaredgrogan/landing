document.addEventListener('DOMContentLoaded', () => {
    const app = document.getElementById('app');
    const layersContainer = document.getElementById('layers-container');
    const toggleDarkModeButton = document.getElementById('toggle-dark-mode');
    const addLayerButton = document.getElementById('add-layer');
    const removeLayerButton = document.getElementById('remove-layer');

    let layers = [
        { id: 1, type: 'input', neurons: 3 },
        { id: 2, type: 'hidden', neurons: 4 },
        { id: 3, type: 'output', neurons: 2 }
    ];
    let darkMode = false;

    function renderLayers() {
        layersContainer.innerHTML = '';
        layers.forEach(layer => {
            const layerDiv = document.createElement('div');
            layerDiv.className = 'flex flex-col items-center mx-4';
            layerDiv.innerHTML = `<div class="mb-2">${layer.type.charAt(0).toUpperCase() + layer.type.slice(1)} Layer</div>`;
            for (let i = 0; i < layer.neurons; i++) {
                const neuronDiv = document.createElement('div');
                neuronDiv.className = `w-8 h-8 rounded-full mb-2 ${darkMode ? 'bg-blue-400' : 'bg-blue-600'}`;
                layerDiv.appendChild(neuronDiv);
            }
            layersContainer.appendChild(layerDiv);
        });
    }

    toggleDarkModeButton.addEventListener('click', () => {
        darkMode = !darkMode;
        app.className = darkMode ? 'dark-mode' : 'light-mode';
        toggleDarkModeButton.textContent = darkMode ? 'Light Mode' : 'Dark Mode';
        renderLayers();
    });

    addLayerButton.addEventListener('click', () => {
        layers.splice(layers.length - 1, 0, { id: layers.length, type: 'hidden', neurons: 4 });
        renderLayers();
    });

    removeLayerButton.addEventListener('click', () => {
        if (layers.length > 3) {
            layers.splice(layers.length - 2, 1);
            renderLayers();
        }
    });

    renderLayers();
});
