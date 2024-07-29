document.addEventListener('DOMContentLoaded', () => {
    const nightModeToggle = document.getElementById('nightModeToggle');
    const nightIcon = document.getElementById('nightIcon');
    const dayIcon = document.getElementById('dayIcon');
    const languageSelect = document.getElementById('languageSelect');
    const fileUpload = document.getElementById('file-upload');
    const uploadBtn = document.getElementById('upload-btn');
    const queryText = document.getElementById('query-text');
    const submitQuery = document.getElementById('submit-query');
    const ragResponse = document.getElementById('rag-response');
    const relevanceThreshold = document.getElementById('relevance-threshold');
    const numDocuments = document.getElementById('num-documents');
    const documentList = document.getElementById('document-list');
    const relevanceChart = document.getElementById('relevance-chart');

    // Language translations
    const translations = {
        en: {
            home: 'Home',
            ragAssistant: 'RAG Assistant',
            documents: 'Documents',
            settings: 'Settings',
            uploadDocuments: 'Upload Documents',
            askQuestion: 'Ask a Question',
            results: 'Results',
            ragConfiguration: 'RAG Configuration',
            relevanceThreshold: 'Relevance Threshold:',
            numDocuments: 'Number of Retrieved Documents:',
            documentCollection: 'Document Collection',
            retrievalVisualization: 'Retrieval Process Visualization',
            upload: 'Upload',
            submit: 'Submit'
        },
        // Add translations for other languages here
    };

    function updateLanguage(lang) {
        const t = translations[lang];
        document.getElementById('nav-home').textContent = t.home;
        document.getElementById('nav-rag').textContent = t.ragAssistant;
        document.getElementById('nav-documents').textContent = t.documents;
        document.getElementById('nav-settings').textContent = t.settings;
        document.querySelector('#document-upload h2').textContent = t.uploadDocuments;
        document.querySelector('#query-input h2').textContent = t.askQuestion;
        document.querySelector('#results-display h2').textContent = t.results;
        document.querySelector('#rag-config h2').textContent = t.ragConfiguration;
        document.querySelector('label[for="relevance-threshold"]').textContent = t.relevanceThreshold;
        document.querySelector('label[for="num-documents"]').textContent = t.numDocuments;
        document.querySelector('#document-management h2').textContent = t.documentCollection;
        document.querySelector('#retrieval-visualization h2').textContent = t.retrievalVisualization;
        uploadBtn.textContent = t.upload;
        submitQuery.textContent = t.submit;
    }

    languageSelect.addEventListener('change', (event) => {
        updateLanguage(event.target.value);
    });

    nightModeToggle.addEventListener('click', () => {
        document.body.classList.toggle('night-mode');
        const isNightMode = document.body.classList.contains('night-mode');
        nightIcon.style.display = isNightMode ? 'none' : 'inline-block';
        dayIcon.style.display = isNightMode ? 'inline-block' : 'none';
        localStorage.setItem('nightMode', isNightMode);
    });

    // Check for saved night mode preference
    const savedNightMode = localStorage.getItem('nightMode');
    if (savedNightMode === 'true') {
        document.body.classList.add('night-mode');
        nightIcon.style.display = 'none';
        dayIcon.style.display = 'inline-block';
    }

    uploadBtn.addEventListener('click', () => {
        const files = fileUpload.files;
        // Here you would implement the document upload functionality
        for (let file of files) {
            const li = document.createElement('li');
            li.textContent = file.name;
            documentList.appendChild(li);
        }
    });

    submitQuery.addEventListener('click', () => {
        const query = queryText.value;
        const threshold = relevanceThreshold.value;
        const numDocs = numDocuments.value;
        // Here you would implement the RAG query functionality
        ragResponse.textContent = `Processing query: "${query}" with relevance threshold ${threshold} and ${numDocs} documents.`;
        updateVisualization();
    });

    function updateVisualization() {
        // This is a placeholder for the visualization update
        // You would implement actual visualization based on your RAG process
        const ctx = relevanceChart.getContext('2d');
        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['Doc1', 'Doc2', 'Doc3', 'Doc4', 'Doc5'],
                datasets: [{
                    label: 'Document Relevance',
                    data: [0.9, 0.7, 0.5, 0.3, 0.1],
                    backgroundColor: 'rgba(75, 192, 192, 0.6)'
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true,
                        max: 1
                    }
                }
            }
        });
    }

    // Initial language set
    updateLanguage(languageSelect.value);
});
