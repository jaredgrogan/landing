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
        // Add translations for other languages (it, fr, de, ar) here
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

    prevMonthButton.addEventListener('click', () => {
        currentDate.setMonth(currentDate.getMonth() - 1);
        updateCalendar();
    });

    nextMonthButton.addEventListener('click', () => {
        currentDate.setMonth(currentDate.getMonth() + 1);
        updateCalendar();
    });

    function updateDateTime() {
        const now = new Date();
        document.getElementById('currentDateTime').textContent = now.toLocaleString('en-US', {
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

    chatSphere.addEventListener('click', () => {
        isChatOpen = !isChatOpen;
        chatConsole.style.display = isChatOpen ? 'block' : 'none';
        chatSphere.style.display = isChatOpen ? 'none' : 'block';
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

    // Initialize
    updateCalendar();
    setInterval(updateDateTime, 1000);
    updateDateTime();
    updateBriefings();
    updateLanguage(languageSelect.value);
});
