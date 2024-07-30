document.addEventListener('DOMContentLoaded', () => {
    const svg = d3.select("#neural-network-diagram");
    const width = svg.attr("width", "100%").node().getBoundingClientRect().width;
    const height = svg.attr("height", 600).node().getBoundingClientRect().height;

    const simulation = d3.forceSimulation()
        .force("link", d3.forceLink().id(d => d.id))
        .force("charge", d3.forceManyBody().strength(-400))
        .force("center", d3.forceCenter(width / 2, height / 2));

    let nodes = [
        { id: 1, layer: 'input' },
        { id: 2, layer: 'hidden' },
        { id: 3, layer: 'hidden' },
        { id: 4, layer: 'output' }
    ];

    let links = [
        { source: 1, target: 2 },
        { source: 1, target: 3 },
        { source: 2, target: 4 },
        { source: 3, target: 4 }
    ];

    svg.append("defs")
        .append("linearGradient")
        .attr("id", "neuronGradient")
        .attr("x1", "0%")
        .attr("y1", "0%")
        .attr("x2", "100%")
        .attr("y2", "100%")
        .selectAll("stop")
        .data([
            { offset: "0%", color: "magenta" },
            { offset: "100%", color: "goldenrod" }
        ])
        .enter()
        .append("stop")
        .attr("offset", d => d.offset)
        .attr("stop-color", d => d.color);

    const zoom = d3.zoom()
        .scaleExtent([0.5, 5])
        .on("zoom", (event) => {
            svg.attr("transform", event.transform);
        });

    svg.call(zoom);

    function update() {
        const link = svg.selectAll(".link")
            .data(links)
            .enter().append("line")
            .attr("class", "link")
            .attr("stroke", "#999")
            .attr("stroke-width", 2);

        const node = svg.selectAll(".node")
            .data(nodes)
            .enter().append("circle")
            .attr("class", "node")
            .attr("r", 20)
            .attr("fill", "url(#neuronGradient)")
            .attr("stroke", "#333")
            .attr("stroke-width", 1.5)
            .call(d3.drag()
                .on("start", dragstarted)
                .on("drag", dragged)
                .on("end", dragended))
            .on("click", (event, d) => showDescription(d));

        simulation.nodes(nodes).on("tick", ticked);
        simulation.force("link").links(links);

        function ticked() {
            link
                .attr("x1", d => d.source.x)
                .attr("y1", d => d.source.y)
                .attr("x2", d => d.target.x)
                .attr("y2", d => d.target.y);

            node
                .attr("cx", d => d.x)
                .attr("cy", d => d.y);
        }

        function dragstarted(event, d) {
            if (!event.active) simulation.alphaTarget(0.3).restart();
            d.fx = d.x;
            d.fy = d.y;
        }

        function dragged(event, d) {
            d.fx = event.x;
            d.fy = event.y;
        }

        function dragended(event, d) {
            if (!event.active) simulation.alphaTarget(0);
            d.fx = null;
            d.fy = null;
        }

        svg.selectAll(".node").data(nodes).exit().remove();
        svg.selectAll(".link").data(links).exit().remove();
    }

    function showDescription(node) {
        const tooltip = document.getElementById("tooltip");
        tooltip.innerHTML = `Node ${node.id}: ${node.layer} layer`;
        tooltip.style.display = 'block';
        tooltip.style.left = `${node.x + 20}px`;
        tooltip.style.top = `${node.y}px`;
    }

    function addNode() {
        const newNode = { id: nodes.length + 1, layer: 'hidden' };
        nodes.push(newNode);

        const newLink = { source: nodes.length, target: Math.floor(Math.random() * (nodes.length - 1)) + 1 };
        links.push(newLink);

        update();
        simulation.alpha(1).restart();
    }

    function deleteNode() {
        if (nodes.length > 1) {
            nodes.pop();
            links = links.filter(link => link.source.id !== nodes.length + 1 && link.target.id !== nodes.length + 1);
            update();
            simulation.alpha(1).restart();
        }
    }

    document.getElementById('search').addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase();
        svg.selectAll('.node')
            .style('opacity', d => d.id.toString().includes(searchTerm) ? 1 : 0.2);
    });

    document.getElementById('layerFilter').addEventListener('change', function() {
        const filter = this.value;
        svg.selectAll('.node')
            .style('display', d => filter === 'all' || d.layer === filter ? 'block' : 'none');
    });

    document.getElementById('zoomIn').addEventListener('click', function() {
        svg.transition().call(zoom.scaleBy, 1.2);
    });

    document.getElementById('zoomOut').addEventListener('click', function() {
        svg.transition().call(zoom.scaleBy, 0.8);
    });

    document.getElementById('addNode').addEventListener('click', addNode);
    document.getElementById('deleteNode').addEventListener('click', deleteNode);

    update();
});
