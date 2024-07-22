document.addEventListener('DOMContentLoaded', () => {
    const editor = new UniversitasAICodeEditor();
    editor.init();
});

class UniversitasAICodeEditor {
    constructor() {
        this.code = '// Enter your code here';
        this.output = '';
        this.theme = 'light';
        this.language = 'javascript';
        this.frameworks = [];
        this.aiMessage = '';
        this.aiResponse = '';
        this.autoSave = true;
        this.fontSize = 14;
        this.showMinimap = false;
        this.activeTab = 'code';

        this.languages = ['javascript', 'python', 'html', 'css', 'react', 'vue', 'node', 'neo4j', 'c#', 'c++', 'rust'];
        this.frameworkOptions = ['React', 'Vue.js', 'Node.js', 'TensorFlow', 'PyTorch'];
    }

    init() {
        this.cacheDOM();
        this.bindEvents();
        this.populateSelects();
        this.updateDateTime();
        this.renderCode();
        setInterval(() => this.updateDateTime(), 1000);
        lucide.createIcons();
    }

    cacheDOM() {
        this.container = document.getElementById('editor-container');
        this.codeEditor = document.getElementById('code-editor');
        this.codeContent = document.getElementById('code-content');
        this.outputArea = document.getElementById('output-area');
        this.aiInput = document.getElementById('ai-input');
        this.aiResponseArea = document.getElementById('ai-response');
        this.languageSelect = document.getElementById('language-select');
        this.fontSizeSelect = document.getElementById('font-size-select');
        this.minimapToggle = document.getElementById('minimap-toggle');
        this.minimap = document.getElementById('minimap');
        this.dateTimeDisplay = document.getElementById('current-date-time');
        this.themeToggle = document.getElementById('theme-toggle');
        this.saveBtn = document.getElementById('save-btn');
        this.shareBtn = document.getElementById('share-btn');
        this.runBtn = document.getElementById('run-btn');
        this.aiChatBtn = document.getElementById('ai-chat-btn');
        this.autoSaveSwitch = document.getElementById('auto-save');
        this.tabs = document.querySelectorAll('.tab');
        this.tabContents = document.querySelectorAll('.tab-content');
        this.frameworksBtn = document.getElementById('frameworks-btn');
        this.frameworksPopover = document.getElementById('frameworks-popover');
        this.settingsBtn = document.getElementById('settings-btn');
        this.settingsPopover = document.getElementById('settings-popover');
    }

    bindEvents() {
        this.codeEditor.addEventListener('input', () => this.handleCodeChange());
        this.themeToggle.addEventListener('click', () => this.toggleTheme());
        this.saveBtn.addEventListener('click', () => this.handleSave());
        this.shareBtn.addEventListener('click', () => this.handleShare());
        this.runBtn.addEventListener('click', () => this.handleRun());
        this.aiChatBtn.addEventListener('click', () => this.handleAIChat());
        this.languageSelect.addEventListener('change', (e) => this.setLanguage(e.target.value));
        this.fontSizeSelect.addEventListener('change', (e) => this.setFontSize(e.target.value));
        this.minimapToggle.addEventListener('click', () => this.toggleMinimap());
        this.autoSaveSwitch.addEventListener('change', (e) => this.setAutoSave(e.target.checked));
        this.tabs.forEach(tab => tab.addEventListener('click', (e) => this.setActiveTab(e.target.dataset.tab)));
        this.frameworksBtn.addEventListener('click', () => this.toggleFrameworksPopover());
        this.settingsBtn.addEventListener('click', () => this.toggleSettingsPopover());
    }

    populateSelects() {
        this.languages.forEach(lang => {
            const option = document.createElement('option');
            option.value = lang;
            option.textContent = lang;
            this.languageSelect.appendChild(option);
        });

        [12, 14, 16, 18, 20].forEach(size => {
            const option = document.createElement('option');
            option.value = size;
            option.textContent = `${size}px`;
            this.fontSizeSelect.appendChild(option);
        });

        this.frameworkOptions.forEach(fw => {
            const div = document.createElement('div');
            div.className = 'flex items-center space-x-2';
            div.innerHTML = `
                <input type="checkbox" id="${fw}" class="switch">
                <label for="${fw}">${fw}</label>
            `;
            this.frameworksPopover.appendChild(div);
            div.querySelector('input').addEventListener('change', (e) => this.toggleFramework(fw, e.target.checked));
        });
    }

    updateDateTime() {
        this.dateTimeDisplay.textContent = new Date().toLocaleString();
    }

    renderCode() {
        this.codeEditor.value = this.code;
        this.codeContent.textContent = this.code;
        this.updateMinimap();
    }

    handleCodeChange() {
        this.code = this.codeEditor.value;
        this.codeContent.textContent = this.code;
        this.updateMinimap();
        if (this.autoSave) {
            clearTimeout(this.saveTimer);
            this.saveTimer = setTimeout(() => this.handleSave(), 5000);
        }
    }

    toggleTheme() {
        this.theme = this.theme === 'light' ? 'dark' : 'light';
        document.body.classList.toggle('dark-mode');
        this.themeToggle.innerHTML = this.theme === 'light' 
            ? '<i data-lucide="moon"></i>' 
            : '<i data-lucide="sun"></i>';
        lucide.createIcons();
    }

    handleSave() {
        console.log('Saving project...');
    }

    handleShare() {
        console.log('Sharing project...');
    }

    handleRun() {
        this.output = `Executing ${this.language} code...\n${this.code}\n\nOutput: Code executed successfully!`;
        this.outputArea.textContent = this.output;
        this.setActiveTab('output');
    }

    handleAIChat() {
        this.aiResponse = `Your AI Engineer: Here's a suggestion for your ${this.language} code:\n\n${this.aiInput.value}\n\nWould you like me to explain any part of this code?`;
        this.aiResponseArea.textContent = this.aiResponse;
        this.setActiveTab('ai');
    }

    setLanguage(lang) {
        this.language = lang;
    }

    setFontSize(size) {
        this.fontSize = parseInt(size);
        this.codeEditor.style.fontSize = `${this.fontSize}px`;
        this.codeContent.style.fontSize = `${this.fontSize}px`;
        this.updateMinimap();
    }

    toggleMinimap() {
        this.showMinimap = !this.showMinimap;
        this.minimap.classList.toggle('hidden', !this.showMinimap);
        this.minimapToggle.classList.toggle('bg-blue-500', this.showMinimap);
        this.minimapToggle.classList.toggle('text-white', this.showMinimap);
        this.minimapToggle.innerHTML = this.showMinimap 
            ? '<i data-lucide="x"></i>' 
            : '<i data-lucide="folder-open"></i>';
        lucide.createIcons();
        this.updateMinimap();
    }

    updateMinimap() {
        if (this.showMinimap) {
            this.minimap.textContent = this.code;
        }
    }

    setAutoSave(value) {
        this.autoSave = value;
    }

    setActiveTab(tab) {
        this.activeTab = tab;
        this.tabs.forEach(t => t.classList.toggle('active', t.dataset.tab === tab));
        this.tabContents.forEach(c => c.classList.toggle('active', c.id === `${tab}-tab`));
    }

    toggleFrameworksPopover() {
        this.frameworksPopover.classList.toggle('hidden');
    }

    toggleSettingsPopover() {
        this.settingsPopover.classList.toggle('hidden');
    }

    toggleFramework(framework, isChecked) {
        if (isChecked) {
            this.frameworks.push(framework);
        } else {
            this.frameworks = this.frameworks.filter(f => f !== framework);
        }
        console.log('Selected frameworks:', this.frameworks);
    }
}
