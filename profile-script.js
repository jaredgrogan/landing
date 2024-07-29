document.addEventListener('DOMContentLoaded', () => {
    const nightModeToggle = document.getElementById('nightModeToggle');
    const nightIcon = document.getElementById('nightIcon');
    const dayIcon = document.getElementById('dayIcon');
    const languageSelect = document.getElementById('languageSelect');
    const avatarUpload = document.getElementById('avatar-upload');
    const userAvatar = document.getElementById('user-avatar');
    const saveNotesButton = document.getElementById('save-notes');
    const notesArea = document.getElementById('notes-area');
    const statusMessage = document.getElementById('status-message');
    const editButton = document.querySelector('.edit-button');
    const saveButton = document.querySelector('.save-button');
    const chatSphere = document.querySelector('.chat-sphere');
    const chatConsole = document.querySelector('.chat-console');
    const minimizeChat = document.getElementById('minimizeChat');

    // Language translations
    const translations = {
        en: {
            home: 'Home',
            profile: 'Profile',
            calendar: 'Calendar',
            notes: 'Notes',
            focusProductivity: 'Focus & Productivity',
            globalExplorer: 'Global Explorer',
            qrCode: 'QR Code',
            uploadPhoto: 'Upload Photo',
            upcomingEvents: 'Upcoming Events',
            personalNotes: 'Personal Notes',
            saveNotes: 'Save Notes',
            notesPlaceholder: 'Type your notes here...',
            statusPlaceholder: 'Set your status...',
            editStatus: 'Edit',
            saveStatus: 'Save'
        },
        es: {
            home: 'Inicio',
            profile: 'Perfil',
            calendar: 'Calendario',
            notes: 'Notas',
            focusProductivity: 'Enfoque y Productividad',
            globalExplorer: 'Explorador Global',
            qrCode: 'Código QR',
            uploadPhoto: 'Subir Foto',
            upcomingEvents: 'Próximos Eventos',
            personalNotes: 'Notas Personales',
            saveNotes: 'Guardar Notas',
            notesPlaceholder: 'Escribe tus notas aquí...',
            statusPlaceholder: 'Establece tu estado...',
            editStatus: 'Editar',
            saveStatus: 'Guardar'
        },
        it: {
            home: 'Home',
            profile: 'Profilo',
            calendar: 'Calendario',
            notes: 'Note',
            focusProductivity: 'Focus e Produttività',
            globalExplorer: 'Esploratore Globale',
            qrCode: 'Codice QR',
            uploadPhoto: 'Carica Foto',
            upcomingEvents: 'Prossimi Eventi',
            personalNotes: 'Note Personali',
            saveNotes: 'Salva Note',
            notesPlaceholder: 'Scrivi le tue note qui...',
            statusPlaceholder: 'Imposta il tuo stato...',
            editStatus: 'Modifica',
            saveStatus: 'Salva'
        },
        fr: {
            home: 'Accueil',
            profile: 'Profil',
            calendar: 'Calendrier',
            notes: 'Notes',
            focusProductivity: 'Concentration et Productivité',
            globalExplorer: 'Explorateur Mondial',
            qrCode: 'Code QR',
            uploadPhoto: 'Télécharger Photo',
            upcomingEvents: 'Événements à Venir',
            personalNotes: 'Notes Personnelles',
            saveNotes: 'Enregistrer les Notes',
            notesPlaceholder: 'Tapez vos notes ici...',
            statusPlaceholder: 'Définissez votre statut...',
            editStatus: 'Modifier',
            saveStatus: 'Enregistrer'
        },
        de: {
            home: 'Startseite',
            profile: 'Profil',
            calendar: 'Kalender',
            notes: 'Notizen',
            focusProductivity: 'Fokus und Produktivität',
            globalExplorer: 'Globaler Entdecker',
            qrCode: 'QR-Code',
            uploadPhoto: 'Foto Hochladen',
            upcomingEvents: 'Kommende Ereignisse',
            personalNotes: 'Persönliche Notizen',
            saveNotes: 'Notizen Speichern',
            notesPlaceholder: 'Schreiben Sie Ihre Notizen hier...',
            statusPlaceholder: 'Setzen Sie Ihren Status...',
            editStatus: 'Bearbeiten',
            saveStatus: 'Speichern'
        },
        ar: {
            home: 'الرئيسية',
            profile: 'الملف الشخصي',
            calendar: 'التقويم',
            notes: 'الملاحظات',
            focusProductivity: 'التركيز والإنتاجية',
            globalExplorer: 'المستكشف العالمي',
            qrCode: 'رمز الاستجابة السريعة',
            uploadPhoto: 'تحميل الصورة',
            upcomingEvents: 'الأحداث القادمة',
            personalNotes: 'الملاحظات الشخصية',
            saveNotes: 'حفظ الملاحظات',
            notesPlaceholder: 'اكتب ملاحظاتك هنا...',
            statusPlaceholder: 'حدد حالتك...',
            editStatus: 'تحرير',
            saveStatus: 'حفظ'
        }
    };

    function updateLanguage(lang) {
        const t = translations[lang];
        document.getElementById('nav-home').textContent = t.home;
        document.getElementById('nav-profile').textContent = t.profile;
        document.getElementById('nav-calendar').textContent = t.calendar;
        document.getElementById('nav-notes').textContent = t.notes;
        document.getElementById('focus-productivity').querySelector('h3').textContent = t.focusProductivity;
        document.getElementById('global-explorer').querySelector('h3').textContent = t.globalExplorer;
        document.getElementById('qr-code-module').querySelector('h3').textContent = t.qrCode;
        document.getElementById('avatar-upload-label').textContent = t.uploadPhoto;
        document.getElementById('calendar-title').textContent = t.upcomingEvents;
        document.getElementById('notes-title').textContent = t.personalNotes;
        document.getElementById('save-notes').textContent = t.saveNotes;
        notesArea.placeholder = t.notesPlaceholder;
        statusMessage.placeholder = t.statusPlaceholder;
        editButton.title = t.editStatus;
        saveButton.title = t.saveStatus;
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

    avatarUpload.addEventListener('change', (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                userAvatar.src = e.target.result;
            };
            reader.readAsDataURL(file);
        }
    });

    statusMessage.addEventListener('input', () => {
        if (statusMessage.value.length > 60) {
            statusMessage.value = statusMessage.value.slice(0, 60);
        }
    });

    editButton.addEventListener('click', () => {
        statusMessage.readOnly = false;
        editButton.style.display = 'none';
        saveButton.style.display = 'inline-block';
    });

    saveButton.addEventListener('click', () => {
        statusMessage.readOnly = true;
        editButton.style.display = 'inline-block';
        saveButton.style.display = 'none';
        // Here you would typically save the status to a backend
    });

    chatSphere.addEventListener('click', () => {
        chatConsole.style.display = 'block';
        chatSphere.style.display = 'none';
    });

    minimizeChat.addEventListener('click', () => {
        chatConsole.style.display = 'none';
        chatSphere.style.display = 'flex';
    });

    function updateGlobalExplorer() {
        const globalExplorer = document.getElementById('global-explorer');
        globalExplorer.innerHTML = `
            <h3>Global Explorer</h3>
            <h4>Current Business News for Global AI</h4>
            <ul>
                <li>Smart money piles into South Korean stocks as global AI bet looks for options to TSMC</li>
                <li>Cisco launches $1B Global AI Investment Fund</li>
                <li>China promotes global AI cooperation with new Shanghai Declaration</li>
                <li>Paris AI Action summit to focus on concrete action on AI safety</li>
            </ul>
            <h4>Spotlight Country for AI/Tech: South Korea</h4>
            <p>South Korea is emerging as a key player in the global AI market, with investors showing increased interest in Korean tech stocks.</p>
        `;
    }

    function initCalendar() {
        const calendar = document.getElementById('mini-calendar');
        const date = new Date();
        const year = date.getFullYear();
        const month = date.getMonth();

        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);

        let html = '<table>';
        html += '<tr><th>Sun</th><th>Mon</th><th>Tue</th><th>Wed</th><th>Thu</th><th>Fri</th><th>Sat</th></tr>';

        let day = 1;
        for (let i = 0; i < 6; i++) {
            html += '<tr>';
            for (let j = 0; j < 7; j++) {
                if (i === 0 && j < firstDay.getDay()) {
                    html += '<td></td>';
                } else if (day > lastDay.getDate()) {
                    html += '<td></td>';
                } else {
                    html += `<td>${day}</td>`;
                    day++;
                }
            }
            html += '</tr>';
            if (day > lastDay.getDate()) break;
        }

        html += '</table>';
        calendar.innerHTML = html;
    }

    function initFocusProductivity() {
        const focusProductivity = document.getElementById('focus-productivity');
        focusProductivity.innerHTML = `
            <h3>Focus & Productivity</h3>
            <button id="toggle-focus">Toggle Focus Mode</button>
            <div id="timer">25:00</div>
            <button id="start-timer">Start Timer</button>
            <canvas id="productivity-chart"></canvas>
        `;

    function generateQRCode() {
        const qrCode = document.getElementById('qr-code-module');
        // Use a QR code generation library here
        qrCode.innerHTML = '<img src="mock-qr-code.png" alt="QR Code">';
    }

    updateGlobalExplorer();
    initCalendar();
    initFocusProductivity();
    generateQRCode();

    // Initial language set
    updateLanguage(languageSelect.value);
});
