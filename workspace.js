document.addEventListener('DOMContentLoaded', () => {
    const notesContainer = document.getElementById('notesContainer');
    const nightModeToggle = document.getElementById('nightModeToggle');
    const nightIcon = document.getElementById('nightIcon');
    const dayIcon = document.getElementById('dayIcon');
    const chatSendButton = document.getElementById('chatSendButton');
    let noteCount = 0;
    const maxNotes = 8;
    const notePositions = [
        { left: 50, top: 50 },
        { left: 200, top: 50 },
        { left: 350, top: 50 },
        { left: 50, top: 200 },
        { left: 200, top: 200 },
        { left: 350, top: 200 },
        { left: 500, top: 50 },
        { left: 500, top: 200 }
    ];

    const createNote = () => {
        if (noteCount < maxNotes) {
            noteCount++;
            const position = notePositions[noteCount % notePositions.length];

            const note = document.createElement('div');
            note.className = 'note resizable';
            note.style.left = `${position.left}px`;
            note.style.top = `${position.top}px`;
            note.innerHTML = `
                <div class="note-header">
                    <input type="text" class="note-title" placeholder="Title">
                    <input type="text" class="note-tags" placeholder="Tags">
                </div>
                <div class="quill-container">
                    <div class="note-content"></div>
                </div>
                <div class="note-buttons">
                    <button class="note-button saveButton">Save</button>
                    <button class="note-button closeButton">X</button>
                </div>
            `;

            notesContainer.appendChild(note);

            const quill = new Quill(note.querySelector('.note-content'), {
                theme: 'snow'
            });

            const saveButton = note.querySelector('.saveButton');
            const closeButton = note.querySelector('.closeButton');

            saveButton.addEventListener('click', () => {
                const title = note.querySelector('.note-title').value;
                const tags = note.querySelector('.note-tags').value;
                const content = quill.root.innerHTML;
                localStorage.setItem(`note-${Date.now()}`, JSON.stringify({ title, tags, content }));
                alert('Note saved!');
            });

            closeButton.addEventListener('click', () => {
                note.remove();
                noteCount--;
            });

            note.addEventListener('mousedown', () => {
                note.style.zIndex = maxNotes;
                Array.from(notesContainer.children).forEach((child, index) => {
                    if (child !== note) {
                        child.style.zIndex = index;
                    }
                });
            });
        } else {
            alert('Maximum number of notes reached!');
        }
    };

    document.getElementById('newNoteButton').addEventListener('click', createNote);

    nightModeToggle.addEventListener('click', () => {
        document.body.classList.toggle('night-mode');
        nightIcon.style.display = nightIcon.style.display === 'none' ? 'inline' : 'none';
        dayIcon.style.display = dayIcon.style.display === 'none' ? 'inline' : 'none';
    });

    chatSendButton.addEventListener('click', () => {
        const message = document.getElementById('chatInput').value;
        if (message.trim() !== '') {
            alert(`Message sent: ${message}`);
            document.getElementById('chatInput').value = '';
        }
    });

    const chatContainer = document.getElementById('chatContainer');
    const observer = new MutationObserver(() => {
        const chatHeight = chatContainer.offsetHeight;
        const chatWidth = chatContainer.offsetWidth;

        document.getElementById('chatInput').style.height = `${chatHeight - 80}px`;
    });

    observer.observe(chatContainer, { attributes: true, childList: true, subtree: true });
});
