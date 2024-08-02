document.addEventListener('DOMContentLoaded', () => {
    const toggleDarkMode = document.getElementById('toggle-dark-mode');
    const body = document.body;
    const searchInput = document.getElementById('search-input');
    const conceptTitle = document.getElementById('concept-title');
    const conceptDescription = document.getElementById('concept-description');

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

    const definitions = {
        'Blockchain': 'Decentralized, distributed ledger technology recording transactions across a network of computers. It ensures data integrity and transparency through cryptographic hashing and consensus mechanisms, resistant to modification and applicable beyond cryptocurrencies.',
        'Ensemble Methods': 'Machine learning techniques combining multiple models to enhance predictive performance. They reduce overfitting and improve accuracy by aggregating predictions from diverse models, such as through bagging (e.g., Random Forests) or boosting (e.g., Gradient Boosting).',
        'Transformer Algorithms': 'Neural network architecture revolutionizing NLP tasks. It uses self-attention mechanisms to weigh input data importance, enabling parallel processing and capturing long-range dependencies. Key in advanced language models like BERT and GPT.',
        'Weights & Biases': 'Adjustable parameters in neural networks determining how input data is transformed. Weights represent connection strengths between neurons, while biases allow representation of patterns not passing through the origin. They\'re optimized during training to minimize the loss function.',
        'Reinforcement Learning': 'ML paradigm where agents learn optimal actions by interacting with an environment. It uses reward/penalty feedback to develop policies maximizing cumulative reward. Applied in game AI, robotics, and autonomous systems. Key concepts: policy, value function, exploration-exploitation.',
        'Attention Mechanism': 'Neural network technique allowing models to focus on specific parts of input when producing output. Crucial in sequence-to-sequence tasks like machine translation. It improves handling of long-range dependencies and provides interpretability of model decisions.',
        'Data Structures': 'Specialized formats for organizing, storing, and accessing data efficiently. They optimize algorithmic operations and memory usage. Common types include arrays, linked lists, stacks, queues, trees, and graphs. Choice of structure significantly impacts software performance and scalability.',
        'Backpropagation': 'Key algorithm for training neural networks, efficiently computing gradients of the loss function w.r.t. network weights. It propagates error backward through the network, applying the chain rule of calculus, enabling iterative weight updates and model learning.',
        'Gradient Descent': 'Optimization algorithm minimizing loss functions in ML models. It iteratively adjusts parameters in the direction of steepest descent of the loss function. Variants include stochastic (SGD), mini-batch, and adaptive methods like Adam. Fundamental to training many ML models.',
        'Software Architecture': 'High-level structure of a software system, defining components, relationships, and design principles. It involves strategic decisions about system organization, selection of structural elements, their interfaces, and composition into larger subsystems. Crucial for scalability and maintainability.',
        'Random Forests': 'Ensemble learning method constructing multiple decision trees during training. It outputs the mode (classification) or mean (regression) of individual trees. Uses bagging and random feature selection to create diverse trees, reducing overfitting and improving generalization.',
        'Decision Trees': 'Tree-like model of decisions and their consequences. Internal nodes represent feature tests, branches represent outcomes, and leaf nodes represent class labels or value predictions. Intuitive, interpretable, and form the basis for more complex models like Random Forests.',
        'Artificial Intelligence': 'Broad field of computer science focused on creating intelligent machines that can perform tasks requiring human-like intelligence. Encompasses areas such as learning, problem-solving, perception, language understanding, reasoning, and planning. Includes subfields like ML and neural networks.',
        'Computer Vision': 'AI field training computers to interpret and understand visual information. Involves developing algorithms to automatically extract, analyze, and understand useful information from images or videos. Applications include image recognition, object detection, and autonomous vehicles.',
        'NLP': 'Interdisciplinary field combining AI, computational linguistics, and computer science to process and analyze human language. Covers tasks such as speech recognition, machine translation, sentiment analysis, text summarization, and question answering systems.',
        'Convolutional Neural Networks': 'Deep learning architecture specialized for processing grid-like data, particularly effective for image analysis. Uses convolution operations to automatically and adaptively learn spatial hierarchies of features. Widely applied in computer vision tasks like image classification and object detection.',
        'Supervised Learning': 'ML paradigm where models learn from labeled training data to map inputs to outputs. Used for tasks like classification and regression. The goal is to learn a function that accurately predicts outputs for new, unseen inputs based on patterns in the training data.',
        'Unsupervised Learning': 'ML approach where models find patterns in unlabeled data. Aims to discover hidden structures or relationships within data. Common tasks include clustering, dimensionality reduction, and anomaly detection. Useful for exploratory data analysis and discovering underlying data patterns.',
        'LSTM': 'Recurrent neural network architecture designed to learn long-term dependencies. Uses gating mechanisms to selectively remember or forget information, addressing vanishing gradient problems. Effective for sequence prediction tasks with long intervals between important events.',
        'Recurrent Neural Networks': 'Neural networks with loops, allowing information persistence. Processes sequences by maintaining an internal state (memory). Suitable for tasks involving sequential data like time series prediction, speech recognition, and language modeling. Basis for more advanced architectures like LSTM.',
        'Cybernetics': 'Transdisciplinary approach studying regulatory systems, their structures, constraints, and possibilities. Focuses on how systems regulate themselves and make decisions. Applies to various fields including computer science, biology, and engineering. Relevant in understanding complex adaptive systems.',
        'Data Science': 'Interdisciplinary field using scientific methods, processes, algorithms, and systems to extract knowledge and insights from structured and unstructured data. Combines expertise from statistics, mathematics, and computer science with domain knowledge to analyze complex data and make predictions.',
        'Deep Learning': 'Subset of machine learning using artificial neural networks with multiple layers. These networks learn hierarchical representations of data, with each layer learning increasingly abstract features. Achieved state-of-the-art results in various tasks, especially in computer vision and NLP.',
        'Neural Networks': 'Computing systems inspired by biological neural networks. Consist of interconnected nodes (neurons) organized in layers. Can learn to perform tasks by considering examples, generally without task-specific programming. Foundation of many modern AI systems, particularly in deep learning.',
        'Machine Learning': 'AI subset developing algorithms and statistical models enabling computer systems to improve performance on a specific task through experience. Encompasses various approaches including supervised, unsupervised, and reinforcement learning. Widely used in data analysis and predictive modeling.',
        'GANs': 'Deep learning framework where two neural networks compete. The generator creates candidates while the discriminator evaluates them. This adversarial process drives both networks to improve, resulting in the generation of highly realistic synthetic data.',
        'Gradient Boosting': 'Ensemble ML technique for regression and classification. Builds a series of weak learners (typically decision trees) sequentially, each correcting errors of previous ones. Allows optimization of arbitrary differentiable loss functions, often resulting in highly accurate predictive models.',
        'Feature Engineering': 'Process of using domain knowledge to extract relevant features from raw data for ML algorithms. Involves selecting, manipulating, and transforming raw data into features that better represent the underlying problem to predictive models, improving model accuracy and performance.',
        'Loss Function': 'Mathematical function measuring the difference between predicted and actual outputs in ML models. Quantifies the model\'s performance and guides the learning process. Common types include mean squared error for regression and cross-entropy for classification. Minimized during model training.',
        'Image Segmentation': 'Computer vision task of partitioning a digital image into multiple segments or objects. Aims to simplify image representation for easier analysis. Crucial in many applications like medical imaging, autonomous driving, and facial recognition. Involves pixel classification and boundary detection.',
        'K-means Clustering': 'Unsupervised learning algorithm partitioning data into K clusters. Iteratively assigns data points to the nearest cluster centroid and updates centroids based on assigned points. Widely used for customer segmentation, image compression, and as a preprocessing step for other algorithms.',
        'Distributed Systems': 'Computing paradigm where components on networked computers communicate and coordinate actions by passing messages. Aims to improve performance, reliability, and scalability compared to single computers. Key challenges include maintaining consistency and handling network failures.',
        'Federated Learning': 'ML technique training algorithms across multiple decentralized devices or servers holding local data samples, without exchanging them. Addresses data privacy, security, and heterogeneity issues. Useful when data can\'t be centralized due to privacy concerns or regulations.',
        'Linear Algebra': 'Branch of mathematics concerning linear equations, linear functions, and their representations through matrices and vector spaces. Fundamental to many areas of mathematics and extensively applied in science and engineering. Crucial for understanding and implementing many ML algorithms.',
        'Regularization': 'Technique preventing overfitting in ML models by adding a penalty term to the loss function. Discourages learning overly complex models, preferring simpler ones that generalize better. Common methods include L1 (Lasso) and L2 (Ridge) regularization, penalizing absolute or squared coefficient magnitudes.',
        'Cloud Computing': 'On-demand delivery of computing resources over the internet with pay-as-you-go pricing. Provides access to servers, storage, databases, and applications without direct active management by the user. Offers faster innovation, flexible resources, and economies of scale.',
        'Containerization': 'Lightweight alternative to full machine virtualization, encapsulating an application with its own operating environment. Allows consistent application deployment across platforms with minimal overhead. Popular tools include Docker for containerization and Kubernetes for orchestration.',
        'Parallel Computing': 'Computational approach where many calculations are carried out simultaneously. Based on the principle that large problems can often be divided into smaller ones solved concurrently. Used in scientific simulations, complex computations, and big data processing to improve speed and efficiency.',
        'Data Pre-processing': 'Process of transforming raw data into a clean, appropriate format for analysis. Involves steps like data cleaning (handling missing values, removing duplicates), integration, transformation (normalization, encoding), and reduction. Critical for the success of many ML models.',
        'Load Balancing': 'Process of distributing network or application traffic across multiple servers. Ensures no single server bears too much demand, improving application responsiveness and availability. Crucial for high-traffic websites, applications, and large-scale computing operations to maintain performance and reliability.'
    };

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
