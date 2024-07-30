document.getElementById('copyright-year').textContent = new Date().getFullYear();

const width = document.querySelector('#network-diagram').offsetWidth;
const height = document.querySelector('#network-diagram').offsetHeight;
let nodeId = 0;
const nodeRadius = 15;

const svg = d3.select("#network-diagram")
    .append("svg")
    .attr("width", width)
    .attr("height", height)
    .attr("viewBox", `0 0 ${width} ${height}`);

const nodes = [];
const layers = [];

const zoom = d3.zoom()
    .scaleExtent([0.5, 5])
    .on("zoom", (event) => {
        svg.attr("transform", event.transform);
    });

svg.call(zoom);

const gradient = svg.append("defs")
    .append("linearGradient")
    .attr("id", "gradient")
    .attr("x1", "0%")
    .attr("y1", "0%")
    .attr("x2", "100%")
    .attr("y2", "100%");

gradient.append("stop")
    .attr("offset", "0%")
    .attr("style", "stop-color:magenta;stop-opacity:1");

gradient.append("stop")
    .attr("offset", "100%")
    .attr("style", "stop-color:blue;stop-opacity:1");

function update() {
    const nodeSelection = svg.selectAll(".node")
        .data(nodes, d => d.id);

    nodeSelection.enter()
        .append("circle")
        .attr("class", "node")
        .attr("r", nodeRadius)
        .attr("fill", "url(#gradient)")
        .merge(nodeSelection)
        .attr("cx", d => Math.random() * width)
        .attr("cy", d => Math.random() * height);

    nodeSelection.exit().remove();
}

function addNeuron() {
    nodes.push({ id: nodeId++ });
    update();
}

function addLayer() {
    layers.push({ id: layers.length });
    // Additional logic to update layout based on layers
}

function deleteNeuron() {
    nodes.pop();
    update();
}

function setDarkMode() {
    document.body.classList.add('dark-mode');
}

function setLightMode() {
    document.body.classList.remove('dark-mode');
}

document.getElementById('modeToggle').addEventListener('click', () => {
    if (document.body.classList.contains('dark-mode')) {
        setLightMode();
    } else {
        setDarkMode();
    }
});

const tooltip = d3.select("body").append("div")
    .attr("class", "tooltip");

svg.selectAll(".node")
    .on("mouseover", function (event, d) {
        tooltip.html(`Neuron ID: ${d.id}`)
            .style("left", (event.pageX + 5) + "px")
            .style("top", (event.pageY - 28) + "px")
            .classed("visible", true);
    })
    .on("mouseout", function () {
        tooltip.classed("visible", false);
    });
