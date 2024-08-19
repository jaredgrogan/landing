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
    es: {
        aiGreeting: "Hola, soy Herakles — Tu Asistente de IA. ¿Qué quieres aprender?",
        summarize: "Resumir",
        bullets: "Viñetas",
        explain: "Explicar",
        explainConcepts: "Explicar Conceptos",
        stepByStep: "Paso a Paso",
        glossary: "Glosario",
        analyze: "Analizar",
        evaluate: "Evaluar",
        improvements: "Mejoras",
        extractDetails: "Extraer Detalles",
        actions: "Acciones",
        nextActions: "Próximas Acciones",
        actionPlan: "Plan de Acción",
        webSearch: "Búsqueda Web",
        resources: "Recursos",
        quiz: "Cuestionario",
        newChat: "Nueva Conversación",
        messagePlaceholder: "Escribe un mensaje...",
        menu: "Menú",
        apps: "Aplicaciones",
        learn: "Aprender",
        errorMessage: "Ocurrió un error. Por favor, inténtalo de nuevo.",
        browserNotSupported: "Tu navegador no soporta la grabación de audio",
        microphoneError: "Error al acceder al micrófono. Por favor, verifica tu configuración e intenta de nuevo.",
        offlineMessage: "Actualmente estás desconectado. Algunas funciones pueden no estar disponibles.",
        chatHistory: "Historial de Chat",
        languageName: "En Español",
        send: "Enviar",
        attachment: "Adjuntar archivo",
        darkMode: "Cambiar modo oscuro",
        sidebar: "Historial de chat",
        closeSidebar: "Cerrar barra lateral",
        translate: "Traducir",
        more: "Más",
        today: "Hoy",
        thisWeek: "Esta Semana",
        thisMonth: "Este Mes",
        older: "Más Antiguo",
        exportChat: "Exportar Chat",
        settings: "Configuración",
        preferredLanguage: "Idioma Preferido",
        darkModePreference: "Modo Oscuro",
        saveSettings: "Guardar Configuración",
        confirmDelete: "¿Estás seguro de que quieres eliminar este chat?",
    },
    // Add translations for fr, it, de, pt, ar here (following the same structure)
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
const languageSelect = document.getElementById('languageSelect');
const newChatBtn = document.getElementById('newChatBtn');
const sidebar = document.getElementById('sidebar');
const sidebarToggle = document.getElementById('sidebarToggle');
const closeSidebarBtn = document.getElementById('closeSidebarBtn');
const chatList = document.getElementById('chatList');
const searchInput = document.getElementById('searchInput');
const tagInput = document.getElementById('tagInput');
const colorPicker = document.getElementById('colorPicker');

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

    updateChatLanguage();
    setRTL();
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
    } else {
        document.body.classList.remove('dark-mode');
        document.body.classList.add('light-mode');
    }
    localStorage.setItem('darkMode', isDarkMode);
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
    
    bubble.setAttribute('role', 'log');
    bubble.setAttribute('aria-live', 'polite');
    
    chatBox.appendChild(bubble);
    chatBox.scrollTop = chatBox.scrollHeight;
}

async function callGPT35API(message) {
    try {
        const response = await safeFetch('/api/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ 
                message, 
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
            chatList.appendChild(groupHeader);

            groupChats.forEach(chat => {
                const chatItem = createChatListItem(chat);
                chatList.appendChild(chatItem);
            });
        }
    });
}

function createChatListItem(chat) {
    const chatItem = document.createElement('div');
    chatItem.classList.add('chat-item');
    
    const title = document.createElement('h4');
    title.textContent = chat.data[0].text.substring(0, 30) + '...';
    chatItem.appendChild(title);

    const favoriteBtn = document.createElement('button');
    favoriteBtn.innerHTML = chat.data.isFavorite ? '★' : '☆';
    favoriteBtn.classList.add('favorite-btn');
    favoriteBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        toggleFavorite(chat.id);
    });
    chatItem.appendChild(favoriteBtn);

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

function toggleFavorite(chatId) {
    const chat = JSON.parse(localStorage.getItem(chatId));
    chat.isFavorite = !chat.isFavorite;
    localStorage.setItem(chatId, JSON.stringify(chat));
    updateChatList();
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

function searchChats(query) {
    const chatItems = document.querySelectorAll('.chat-item');
    chatItems.forEach(item => {
        const text = item.textContent.toLowerCase();
        item.style.display = text.includes(query.toLowerCase()) ? 'block' : 'none';
    });
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

function handleNetworkChange() {
    if (navigator.onLine) {
        document.querySelectorAll('button, input').forEach(el => el.disabled = false);
    } else {
        document.querySelectorAll('button:not(#darkModeBtn):not(#closeSidebarBtn), input').forEach(el => el.disabled = true);
        alert(translations[language].offlineMessage);
    }
}

// Event Listeners
document.addEventListener('DOMContentLoaded', function() {
    initApp();

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
    
    languageSelect.addEventListener('change', function() {
        language = this.value;
        updateLanguage();
    });

    searchInput.addEventListener('input', (e) => searchChats(e.target.value));

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

    // Auto-suggestion dropdowns
    document.querySelectorAll('.dropdown-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            this.nextElementSibling.classList.toggle('show');
        });
    });

    document.querySelectorAll('.dropdown-content a').forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            const action = this.getAttribute('data-action');
            handleAutoSuggestion(action);
            this.closest('.dropdown-content').classList.remove('show');
        });
    });

    // Close dropdowns when clicking outside
    window.addEventListener('click', function(e) {
        if (!e.target.matches('.dropdown-btn')) {
            document.querySelectorAll('.dropdown-content').forEach(dropdown => {
                if (dropdown.classList.contains('show')) {
                    dropdown.classList.remove('show');
                }
            });
        }
    });
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
}

function handleAutoSuggestion(action) {
    const suggestions = {
        summarize: "Please summarize the following:",
        bullets: "Please provide key points in bullet form for:",
        explain: "Please explain the following concept:",
        explainConcepts: "Please break down and explain the key concepts in:",
        stepByStep: "Please provide a step-by-step guide for:",
        glossary: "Please provide a glossary of terms for:",
        analyze: "Please analyze the following:",
        evaluate: "Please evaluate the pros and cons of:",
        improvements: "Please suggest improvements for:",
        extractDetails: "Please extract the key details from:",
        actions: "Please suggest actions based on:",
        nextActions: "What are the next actions for:",
        actionPlan: "Please create an action plan for:",
        webSearch: "Please suggest search queries for:",
        resources: "Please recommend resources to learn more about:",
        quiz: "Please create a quiz about:"
    };

    const suggestion = suggestions[action] || "";
    messageInput.value += `\n\n${suggestion} `;
    messageInput.focus();
    messageInput.setSelectionRange(messageInput.value.length, messageInput.value.length);
}
