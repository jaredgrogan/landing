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
        languageName: "In English",
        send: "Send",
        attachment: "Attach file",
        darkMode: "Toggle dark mode",
        sidebar: "Chat history",
        closeSidebar: "Close sidebar",
        translate: "Translate",
        more: "More"
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
        navMenu: "Menú",
        navApps: "Aplicaciones",
        navLearn: "Aprender",
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
        more: "Más"
    },
     fr: {
        aiGreeting: "Bonjour, je suis Herakles — Votre Assistant IA. Que voulez-vous apprendre ?",
        summarize: "Résumer",
        bullets: "Puces",
        explain: "Expliquer",
        explainConcepts: "Expliquer les Concepts",
        stepByStep: "Étape par Étape",
        glossary: "Glossaire",
        analyze: "Analyser",
        evaluate: "Évaluer",
        improvements: "Améliorations",
        extractDetails: "Extraire les Détails",
        actions: "Actions",
        nextActions: "Prochaines Actions",
        actionPlan: "Plan d'Action",
        webSearch: "Recherche Web",
        resources: "Ressources",
        quiz: "Quiz",
        newChat: "Nouvelle Conversation",
        messagePlaceholder: "Tapez un message...",
        navMenu: "Menu",
        navApps: "Applications",
        navLearn: "Apprendre",
        errorMessage: "Une erreur s'est produite. Veuillez réessayer.",
        browserNotSupported: "Votre navigateur ne prend pas en charge l'enregistrement audio",
        microphoneError: "Erreur d'accès au microphone. Veuillez vérifier vos paramètres et réessayer.",
        offlineMessage: "Vous êtes actuellement hors ligne. Certaines fonctionnalités peuvent ne pas être disponibles.",
        chatHistory: "Historique des Conversations",
        languageName: "En Français",
        send: "Envoyer",
        attachment: "Joindre un fichier",
        darkMode: "Basculer en mode sombre",
        sidebar: "Historique des conversations",
        closeSidebar: "Fermer la barre latérale",
        translate: "Traduire",
        more: "Plus"
    },
    it: {
        aiGreeting: "Ciao, sono Herakles — Il tuo Assistente IA. Cosa vuoi imparare?",
        summarize: "Riassumere",
        bullets: "Elenchi puntati",
        explain: "Spiegare",
        explainConcepts: "Spiegare Concetti",
        stepByStep: "Passo dopo Passo",
        glossary: "Glossario",
        analyze: "Analizzare",
        evaluate: "Valutare",
        improvements: "Miglioramenti",
        extractDetails: "Estrarre Dettagli",
        actions: "Azioni",
        nextActions: "Prossime Azioni",
        actionPlan: "Piano d'Azione",
        webSearch: "Ricerca Web",
        resources: "Risorse",
        quiz: "Quiz",
        newChat: "Nuova Conversazione",
        messagePlaceholder: "Scrivi un messaggio...",
        navMenu: "Menu",
        navApps: "Applicazioni",
        navLearn: "Imparare",
        errorMessage: "Si è verificato un errore. Per favore riprova.",
        browserNotSupported: "Il tuo browser non supporta la registrazione audio",
        microphoneError: "Errore nell'accesso al microfono. Controlla le tue impostazioni e riprova.",
        offlineMessage: "Sei attualmente offline. Alcune funzionalità potrebbero non essere disponibili.",
        chatHistory: "Cronologia Chat",
        languageName: "In Italiano",
        send: "Invia",
        attachment: "Allega file",
        darkMode: "Attiva/disattiva modalità scura",
        sidebar: "Cronologia chat",
        closeSidebar: "Chiudi barra laterale",
        translate: "Traduci",
        more: "Altro"
    },
    pt: {
        aiGreeting: "Olá, sou Herakles — Seu Assistente de IA. O que você quer aprender?",
        summarize: "Resumir",
        bullets: "Marcadores",
        explain: "Explicar",
        explainConcepts: "Explicar Conceitos",
        stepByStep: "Passo a Passo",
        glossary: "Glossário",
        analyze: "Analisar",
        evaluate: "Avaliar",
        improvements: "Melhorias",
        extractDetails: "Extrair Detalhes",
        actions: "Ações",
        nextActions: "Próximas Ações",
        actionPlan: "Plano de Ação",
        webSearch: "Pesquisa Web",
        resources: "Recursos",
        quiz: "Questionário",
        newChat: "Nova Conversa",
        messagePlaceholder: "Digite uma mensagem...",
        navMenu: "Menu",
        navApps: "Aplicativos",
        navLearn: "Aprender",
        errorMessage: "Ocorreu um erro. Por favor, tente novamente.",
        browserNotSupported: "Seu navegador não suporta gravação de áudio",
        microphoneError: "Erro ao acessar o microfone. Verifique suas configurações e tente novamente.",
        offlineMessage: "Você está offline no momento. Alguns recursos podem não estar disponíveis.",
        chatHistory: "Histórico de Chat",
        languageName: "Em Português",
        send: "Enviar",
        attachment: "Anexar arquivo",
        darkMode: "Alternar modo escuro",
        sidebar: "Histórico de chat",
        closeSidebar: "Fechar barra lateral",
        translate: "Traduzir",
        more: "Mais"
    },
    de: {
        aiGreeting: "Hallo, ich bin Herakles — Dein KI-Assistent. Was möchtest du lernen?",
        summarize: "Zusammenfassen",
        bullets: "Aufzählungspunkte",
        explain: "Erklären",
        explainConcepts: "Konzepte Erklären",
        stepByStep: "Schritt für Schritt",
        glossary: "Glossar",
        analyze: "Analysieren",
        evaluate: "Bewerten",
        improvements: "Verbesserungen",
        extractDetails: "Details Extrahieren",
        actions: "Aktionen",
        nextActions: "Nächste Schritte",
        actionPlan: "Aktionsplan",
        webSearch: "Websuche",
        resources: "Ressourcen",
        quiz: "Quiz",
        newChat: "Neuer Chat",
        messagePlaceholder: "Nachricht eingeben...",
        navMenu: "Menü",
        navApps: "Anwendungen",
        navLearn: "Lernen",
        errorMessage: "Ein Fehler ist aufgetreten. Bitte versuche es erneut.",
        browserNotSupported: "Dein Browser unterstützt keine Audioaufnahmen",
        microphoneError: "Fehler beim Zugriff auf das Mikrofon. Bitte überprüfe deine Einstellungen und versuche es erneut.",
        offlineMessage: "Du bist derzeit offline. Einige Funktionen sind möglicherweise nicht verfügbar.",
        chatHistory: "Chat-Verlauf",
        languageName: "Auf Deutsch",
        send: "Senden",
        attachment: "Datei anhängen",
        darkMode: "Dunkelmodus umschalten",
        sidebar: "Chat-Verlauf",
        closeSidebar: "Seitenleiste schließen",
        translate: "Übersetzen",
        more: "Mehr"
    },
    ar: {
        aiGreeting: "مرحبًا، أنا هيراكليس — مساعدك الذكي. ماذا تريد أن تتعلم؟",
        summarize: "تلخيص",
        bullets: "نقاط",
        explain: "شرح",
        explainConcepts: "شرح المفاهيم",
        stepByStep: "خطوة بخطوة",
        glossary: "قاموس المصطلحات",
        analyze: "تحليل",
        evaluate: "تقييم",
        improvements: "تحسينات",
        extractDetails: "استخراج التفاصيل",
        actions: "إجراءات",
        nextActions: "الإجراءات التالية",
        actionPlan: "خطة العمل",
        webSearch: "بحث على الويب",
        resources: "موارد",
        quiz: "اختبار",
        newChat: "محادثة جديدة",
        messagePlaceholder: "اكتب رسالة...",
        navMenu: "القائمة",
        navApps: "التطبيقات",
        navLearn: "تعلم",
        errorMessage: "حدث خطأ. يرجى المحاولة مرة أخرى.",
        browserNotSupported: "متصفحك لا يدعم تسجيل الصوت",
        microphoneError: "خطأ في الوصول إلى الميكروفون. يرجى التحقق من إعداداتك والمحاولة مرة أخرى.",
        offlineMessage: "أنت حاليًا غير متصل بالإنترنت. قد لا تتوفر بعض الميزات.",
        chatHistory: "سجل المحادثات",
        languageName: "بالعربية",
        send: "إرسال",
        attachment: "إرفاق ملف",
        darkMode: "تبديل الوضع الداكن",
        sidebar: "سجل المحادثات",
        closeSidebar: "إغلاق الشريط الجانبي",
        translate: "ترجمة",
        more: "المزيد"
    }
};

// Global variables
let language = 'en';
let isDarkMode = false;
let isRecording = false;
let currentChatId = null;
let mediaRecorder = null;
let audioChunks = [];

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
const addTagBtn = document.getElementById('addTagBtn');

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

    updateButtonText('summarizeBtn', 'summarize');
    updateButtonText('explainBtn', 'explain');
    updateButtonText('analyzeBtn', 'analyze');
    updateButtonText('actionsBtn', 'actions');
    updateButtonText('translateBtn', 'translate');
    updateButtonText('webSearchBtn', 'webSearch');
    updateButtonText('moreBtn', 'more');

    updateChatLanguage();
    setRTL();
}

function updateButtonText(buttonId, translationKey) {
    const button = document.getElementById(buttonId);
    if (button) {
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
    } else {
        app.classList.remove('dark-mode');
        app.classList.add('light-mode');
        darkModeIcon.innerHTML = '<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>';
    }
}

function handleAutoSuggestion(suggestion) {
    const userInput = messageInput.value.trim();
    const autoSuggestionText = `\n\n[${suggestion}]`;
    messageInput.value = userInput + autoSuggestionText;
}

async function sendMessage() {
    const message = messageInput.value.trim();
    if (message) {
        const [userMessage, autoSuggestion] = message.split('\n\n[');
        const cleanedSuggestion = autoSuggestion ? autoSuggestion.slice(0, -1) : '';

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
    messageText.textContent = text.split('\n\n[')[0];
    bubble.appendChild(messageText);

    const suggestion = text.match(/\n\n\[(.*?)\]$/);
    if (suggestion) {
        const suggestionSpan = document.createElement('span');
        suggestionSpan.classList.add('auto-suggestion');
        suggestionSpan.textContent = suggestion[1];
        bubble.appendChild(suggestionSpan);
    }
    
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
            groupHeader.textContent = group;
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
            tagSpan.textContent = tag;
            tags.appendChild(tagSpan);
        });
        chatItem.appendChild(tags);
    }

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

function setStarRating(chatId, rating) {
    const chat = JSON.parse(localStorage.getItem(chatId));
    chat.rating = rating;
    localStorage.setItem(chatId, JSON.stringify(chat));
    updateChatList();
}

function addChatTag(chatId, tag) {
    const chat = JSON.parse(localStorage.getItem(chatId));
    chat.tags = chat.tags || [];
    if (!chat.tags.includes(tag)) {
        chat.tags.push(tag);
        localStorage.setItem(chatId, JSON.stringify(chat));
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

function toggleRecording() {
    if (isRecording) {
        stopRecording();
    } else {
        startRecording();
    }
}

function startRecording() {
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        alert(translations[language].browserNotSupported);
        return;
    }

    navigator.mediaDevices.getUserMedia({ audio: true })
        .then(stream => {
            mediaRecorder = new MediaRecorder(stream);
            audioChunks = [];

            mediaRecorder.ondataavailable = (event) => {
                audioChunks.push(event.data);
            };

            mediaRecorder.onstop = () => {
                const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
                sendAudioToServer(audioBlob);
            };

            mediaRecorder.start();
            isRecording = true;
            voiceInputBtn.classList.add('recording');
        })
        .catch(error => {
            console.error('Error accessing microphone:', error);
            alert(translations[language].microphoneError);
        });
}

function stopRecording() {
    if (mediaRecorder && isRecording) {
        mediaRecorder.stop();
        isRecording = false;
        voiceInputBtn.classList.remove('recording');
    }
}

async function sendAudioToServer(audioBlob) {
    const formData = new FormData();
    formData.append('audio', audioBlob, 'recording.wav');

    try {
        const response = await safeFetch('/api/transcribe', {
            method: 'POST',
            body: formData
        });
        if (response.transcription) {
            messageInput.value = response.transcription;
        } else {
            throw new Error('Transcription failed');
        }
    } catch (error) {
        console.error('Error sending audio to server:', error);
        alert(translations[language].errorMessage);
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
    const chats = Object.keys(localStorage)
        .filter(key => key.startsWith('chat_'))
        .map(key => ({id: key, data: JSON.parse(localStorage.getItem(key))}))
        .filter(chat => chat.data.some(message => message.text.toLowerCase().includes(query.toLowerCase())));
    
    updateChatList(chats);
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
        throw error;
    }
}

// Event Listeners
document.getElementById('summarizeBtn').addEventListener('click', () => handleAutoSuggestion('Summarize'));
document.getElementById('explainBtn').addEventListener('click', () => handleAutoSuggestion('Explain'));
document.getElementById('analyzeBtn').addEventListener('click', () => handleAutoSuggestion('Analyze'));
document.getElementById('actionsBtn').addEventListener('click', () => handleAutoSuggestion('Actions'));
document.getElementById('webSearchBtn').addEventListener('click', () => handleAutoSuggestion('Web Search'));
document.getElementById('moreBtn').addEventListener('click', () => handleAutoSuggestion('More'));

document.getElementById('translateBtn').addEventListener('click', (event) => {
    event.stopPropagation();
    const translateMenu = document.getElementById('translateMenu');
    translateMenu.style.display = translateMenu.style.display === 'block' ? 'none' : 'block';
});

document.querySelectorAll('#translateMenu button').forEach(button => {
    button.addEventListener('click', (event) => {
        const selectedLang = event.target.getAttribute('data-lang');
        handleAutoSuggestion(`Translate to ${translations[selectedLang].languageName}`);
        document.getElementById('translateMenu').style.display = 'none';
    });
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

voiceInputBtn.addEventListener('click', toggleRecording);
darkModeBtn.addEventListener('click', toggleDarkMode);
newChatBtn.addEventListener('click', startNewChat);
sidebarToggle.addEventListener('click', openSidebar);
closeSidebarBtn.addEventListener('click', closeSidebar);
languageSelect.addEventListener('change', function() {
    language = this.value;
    updateLanguage();
});

searchInput.addEventListener('input', (e) => searchChats(e.target.value));

addTagBtn.addEventListener('click', () => {
    if (tagInput.value.trim() && currentChatId) {
        addChatTag(`chat_${currentChatId}`, tagInput.value.trim());
        tagInput.value = '';
    }
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
function initApp() {
    updateLanguage();
    handleNetworkChange();
    startNewChat();
    const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    if (darkModeMediaQuery.matches) {
        toggleDarkMode();
    }
}

// Call initApp when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', initApp);
