document.addEventListener('DOMContentLoaded', () => {
    const nightModeToggle = document.getElementById('nightModeToggle');
    const nightIcon = document.getElementById('nightIcon');
    const dayIcon = document.getElementById('dayIcon');
    const languageSelect = document.getElementById('languageSelect');
    const avatarUpload = document.getElementById('avatar-upload');
    const userAvatar = document.getElementById('user-avatar');
    const saveNotesButton = document.getElementById('save-notes');
    const notesArea = document.getElementById('notes-area');

    // Language translations
    const translations = {
        en: {
            home: 'Home',
            profile: 'Profile',
            calendar: 'Calendar',
            notes: 'Notes',
            uploadPhoto: 'Upload Photo',
            upcomingEvents: 'Upcoming Events',
            personalNotes: 'Personal Notes',
            saveNotes: 'Save Notes',
            notesPlaceholder: 'Type your notes here...'
        },
        es: {
            home: 'Inicio',
            profile: 'Perfil',
            calendar: 'Calendario',
            notes: 'Notas',
            uploadPhoto: 'Subir Foto',
            upcomingEvents: 'Próximos Eventos',
            personalNotes: 'Notas Personales',
            saveNotes: 'Guardar Notas',
            notesPlaceholder: 'Escribe tus notas aquí...'
        },
        it: {
            home: 'Home',
            profile: 'Profilo',
            calendar: 'Calendario',
            notes: 'Note',
            uploadPhoto: 'Carica Foto',
            upcomingEvents: 'Prossimi Eventi',
            personalNotes: 'Note Personali',
            saveNotes: 'Salva Note',
            notesPlaceholder: 'Scrivi le tue note qui...'
        },
        fr: {
            home: 'Accueil',
            profile: 'Profil',
            calendar: 'Calendrier',
            notes: 'Notes',
            uploadPhoto: 'Télécharger Photo',
            upcomingEvents: 'Événements à Venir',
            personalNotes: 'Notes Personnelles',
            saveNotes: 'Enregistrer les Notes',
            notesPlaceholder: 'Tapez vos notes ici...'
        },
        de: {
            home: 'Startseite',
            profile: 'Profil',
            calendar: 'Kalender',
            notes: 'Notizen',
            uploadPhoto: 'Foto Hochladen',
            upcomingEvents: 'Kommende Ereignisse',
            personalNotes: 'Persönliche Notizen',
            saveNotes: 'Notizen Speichern',
            notesPlaceholder: 'Schreiben Sie Ihre Notizen hier...'
        },
        ar: {
            home: 'الرئيسية',
            profile: 'الملف الشخصي',
            calendar: 'التقويم',
            notes: 'الملاحظات',
            uploadPhoto: 'تحميل الصورة',
            upcomingEvents: 'الأحداث القادمة',
            personalNotes: 'الملاحظات الشخصية',
            saveNotes: 'حفظ الملاحظات',
            notesPlaceholder: 'اكتب ملاحظاتك هنا...'
        }
    };

    function updateLanguage(lang) {
        const t = translations[lang];
        document.getElementById('nav-home').textContent = t.home;
        document.getElementById('nav-profile').textContent = t.profile;
        document.getElementById('nav-calendar').textContent = t.calendar;
        document.getElementById('nav-notes').textContent = t.notes;
        document.getElementById('avatar-upload-label').textContent = t.uploadPhoto;
        document.getElementById('calendar-title').textContent = t.upcomingEvents;
        document.getElementById('notes-title').textContent = t.personalNotes;
        document.getElementById('save-notes').textContent = t.saveNotes;
        notesArea.placeholder = t.notesPlaceholder;
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

    avatarUpload.addEventListener('change', (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                userAvatar.src = e.target.result;
            };
            reader.readAsDataURL(file);
        }
