const App = () => {
  const [isDarkMode, setIsDarkMode] = React.useState(false);
  const [activeTab, setActiveTab] = React.useState('NL Python');
  const [nlPrompt, setNlPrompt] = React.useState('');
  const [generatedCode, setGeneratedCode] = React.useState('');
  const [selectedDataset, setSelectedDataset] = React.useState('');
  const [selectedLibrary, setSelectedLibrary] = React.useState('');
  const [code, setCode] = React.useState('# Write your AI code here\n\n');
  const [output, setOutput] = React.useState('');
  const [heraklesPrompt, setHeraklesPrompt] = React.useState('');
  const [heraklesHint, setHeraklesHint] = React.useState('');
  const [selectedProject, setSelectedProject] = React.useState('');
  const [modelSummary, setModelSummary] = React.useState('');

  const toggleTheme = () => setIsDarkMode(!isDarkMode);

  const navItems = [
    { name: 'NL Python', icon: '⌨️' },
    { name: 'Run & Preview', icon: '▶️' },
    { name: 'Neural Cloud', icon: '☁️' },
    { name: 'Project Generator', icon: '🔧' },
  ];

  const datasets = [
    'MNIST', 'CIFAR-10', 'ImageNet', 'COCO', 'Pascal VOC',
    'WikiText-103', 'Amazon Reviews', 'Sentiment140', 'UCI HAR', 'Boston Housing'
  ];
  
  const libraries = [
    'TensorFlow', 'PyTorch', 'Scikit-learn', 'Keras', 'XGBoost',
    'LightGBM', 'Pandas', 'NumPy', 'SciPy', 'Matplotlib'
  ];

  const projectTypes = [
    'Neural Networks', 'Data Visualizers', 'Research Assistants', 'Computer Vision',
    'Image Generation', 'NLP Assistant', 'Web Scraping', 'Automation Scripts',
    'Game Development', 'Machine Learning Models'
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'NL Python':
        return (
          <div>
            <h2>NL Python</h2>
            <input
              className="input"
              placeholder="Enter your natural language prompt..."
              value={nlPrompt}
              onChange={(e) => setNlPrompt(e.target.value)}
            />
            <button className="button" onClick={() => setGeneratedCode('// Generated code will appear here')}>
              Code Generator
            </button>
            <pre>{generatedCode}</pre>
          </div>
        );
      case 'Run & Preview':
        return (
          <div>
            <h2>Run & Preview</h2>
            <select
              className="select"
              value={selectedDataset}
              onChange={(e) => setSelectedDataset(e.target.value)}
            >
              <option value="">Select Dataset</option>
              {datasets.map(dataset => (
                <option key={dataset} value={dataset}>{dataset}</option>
              ))}
            </select>
            <select
              className="select"
              value={selectedLibrary}
              onChange={(e) => setSelectedLibrary(e.target.value)}
            >
              <option value="">Select Library</option>
              {libraries.map(library => (
                <option key={library} value={library}>{library}</option>
              ))}
            </select>
            <pre>{code}</pre>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <button className="button" onClick={() => setOutput('Code executed successfully!')}>
                Run Code
              </button>
              <button className="button" onClick={() => console.log('Exporting...')}>
                Export
              </button>
            </div>
            <pre>{output}</pre>
          </div>
        );
      case 'Neural Cloud':
        return (
          <div>
            <h2>Neural Cloud Code Bank</h2>
            <select
              className="select"
              value={selectedProject}
              onChange={(e) => setSelectedProject(e.target.value)}
            >
              <option value="">Select Neural Component</option>
              {projectTypes.map(project => (
                <option key={project} value={project}>{project}</option>
              ))}
            </select>
            <h3>Code Bank</h3>
            <pre>Code Library Assets Appear Here</pre>
          </div>
        );
      case 'Project Generator':
        return (
          <div>
            <h2>Project Generator</h2>
            <select
              className="select"
              value={selectedProject}
              onChange={(e) => setSelectedProject(e.target.value)}
            >
              <option value="">Select Project Type</option>
              {projectTypes.map(project => (
                <option key={project} value={project}>{project}</option>
              ))}
            </select>
            <button className="button" onClick={() => setModelSummary('Generated project idea will appear here')}>
              Generate Project Idea
            </button>
            <p>{modelSummary}</p>
            <p>Prompt Engineering Work Plan will appear here to Build the Project with Herakles.</p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className={`container ${isDarkMode ? 'dark-mode' : 'light-mode'}`}>
      <header className="header">
        <div className="header-top">
          <div className="logo">
            <div className="logo-icon">U</div>
            <div className="title">Universitas AI</div>
            <div className="tagline">AI Lab</div>
          </div>
          <button className="button" onClick={toggleTheme}>
            {isDarkMode ? '☀️' : '🌙'}
          </button>
        </div>
        <div className="date-time">{new Date().toLocaleString()}</div>
      </header>

      <div className="content">
        <nav className="nav">
          {navItems.map((item) => (
            <div
              key={item.name}
              className={`nav-item ${activeTab === item.name ? 'active' : ''}`}
              onClick={() => setActiveTab(item.name)}
            >
              {item.icon}
              <span style={{ marginLeft: '10px' }}>{item.name}</span>
            </div>
          ))}
        </nav>

        <main className="main-content">
          {renderContent()}
        </main>
      </div>

      <footer className="footer">
        <div className="herakles-prompt">
          <input
            className="input"
            style={{ flex: 1, marginRight: '10px' }}
            placeholder="Ask Herakles - Super Intelligent Assistant"
            value={heraklesPrompt}
            onChange={(e) => setHeraklesPrompt(e.target.value)}
          />
          <button className="button" onClick={() => setHeraklesHint('Herakles is thinking...')}>
            Chat
          </button>
        </div>
        <div className="footer-buttons">
          <button className="footer-button">
            📁
            <div>Projects</div>
          </button>
          <button className="footer-button">
            🔧
            <div>Tools</div>
          </button>
          <button className="footer-button">
            📊
            <div>Dashboard</div>
          </button>
        </div>
      </footer>

      <div className="copyright">
        © 2024 Universitas AI
      </div>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
