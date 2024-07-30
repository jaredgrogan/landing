// Dependencies: d3.js
document.addEventListener('DOMContentLoaded', () => {
    const svg = d3.select("#neural-network-diagram");
    const width = svg.attr("width", "100%").node().getBoundingClientRect().width;
    const height = svg.attr("height", 600).node().getBoundingClientRect().height;

    const zoom = d3.zoom()
        .scaleExtent([0.5, 5])
        .on("zoom", (event) => {
            svg.attr("transform", event.transform);
        });

    svg.call(zoom);

    function createNode(id, layer, x, y) {
        svg.append("circle")
            .attr("class", "node")
            .attr("data-id", id)
            .attr("data-layer", layer)
            .attr("cx", x)
            .attr("cy", y)
            .attr("r", 20)
            .on("mouseover", handleMouseOver)
            .on("mouseout", handleMouseOut);
    }

    function createLink(sourceId, targetId) {
        const source = d3.select(`.node[data-id="${sourceId}"]`);
        const target = d3.select(`.node[data-id="${targetId}"]`);
        
        svg.append("line")
            .attr("class", "link")
            .attr("x1", source.attr("cx"))
            .attr("y1", source.attr("cy"))
            .attr("x2", target.attr("cx"))
            .attr("y2", target.attr("cy"));
    }

    function handleMouseOver(event, d) {
        const tooltip = document.getElementById("tooltip");
        tooltip.innerHTML = `Node ${d.id}: ${d.layer} layer`;
        tooltip.style.display = 'block';
        tooltip.style.left = `${event.pageX}px`;
        tooltip.style.top = `${event.pageY}px`;
    }

    function handleMouseOut() {
        document.getElementById("tooltip").style.display = 'none';
    }

    document.getElementById('search').addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase();
        d3.selectAll('.node')
            .style('opacity', d => d.id.toString().includes(searchTerm) ? 1 : 0.2);
    });

    document.getElementById('layerFilter').addEventListener('change', function() {
        const filter = this.value;
        d3.selectAll('.node')
            .style('display', d => filter === 'all' || d.layer === filter ? 'block' : 'none');
    });

    document.getElementById('zoomIn').addEventListener('click', () => {
        zoom.scaleBy(d3.select('svg').transition().duration(750), 1.2);
    });

    document.getElementById('zoomOut').addEventListener('click', () => {
        zoom.scaleBy(d3.select('svg').transition().duration(750), 0.8);
    });

    document.getElementById('startSimulation').addEventListener('click', () => {
        simulateDataFlow();
    });

    function simulateDataFlow() {
        d3.selectAll('.link').each(function() {
            d3.select(this)
                .transition()
                .duration(2000)
                .attr('stroke-dasharray', '5,5')
                .attr('stroke-dashoffset', 10)
                .on('end', () => simulateDataFlow());
        });
    }
});
