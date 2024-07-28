document.addEventListener('DOMContentLoaded', () => {
    const maxNotes = 8;
    let noteCount = 0;
    let notePositions = [
        { top: 100, left: 100 },
        { top: 100, left: 250 },
        { top: 100, left: 400 },
        { top: 250, left: 100 },
        { top: 250, left: 250 },
        { top: 250, left: 400 },
        { top: 400, left: 100 },
        { top: 400, left: 250 },
        { top: 400, left: 400 },
        { top: 550, left: 100 },
    ];
    let currentNotePosition = 0;

    const notesContainer = document.getElementById('notesContainer');
    const nightModeToggle = document.getElementById('nightModeToggle');
    const nightIcon = document.getElementById('nightIcon');
    const dayIcon = document.getElementById('dayIcon');
    const chatSendButton = document.getElementById('chatSendButton');
    const voiceMemoButton = document.getElementById('voiceMemoButton');

    const createNote = () => {
        if (noteCount < maxNotes) {
            const note = document.createElement('div');
            note.className = 'note resizable';
            note.style.top = `${notePositions[currentNotePosition].top}px`;
            note.style.left = `${notePositions[currentNotePosition].left}px`;
            currentNotePosition = (currentNotePosition + 1) % notePositions.length;
            note.innerHTML = `
                <div class="note-header">
                    <input type="text" class="note-title" placeholder="Title">
                    <input type="text" class="note-tags" placeholder="Tags">
                </div>
                <div class="quill note-content"></div>
                <div class="note-buttons">
                    <button class="note-button saveButton">💾</button>
                    <button class="note-button closeButton">❌</button>
                </div>
            `;

            const quill = new Quill(note.querySelector('.note-content'), {
                theme: 'snow'
            });

            notesContainer.appendChild(note);
            noteCount++;

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
