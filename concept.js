let darkMode = false;
let graphData = { nodes: [], links: [] };
let selectedConcept = null;

// Initialize the graph
function initGraph() {
    // ... (keep the existing graph initialization code)
}

// Update metrics display
function updateMetrics() {
    document.getElementById("totalConcepts").textContent = graphData.nodes.length;
    document.getElementById("totalConnections").textContent = graphData.links.length;
    document.getElementById("latestUpdate").textContent = new Date().toISOString().split('T')[0];
}

// Update selected concept display
function updateSelectedConceptDisplay() {
    const selectedConceptElement = document.getElementById("selectedConcept");
    const titleElement = document.getElementById("selectedConceptTitle");
    const descriptionElement = document.getElementById("selectedConceptDescription");

    if (selectedConcept) {
        titleElement.textContent = selectedConcept.id;
        descriptionElement.textContent = selectedConcept.description || "No description available.";
        selectedConceptElement.classList.remove("hidden");
    } else {
        selectedConceptElement.classList.add("hidden");
    }
}

// Toggle dark mode
function toggleDarkMode() {
    darkMode = !darkMode;
    document.body.classList.toggle("night-mode");
    document.body.classList.toggle("day-mode");
    const sunIcon = document.querySelector('.sun-icon');
    const moonIcon = document.querySelector('.moon-icon');
    if (darkMode) {
        sunIcon.style.display = 'none';
        moonIcon.style.display = 'block';
    } else {
        sunIcon.style.display = 'block';
        moonIcon.style.display = 'none';
    }
}

// Add new concept
function addConcept(name, description) {
    const newConcept = {
        id: name,
        description: description,
        group: graphData.nodes.length + 1
    };
    graphData.nodes.push(newConcept);
    updateMetrics();
    initGraph(); // Reinitialize the graph with new data
}

// Event listeners
document.addEventListener('DOMContentLoaded', () => {
    const modeToggle = document.getElementById('modeToggle');
    modeToggle.addEventListener('click', toggleDarkMode);

    const addConceptBtn = document.getElementById('addConceptBtn');
    const addConceptModal = document.getElementById('addConceptModal');
    const addConceptForm = document.getElementById('addConceptForm');

    addConceptBtn.addEventListener('click', () => {
        addConceptModal.classList.remove('hidden');
    });

    addConceptForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('conceptName').value;
        const description = document.getElementById('conceptDescription').value;
        addConcept(name, description);
        addConceptModal.classList.add('hidden');
        addConceptForm.reset();
    });

    // Close modal when clicking outside
    addConceptModal.addEventListener('click', (e) => {
        if (e.target === addConceptModal) {
            addConceptModal.classList.add('hidden');
        }
    });

    // Search functionality
    const searchInput = document.getElementById('searchInput');
    searchInput.addEventListener('input', () => {
        const searchTerm = searchInput.value.toLowerCase();
        filterGraph(searchTerm);
    });

    // Filter functionality
    const filterSelect = document.getElementById('filterSelect');
    filterSelect.addEventListener('change', () => {
        const filterValue = filterSelect.value;
        filterGraph(null, filterValue);
    });

    init();
});

// Filter graph based on search term and/or filter value
function filterGraph(searchTerm, filterValue) {
    const filteredNodes = graphData.nodes.filter(node => {
        const matchesSearch = !searchTerm || node.id.toLowerCase().includes(searchTerm);
        const matchesFilter = !filterValue || node.group.toString() === filterValue;
        return matchesSearch && matchesFilter;
    });

    const filteredLinks = graphData.links.filter(link => {
        const sourceNode = filteredNodes.find(node => node.id === link.source.id || node.id === link.source);
        const targetNode = filteredNodes.find(node => node.id === link.target.id || node.id === link.target);
        return sourceNode && targetNode;
    });

    updateGraph(filteredNodes, filteredLinks);
}

// Update graph with filtered data
function updateGraph(nodes, links) {
    // Remove existing graph
    d3.select("#graph svg").remove();

    // Reinitialize graph with filtered data
    const tempGraphData = { nodes, links };
    initGraph(tempGraphData);
}

// Initialize the app
function init() {
    // Sample data (you can replace this with your actual data)
    graphData = {
        nodes: [
            { id: 'Blockchain', group: 1 },
            { id: 'Ensemble Methods', group: 2 },
            { id: 'Transformer Algorithms', group: 3 },
            { id: 'Weights & Biases', group: 4 },
            { id: 'Reinforcement Learning', group: 5 },
            { id: 'Attention Mechanism', group: 6 },
            { id: 'Data Structures', group: 7 },
            { id: 'Backpropagation', group: 8 },
            { id: 'Gradient Descent', group: 9 }
        ],
        links: [
            { source: 'Blockchain', target: 'Ensemble Methods' },
            { source: 'Ensemble Methods', target: 'Transformer Algorithms' },
            { source: 'Transformer Algorithms', target: 'Weights & Biases' },
            { source: 'Weights & Biases', target: 'Reinforcement Learning' },
            { source: 'Reinforcement Learning', target: 'Blockchain' },
            { source: 'Attention Mechanism', target: 'Transformer Algorithms' },
            { source: 'Data Structures', target: 'Blockchain' },
            { source: 'Backpropagation', target: 'Weights & Biases' },
            { source: 'Gradient Descent', target: 'Backpropagation' }
        ]
    };

    updateMetrics();
    initGraph();

    // Populate filter options
    const filterSelect = document.getElementById('filterSelect');
    const groups = [...new Set(graphData.nodes.map(node => node.group))];
    groups.forEach(group => {
        const option = document.createElement('option');
        option.value = group;
        option.textContent = `Group ${group}`;
        filterSelect.appendChild(option);
    });
}

// Run the app
// init(); // This is now called in the DOMContentLoaded event listener
