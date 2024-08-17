// Translations
const translations = {
    en: {
        aiGreeting: "Hi, I'm Herakles — Your AI Assistant. What do you want to learn?",
        summarize: "Summarize",
        bullets: "Bullets",
        explain: "Explain",
        explainConcepts: "Explain Concepts",
        stepByStep: "Step by Step",
        glossary: "Glossary",
        analyze: "Analyze",
        evaluate: "Evaluate",
        improvements: "Improvements",
        extractDetails: "Extract Details",
        actions: "Actions",
        nextActions: "Next Actions",
        actionPlan: "Action Plan",
        webSearch: "Web Search",
        resources: "Resources",
        quiz: "Quiz",
        newChat: "New Chat",
        messagePlaceholder: "Type a message...",
        navMenu: "Menu",
        navApps: "Apps",
        navLearn: "Learn",
        errorMessage: "An error occurred. Please try again.",
        browserNotSupported: "Your browser does not support audio recording",
        microphoneError: "Error accessing microphone. Please check your settings and try again.",
        offlineMessage: "You are currently offline. Some features may not be available.",
        chatHistory: "Chat History",
        languageName: "In English"
    },
    // Add other languages here...
};

// Global variables
let language = 'en';
let isDarkMode = false;
let isRecording = false;
let currentChatId = null;

// DOM Elements
const app = document.getElementById('app');
const chatBox = document.getElementById('chatBox');
const messageInput = document.getElementById('messageInput');
const sendMessageBtn = document.getElementById('sendMessageBtn');
const voiceInputBtn = document.getElementById('voiceInputBtn');
const attachmentBtn = document.getElementById('attachmentBtn');
const fileInput = document.getElementById('fileInput');
const darkModeBtn = document.getElementById('darkModeBtn');
const darkModeIcon = document.getElementById('darkModeIcon');
const languageSelect = document.getElementById('languageSelect');
const newChatBtn = document.getElementById('newChatBtn');
const sidebar = document.getElementById('sidebar');
const sidebarToggle = document.getElementById('sidebarToggle');
const closeSidebarBtn = document.getElementById('closeSidebarBtn');
const chatList = document.getElementById('chatList');

// History Sidebar Class
class HistorySidebar {
    constructor() {
        this.searchInput = document.getElementById('sidebarSearch');
        this.folderList = document.getElementById('folderList');
        this.chatList = document.getElementById('chatList');
        this.newFolderBtn = document.getElementById('newFolderBtn');

        this.initEventListeners();
        this.loadFolders();
        this.loadChats();
    }

    initEventListeners() {
        this.searchInput.addEventListener('input', this.handleSearch.bind(this));
        this.newFolderBtn.addEventListener('click', this.createNewFolder.bind(this));
    }

    handleSearch() {
        const query = this.searchInput.value.toLowerCase();
        const chatItems = this.chatList.querySelectorAll('.chat-item');
        chatItems.forEach(item => {
            const text = item.textContent.toLowerCase();
            item.style.display = text.includes(query) ? 'flex' : 'none';
        });
    }

    async createNewFolder() {
        const folderName = prompt('Enter folder name:');
        if (folderName) {
            await this.saveFolder(folderName);
            this.loadFolders();
        }
    }

    async saveFolder(name) {
        const folders = await this.getFolders();
        folders.push({ id: Date.now(), name });
        localStorage.setItem('chatFolders', JSON.stringify(folders));
    }

    async getFolders() {
        const folders = localStorage.getItem('chatFolders');
        return folders ? JSON.parse(folders) : [];
    }

    async loadFolders() {
        const folders = await this.getFolders();
        this.folderList.innerHTML = folders.map(folder => `
            <li class="folder-item" data-id="${folder.id}">
                <span>${folder.name}</span>
                <button class="delete-folder">×</button>
            </li>
        `).join('');

        this.folderList.querySelectorAll('.delete-folder').forEach(btn => {
            btn.addEventListener('click', (e) => this.deleteFolder(e));
        });
    }

    async deleteFolder(e) {
        e.stopPropagation();
        const folderId = e.target.closest('.folder-item').dataset.id;
        const folders = await this.getFolders();
        const updatedFolders = folders.filter(folder => folder.id !== parseInt(folderId));
        localStorage.setItem('chatFolders', JSON.stringify(updatedFolders));
        this.loadFolders();
    }

    loadChats() {
        const chats = this.getChats();
        this.chatList.innerHTML = chats.map(chat => `
            <div class="chat-item" data-id="${chat.id}">
                <span>${chat.title}</span>
                <div class="chat-item-actions">
                    <button class="star-chat"><i class="fas fa-star"></i></button>
                    <button class="delete-chat"><i class="fas fa-trash"></i></button>
                    <button class="share-chat"><i class="fas fa-share"></i></button>
                </div>
            </div>
        `).join('');

        this.chatList.querySelectorAll('.star-chat').forEach(btn => {
            btn.addEventListener('click', (e) => this.starChat(e));
        });

        this.chatList.querySelectorAll('.delete-chat').forEach(btn => {
            btn.addEventListener('click', (e) => this.deleteChat(e));
        });

     this.chatList.querySelectorAll('.share-chat').forEach(btn => {
            btn.addEventListener('click', (e) => this.shareChat(e));
        });
    }

    getChats() {
        // This is a placeholder. In a real implementation, you'd fetch chats from IndexedDB or another storage mechanism.
        return [
            { id: 1, title: 'Chat 1' },
            { id: 2, title: 'Chat 2' },
            { id: 3, title: 'Chat 3' },
        ];
    }

    starChat(e) {
        const chatId = e.target.closest('.chat-item').dataset.id;
        console.log(`Star chat ${chatId}`);
        // Implement star functionality
    }

    deleteChat(e) {
        const chatId = e.target.closest('.chat-item').dataset.id;
        console.log(`Delete chat ${chatId}`);
        // Implement delete functionality
    }

    shareChat(e) {
        const chatId = e.target.closest('.chat-item').dataset.id;
        console.log(`Share chat ${chatId}`);
        // Implement share functionality
    }
}

// Speech Synthesis Class
class SpeechSynthesizer {
    constructor() {
        this.synth = window.speechSynthesis;
        this.voices = [];
        this.utterance = null;
        this.voiceSelect = document.getElementById('voiceSelect');
        this.rateRange = document.getElementById('rateRange');
        this.rateValue = document.getElementById('rateValue');
        this.pauseResume = document.getElementById('pauseResume');
        this.stop = document.getElementById('stop');
        this.speechControls = document.getElementById('speechControls');

        this.initVoices();
        this.initEventListeners();
    }

    initVoices() {
        this.voices = this.synth.getVoices();
        this.voiceSelect.innerHTML = this.voices.map((voice, index) =>
            `<option value="${index}">${voice.name} (${voice.lang})</option>`
        ).join('');
    }

    initEventListeners() {
        this.voiceSelect.addEventListener('change', () => this.setVoice());
        this.rateRange.addEventListener('input', () => this.setRate());
        this.pauseResume.addEventListener('click', () => this.togglePauseResume());
        this.stop.addEventListener('click', () => this.stopSpeaking());

        // Chrome loads voices asynchronously
        if (speechSynthesis.onvoiceschanged !== undefined) {
            speechSynthesis.onvoiceschanged = () => this.initVoices();
        }
    }

    speak(text) {
        if (this.synth.speaking) {
            this.stopSpeaking();
        }

        this.utterance = new SpeechSynthesisUtterance(text);
        this.utterance.voice = this.voices[this.voiceSelect.value];
        this.utterance.rate = this.rateRange.value;

        this.synth.speak(this.utterance);
        this.speechControls.classList.add('active');

        this.utterance.onend = () => {
            this.speechControls.classList.remove('active');
        };
    }

    setVoice() {
        if (this.utterance) {
            this.utterance.voice = this.voices[this.voiceSelect.value];
        }
    }

    setRate() {
        const rate = this.rateRange.value;
        this.rateValue.textContent = `${rate}x`;
        if (this.utterance) {
            this.utterance.rate = rate;
        }
    }

    togglePauseResume() {
        if (this.synth.speaking) {
            if (this.synth.paused) {
                this.synth.resume();
                this.pauseResume.textContent = 'Pause';
            } else {
                this.synth.pause();
                this.pauseResume.textContent = 'Resume';
            }
        }
    }

    stopSpeaking() {
        this.synth.cancel();
        this.speechControls.classList.remove('active');
    }
}

// Main functionality
function updateLanguage() {
    document.querySelectorAll('[data-translate]').forEach(element => {
        const key = element.getAttribute('data-translate');
        element.textContent = translations[language][key];
    });

    messageInput.placeholder = translations[language].messagePlaceholder;

    updateButtonText('summarizeBtn', 'summarize');
    updateButtonText('explainBtn', 'explain');
    updateButtonText('analyzeBtn', 'analyze');
    updateButtonText('actionsBtn', 'actions');

    updateChatLanguage();
    setRTL();
}

function updateButtonText(buttonId, translationKey) {
    const button = document.getElementById(buttonId);
    if (!['translateBtn', 'webSearchBtn', 'moreBtn'].includes(buttonId)) {
        button.textContent = translations[language][translationKey];
    }
}

function updateChatLanguage() {
    const chatBubbles = chatBox.querySelectorAll('.chat-bubble');
    chatBubbles.forEach(bubble => {
        if (bubble.classList.contains('ai') && Object.values(translations).some(lang => lang.aiGreeting === bubble.textContent)) {
            bubble.textContent = translations[language].aiGreeting;
        }
    });
}

function setRTL() {
    if (language === 'ar') {
        document.body.classList.add('rtl');
        chatBox.style.direction = 'rtl';
    } else {
        document.body.classList.remove('rtl');
        chatBox.style.direction = 'ltr';
    }
}

function toggleDarkMode() {
    isDarkMode = !isDarkMode;
    if (isDarkMode) {
        app.classList.remove('light-mode');
        app.classList.add('dark-mode');
        darkModeIcon.innerHTML = '<path d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"></path>';
        attachmentBtn.style.color = 'white';
    } else {
        app.classList.remove('dark-mode');
        app.classList.add('light-mode');
        darkModeIcon.innerHTML = '<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>';
        attachmentBtn.style.color = 'black';
    }
    updateLanguage();
}

async function sendMessage() {
    const message = messageInput.value.trim();
    if (message) {
        createChatBubble(message, true);
        messageInput.value = '';

        try {
            const response = await callGPT35API(message);
            createChatBubble(response, false);
            saveChatHistory();
        } catch (error) {
            handleError(error);
        }
    }
}

function createChatBubble(text, isUser = false) {
    const bubble = document.createElement('div');
    bubble.classList.add('chat-bubble', isUser ? 'user' : 'ai');
    bubble.textContent = text;
    
    if (!isUser) {
        const speakBtn = document.createElement('button');
        speakBtn.classList.add('speak-btn');
        speakBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
        speakBtn.addEventListener('click', () => speechSynthesizer.speak(text));
        bubble.appendChild(speakBtn);
    }
    
    bubble.setAttribute('role', 'log');
    bubble.setAttribute('aria-live', 'polite');
    
    chatBox.appendChild(bubble);
    chatBox.scrollTop = chatBox.scrollHeight;
}

async function handleFileUpload(file) {
    const formData = new FormData();
    formData.append('file', file);

    try {
        const response = await safeFetch('/api/upload', {
            method: 'POST',
            body: formData
        });
        createChatBubble(`File uploaded: ${file.name}`, true);
        const aiResponse = await callGPT35API(`Analyze the uploaded file: ${file.name}`);
        createChatBubble(aiResponse, false);
    } catch (error) {
        handleError(error);
    }
}

async function callGPT35API(message) {
    try {
        const response = await safeFetch('/api/gpt', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ message, language, chatId: currentChatId })
        });
        return response.response;
    } catch (error) {
        handleError(error);
        return translations[language].errorMessage;
    }
}

function handleError(error) {
    console.error('Error:', error);
    alert(translations[language].errorMessage);
}

function saveChatHistory() {
    const chatHistory = Array.from(chatBox.children).map(bubble => ({
        text: bubble.textContent,
        isUser: bubble.classList.contains('user')
    }));
    localStorage.setItem(`chat_${currentChatId}`, JSON.stringify(chatHistory));
    historySidebar.loadChats();
}

function loadChatHistory(chatId) {
    const chatHistory = JSON.parse(localStorage.getItem(`chat_${chatId}`));
    if (chatHistory) {
        chatBox.innerHTML = '';
        chatHistory.forEach(message => createChatBubble(message.text, message.isUser));
    }
}

function startNewChat() {
    currentChatId = Date.now();
    chatBox.innerHTML = '';
    createChatBubble(translations[language].aiGreeting, false);
    saveChatHistory();
}

function handleNetworkChange() {
    if (navigator.onLine) {
        document.querySelectorAll('button, input').forEach(el => el.disabled = false);
    } else {
        document.querySelectorAll('button, input').forEach(el => el.disabled = true);
        alert(translations[language].offlineMessage);
    }
}

// Utility functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

async function safeFetch(url, options) {
    try {
        const response = await fetch(url, options);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Fetch error:', error);
        throw error;
    }
}

// Event listeners
sendMessageBtn.addEventListener('click', sendMessage);
messageInput.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        sendMessage();
    }
});

attachmentBtn.addEventListener('click', function() {
    fileInput.click();
});

fileInput.addEventListener('change', function() {
    if (fileInput.files.length > 0) {
        handleFileUpload(fileInput.files[0]);
    }
});

voiceInputBtn.addEventListener('click', toggleRecording);

languageSelect.addEventListener('change', function() {
    language = this.value;
    updateLanguage();
    saveChatHistory();
});

newChatBtn.addEventListener('click', startNewChat);

sidebarToggle.addEventListener('click', () => sidebar.classList.add('open'));
closeSidebarBtn.addEventListener('click', () => sidebar.classList.remove('open'));

window.addEventListener('online', handleNetworkChange);
window.addEventListener('offline', handleNetworkChange);

document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
        document.querySelectorAll('.language-menu').forEach(menu => {
            menu.style.display = 'none';
        });
        sidebar.classList.remove('open');
    }
});

// Dark mode preference detection
const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
function handleDarkModeChange(e) {
    if (e.matches) {
        if (!isDarkMode) toggleDarkMode();
    } else {
        if (isDarkMode) toggleDarkMode();
    }
}
darkModeMediaQuery.addListener(handleDarkModeChange);

// Initialize the application
function initApp() {
    updateLanguage();
    handleNetworkChange();
    startNewChat();
    handleDarkModeChange(darkModeMediaQuery);
    historySidebar = new HistorySidebar();
    speechSynthesizer = new SpeechSynthesizer();
}

// Call initApp when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', initApp);

// Ensure proper cleanup when the page is unloaded
window.addEventListener('beforeunload', () => {
    if (window.mediaStream) {
        window.mediaStream.getTracks().forEach(track => track.stop());
    }
});
