document.addEventListener('DOMContentLoaded', () => {
    const toggleDarkMode = document.getElementById('toggle-dark-mode');
    const body = document.body;

    toggleDarkMode.addEventListener('click', () => {
        body.classList.toggle('dark-mode');
        body.classList.toggle('light-mode');
    });

    const nodes = [
        { id: 'Blockchain', group: 1 },
        { id: 'Ensemble Methods', group: 2 },
        { id: 'Transformer Algorithms', group: 3 },
        { id: 'Weights & Biases', group: 4 },
        { id: 'Reinforcement Learning', group: 5 },
        { id: 'Attention Mechanism', group: 6 },
        { id: 'Data Structures', group: 7 },
        { id: 'Backpropagation', group: 8 },
        { id: 'Gradient Descent', group: 9 },
        { id: 'Software Architecture', group: 10 },
        { id: 'Random Forests', group: 11 },
        { id: 'Decision Trees', group: 12 },
        { id: 'Artificial Intelligence', group: 13 },
        { id: 'Computer Vision', group: 14 },
        { id: 'NLP', group: 15 },
        { id: 'Convolutional Neural Networks', group: 16 },
        { id: 'Supervised Learning', group: 17 },
        { id: 'Unsupervised Learning', group: 18 },
        { id: 'LSTM', group: 19 },
        { id: 'Recurrent Neural Networks', group: 20 },
        { id: 'Cybernetics', group: 21 },
        { id: 'Data Science', group: 22 },
        { id: 'Deep Learning', group: 23 },
        { id: 'Neural Networks', group: 24 },
        { id: 'Machine Learning', group: 25 },
        { id: 'GANs', group: 26 },
        { id: 'Gradient Boosting', group: 27 },
        { id: 'Feature Engineering', group: 28 },
        { id: 'Loss Function', group: 29 },
        { id: 'Image Segmentation', group: 30 },
        { id: 'K-means Clustering', group: 31 },
        { id: 'Distributed Systems', group: 32 },
        { id: 'Federated Learning', group: 33 },
        { id: 'Linear Algebra', group: 34 },
        { id: 'Regularization', group: 35 },
        { id: 'Cloud Computing', group: 36 },
        { id: 'Containerization', group: 37 },
        { id: 'Parallel Computing', group: 38 },
        { id: 'Data Pre-processing', group: 39 },
        { id: 'Load Balancing', group: 40 },
    ];

    const links = [
        { source: 'Blockchain', target: 'Ensemble Methods' },
        { source: 'Ensemble Methods', target: 'Transformer Algorithms' },
        { source: 'Transformer Algorithms', target: 'Weights & Biases' },
        { source: 'Weights & Biases', target: 'Reinforcement Learning' },
        { source: 'Reinforcement Learning', target: 'Blockchain' },
        { source: 'Attention Mechanism', target: 'Transformer Algorithms' },
        { source: 'Data Structures', target: 'Blockchain' },
        { source: 'Backpropagation', target: 'Weights & Biases' },
        { source: 'Gradient Descent', target: 'Backpropagation' },
        { source: 'Software Architecture', target: 'Artificial Intelligence' },
        { source: 'Random Forests', target: 'Decision Trees' },
        { source: 'Random Forests', target: 'Artificial Intelligence' },
        { source: 'Decision Trees', target: 'Artificial Intelligence' },
        { source: 'Computer Vision', target: 'Artificial Intelligence' },
        { source: 'NLP', target: 'Artificial Intelligence' },
        { source: 'Convolutional Neural Networks', target: 'Computer Vision' },
        { source: 'Convolutional Neural Networks', target: 'Artificial Intelligence' },
        { source: 'Supervised Learning', target: 'Artificial Intelligence' },
        { source: 'Unsupervised Learning', target: 'Artificial Intelligence' },
        { source: 'LSTM', target: 'Recurrent Neural Networks' },
        { source: 'Recurrent Neural Networks', target: 'Deep Learning' },
        { source: 'Cybernetics', target: 'Artificial Intelligence' },
        { source: 'Data Science', target: 'Artificial Intelligence' },
        { source: 'Deep Learning', target: 'Artificial Intelligence' },
        { source: 'Backpropagation', target: 'Deep Learning' },
        { source: 'Gradient Descent', target: 'Deep Learning' },
        { source: 'Convolutional Neural Networks', target: 'Deep Learning' },
        { source: 'NLP', target: 'Deep Learning' },
        { source: 'NLP', target: 'Transformer Algorithms' },
        { source: 'NLP', target: 'Attention Mechanism' },
        { source: 'Supervised Learning', target: 'Deep Learning' },
        { source: 'Unsupervised Learning', target: 'Deep Learning' },
        { source: 'LSTM', target: 'Deep Learning' },
        { source: 'Data Science', target: 'Deep Learning' },
        { source: 'Neural Networks', target: 'Deep Learning' },
        { source: 'Neural Networks', target: 'Artificial Intelligence' },
        { source: 'Machine Learning', target: 'Artificial Intelligence' },
        { source: 'Machine Learning', target: 'Data Science' },
        { source: 'GANs', target: 'Deep Learning' },
        { source: 'Gradient Boosting', target: 'Machine Learning' },
        { source: 'Feature Engineering', target: 'Machine Learning' },
        { source: 'Loss Function', target: 'Deep Learning' },
        { source: 'Loss Function', target: 'Machine Learning' },
        { source: 'Image Segmentation', target: 'Computer Vision' },
        { source: 'K-means Clustering', target: 'Unsupervised Learning' },
        { source: 'Distributed Systems', target: 'Software Architecture' },
        { source: 'Federated Learning', target: 'Machine Learning' },
        { source: 'Federated Learning', target: 'Distributed Systems' },
        { source: 'Linear Algebra', target: 'Machine Learning' },
        { source: 'Linear Algebra', target: 'Deep Learning' },
        { source: 'Regularization', target: 'Machine Learning' },
        { source: 'Regularization', target: 'Deep Learning' },
        { source: 'Cloud Computing', target: 'Distributed Systems' },
        { source: 'Cloud Computing', target: 'Software Architecture' },
        { source: 'Containerization', target: 'Cloud Computing' },
        { source: 'Containerization', target: 'Software Architecture' },
        { source: 'Parallel Computing', target: 'Distributed Systems' },
        { source: 'Parallel Computing', target: 'Cloud Computing' },
        { source: 'Data Pre-processing', target: 'Machine Learning' },
        { source: 'Data Pre-processing', target: 'Data Science' },
        { source: 'Load Balancing', target: 'Distributed Systems' },
        { source: 'Load Balancing', target: 'Cloud Computing' },
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
        });

    node.append("title")
        .text(d => d.id);

    simulation.on("tick", () => {
        link
            .attr("x1", d => d.source.x)
            .attr("y1", d => d.source.y)
            .attr("x2", d => d.target.x)
            .attr("y2", d => d.target.y);

        node
            .attr("cx", d => d.x)
            .attr("cy", d => d.y);
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
