document.addEventListener('DOMContentLoaded', () => {
    const app = document.getElementById('app');
    const layersContainer = document.getElementById('layers-container');
    const toggleDarkModeButton = document.getElementById('toggle-dark-mode');
    const addLayerButton = document.getElementById('add-layer');
    const removeLayerButton = document.getElementById('remove-layer');
    const learningChartCtx = document.getElementById('learning-chart').getContext('2d');

    let layers = [
        { id: 1, type: 'input', neurons: 3 },
        { id: 2, type: 'hidden', neurons: 4 },
        { id: 3, type: 'output', neurons: 2 }
    ];
    let darkMode = false;

    const learningChart = new Chart(learningChartCtx, {
        type: 'line',
        data: {
            labels: [],
            datasets: [{
                label: 'Error',
                data: [],
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
                fill: false
            }]
        },
        options: {
            responsive: true,
            scales: {
                x: {
                    title: {
                        display: true,
                        text: 'Epoch'
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: 'Error'
                    },
                    beginAtZero: true
                }
            }
        }
    });

    function updateLearningChart() {
        const epoch = learningChart.data.labels.length;
        const error = Math.random() * 0.5;

        if (learningChart.data.labels.length >= 20) {
            learningChart.data.labels.shift();
            learningChart.data.datasets[0].data.shift();
        }

        learningChart.data.labels.push(epoch);
        learningChart.data.datasets[0].data.push(error);

        learningChart.update();
    }

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
    setInterval(updateLearningChart, 1000);
});
