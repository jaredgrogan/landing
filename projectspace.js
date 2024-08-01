document.addEventListener('DOMContentLoaded', () => {
    const nightModeToggle = document.getElementById('nightModeToggle');
    const nightIcon = document.getElementById('nightIcon');
    const dayIcon = document.getElementById('dayIcon');
    const languageSelect = document.getElementById('languageSelect');
    const newNoteButton = document.getElementById('newNoteButton');
    const notesContainer = document.getElementById('notesContainer');
    const chatSendButton = document.getElementById('chatSendButton');
    const recordButton = document.getElementById('recordButton');
    const heraklesResponse = document.getElementById('heraklesResponse');
    const chatInput = document.getElementById('chatInput');
    const logoText = document.querySelector('.logo-text');
    let noteCount = 0;
    const maxNotes = 10;

    const translations = {
        en: {
            home: 'Home',
            tools: 'Tools',
            discover: 'Discover',
            features: 'Features',
            join: 'Join',
            newNote: 'New Note',
            send: 'Send',
            record: 'Record',
            heraklesGreeting: "Hi, I'm Herakles. What are you working on?",
            typePlaceholder: "// Type your project here",
            summary: 'Summary',
            extract: 'Extract',
            analyze: 'Analyze',
            actions: 'Actions',
            export: 'Export',
            save: 'Save',
            assets: 'Assets',
            discoverUniverse: 'Discover the Universe'
        },
        es: {
            home: 'Inicio',
            tools: 'Herramientas',
            discover: 'Descubrir',
            features: 'Características',
            join: 'Unirse',
            newNote: 'Nueva Nota',
            send: 'Enviar',
            record: 'Grabar',
            heraklesGreeting: "Hola, soy Herakles. ¿En qué estás trabajando?",
            typePlaceholder: "// Escribe tu proyecto aquí",
            summary: 'Resumen',
            extract: 'Extraer',
            analyze: 'Analizar',
            actions: 'Acciones',
            export: 'Exportar',
            save: 'Guardar',
            assets: 'Activos',
            discoverUniverse: 'Descubre el Universo'
        },
        it: {
            home: 'Home',
            tools: 'Strumenti',
            discover: 'Scopri',
            features: 'Funzionalità',
            join: 'Unisciti',
            newNote: 'Nuova Nota',
            send: 'Invia',
            record: 'Registra',
            heraklesGreeting: "Ciao, sono Herakles. Su cosa stai lavorando?",
            typePlaceholder: "// Scrivi il tuo progetto qui",
            summary: 'Riepilogo',
            extract: 'Estrai',
            analyze: 'Analizza',
            actions: 'Azioni',
            export: 'Esporta',
            save: 'Salva',
            assets: 'Risorse',
            discoverUniverse: 'Scopri l\'Universo'
        },
        fr: {
            home: 'Accueil',
            tools: 'Outils',
            discover: 'Découvrir',
            features: 'Fonctionnalités',
            join: 'Rejoindre',
            newNote: 'Nouvelle Note',
            send: 'Envoyer',
            record: 'Enregistrer',
            heraklesGreeting: "Salut, je suis Herakles. Sur quoi travailles-tu ?",
            typePlaceholder: "// Écrivez votre projet ici",
            summary: 'Résumé',
            extract: 'Extraire',
            analyze: 'Analyser',
            actions: 'Actions',
            export: 'Exporter',
            save: 'Sauvegarder',
            assets: 'Ressources',
            discoverUniverse: 'Découvrez l\'Univers'
        },
        de: {
            home: 'Startseite',
            tools: 'Werkzeuge',
            discover: 'Entdecken',
            features: 'Funktionen',
            join: 'Beitreten',
            newNote: 'Neue Notiz',
            send: 'Senden',
            record: 'Aufnehmen',
            heraklesGreeting: "Hallo, ich bin Herakles. Woran arbeitest du?",
            typePlaceholder: "// Geben Sie Ihr Projekt hier ein",
            summary: 'Zusammenfassung',
            extract: 'Extrahieren',
            analyze: 'Analysieren',
            actions: 'Aktionen',
            export: 'Exportieren',
            save: 'Speichern',
            assets: 'Ressourcen',
            discoverUniverse: 'Entdecke das Universum'
        },
        ar: {
            home: 'الرئيسية',
            tools: 'الأدوات',
            discover: 'اكتشف',
            features: 'الميزات',
            join: 'انضم',
            newNote: 'ملاحظة جديدة',
            send: 'إرسال',
            record: 'تسجيل',
            heraklesGreeting: "مرحبا، أنا هيراكليس. على ماذا تعمل؟",
            typePlaceholder: "// اكتب مشروعك هنا",
            summary: 'ملخص',
            extract: 'استخراج',
            analyze: 'تحليل',
            actions: 'إجراءات',
            export: 'تصدير',
            save: 'حفظ',
            assets: 'الأصول',
            discoverUniverse: 'اكتشف الكون'
        }
    };

    newNoteButton.addEventListener('click', () => {
        if (noteCount < maxNotes) {
            createNote();
        } else {
            alert('Maximum of 10 notes reached!');
        }
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
        const selectedLanguage = event.target.value;
        updateLanguage(selectedLanguage);
    });

    function updateLanguage(lang) {
        const t = translations[lang];
        
        // Update main menu items
        const navItems = document.querySelectorAll('nav ul li a.dropbtn');
        navItems[0].textContent = t.home;
        navItems[1].textContent = t.tools;

        // Update Home dropdown items
        const homeDropdownItems = document.querySelectorAll('nav ul li:first-child .dropdown-content a');
        homeDropdownItems[0].textContent = t.discover;
        homeDropdownItems[1].textContent = t.features;
        homeDropdownItems[2].textContent = t.join;

        // Update Tools dropdown items
        const toolsDropdownItems = document.querySelectorAll('nav ul li:nth-child(2) .dropdown-content a');
        toolsDropdownItems[0].textContent = t.summary;
        toolsDropdownItems[1].textContent = t.extract;
        toolsDropdownItems[2].textContent = t.analyze;
        toolsDropdownItems[3].textContent = t.actions;
        toolsDropdownItems[4].textContent = t.export;
        toolsDropdownItems[5].textContent = t.save;
        toolsDropdownItems[6].textContent = t.assets;

        // Update other UI elements
        heraklesResponse.innerHTML = t.heraklesGreeting;
        chatInput.setAttribute('placeholder', t.typePlaceholder);
        chatSendButton.textContent = t.send;
        recordButton.textContent = t.record;
        newNoteButton.textContent = t.newNote;
        logoText.textContent = t.discoverUniverse;  // Update the slogan
    }

    function createNote() {
        const note = document.createElement('div');
        note.className = 'note';
        
        const angle = (noteCount * 30) % 360; // 30 degrees rotation for each note
        const radius = 150; // 150px radius
        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;
        
        // Calculate position based on clock positions (1, 2, 3 o'clock)
        let x, y;
        switch (noteCount % 3) {
            case 0: // 3 o'clock
                x = centerX + radius;
                y = centerY;
                break;
            case 1: // 2 o'clock
                x = centerX + radius * Math.cos(30 * Math.PI / 180);
                y = centerY - radius * Math.sin(30 * Math.PI / 180);
                break;
            case 2: // 1 o'clock
                x = centerX + radius * Math.cos(60 * Math.PI / 180);
                y = centerY - radius * Math.sin(60 * Math.PI / 180);
                break;
        }
        
        x -= 125; // Adjust for note width (250/2)
        y -= 100; // Adjust for note height (200/2)
        
        note.style.left = `${x}px`;
        note.style.top = `${y}px`;

        note.innerHTML = `
            <div class="note-header">
                <input type="text" class="note-title" placeholder="Title">
                <input type="text" class="note-tags" placeholder="Tags">
            </div>
            <div class="note-content">
                <div id="editor${noteCount}"></div>
            </div>
            <div class="note-buttons">
                <button class="note-button save-button">Save</button>
                <button class="note-button delete-button">Delete</button>
            </div>
        `;
        noteCount++;
        notesContainer.appendChild(note);
        makeNoteDraggable(note);
        initializeEditor(noteCount - 1);

        const deleteButton = note.querySelector('.delete-button');
        deleteButton.addEventListener('click', () => {
            closeNote(note);
        });
    }

    function closeNote(note) {
        note.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
        note.style.opacity = '0';
        note.style.transform = 'scale(0.8)';

        setTimeout(() => {
            if (note.parentNode === notesContainer) {
                notesContainer.removeChild(note);
                noteCount--;
            }
        }, 300);
    }

    function makeNoteDraggable(note) {
        interact(note)
            .draggable({
                inertia: true,
                modifiers: [
                    interact.modifiers.restrictRect({
                        restriction: 'parent',
                        endOnly: true
                    })
                ],
                autoScroll: true,
                listeners: {
                    move: dragMoveListener,
                }
            });
    }

    function dragMoveListener(event) {
        var target = event.target;
        var x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx;
        var y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

        target.style.transform = 'translate(' + x + 'px, ' + y + 'px)';

        target.setAttribute('data-x', x);
        target.setAttribute('data-y', y);
    }

    function initializeEditor(index) {
        const toolbarOptions = [
            ['bold', 'italic', 'underline'],
            [{ 'list': 'ordered'}, { 'list': 'bullet' }]
        ];

        new Quill(`#editor${index}`, {
            modules: {
                toolbar: toolbarOptions
            },
            theme: 'snow'
        });
    }

    chatSendButton.addEventListener('click', () => {
        const userMessage = chatInput.value.trim();
        if (userMessage) {
            heraklesResponse.innerHTML += `<p><strong>You:</strong> ${userMessage}</p>`;
            chatInput.value = '';

            setTimeout(() => {
                heraklesResponse.innerHTML += `<p><strong>Herakles:</strong> I'm processing your message...</p>`;
            }, 500);
        }
    });

    recordButton.addEventListener('click', () => {
        alert('Voice recording feature coming soon!');
    });

    // Initial language set
    updateLanguage(languageSelect.value);
});
