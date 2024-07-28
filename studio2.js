document.addEventListener('DOMContentLoaded', () => {
    const nightModeToggle = document.getElementById('nightModeToggle');
    const nightIcon = document.getElementById('nightIcon');
    const dayIcon = document.getElementById('dayIcon');
    const newNoteButton = document.getElementById('newNoteButton');
    const notesContainer = document.getElementById('notesContainer');
    const chatSendButton = document.getElementById('chatSendButton');
    const recordButton = document.getElementById('recordButton');
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

    document.getElementById('newNoteButton').addEventListener('click', () => {
        if (noteCount < maxNotes) {
            createNote();
        } else {
            alert('Maximum note limit reached!');
        }
    });

    nightModeToggle.addEventListener('click', () => {
        document.body.classList.toggle('night-mode');
        nightIcon.style.display = nightIcon.style.display === 'none' ? 'inline' : 'none';
        dayIcon.style.display = dayIcon.style.display === 'none' ? 'inline' : 'none';
    });

    function createNote() {
        const note = document.createElement('div');
        note.className = 'note resizable';
        note.style.position = 'absolute';
        note.style.left = notePositions[noteCount].left + 'px';
        note.style.top = notePositions[noteCount].top + 'px';
        note.innerHTML = `
            <div class="note-header">
                <input type="text" placeholder="Title" class="note-title">
                <input type="text" placeholder="Tags (comma separated)" class="note-tags">
            </div>
            <div class="note-content" id="noteContent${noteCount}">
                <div id="toolbar${noteCount}">
                    <button class="ql-bold">B</button>
                    <button class="ql-italic">I</button>
                    <button class="ql-underline">U</button>
                    <button class="ql-list" value="ordered">Ordered List</button>
                    <button class="ql-list" value="bullet">Bullet List</button>
                </div>
                <div class="text-editor" id="editor${noteCount}"></div>
            </div>
            <div class="note-buttons">
                <button class="note-button save-button">Save</button>
                <button class="note-button delete-button">Delete</button>
            </div>
        `;
        noteCount++;
        notesContainer.appendChild(note);
        makeNoteResizable(note);
        initializeEditor(noteCount - 1);
    }

    function makeNoteResizable(note) {
        note.addEventListener('mousedown', initResize, false);

        function initResize(e) {
            window.addEventListener('mousemove', resize, false);
            window.addEventListener('mouseup', stopResize, false);
        }

        function resize(e) {
            note.style.width = (e.clientX - note.offsetLeft) + 'px';
            note.style.height = (e.clientY - note.offsetTop) + 'px';
        }

        function stopResize() {
            window.removeEventListener('mousemove', resize, false);
            window.removeEventListener('mouseup', stopResize, false);
        }
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
