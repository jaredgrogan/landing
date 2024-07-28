let darkMode = false;
let graphData = { nodes: [], links: [] };
let selectedConcept = null;

// Initialize the graph
function initGraph() {
    const width = 800;
    const height = 600;

    const svg = d3.select("#graph")
        .append("svg")
        .attr("width", width)
        .attr("height", height);

    const simulation = d3.forceSimulation(graphData.nodes)
        .force("link", d3.forceLink(graphData.links).id(d => d.id))
        .force("charge", d3.forceManyBody())
        .force("center", d3.forceCenter(width / 2, height / 2));

    const link = svg.append("g")
        .selectAll("line")
        .data(graphData.links)
        .join("line")
        .attr("stroke", "#999")
        .attr("stroke-opacity", 0.6);

    const node = svg.append("g")
        .selectAll("circle")
        .data(graphData.nodes)
        .join("circle")
        .attr("r", 20)
        .attr("fill", d => d.color || "#4299E1")
        .call(drag(simulation));

    const text = svg.append("g")
        .selectAll("text")
        .data(graphData.nodes)
        .join("text")
        .text(d => d.id)
        .attr("font-size", 12)
        .attr("text-anchor", "middle")
        .attr("dy", ".3em");

    simulation.on("tick", () => {
        link
            .attr("x1", d => d.source.x)
            .attr("y1", d => d.source.y)
            .attr("x2", d => d.target.x)
            .attr("y2", d => d.target.y);

        node
            .attr("cx", d => d.x)
            .attr("cy", d => d.y);

        text
            .attr("x", d => d.x)
            .attr("y", d => d.y);
    });

    function drag(simulation) {
        function dragstarted(event) {
            if (!event.active) simulation.alphaTarget(0.3).restart();
            event.subject.fx = event.subject.x;
            event.subject.fy = event.subject.y;
        }
        
        function dragged(event) {
            event.subject.fx = event.x;
            event.subject.fy = event.y;
        }
        
        function dragended(event) {
            if (!event.active) simulation.alphaTarget(0);
            event.subject.fx = null;
            event.subject.fy = null;
        }
        
        return d3.drag()
            .on("start", dragstarted)
            .on("drag", dragged)
            .on("end", dragended);
    }

    node.on("click", (event, d) => {
        selectedConcept = d;
        updateSelectedConceptDisplay();
    });
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
    document.body.classList.toggle("dark-mode", darkMode);
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
document.getElementById("toggleDarkMode").addEventListener("click", toggleDarkMode);

document.getElementById("addConceptBtn").addEventListener("click", () => {
    document.getElementById("addConceptModal").classList.remove("hidden");
});

document.getElementById("addConceptForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const name = document.getElementById("conceptName").value;
    const description = document.getElementById("conceptDescription").value;
    addConcept(name, description);
    document.getElementById("addConceptModal").classList.add("hidden");
    document.getElementById("addConceptForm").reset();
});

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
}

// Run the app
init();
