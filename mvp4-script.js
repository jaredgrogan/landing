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
        menu: "Menu",
        apps: "Apps",
        learn: "Learn",
        errorMessage: "An error occurred. Please try again.",
        browserNotSupported: "Your browser does not support audio recording",
        microphoneError: "Error accessing microphone. Please check your settings and try again.",
        offlineMessage: "You are currently offline. Some features may not be available.",
        chatHistory: "Chat History",
        languageName: "In English",
        send: "Send",
        attachment: "Attach file",
        darkMode: "Toggle dark mode",
        sidebar: "Chat history",
        closeSidebar: "Close sidebar",
        translate: "Translate",
        more: "More",
        today: "Today",
        thisWeek: "This Week",
        thisMonth: "This Month",
        older: "Older",
        exportChat: "Export Chat",
        settings: "Settings",
        preferredLanguage: "Preferred Language",
        darkModePreference: "Dark Mode",
        saveSettings: "Save Settings",
        confirmDelete: "Are you sure you want to delete this chat?",
    },
    // Add translations for other languages (es, fr, it, de, pt, ar) here
};

// Global variables
let language = 'en';
let isDarkMode = false;
let isRecording = false;
let currentChatId = null;
let recognition;

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
const searchInput = document.getElementById('searchInput');
const tagInput = document.getElementById('tagInput');
const colorPicker = document.getElementById('colorPicker');
const navMenuItem = document.getElementById('navMenuItem');
const navSubmenu = document.getElementById('navSubmenu');
const exportBtn = document.getElementById('exportBtn');
const settingsBtn = document.getElementById('settingsBtn');
const settingsPanel = document.getElementById('settingsPanel');
const saveSettingsBtn = document.getElementById('saveSettings');

// Functions
function updateLanguage() {
    document.querySelectorAll('[data-translate]').forEach(element => {
        const key = element.getAttribute('data-translate');
        element.textContent = translations[language][key];
    });

    messageInput.placeholder = translations[language].messagePlaceholder;
    sendMessageBtn.title = translations[language].send;
    attachmentBtn.title = translations[language].attachment;
    darkModeBtn.title = translations[language].darkMode;
    sidebarToggle.title = translations[language].sidebar;
    closeSidebarBtn.title = translations[language].closeSidebar;
    exportBtn.title = translations[language].exportChat;
    settingsBtn.title = translations[language].settings;

    // Update header menu items
    navMenuItem.textContent = translations[language].menu;
    document.getElementById('navAppsItem').textContent = translations[language].apps;
    document.getElementById('navLearnItem').textContent = translations[language].learn;

    updateButtonText('summarizeBtn', 'summarize');
    updateButtonText('explainBtn', 'explain');
    updateButtonText('analyzeBtn', 'analyze');
    updateButtonText('actionsBtn', 'actions');
    updateButtonText('translateBtn', 'translate');
    updateButtonText('webSearchBtn', 'webSearch');
    updateButtonText('moreBtn', 'more');

    updateChatLanguage();
    setRTL();
    populateDropdowns();
}

function updateButtonText(buttonId, translationKey) {
    const button = document.getElementById(buttonId);
    if (button) {
        button.querySelector('span').textContent = translations[language][translationKey];
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
        document.body.classList.remove('light-mode');
        document.body.classList.add('dark-mode');
        darkModeIcon.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="12" cy="12" r="5"/>
                <line x1="12" y1="1" x2="12" y2="3"/>
                <line x1="12" y1="21" x2="12" y2="23"/>
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
                <line x1="1" y1="12" x2="3" y2="12"/>
                <line x1="21" y1="12" x2="23" y2="12"/>
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
            </svg>`;
    } else {
        document.body.classList.remove('dark-mode');
        document.body.classList.add('light-mode');
        darkModeIcon.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
            </svg>`;
    }
    localStorage.setItem('darkMode', isDarkMode);
}

function populateDropdowns() {
    const dropdowns = {
        'summarizeMenu': ['summarize', 'bullets'],
        'explainMenu': ['explain', 'explainConcepts', 'stepByStep', 'glossary'],
        'analyzeMenu': ['analyze', 'evaluate', 'improvements', 'extractDetails'],
        'actionsMenu': ['actions', 'nextActions', 'actionPlan'],
        'moreMenu': ['webSearch', 'resources', 'quiz']
    };

    Object.entries(dropdowns).forEach(([menuId, options]) => {
        const menu = document.getElementById(menuId);
        menu.innerHTML = options.map(option => 
            `<button data-action="${option}">${translations[language][option]}</button>`
        ).join('');

        menu.addEventListener('click', (event) => {
            if (event.target.tagName === 'BUTTON') {
                const action = event.target.getAttribute('data-action');
                handleAutoSuggestion(translations[language][action]);
                menu.style.display = 'none';
            }
        });

        // Add keyboard navigation
        menu.addEventListener('keydown', (event) => {
            if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
                event.preventDefault();
                const buttons = menu.querySelectorAll('button');
                const currentIndex = Array.from(buttons).indexOf(document.activeElement);
                let newIndex = event.key === 'ArrowDown' ? currentIndex + 1 : currentIndex - 1;
                if (newIndex < 0) newIndex = buttons.length - 1;
                if (newIndex >= buttons.length) newIndex = 0;
                buttons[newIndex].focus();
            }
        });
    });
}

function handleAutoSuggestion(suggestion) {
    const userInput = messageInput.value.trim();
    const autoSuggestionText = `\n\n*${suggestion}:* `;
    messageInput.value = userInput + autoSuggestionText;
    messageInput.focus();
    messageInput.setSelectionRange(messageInput.value.length, messageInput.value.length);
}

async function sendMessage() {
    const message = messageInput.value.trim();
    if (message) {
        const [userMessage, autoSuggestion] = message.split(/\n\n\*(\w+):\*/);
        const cleanedSuggestion = autoSuggestion ? autoSuggestion.trim() : '';

        createChatBubble(message, true);
        messageInput.value = '';

        try {
            const response = await callGPT35API(userMessage, cleanedSuggestion);
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
    
    const messageText = document.createElement('span');
    messageText.innerHTML = text.replace(/\*(\w+):\*/g, '<em>$1:</em>');
    bubble.appendChild(messageText);
    
    bubble.setAttribute('role', 'log');
    bubble.setAttribute('aria-live', 'polite');
    
    chatBox.appendChild(bubble);
    chatBox.scrollTop = chatBox.scrollHeight;
}

async function callGPT35API(message, autoSuggestion) {
    try {
        const systemMessage = getSystemMessage(autoSuggestion);
        const response = await safeFetch('/api/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ 
                message, 
                systemMessage,
                language, 
                chatId: currentChatId 
            })
        });
        return response.response;
    } catch (error) {
        handleError(error);
        return translations[language].errorMessage;
    }
}

function getSystemMessage(autoSuggestion) {
    const systemMessages = {
        'Summarize': 'Provide a concise summary of the main points.',
        'Explain': 'Explain the concept in simple terms, as if to a beginner.',
        'Analyze': 'Provide a detailed analysis, considering multiple perspectives.',
        'Actions': 'Suggest practical next steps or actions based on the information.',
        'Translate': `Translate the following text to ${language}:`,
        'Web Search': 'Provide a list of relevant search queries for this topic.',
        'More': 'Provide additional context or related information on this topic.'
    };
    return systemMessages[autoSuggestion] || '';
}

function handleError(error) {
    console.error('Error:', error);
    createChatBubble(translations[language].errorMessage, false);
}

function saveChatHistory() {
    const chatHistory = Array.from(chatBox.children).map(bubble => ({
        text: bubble.textContent,
        isUser: bubble.classList.contains('user')
    }));
    localStorage.setItem(`chat_${currentChatId}`, JSON.stringify(chatHistory));
    updateChatList();
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

function updateChatList() {
    chatList.innerHTML = '';
    const chats = Object.keys(localStorage)
        .filter(key => key.startsWith('chat_'))
        .map(key => ({id: key, data: JSON.parse(localStorage.getItem(key))}))
        .sort((a, b) => b.id.split('_')[1] - a.id.split('_')[1]);

    const groupedChats = groupChatsByDate(chats);

    Object.entries(groupedChats).forEach(([group, groupChats]) => {
        if (groupChats.length > 0) {
            const groupHeader = document.createElement('h3');
            groupHeader.textContent = translations[language][group];
            groupHeader.dataset.group = group;
            groupHeader.classList.add('collapsible');
            
            const toggleIcon = document.createElement('span');
            toggleIcon.textContent = '-';
            toggleIcon.classList.add('toggle-icon');
            groupHeader.prepend(toggleIcon);

            groupHeader.addEventListener('click', () => toggleChatGroup(group));

            chatList.appendChild(groupHeader);

            const chatGroup = document.createElement('div');
            chatGroup.id = `chatGroup_${group}`;
            chatGroup.classList.add('chat-group');

            groupChats.forEach(chat => {
                const chatItem = createChatListItem(chat);
                chatGroup.appendChild(chatItem);
            });

            chatList.appendChild(chatGroup);
        }
    });
}

function createChatListItem(chat) {
    const chatItem = document.createElement('div');
    chatItem.classList.add('chat-item');
    
    const title = document.createElement('h4');
    title.textContent = chat.data[0].text.substring(0, 30) + '...';
    chatItem.appendChild(title);

    const starRating = document.createElement('div');
    starRating.classList.add('star-rating');
    for (let i = 1; i <= 3; i++) {
        const star = document.createElement('span');
        star.textContent = i <= (chat.data.rating || 0) ? '★' : '☆';
        star.addEventListener('click', (e) => {
            e.stopPropagation();
            setStarRating(chat.id, i);
        });
        starRating.appendChild(star);
    }
    chatItem.appendChild(starRating);

    if (chat.data.tags) {
        const tags = document.createElement('div');
        tags.classList.add('chat-tags');
        chat.data.tags.forEach(tag => {
            const tagSpan = document.createElement('span');
            tagSpan.textContent = tag.text;
            tagSpan.style.backgroundColor = tag.color;
            tags.appendChild(tagSpan);
        });
        chatItem.appendChild(tags);
    }

    if (chat.data.colorTag) {
        const colorTag = document.createElement('div');
        colorTag.classList.add('color-tag');
        colorTag.style.backgroundColor = chat.data.colorTag;
        chatItem.appendChild(colorTag);
    }

    const deleteBtn = document.createElement('button');
    deleteBtn.innerHTML = '🗑️';
    deleteBtn.classList.add('delete-btn');
    deleteBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        deleteChat(chat.id);
    });
    chatItem.appendChild(deleteBtn);

    chatItem.addEventListener('click', () => loadChat(chat.id.split('_')[1]));
    
    return chatItem;
}

function groupChatsByDate(chats) {
    const now = new Date();
    const oneDay = 24 * 60 * 60 * 1000;
    const oneWeek = 7 * oneDay;
    const oneMonth = 30 * oneDay;

    return chats.reduce((groups, chat) => {
        const chatDate = new Date(parseInt(chat.id.split('_')[1]));
        const timeDiff = now - chatDate;

        if (timeDiff < oneDay) groups.today.push(chat);
        else if (timeDiff < oneWeek) groups.thisWeek.push(chat);
        else if (timeDiff < oneMonth) groups.thisMonth.push(chat);
        else groups.older.push(chat);

        return groups;
    }, { today: [], thisWeek: [], thisMonth: [], older: [] });
}

function toggleChatGroup(group) {
    const chatGroup = document.getElementById(`chatGroup_${group}`);
    const header = document.querySelector(`#chatList h3[data-group="${group}"]`);
    const toggleIcon = header.querySelector('.toggle-icon');

    if (chatGroup.style.display === 'none') {
        chatGroup.style.display = 'block';
        toggleIcon.textContent = '-';
    } else {
        chatGroup.style.display = 'none';
        toggleIcon.textContent = '+';
    }
}

function setStarRating(chatId, rating) {
    const chat = JSON.parse(localStorage.getItem(chatId));
    chat.rating = rating;
    localStorage.setItem(chatId, JSON.stringify(chat));
    updateChatList();
}

function addChatTag(chatId, tagText, tagColor) {
    const chat = JSON.parse(localStorage.getItem(chatId));
    chat.tags = chat.tags || [];
    chat.tags.push({ text: tagText, color: tagColor });
    localStorage.setItem(chatId, JSON.stringify(chat));
    updateChatList();
}

function deleteChat(chatId) {
    if (confirm(translations[language].confirmDelete)) {
        localStorage.removeItem(chatId);
        updateChatList();
    }
}

function loadChat(chatId) {
    currentChatId = chatId;
    loadChatHistory(chatId);
    closeSidebar();
}

function openSidebar() {
    sidebar.classList.add('open');
    updateChatList();
}

function closeSidebar() {
    sidebar.classList.remove('open');
}

function initSpeechRecognition() {
    if ('webkitSpeechRecognition' in window) {
        recognition = new webkitSpeechRecognition();
        recognition.continuous = false;
        recognition.interimResults = false;

        recognition.onstart = function() {
            voiceInputBtn.classList.add('recording');
        };

        recognition.onresult = function(event) {
            const transcript = event.results[0][0].transcript;
            messageInput.value += transcript;
        };

        recognition.onerror = function(event) {
            console.error('Speech recognition error:', event.error);
            stopDictation();
        };

        recognition.onend = function() {
            stopDictation();
        };
    } else {
        console.error('Speech recognition not supported');
        voiceInputBtn.style.display = 'none';
    }
}

function startDictation() {
    if (recognition) {
        recognition.lang = language;
        recognition.start();
    } else {
        alert(translations[language].browserNotSupported);
    }
}

function stopDictation() {
    if (recognition) {
        recognition.stop();
        voiceInputBtn.classList.remove('recording');
    }
}

function toggleDictation() {
    if (recognition && recognition.isRecording) {
        stopDictation();
    } else {
        startDictation();
    }
}

async function handleFileUpload(file) {
    const formData = new FormData();
    formData.append('file', file);

    try {
        const response = await safeFetch('/api/upload', {
            method: 'POST',
            body: formData
        });
        createChatBubble(`${translations[language].attachment}: ${file.name}`, true);
        const aiResponse = await callGPT35API(`${translations[language].analyze} ${file.name}`);
        createChatBubble(aiResponse, false);
    } catch (error) {
        handleError(error);
    }
}

function exportChatHistory(format = 'json') {
    const chats = Object.keys(localStorage)
        .filter(key => key.startsWith('chat_'))
        .map(key => ({id: key, data: JSON.parse(localStorage.getItem(key))}));

    let content;
    let filename;
    if (format === 'json') {
        content = JSON.stringify(chats, null, 2);
        filename = 'chat_history.json';
    } else {
        content = chats.map(chat => 
            `Chat ID: ${chat.id}\n\n${chat.data.map(msg => `${msg.isUser ? 'User' : 'AI'}: ${msg.text}`).join('\n\n')}`
        ).join('\n\n---\n\n');
        filename = 'chat_history.txt';
    }

    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
}

function openSettingsPanel() {
    settingsPanel.style.display = 'block';
}

function closeSettingsPanel() {
    settingsPanel.style.display = 'none';
}

function saveUserSettings() {
    const preferredLanguage = document.getElementById('preferredLanguage').value;
    const darkModePreference = document.getElementById('darkModePreference').checked;
    localStorage.setItem('preferredLanguage', preferredLanguage);
    localStorage.setItem('darkModePreference', darkModePreference);
    language = preferredLanguage;
    updateLanguage();
    if (darkModePreference !== isDarkMode) {
        toggleDarkMode();
    }
    closeSettingsPanel();
}

function cleanUpOldChats(daysToKeep = 30) {
    const now = Date.now();
    const msToKeep = daysToKeep * 24 * 60 * 60 * 1000;
    Object.keys(localStorage)
        .filter(key => key.startsWith('chat_'))
        .forEach(key => {
            const chatId = parseInt(key.split('_')[1]);
            if (now - chatId > msToKeep) {
                localStorage.removeItem(key);
            }
        });
    updateChatList();
}

// Utility function for safe fetch with error handling
async function safeFetch(url, options) {
    try {
        const response = await fetch(url, options);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Fetch error:', error);
        throw new Error(translations[language].errorMessage);
    }
}

// Event Listeners
document.addEventListener('DOMContentLoaded', function() {
    navMenuItem.addEventListener('click', function(e) {
        e.preventDefault();
        navSubmenu.style.display = navSubmenu.style.display === 'block' ? 'none' : 'block';
    });

    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!navMenuItem.contains(e.target) && !navSubmenu.contains(e.target)) {
            navSubmenu.style.display = 'none';
        }
    });

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

    voiceInputBtn.addEventListener('click', toggleDictation);
    darkModeBtn.addEventListener('click', toggleDarkMode);
    newChatBtn.addEventListener('click', startNewChat);
    sidebarToggle.addEventListener('click', openSidebar);
    closeSidebarBtn.addEventListener('click', closeSidebar);
    exportBtn.addEventListener('click', () => exportChatHistory());
    settingsBtn.addEventListener('click', openSettingsPanel);
    saveSettingsBtn.addEventListener('click', saveUserSettings);
    
    languageSelect.addEventListener('change', function() {
        language = this.value;
        updateLanguage();
    });

    searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        const chatItems = document.querySelectorAll('.chat-item');
        chatItems.forEach(item => {
            const text = item.textContent.toLowerCase();
            item.style.display = text.includes(searchTerm) ? 'block' : 'none';
        });
    });

    tagInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && e.target.value.trim() && currentChatId) {
            const tagText = e.target.value.trim();
            const tagColor = document.querySelector('.color-btn.selected')?.dataset.color || 'gray';
            addChatTag(`chat_${currentChatId}`, tagText, tagColor);
            e.target.value = '';
        }
    });

    colorPicker.querySelectorAll('.color-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            colorPicker.querySelectorAll('.color-btn').forEach(b => b.classList.remove('selected'));
            e.target.classList.add('selected');
        });
    });

    window.addEventListener('online', handleNetworkChange);
    window.addEventListener('offline', handleNetworkChange);

    chatBox.addEventListener('dragover', (e) => {
        e.preventDefault();
        chatBox.classList.add('dragover');
    });

    chatBox.addEventListener('dragleave', (e) => {
        e.preventDefault();
        chatBox.classList.remove('dragover');
    });

    chatBox.addEventListener('drop', (e) => {
        e.preventDefault();
        chatBox.classList.remove('dragover');
        if (e.dataTransfer.files.length > 0) {
            handleFileUpload(e.dataTransfer.files[0]);
        }
    });

    // Initialize the application
    initApp();
});

function initApp() {
    // Set initial language based on browser settings or default to English
    const browserLang = navigator.language.split('-')[0];
    language = translations[browserLang] ? browserLang : 'en';
    languageSelect.value = language;

    updateLanguage();
    handleNetworkChange();
    startNewChat();
    initSpeechRecognition();

    // Initialize dark mode based on saved preference or system preference
    isDarkMode = localStorage.getItem('darkMode') === 'true' || 
                 (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches);
    if (isDarkMode) {
        toggleDarkMode();
    }

    // Add listener for system color scheme changes
    window.matchMedia('(prefers-color-scheme: dark)').addListener((e) => {
        if (e.matches) {
            if (!isDarkMode) toggleDarkMode();
        } else {
            if (isDarkMode) toggleDarkMode();
        }
    });

    // Set up periodic cleanup of old chats
    setInterval(() => cleanUpOldChats(30), 24 * 60 * 60 * 1000); // Run daily
}

function handleNetworkChange() {
    if (navigator.onLine) {
        document.querySelectorAll('button, input').forEach(el => el.disabled = false);
    } else {
        document.querySelectorAll('button:not(#darkModeBtn):not(#closeSidebarBtn), input').forEach(el => el.disabled = true);
        alert(translations[language].offlineMessage);
    }
}
