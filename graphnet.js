document.addEventListener('DOMContentLoaded', () => {
    const toggleDarkMode = document.getElementById('toggle-dark-mode');
    const body = document.body;
    const dayIcon = document.getElementById('day-icon');
    const nightIcon = document.getElementById('night-icon');
    const searchInput = document.getElementById('search-input');
    const conceptTitle = document.getElementById('concept-title');
    const conceptDescription = document.getElementById('concept-description');

    toggleDarkMode.addEventListener('click', () => {
        body.classList.toggle('dark-mode');
        body.classList.toggle('light-mode');
        if (body.classList.contains('dark-mode')) {
            dayIcon.style.display = 'none';
            nightIcon.style.display = 'block';
        } else {
            dayIcon.style.display = 'block';
            nightIcon.style.display = 'none';
        }
    });

    const nodes = [
        // ... (nodes array)
    ];

    const definitions = {
        // ... (definitions object)
    };

    const links = [
        // ... (links array)
    ];

    const width = 960;
    const height = 600;

    const svg = d3.select("#knowledge-graph")
        .attr("width", width)
        .attr("height", height)
        .call(d3.zoom().on("zoom", ({ transform }) => {
            svg.attr("transform", transform);
        }))
        .append("g");

    const simulation = d3.forceSimulation(nodes)
        .force("link", d3.forceLink(links).id(d => d.id).distance(150))
        .force("charge", d3.forceManyBody().strength(-300))
        .force("center", d3.forceCenter(width / 2, height / 2));

    const link = svg.append("g")
        .attr("stroke", "#999")
        .attr("stroke-opacity", 0.6)
        .selectAll("line")
        .data(links)
        .enter().append("line")
        .attr("stroke-width", 1.5);

    const node = svg.append("g")
        .attr("stroke", "#fff")
        .attr("stroke-width", 1.5)
        .selectAll("circle")
        .data(nodes)
        .enter().append("circle")
        .attr("r", 10)
        .attr("fill", d => color(d.group))
        .call(d3.drag()
            .on("start", dragstarted)
            .on("drag", dragged)
            .on("end", dragended))
        .on("mouseover", function() {
            d3.select(this).transition()
                .duration(200)
                .attr("r", 15);
        })
        .on("mouseout", function() {
            d3.select(this).transition()
                .duration(200)
                .attr("r", 10);
        })
        .on("click", function(event, d) {
            conceptTitle.textContent = d.id;
            conceptDescription.textContent = definitions[d.id] || "No description available.";
        });

    node.append("title")
        .text(d => d.id);

    const text = svg.append("g")
        .selectAll("text")
        .data(nodes)
        .enter().append("text")
        .attr("x", d => d.x + 10)
        .attr("y", d => d.y + 3)
        .text(d => d.id)
        .attr("font-size", 10)
        .attr("fill", "#333");

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
            .attr("x", d => d.x + 10)
            .attr("y", d => d.y + 3);
    });

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

    function color(group) {
        const scale = d3.scaleOrdinal(d3.schemeCategory10);
        return scale(group);
    }

    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            const searchTerm = searchInput.value.toLowerCase();
            const node = nodes.find(n => n.id.toLowerCase() === searchTerm);
            if (node) {
                conceptTitle.textContent = node.id;
                conceptDescription.textContent = definitions[node.id] || "No description available.";
                svg.transition().duration(750).call(
                    d3.zoom().transform,
                    d3.zoomIdentity.translate(width / 2, height / 2).scale(1.5).translate(-node.x, -node.y)
                );
            } else {
                conceptTitle.textContent = "No results found";
                conceptDescription.textContent = "";
            }
        }
    });

    const chatContainer = document.getElementById('chat-container');
    const chatHeader = document.getElementById('chat-header');
    const chatBody = document.getElementById('chat-body');
    const chatInput = document.getElementById('chat-input');

    chatHeader.addEventListener('click', () => {
        if (chatContainer.style.height === '40px') {
            chatContainer.style.height = '400px';
            chatBody.style.display = 'block';
            chatInput.style.display = 'block';
        } else {
            chatContainer.style.height = '40px';
            chatBody.style.display = 'none';
            chatInput.style.display = 'none';
        }
    });

    chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && chatInput.value.trim() !== '') {
            const userMessage = document.createElement('div');
            userMessage.classList.add('user-message');
            userMessage.textContent = chatInput.value;
            chatBody.appendChild(userMessage);

            // Placeholder for LLM response
            const botMessage = document.createElement('div');
            botMessage.classList.add('bot-message');
            botMessage.textContent = 'LLM response here...';
            chatBody.appendChild(botMessage);

            chatInput.value = '';
            chatBody.scrollTop = chatBody.scrollHeight;
        }
    });
});
