
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
    let noteCount = 0;
    const maxNotes = 10;

    const notePositions = [
        { left: 100, top: 150 },
        { left: 300, top: 150 },
        { left: 500, top: 150 },
        { left: 700, top: 150 },
        { left: 900, top: 150 },
        { left: 1100, top: 150 },
        { left: 1300, top: 150 },
        { left: 1500, top: 150 },
        { left: 1700, top: 150 },
        { left: 1900, top: 150 }
    ];

const translations = {
        en: {
            home: 'Home',
            tools: 'Tools',
            newNote: 'New Note',
            send: 'Send',
            record: 'Record',
            heraklesGreeting: "HI, I'm Herakles. What are you working on?",
            typePlaceholder: "// Type your project here",
            summary: 'Summary',
            extract: 'Extract',
            analyze: 'Analyze',
            actions: 'Actions',
            export: 'Export',
            save: 'Save',
            assets: 'Assets'
        },
        es: {
            home: 'Inicio',
            tools: 'Herramientas',
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
            assets: 'Activos'
        },
        it: {
            home: 'Home',
            tools: 'Strumenti',
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
            assets: 'Risorse'
        },
        fr: {
            home: 'Accueil',
            tools: 'Outils',
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
            assets: 'Ressources'
        },
        de: {
            home: 'Startseite',
            tools: 'Werkzeuge',
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
            assets: 'Ressourcen'
        },
        ar: {
            home: 'الرئيسية',
            tools: 'الأدوات',
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
            assets: 'الأصول'
        }
    };

    languageSelect.addEventListener('change', (event) => {
        const selectedLanguage = event.target.value;
        updateLanguage(selectedLanguage);
    });

    function updateLanguage(lang) {
        const t = translations[lang];
        
        // Update main menu items
        document.querySelector('nav ul li:first-child a').textContent = t.home;
        document.querySelector('nav ul li:nth-child(2) a').textContent = t.tools;

        // Update dropdown menu items
        const dropdownItems = document.querySelectorAll('.dropdown-content a');
        dropdownItems[0].textContent = t.summary;
        dropdownItems[1].textContent = t.extract;
        dropdownItems[2].textContent = t.analyze;
        dropdownItems[3].textContent = t.actions;
        dropdownItems[4].textContent = t.export;
        dropdownItems[5].textContent = t.save;
        dropdownItems[6].textContent = t.assets;

        // Update other UI elements
        document.getElementById('heraklesResponse').innerHTML = t.heraklesGreeting;
        document.getElementById('chatInput').setAttribute('placeholder', t.typePlaceholder);
        document.getElementById('chatSendButton').textContent = t.send;
        document.getElementById('recordButton').textContent = t.record;
        document.getElementById('newNoteButton').textContent = t.newNote;
    }
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
        if (selectedLanguage === 'es') {
            translateToSpanish();
        } else {
            translateToEnglish();
        }
    });

    function translateToSpanish() {
        document.querySelectorAll('nav ul li a').forEach((element, index) => {
            const spanishMenu = ['Inicio', 'Herramientas'];
            if (index < spanishMenu.length) {
                element.innerText = spanishMenu[index];
            }
        });
        document.querySelectorAll('.dropdown-content a').forEach((element, index) => {
            const spanishSubmenu = ['Resumen', 'Extraer', 'Analizar', 'Acciones', 'Exportar', 'Guardar', 'Activos'];
            if (index < spanishSubmenu.length) {
                element.innerText = spanishSubmenu[index];
            }
        });
        document.getElementById('heraklesResponse').innerHTML = 'Hola, soy Herakles. ¿En qué estás trabajando?';
        chatInput.setAttribute('placeholder', '// Escribe tu proyecto aquí');
        chatSendButton.innerText = 'Enviar';
        recordButton.innerText = 'Grabar';
        newNoteButton.innerText = 'Nueva Nota';
    }

    function translateToEnglish() {
        document.querySelectorAll('nav ul li a').forEach((element, index) => {
            const englishMenu = ['Home', 'Tools'];
            if (index < englishMenu.length) {
                element.innerText = englishMenu[index];
            }
        });
        document.querySelectorAll('.dropdown-content a').forEach((element, index) => {
            const englishSubmenu = ['Summary', 'Extract', 'Analyze', 'Actions', 'Export', 'Save', 'Assets'];
            if (index < englishSubmenu.length) {
                element.innerText = englishSubmenu[index];
            }
        });
        document.getElementById('heraklesResponse').innerHTML = 'HI, I\'m Herakles. What are you working on?';
        chatInput.setAttribute('placeholder', '// Type your project here');
        chatSendButton.innerText = 'Send';
        recordButton.innerText = 'Record';
        newNoteButton.innerText = 'New Note';
    }
    
function createNote() {
        const note = document.createElement('div');
        note.className = 'note';
        const position = notePositions[noteCount % notePositions.length];
        note.style.left = `${position.left}px`;
        note.style.top = `${position.top}px`;
        note.draggable = true;

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
        // Add a closing animation
        note.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
        note.style.opacity = '0';
        note.style.transform = 'scale(0.8)';

        // Remove the note after the animation completes
        setTimeout(() => {
            notesContainer.removeChild(note);
            noteCount--;
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
        const chatInput = document.getElementById('chatInput');
        const heraklesResponse = document.getElementById('heraklesResponse');
        const userMessage = chatInput.value.trim();
        if (userMessage) {
            heraklesResponse.innerHTML += `<p><strong>You:</strong> ${userMessage}</p>`;
            chatInput.value = '';

            // Mock AI response (replace with actual AI integration)
            setTimeout(() => {
                heraklesResponse.innerHTML += `<p><strong>Herakles:</strong> I'm processing your message...</p>`;
            }, 500);
        }
    });

    recordButton.addEventListener('click', () => {
        alert('Voice recording feature coming soon!');
    });
});
