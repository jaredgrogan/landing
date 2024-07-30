let layers = [];
let neuronCount = 0;

function addNeuron(layerIndex) {
    const layer = layers[layerIndex];
    if (!layer) return;

    neuronCount++;
    const neuron = document.createElement('div');
    neuron.className = 'neuron';
    neuron.id = `neuron-${neuronCount}`;
    neuron.style.left = `${Math.random() * 80 + 10}%`;
    neuron.style.top = `${Math.random() * 80 + 10}%`;
    neuron.title = `Neuron ${neuronCount}`;
    neuron.addEventListener('mouseover', function() {
        showTooltip(neuron, `Neuron ${neuronCount}`);
    });
    neuron.addEventListener('mouseout', function() {
        hideTooltip();
    });

    layer.appendChild(neuron);
}

function addLayer() {
    const networkDiagram = document.getElementById('networkDiagram');

    const layer = document.createElement('div');
    layer.className = 'layer';
    layer.style.position = 'relative';
    layer.style.width = '100%';
    layer.style.height = '100px';
    layer.style.border = '1px solid #ccc';
    layer.style.margin = '10px 0';

    layers.push(layer);
    networkDiagram.appendChild(layer);

    // Auto-generate layer text
    const layerText = document.createElement('div');
    layerText.className = 'layer-text';
    layerText.style.position = 'absolute';
    layerText.style.left = '10px';
    layerText.style.top = '50%';
    layerText.style.transform = 'translateY(-50%)';
    layerText.style.fontSize = '14px';
    layerText.style.color = '#333';

    if (layers.length === 1) {
        layerText.innerText = 'Input Layer';
    } else if (layers.length === layers.length) {
        layerText.innerText = 'Output Layer';
    } else {
        layerText.innerText = `Hidden Layer ${layers.length - 1}`;
    }

    layer.appendChild(layerText);
}

function showTooltip(neuron, text) {
    const tooltip = document.getElementById('tooltip');
    tooltip.innerText = text;
    tooltip.style.left = `${neuron.getBoundingClientRect().left + window.scrollX}px`;
    tooltip.style.top = `${neuron.getBoundingClientRect().top + window.scrollY - tooltip.offsetHeight}px`;
    tooltip.classList.add('visible');
}

function hideTooltip() {
    const tooltip = document.getElementById('tooltip');
    tooltip.classList.remove('visible');
}

// Auto-generate current year in footer
document.getElementById('copyright-year').textContent = new Date().getFullYear();
