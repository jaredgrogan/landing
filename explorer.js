// React components
const {
  useState,
  useEffect
} = React;

const {
  Moon,
  Sun,
  Search,
  Plus,
  Edit
} = lucide;

// UI components (replace with plain HTML/CSS equivalents)
const Input = (props) => <input {...props} className="border border-gray-300 rounded px-2 py-1" />;
const Button = (props) => <button {...props} className="bg-blue-500 text-white px-4 py-2 rounded">{props.children}</button>;
const Card = (props) => <div {...props} className="bg-white shadow rounded p-4">{props.children}</div>;
const CardHeader = (props) => <div {...props} className="mb-2">{props.children}</div>;
const CardTitle = (props) => <h3 {...props} className="text-xl font-bold">{props.children}</h3>;
const CardContent = (props) => <div {...props}>{props.children}</div>;
const Select = (props) => <select {...props} className="border border-gray-300 rounded px-2 py-1">{props.children}</select>;
const SelectTrigger = (props) => <div {...props}>{props.children}</div>;
const SelectValue = (props) => <span {...props}>{props.children}</span>;
const SelectContent = (props) => <div {...props}>{props.children}</div>;
const SelectItem = (props) => <option {...props}>{props.children}</option>;
const Checkbox = (props) => <input type="checkbox" {...props} />;
const Dialog = (props) => <div {...props}>{props.children}</div>;
const DialogTrigger = (props) => <div {...props}>{props.children}</div>;
const DialogContent = (props) => <div {...props} className="bg-white shadow rounded p-4">{props.children}</div>;
const DialogHeader = (props) => <div {...props} className="mb-2">{props.children}</div>;
const DialogTitle = (props) => <h3 {...props} className="text-xl font-bold">{props.children}</h3>;
const DialogDescription = (props) => <p {...props}>{props.children}</p>;

const SimpleGraph = ({ nodes, links, darkMode, onNodeClick }) => {
  const [positions, setPositions] = useState({});

  useEffect(() => {
    const newPositions = {};
    const angleStep = (2 * Math.PI) / nodes.length;
    nodes.forEach((node, index) => {
      const angle = index * angleStep;
      newPositions[node.id] = {
        x: 400 + 300 * Math.cos(angle),
        y: 300 + 300 * Math.sin(angle)
      };
    });
    setPositions(newPositions);
  }, [nodes]);

  return (
    <svg width="800" height="600" style={{ backgroundColor: darkMode ? "#1a202c" : "#f7fafc" }}>
      {links.map((link, index) => (
        <line
          key={index}
          x1={positions[link.source]?.x}
          y1={positions[link.source]?.y}
          x2={positions[link.target]?.x}
          y2={positions[link.target]?.y}
          stroke={darkMode ? "#718096" : "#4A5568"}
          strokeWidth="1"
        />
      ))}
      {nodes.map((node) => (
        <g key={node.id} onClick={() => onNodeClick(node)}>
          <circle
            cx={positions[node.id]?.x}
            cy={positions[node.id]?.y}
            r="20"
            fill={node.color || "#4299E1"}
          />
          <text
            x={positions[node.id]?.x}
            y={positions[node.id]?.y}
            textAnchor="middle"
            dy=".3em"
            fill={darkMode ? "white" : "black"}
            fontSize="12"
          >
            {node.id}
          </text>
        </g>
      ))}
    </svg>
  );
};

const SearchAndFilter = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('');

  const handleSearch = () => {
    onSearch({ searchTerm, category });
  };

  return (
    <div className="space-y-4">
      <div className="flex space-x-2">
        <Input
          type="text"
          placeholder="Search concepts..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-grow"
        />
        <Button onClick={handleSearch}>
          <Search className="h-4 w-4 mr-2" />
          Search
        </Button>
      </div>
      <Select value={category} onValueChange={setCategory}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select category" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="ai">AI</SelectItem>
          <SelectItem value="ml">Machine Learning</SelectItem>
          <SelectItem value="dl">Deep Learning</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

const AddConceptForm = ({ onAdd, initialData = {} }) => {
  const [name, setName] = useState(initialData.id || '');
  const [description, setDescription] = useState(initialData.description || '');

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd({ id: name, description });
    setName('');
    setDescription('');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        placeholder="Concept Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <Input
        placeholder="Brief Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />
      <Button type="submit">
        {initialData.id ? 'Update Concept' : 'Add Concept'}
      </Button>
    </form>
  );
};

const Dashboard = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [graphData, setGraphData] = useState({ nodes: [], links: [] });
  const [selectedConcept, setSelectedConcept] = useState(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  useEffect(() => {
    const sampleData = {
      nodes: [
        { id: 'Artificial Intelligence', group: 1, categories: ['Computer Science', 'Cognitive Science'], systems: ['Expert Systems', 'Autonomous Systems'], labels: { system: true, process: true, visualizable: 'Partially' }, math: ['Logic', 'Probability theory'], metrics: ['Intelligence quotient (IQ)', 'Turing test performance'], homeostasis: ['Ethical AI guidelines (-)'], amplification: ['Recursive self-improvement in AI systems (+)'] },
        { id: 'Machine Learning', group: 2, categories: ['Artificial Intelligence', 'Data Science'] },
        { id: 'Deep Learning', group: 3, categories: ['Machine Learning', 'Neural Networks'], systems: ['Neural Network Architectures', 'GPU Clusters'], labels: { system: true, process: true, visualizable: true }, math: ['Tensor', 'Gradient', 'Backpropagation'], metrics: ['Layer depth', 'Number of parameters'], homeostasis: ['Batch normalization (-)', 'Dropout (-)'], amplification: ['Depth of networks (+)', 'Data augmentation (+)'] },
        { id: 'Natural Language Processing', group: 4, categories: ['Artificial Intelligence', 'Computational Linguistics'], systems: ['Machine Translation Systems', 'Chatbot Systems'], labels: { system: true, process: true, visualizable: 'Partially' }, math: ['Vector space models', 'Probabilistic language models'], metrics: ['BLEU score', 'Perplexity'], homeostasis: ['Vocabulary normalization (-)'], amplification: ['Attention mechanisms (+)'] },
        { id: 'Computer Vision', group: 5, categories: ['Artificial Intelligence', 'Image Processing'], systems: ['Image Recognition Systems', 'Object Detection Systems'], labels: { system: true, process: true, visualizable: true }, math: ['Convolution', 'Fourier transform'], metrics: ['Intersection over Union (IoU)', 'Mean Average Precision (mAP)'], homeostasis: ['Image normalization (-)'], amplification: ['Data augmentation techniques (+)'] },
        { id: 'Reinforcement Learning', group: 6, categories: ['Machine Learning', 'Decision Making'] },
        { id: 'Neural Networks', group: 7, categories: ['Machine Learning', 'Brain-Inspired Computing'] },
        { id: 'Convolutional Neural Networks', group: 8, categories: ['Deep Learning', 'Computer Vision'] },
        { id: 'Recurrent Neural Networks', group: 9, categories: ['Deep Learning', 'Sequence Modeling'] },
        { id: 'Generative Adversarial Networks', group: 10, categories: ['Deep Learning', 'Generative Models'] },
        { id: 'Transfer Learning', group: 11, categories: ['Machine Learning', 'Model Adaptation'] },
        { id: 'Ensemble Methods', group: 12, categories: ['Machine Learning', 'Model Combination'] },
        { id: 'Support Vector Machines', group: 13, categories: ['Machine Learning', 'Classification'] },
        { id: 'Decision Trees', group: 14, categories: ['Machine Learning', 'Supervised Learning'] },
        { id: 'Random Forests', group: 15, categories: ['Machine Learning', 'Ensemble Methods'] },
        { id: 'Gradient Boosting', group: 16, categories: ['Machine Learning', 'Ensemble Methods'] },
        { id: 'K-Means Clustering', group: 17, categories: ['Machine Learning', 'Unsupervised Learning'] },
        { id: 'Principal Component Analysis', group: 18, categories: ['Machine Learning', 'Dimensionality Reduction'] },
        { id: 'Autoencoders', group: 19, categories: ['Deep Learning', 'Dimensionality Reduction'] }
      ],
      links: [
        { source: 'Artificial Intelligence', target: 'Machine Learning' },
        { source: 'Machine Learning', target: 'Deep Learning' },
        { source: 'Artificial Intelligence', target: 'Natural Language Processing' },
        { source: 'Artificial Intelligence', target: 'Computer Vision' },
        { source: 'Machine Learning', target: 'Reinforcement Learning' },
        { source: 'Machine Learning', target: 'Neural Networks' },
        { source: 'Deep Learning', target: 'Convolutional Neural Networks' },
        { source: 'Deep Learning', target: 'Recurrent Neural Networks' },
        { source: 'Deep Learning', target: 'Generative Adversarial Networks' },
        { source: 'Machine Learning', target: 'Transfer Learning' },
        { source: 'Machine Learning', target: 'Ensemble Methods' },
        { source: 'Machine Learning', target: 'Support Vector Machines' },
        { source: 'Machine Learning', target: 'Decision Trees' },
        { source: 'Ensemble Methods', target: 'Random Forests' },
        { source: 'Ensemble Methods', target: 'Gradient Boosting' },
        { source: 'Machine Learning', target: 'K-Means Clustering' },
        { source: 'Machine Learning', target: 'Principal Component Analysis' },
        { source: 'Deep Learning', target: 'Autoencoders' }
      ]
    };
    setGraphData(sampleData);
  }, []);

  const handleSearch = (searchParams) => {
    console.log('Search params:', searchParams);
  };

  const handleNodeClick = (node) => {
    setSelectedConcept(node);
  };

  const handleAddConcept = (newConcept) => {
    setGraphData(prevData => ({
      nodes: [...prevData.nodes, { ...newConcept, group: prevData.nodes.length + 1 }],
      links: prevData.links
    }));
  };

  const handleUpdateConcept = (updatedConcept) => {
    setGraphData(prevData => ({
      nodes: prevData.nodes.map(node =>
        node.id === updatedConcept.id ? { ...node, ...updatedConcept } : node
      ),
      links: prevData.links
    }));
    setSelectedConcept(updatedConcept);
    setIsEditDialogOpen(false);
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'dark-mode' : ''}`}>
      <div className="container mx-auto p-4">
        <header className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Knowledge Graph Explorer</h1>
          <div className="flex items-center space-x-2">
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" size="icon">
                  <Plus className="h-[1.2rem] w-[1.2rem]" />
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add New Concept</DialogTitle>
<DialogDescription>
Enter the details of the new concept to add it to the knowledge graph.
</DialogDescription>
</DialogHeader>
<AddConceptForm onAdd={handleAddConcept} />
</DialogContent>
</Dialog>
<Button onClick={() => setDarkMode(!darkMode)} variant="outline" size="icon">
{darkMode ? <Sun className="h-[1.2rem] w-[1.2rem]" /> : <Moon className="h-[1.2rem] w-[1.2rem]" />}
</Button>
</div>
</header>
   <Card className="mb-4">
      <CardContent>
        <SearchAndFilter onSearch={handleSearch} />
      </CardContent>
    </Card>

    <div className="grid grid-container gap-4 mb-4">
      <Card>
        <CardHeader>
          <CardTitle>Total Concepts</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold">{graphData.nodes.length}</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Connections</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold">{graphData.links.length}</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Latest Update</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold">2023-07-27</p>
        </CardContent>
      </Card>
    </div>

    <Card className="mb-4">
      <CardContent className="p-0">
        <SimpleGraph
          nodes={graphData.nodes}
          links={graphData.links}
          darkMode={darkMode}
          onNodeClick={handleNodeClick}
        />
      </CardContent>
    </Card>

    {selectedConcept && (
      <Card className="mb-4">
        <CardHeader>
          <CardTitle className="flex justify-between items-center">
            {selectedConcept.id}
            <Button variant="outline" size="icon" onClick={() => setIsEditDialogOpen(true)}>
              <Edit className="h-4 w-4" />
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <p>{selectedConcept.description || "No description available."}</p>
            <div><strong>Categories:</strong> {selectedConcept.categories?.join(', ') || "No categories available."}</div>
            <div><strong>Systems:</strong> {selectedConcept.systems?.join(', ') || "No systems available."}</div>
            <div><strong>Labels:</strong> {Object.entries(selectedConcept.labels || {}).map(([key, value]) => `${key}: ${value}`).join(', ') || "No labels available."}</div>
            <div><strong>Math:</strong> {selectedConcept.math?.join(', ') || "No math available."}</div>
            <div><strong>Metrics:</strong> {selectedConcept.metrics?.join(', ') || "No metrics available."}</div>
            <div><strong>Homeostasis:</strong> {selectedConcept.homeostasis?.join(', ') || "No homeostasis available."}</div>
            <div><strong>Amplification:</strong> {selectedConcept.amplification?.join(', ') || "No amplification available."}</div>
          </div>
        </CardContent>
      </Card>
    )}

    <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Concept</DialogTitle>
          <DialogDescription>
            Update the details of the selected concept.
          </DialogDescription>
        </DialogHeader>
        <AddConceptForm onAdd={handleUpdateConcept} initialData={selectedConcept} />
      </DialogContent>
    </Dialog>
  </div>
</div>
);
};
