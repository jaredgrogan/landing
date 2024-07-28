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
            dayIcon.style.display = 'block';
        } else {
            nightIcon.style.display = 'block';
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
            const spanishMenu = ['Inicio', 'Resumen', 'Extraer', 'Analizar', 'Exportar', 'Activos', 'Guardar'];
            element.innerText = spanishMenu[index];
        });
        document.getElementById('heraklesResponse').innerHTML = 'Hola, soy Herakles. ¿En qué estás trabajando?';
        chatInput.setAttribute('placeholder', '// Escribe tu proyecto aquí');
        chatSendButton.innerText = 'Enviar';
        recordButton.innerText = 'Grabar';
    }

    function translateToEnglish() {
        document.querySelectorAll('nav ul li a').forEach((element, index) => {
            const englishMenu = ['Home', 'Summarize', 'Extract', 'Analyze', 'Export', 'Assets', 'Save'];
            element.innerText = englishMenu[index];
        });
        document.getElementById('heraklesResponse').innerHTML = 'HI, I\'m Herakles. What are you working on?';
        chatInput.setAttribute('placeholder', '// Type your project here');
        chatSendButton.innerText = 'Send';
        recordButton.innerText = 'Record';
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
            notesContainer.removeChild(note);
            noteCount--;
        });
    }

    function makeNoteDraggable(note) {
        note.addEventListener('dragstart', (e) => {
            e.dataTransfer.setData('text/plain', null); // Required for Firefox
            const rect = note.getBoundingClientRect();
            e.dataTransfer.setDragImage(note, e.clientX - rect.left, e.clientY - rect.top);
        });

        note.addEventListener('dragend', (e) => {
            note.style.left = `${e.clientX - note.offsetWidth / 2}px`;
            note.style.top = `${e.clientY - note.offsetHeight / 2}px`;
        });
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
