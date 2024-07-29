document.addEventListener('DOMContentLoaded', () => {
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
    const logoText = document.querySelector('.logo-text');
    const currentDateTime = document.getElementById('currentDateTime');
    const minimizeButton = document.createElement('button');
    minimizeButton.id = 'minimizeChat';
    minimizeButton.textContent = '-';
    chatConsole.appendChild(minimizeButton);
    
    let currentDate = new Date();
    let isChatOpen = false;

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

    function updateBriefings() {
        document.getElementById('todayBriefing').textContent = "Today's events and tasks...";
        document.getElementById('tomorrowBriefing').textContent = "Upcoming events for tomorrow...";
        document.getElementById('yesterdaySummary').textContent = "Summary of yesterday's activities...";
    }

    function updateLanguage(lang) {
        const t = translations[lang];
        
        logoText.textContent = t.discoverUniverse;
        document.querySelector('.left-column h2:nth-child(1)').textContent = t.todayBriefing;
        document.querySelector('.left-column h2:nth-child(3)').textContent = t.tomorrowBriefing;
        document.querySelector('.left-column h2:nth-child(5)').textContent = t.yesterdaySummary;
        
        document.querySelectorAll('nav ul li a.dropbtn')[0].textContent = t.home;
        document.querySelectorAll('nav ul li a.dropbtn')[1].textContent = t.tools;
        
        document.querySelectorAll('nav ul li:first-child .dropdown-content a')[0].textContent = t.discover;
        document.querySelectorAll('nav ul li:first-child .dropdown-content a')[1].textContent = t.features;
        document.querySelectorAll('nav ul li:first-child .dropdown-content a')[2].textContent = t.join;
        
        document.querySelector('#settings-panel h3').textContent = t.calendarSettings;
        document.getElementById('connect-gmail').textContent = t.connectGmail;
        document.getElementById('connect-outlook').textContent = t.connectOutlook;
        document.getElementById('connect-icloud').textContent = t.connectIcloud;
        
        document.getElementById('heraklesResponse').textContent = t.heraklesGreeting;
        document.getElementById('chatInput').setAttribute('placeholder', t.typePlaceholder);
        document.getElementById('chatSendButton').textContent = t.send;
        document.getElementById('recordButton').textContent = t.record;
    }

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
        if (document.body.classList.contains('night-mode')) {
            nightIcon.style.display = 'none';
            dayIcon.style.display = 'inline-block';
        } else {
            nightIcon.style.display = 'inline-block';
            dayIcon.style.display = 'none';
        }
    });

    languageSelect.addEventListener('change', (event) => {
        updateLanguage(event.target.value);
    });

    interact(chatConsole).draggable({
        listeners: {
            move(event) {
                const target = event.target;
                const x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx;
                const y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

                target.style.transform = `translate(${x}px, ${y}px)`;
                target.setAttribute('data-x', x);
                target.setAttribute('data-y', y);
            }
        }
    });

    // Initialize
    updateCalendar();
    setInterval(updateDateTime, 1000);
    updateDateTime();
    updateBriefings();
    updateLanguage(languageSelect.value);
});
