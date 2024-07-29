document.addEventListener('DOMContentLoaded', () => {
    // DOM elements
    const calendarGrid = document.getElementById('calendar-grid');
    const currentMonthElement = document.getElementById('current-month');
    const prevMonthButton = document.getElementById('prev-month');
    const nextMonthButton = document.getElementById('next-month');
    const eventList = document.getElementById('event-list');
    const nightModeToggle = document.getElementById('nightModeToggle');
    const nightIcon = document.getElementById('nightIcon');
    const dayIcon = document.getElementById('dayIcon');
    const languageSelect = document.getElementById('languageSelect');
    const chatSphere = document.getElementById('chat-sphere');
    const chatConsole = document.getElementById('chat-console');
    const minimizeButton = document.getElementById('minimizeChat');
    const logoText = document.querySelector('.logo-text');
    const currentDateTime = document.getElementById('currentDateTime');
    const todayBriefing = document.getElementById('todayBriefing');
    const tomorrowBriefing = document.getElementById('tomorrowBriefing');
    const yesterdaySummary = document.getElementById('yesterdaySummary');
    const calendarSettings = document.getElementById('calendarSettings');
    const connectGmail = document.getElementById('connect-gmail');
    const connectOutlook = document.getElementById('connect-outlook');
    const connectIcloud = document.getElementById('connect-icloud');
    const heraklesResponse = document.getElementById('heraklesResponse');
    const chatInput = document.getElementById('chatInput');
    const chatSendButton = document.getElementById('chatSendButton');
    const recordButton = document.getElementById('recordButton');

 const chatSphere = document.getElementById('chat-sphere');
    const chatConsole = document.getElementById('chat-console');
    const minimizeButton = document.getElementById('minimizeChat');

    let isChatOpen = false;

    function toggleChat() {
        isChatOpen = !isChatOpen;
        chatConsole.style.display = isChatOpen ? 'block' : 'none';
        chatSphere.style.display = isChatOpen ? 'none' : 'flex';
        chatSphere.textContent = isChatOpen ? '-' : 'H';
    }

    chatSphere.addEventListener('click', toggleChat);
    minimizeButton.addEventListener('click', toggleChat);

    // State
    let currentDate = new Date();
    let isChatOpen = false;

    // Translations
    const translations = {
        en: {
            home: 'Home',
            tools: 'Tools',
            discover: 'Discover',
            features: 'Features',
            join: 'Join',
            discoverUniverse: "// Discover the Universe",
            todayBriefing: "Today's Briefing",
            tomorrowBriefing: "Tomorrow's Briefing",
            yesterdaySummary: "Yesterday's Summary",
            calendarSettings: "Calendar Settings",
            connectGmail: "Connect Gmail",
            connectOutlook: "Connect Outlook",
            connectIcloud: "Connect iCloud",
            heraklesGreeting: "HI, I'm Herakles. What are you working on?",
            typePlaceholder: "// Type your project here",
            send: "Send",
            record: "Record"
        },
        es: {
            home: 'Inicio',
            tools: 'Herramientas',
            discover: 'Descubrir',
            features: 'Características',
            join: 'Unirse',
            discoverUniverse: "// Descubre el Universo",
            todayBriefing: "Informe de Hoy",
            tomorrowBriefing: "Informe de Mañana",
            yesterdaySummary: "Resumen de Ayer",
            calendarSettings: "Configuración del Calendario",
            connectGmail: "Conectar Gmail",
            connectOutlook: "Conectar Outlook",
            connectIcloud: "Conectar iCloud",
            heraklesGreeting: "Hola, soy Herakles. ¿En qué estás trabajando?",
            typePlaceholder: "// Escribe tu proyecto aquí",
            send: "Enviar",
            record: "Grabar"
        },
        fr: {
            home: 'Accueil',
            tools: 'Outils',
            discover: 'Découvrir',
            features: 'Fonctionnalités',
            join: 'Rejoindre',
            discoverUniverse: "// Découvrez l'Univers",
            todayBriefing: "Briefing d'Aujourd'hui",
            tomorrowBriefing: "Briefing de Demain",
            yesterdaySummary: "Résumé d'Hier",
            calendarSettings: "Paramètres du Calendrier",
            connectGmail: "Connecter Gmail",
            connectOutlook: "Connecter Outlook",
            connectIcloud: "Connecter iCloud",
            heraklesGreeting: "Bonjour, je suis Herakles. Sur quoi travaillez-vous ?",
            typePlaceholder: "// Tapez votre projet ici",
            send: "Envoyer",
            record: "Enregistrer"
        },
        it: {
            home: 'Home',
            tools: 'Strumenti',
            discover: 'Scopri',
            features: 'Funzionalità',
            join: 'Unisciti',
            discoverUniverse: "// Scopri l'Universo",
            todayBriefing: "Briefing di Oggi",
            tomorrowBriefing: "Briefing di Domani",
            yesterdaySummary: "Riepilogo di Ieri",
            calendarSettings: "Impostazioni Calendario",
            connectGmail: "Connetti Gmail",
            connectOutlook: "Connetti Outlook",
            connectIcloud: "Connetti iCloud",
            heraklesGreeting: "Ciao, sono Herakles. Su cosa stai lavorando?",
            typePlaceholder: "// Scrivi il tuo progetto qui",
            send: "Invia",
            record: "Registra"
        },
        de: {
            home: 'Startseite',
            tools: 'Werkzeuge',
            discover: 'Entdecken',
            features: 'Funktionen',
            join: 'Beitreten',
            discoverUniverse: "// Entdecke das Universum",
            todayBriefing: "Heutiges Briefing",
            tomorrowBriefing: "Morgiges Briefing",
            yesterdaySummary: "Zusammenfassung von Gestern",
            calendarSettings: "Kalendereinstellungen",
            connectGmail: "Gmail verbinden",
            connectOutlook: "Outlook verbinden",
            connectIcloud: "iCloud verbinden",
            heraklesGreeting: "Hallo, ich bin Herakles. Woran arbeitest du?",
            typePlaceholder: "// Gib dein Projekt hier ein",
            send: "Senden",
            record: "Aufnehmen"
        },
        ar: {
            home: 'الرئيسية',
            tools: 'الأدوات',
            discover: 'اكتشف',
            features: 'الميزات',
            join: 'انضم',
            discoverUniverse: "// اكتشف الكون",
            todayBriefing: "ملخص اليوم",
            tomorrowBriefing: "ملخص الغد",
            yesterdaySummary: "ملخص الأمس",
            calendarSettings: "إعدادات التقويم",
            connectGmail: "ربط جيميل",
            connectOutlook: "ربط أوتلوك",
            connectIcloud: "ربط آي كلاود",
            heraklesGreeting: "مرحبًا، أنا هيراكليس. على ماذا تعمل؟",
            typePlaceholder: "// اكتب مشروعك هنا",
            send: "إرسال",
            record: "تسجيل"
        }
    };

    // Functions
    function generateCalendar(year, month) {
        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);
        
        currentMonthElement.textContent = firstDay.toLocaleString('default', { month: 'long', year: 'numeric' });
        
        calendarGrid.innerHTML = '';

        for (let i = 0; i < firstDay.getDay(); i++) {
            calendarGrid.appendChild(createDayElement('', 'other-month'));
        }

        for (let i = 1; i <= lastDay.getDate(); i++) {
            const isToday = year === currentDate.getFullYear() && month === currentDate.getMonth() && i === currentDate.getDate();
            calendarGrid.appendChild(createDayElement(i, isToday ? 'today' : ''));
        }

        const remainingDays = 7 - (lastDay.getDay() + 1);
        for (let i = 1; i <= remainingDays; i++) {
            calendarGrid.appendChild(createDayElement('', 'other-month'));
        }
    }

    function createDayElement(day, className = '') {
        const dayElement = document.createElement('div');
        dayElement.className = `calendar-day ${className}`;
        dayElement.textContent = day;
        dayElement.addEventListener('click', () => handleDayClick(day));
        return dayElement;
    }

    function handleDayClick(day) {
        console.log(`Clicked on day: ${day}`);
        // Implement day click functionality here
    }

    function updateCalendar() {
        generateCalendar(currentDate.getFullYear(), currentDate.getMonth());
    }

    function updateDateTime() {
        const now = new Date();
        currentDateTime.textContent = now.toLocaleString('en-US', {
            weekday: 'short',
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    }

    function updateLanguage(lang) {
        const t = translations[lang];
        
        logoText.textContent = t.discoverUniverse;
        document.querySelector('nav ul li:nth-child(1) a').textContent = t.home;
        document.querySelector('nav ul li:nth-child(2) a').textContent = t.tools;
        
        const dropdownItems = document.querySelectorAll('.dropdown-content a');
        dropdownItems[0].textContent = t.discover;
        dropdownItems[1].textContent = t.features;
        dropdownItems[2].textContent = t.join;
        
        todayBriefing.textContent = t.todayBriefing;
        tomorrowBriefing.textContent = t.tomorrowBriefing;
        yesterdaySummary.textContent = t.yesterdaySummary;
        calendarSettings.textContent = t.calendarSettings;
        connectGmail.textContent = t.connectGmail;
        connectOutlook.textContent = t.connectOutlook;
        connectIcloud.textContent = t.connectIcloud;
        heraklesResponse.textContent = t.heraklesGreeting;
        chatInput.setAttribute('placeholder', t.typePlaceholder);
        chatSendButton.textContent = t.send;
        recordButton.textContent = t.record;
    }

    // Event Listeners
    prevMonthButton.addEventListener('click', () => {
        currentDate.setMonth(currentDate.getMonth() - 1);
        updateCalendar();
    });

    nextMonthButton.addEventListener('click', () => {
        currentDate.setMonth(currentDate.getMonth() + 1);
        updateCalendar();
    });

    chatSphere.addEventListener('click', () => {
        isChatOpen = !isChatOpen;
        chatConsole.style.display = isChatOpen ? 'block' : 'none';
        chatSphere.style.display = isChatOpen ? 'none' : 'block';
    });

    minimizeButton.addEventListener('click', () => {
        isChatOpen = false;
        chatConsole.style.display = 'none';
        chatSphere.style.display = 'block';
    });

    nightModeToggle.addEventListener('click', () => {
        document.body.classList.toggle('night-mode');
        const isNightMode = document.body.classList.contains('night-mode');
        nightIcon.style.display = isNightMode ? 'none' : 'inline-block';
        dayIcon.style.display = isNightMode ? 'inline-block' : 'none';
        localStorage.setItem('nightMode', isNightMode);
    });

    languageSelect.addEventListener('change', (event) => {
        updateLanguage(event.target.value);
    });

    // Initialization
    function init() {
        updateCalendar();
        setInterval(updateDateTime, 1000);
        updateDateTime();
        updateLanguage(languageSelect.value);

        // Check for saved night mode preference
        const savedNightMode = localStorage.getItem('nightMode');
        if (savedNightMode === 'true') {
            document.body.classList.add('night-mode');
            nightIcon.style.display = 'none';
            dayIcon.style.display = 'inline-block';
        }

        // Update chat sphere style
        const chatSphereH = chatSphere.querySelector('::after');
        if (chatSphereH) {
            chatSphereH.style.fontWeight = 'bold';
            chatSphereH.style.fontSize = '36px'; // 150% larger than the original 24px
        }
    }

    init();
});
