document.addEventListener('DOMContentLoaded', () => {
    const notesContainer = document.getElementById('notesContainer');
    let noteCount = 0;

    const createNote = () => {
        if (noteCount < 2) {
            noteCount++;

            const note = document.createElement('div');
            note.className = 'note';
            note.innerHTML = `
                <div class="note-header">
                    <input type="text" class="note-title" placeholder="Title">
                    <input type="text" class="note-tags" placeholder="Tags">
                </div>
                <textarea class="note-content" placeholder="Write your note here..."></textarea>
                <div class="note-buttons">
                    <button class="note-button saveButton">Save</button>
                    <button class="note-button closeButton">X</button>
                </div>
            `;

            notesContainer.appendChild(note);

            const saveButton = note.querySelector('.saveButton');
            const closeButton = note.querySelector('.closeButton');

            saveButton.addEventListener('click', () => saveNote(note));
            closeButton.addEventListener('click', () => closeNotePad(note));
            makeMovable(note);
        } else {
            alert('You can only have up to two open notes at a time.');
        }
    };

    const saveNote = (note) => {
        const title = note.querySelector('.note-title').value;
        const tags = note.querySelector('.note-tags').value;
        const content = note.querySelector('.note-content').value;
        const noteData = { title, tags, content };
        localStorage.setItem(`note${noteCount}`, JSON.stringify(noteData));
        alert('Note saved!');
    };

    const closeNotePad = (note) => {
        note.remove();
        noteCount--;
    };

    const makeMovable = (note) => {
        note.style.position = 'absolute';
        note.addEventListener('mousedown', (e) => {
            const onMouseMove = (e) => {
                note.style.left = `${e.pageX - note.offsetWidth / 2}px`;
                note.style.top = `${e.pageY - note.offsetHeight / 2}px`;
            };
            document.addEventListener('mousemove', onMouseMove);
            note.addEventListener('mouseup', () => {
                document.removeEventListener('mousemove', onMouseMove);
            }, { once: true });
        });
    };

    document.getElementById('newNoteButton').addEventListener('click', createNote);
});
