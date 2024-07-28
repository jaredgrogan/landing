
Copy code
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
            const italianMenu = ['Home', 'Sommario', 'Estrarre', 'Analizzare', 'Azioni', 'Esportare', 'Salvare', 'Risorse'];
            element.innerText = italianMenu[index];
        });
        document.getElementById('heraklesResponse').innerHTML = 'Ciao, sono Herakles. A cosa stai lavorando?';
        chatInput.setAttribute('placeholder', '// Scrivi qui il tuo progetto');
        chatSendButton.innerText = 'Inviare';
        recordButton.innerText = 'Registrare';
        newNoteButton.innerText = 'Nuova Nota';
    }

    function translateToFrench() {
        document.querySelectorAll('nav ul li a').forEach((element, index) => {
            const frenchMenu = ['Accueil', 'Résumé', 'Extraire', 'Analyser', 'Actions', 'Exporter', 'Enregistrer', 'Ressources'];
            element.innerText = frenchMenu[index];
        });
        document.getElementById('heraklesResponse').innerHTML = 'Salut, je suis Herakles. Sur quoi travaillez-vous?';
        chatInput.setAttribute('placeholder', '// Tapez votre projet ici');
        chatSendButton.innerText = 'Envoyer';
        recordButton.innerText = 'Enregistrer';
        newNoteButton.innerText = 'Nouvelle Note';
    }

    function translateToGerman() {
        document.querySelectorAll('nav ul li a').forEach((element, index) => {
            const germanMenu = ['Startseite', 'Zusammenfassung', 'Extrahieren', 'Analysieren', 'Aktionen', 'Exportieren', 'Speichern', 'Vermögenswerte'];
            element.innerText = germanMenu[index];
        });
        document.getElementById('heraklesResponse').innerHTML = 'Hallo, ich bin Herakles. Woran arbeitest du?';
        chatInput.setAttribute('placeholder', '// Geben Sie hier Ihr Projekt ein');
        chatSendButton.innerText = 'Senden';
        recordButton.innerText = 'Aufzeichnen';
        newNoteButton.innerText = 'Neue Notiz';
    }

    function translateToArabic() {
        document.querySelectorAll('nav ul li a').forEach((element, index) => {
            const arabicMenu = ['الصفحة الرئيسية', 'ملخص', 'استخراج', 'تحليل', 'إجراءات', 'تصدير', 'حفظ', 'أصول'];
            element.innerText = arabicMenu[index];
        });
        document.getElementById('heraklesResponse').innerHTML = 'مرحبًا ، أنا Herakles. ما الذي تعمل عليه؟';
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
        document.getElementById('heraklesResponse').innerHTML = "HI, I'm Herakles. What are you working on?";
        chatInput.setAttribute('placeholder', '// Type your project here');
        chatSendButton.innerText = 'Send';
        recordButton.innerText = 'Record';
        newNoteButton.innerText = 'New Note';
    }

    newNoteButton.addEventListener('click', () => {
        const newNote = document.createElement('div');
        newNote.classList.add('note');
        newNote.innerHTML = `
            <div class="note-header">
                <input type="text" class="note-title" placeholder="Title">
                <input type="text" class="note-tags" placeholder="Tags">
                <button class="note-button">Delete</button>
            </div>
            <div class="note-content">
                <textarea placeholder="Write your note here..."></textarea>
            </div>
        `;
        notesContainer.appendChild(newNote);
        noteCount++;
        enableDragAndDrop(newNote);
    });

    chatSendButton.addEventListener('click', () => {
        const userMessage = chatInput.value;
        if (userMessage.trim()) {
            heraklesResponse.innerHTML = userMessage;
            chatInput.value = '';
        }
    });

    function enableDragAndDrop(element) {
        interact(element).draggable({
            inertia: true,
            modifiers: [
                interact.modifiers.restrictRect({
                    restriction: 'parent',
                    endOnly: true
                })
            ],
            autoScroll: true,
            listeners: {
                move: dragMoveListener
            }
        });
    }

    function dragMoveListener(event) {
        const target = event.target;
        const x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx;
        const y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

        target.style.transform = `translate(${x}px, ${y}px)`;

        target.setAttribute('data-x', x);
        target.setAttribute('data-y', y);
    }

    window.dragMoveListener = dragMoveListener;
});
