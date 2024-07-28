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

    nightModeToggle.addEventListener('click', () => {
        document.body.classList.toggle('night-mode');
        if (document.body.classList.contains('night-mode')) {
            nightIcon.style.display = 'none';
            dayIcon.style.display = 'block';
        } else {
            nightIcon.style.display = 'block';
            dayIcon.style.display = 'none';
        }
    });

    languageSelect.addEventListener('change', () => {
        const selectedLanguage = languageSelect.value;
        translateContent(selectedLanguage);
    });

    function translateContent(language) {
        switch (language) {
            case 'es':
                translateToSpanish();
                break;
            case 'it':
                translateToItalian();
                break;
            case 'fr':
                translateToFrench();
                break;
            case 'de':
                translateToGerman();
                break;
            case 'ar':
                translateToArabic();
                break;
            default:
                translateToEnglish();
        }
    }

    function translateToSpanish() {
        document.querySelectorAll('nav ul li a').forEach((element, index) => {
            const spanishMenu = ['Inicio', 'Resumen', 'Extraer', 'Analizar', 'Acciones', 'Exportar', 'Guardar', 'Activos'];
            element.innerText = spanishMenu[index];
        });
        document.getElementById('heraklesResponse').innerHTML = 'Hola, soy Herakles. ¿En qué estás trabajando?';
        chatInput.setAttribute('placeholder', '// Escribe tu proyecto aquí');
        chatSendButton.innerText = 'Enviar';
        recordButton.innerText = 'Grabar';
        newNoteButton.innerText = 'Nueva Nota';
    }

    function translateToItalian() {
        document.querySelectorAll('nav ul li a').forEach((element, index) => {
            const italianMenu = ['Home', 'Riepilogo', 'Estrai', 'Analizza', 'Azioni', 'Esporta', 'Salva', 'Risorse'];
            element.innerText = italianMenu[index];
        });
        document.getElementById('heraklesResponse').innerHTML = 'Ciao, sono Herakles. Su cosa stai lavorando?';
        chatInput.setAttribute('placeholder', '// Scrivi il tuo progetto qui');
        chatSendButton.innerText = 'Invia';
        recordButton.innerText = 'Registrare';
        newNoteButton.innerText = 'Nuova Nota';
    }

    function translateToFrench() {
        document.querySelectorAll('nav ul li a').forEach((element, index) => {
            const frenchMenu = ['Accueil', 'Résumé', 'Extraire', 'Analyser', 'Actions', 'Exporter', 'Sauvegarder', 'Ressources'];
            element.innerText = frenchMenu[index];
        });
        document.getElementById('heraklesResponse').innerHTML = 'Bonjour, je suis Herakles. Sur quoi travaillez-vous?';
        chatInput.setAttribute('placeholder', '// Tapez votre projet ici');
        chatSendButton.innerText = 'Envoyer';
        recordButton.innerText = 'Enregistrer';
        newNoteButton.innerText = 'Nouvelle Note';
    }

    function translateToGerman() {
        document.querySelectorAll('nav ul li a').forEach((element, index) => {
            const germanMenu = ['Startseite', 'Zusammenfassung', 'Extrahieren', 'Analysieren', 'Aktionen', 'Exportieren', 'Speichern', 'Ressourcen'];
            element.innerText = germanMenu[index];
        });
        document.getElementById('heraklesResponse').innerHTML = 'Hallo, ich bin Herakles. Woran arbeitest du?';
        chatInput.setAttribute('placeholder', '// Geben Sie Ihr Projekt hier ein');
        chatSendButton.innerText = 'Senden';
        recordButton.innerText = 'Aufnehmen';
        newNoteButton.innerText = 'Neue Notiz';
    }

    function translateToArabic() {
        document.querySelectorAll('nav ul li a').forEach((element, index) => {
            const arabicMenu = ['الصفحة الرئيسية', 'ملخص', 'استخراج', 'تحليل', 'إجراءات', 'تصدير', 'حفظ', 'الأصول'];
            element.innerText = arabicMenu[index];
        });
        document.getElementById('heraklesResponse').innerHTML = 'مرحبًا، أنا هيراكليس. ماذا تعمل؟';
        chatInput.setAttribute('placeholder', '// اكتب مشروعك هنا');
        chatSendButton.innerText = 'إرسال';
        recordButton.innerText = 'تسجيل';
        newNoteButton.innerText = 'ملاحظة جديدة';
    }

    function translateToEnglish() {
        document.querySelectorAll('nav ul li a').forEach((element, index) => {
            const englishMenu = ['Home', 'Summary', 'Extract', 'Analyze', 'Actions', 'Export', 'Save', 'Assets'];
            element.innerText = englishMenu[index];
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
        note.innerHTML = `
            <div class="note-header">
                <input type="text" class="note-title" placeholder="Title">
                <input type="text" class="note-tags" placeholder="Tags">
                <button class="note-button delete-button">X</button>
            </div>
            <div class="note-content">
                <div id="editor${noteCount}"></div>
            </div>
        `;
        noteCount++;
        notesContainer.appendChild(note);
        initializeEditor(noteCount - 1);

        const deleteButton = note.querySelector('.delete-button');
        deleteButton.addEventListener('click', () => {
            notesContainer.removeChild(note);
        });

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
                    move(event) {
                        const target = event.target;
                        const x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx;
                        const y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

                        target
