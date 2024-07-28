// script.js
document.addEventListener('DOMContentLoaded', () => {
    const notes = [];
    let noteCount = 1;

    const loadNote = (index) => {
        const savedNote = JSON.parse(localStorage.getItem(`note${index}`));
        if (savedNote) {
            notes[index].title.value = savedNote.title;
            notes[index].content.value = savedNote.content;
            notes[index].tags.value = savedNote.tags;
        }
    };

    const saveNote = (index) => {
        const note = {
            title: notes[index].title.value,
            content: notes[index].content.value,
            tags: notes[index].tags.value,
        };

        try {
            localStorage.setItem(`note${index}`, JSON.stringify(note));
            notes[index].status.textContent = 'Saved successfully';
            notes[index].status.classList.remove('error');
        } catch (e) {
            notes[index].status.textContent = 'Failed to save';
            notes[index].status.classList.add('error');
        }
        notes[index].status.style.display = 'block';
        setTimeout(() => {
            notes[index].status.style.display = 'none';
        }, 3000);
    };

    const createNote = (index) => {
        const notePad = document.getElementById(`notePad${index}`);
        const toggleButton = document.getElementById(`toggleButton${index}`);
        const noteContent = notePad.querySelector('.note-content');
        const noteTitle = document.getElementById(`noteTitle${index}`);
        const noteContentText = document.getElementById(`noteContent${index}`);
        const noteTags = document.getElementById(`noteTags${index}`);
        const saveButton = document.getElementById(`saveButton${index}`);
        const statusMessage = document.getElementById(`statusMessage${index}`);
        const resizeHandle = document.getElementById(`resizeHandle${index}`);
        const moveHandle = document.getElementById(`moveHandle${index}`);

        notes[index] = {
            title: noteTitle,
            content: noteContentText,
            tags: noteTags,
            status: statusMessage
        };

        loadNote(index);

        toggleButton.addEventListener('click', () => {
            const isExpanded = notePad.classList.toggle('expanded');
            notePad.classList.toggle('collapsed', !isExpanded);
            noteContent.classList.toggle('visible', isExpanded);
            toggleButton.textContent = isExpanded ? 'Collapse NotePad' : 'Expand NotePad';
        });

        saveButton.addEventListener('click', () => saveNote(index));

        // Drag and move functionality
        let offsetX, offsetY;

        moveHandle.addEventListener('mousedown', (e) => {
            offsetX = e.clientX - notePad.getBoundingClientRect().left;
            offsetY = e.clientY - notePad.getBoundingClientRect().top;

            const move = (event) => {
                notePad.style.left = `${event.clientX - offsetX}px`;
                notePad.style.top = `${event.clientY - offsetY}px`;
            };

            document.addEventListener('mousemove', move);

            document.addEventListener('mouseup', () => {
                document.removeEventListener('mousemove', move);
            }, { once: true });
        });
    };

    createNote(1);

    document.getElementById('newNoteButton').addEventListener('click', () => {
        if (noteCount < 2) {
            noteCount += 1;
            const newNotePad = document.createElement('div');
            newNotePad.classList.add('note-pad', 'collapsed');
            newNotePad.id = `notePad${noteCount}`;
            newNotePad.innerHTML = `
                <button class="toggleButton" id="toggleButton${noteCount}">Expand NotePad</button>
                <div class="note-content">
                    <input type="text" class="noteTitle" id="noteTitle${noteCount}" placeholder="Title">
                    <textarea class="noteContent" id="noteContent${noteCount}" placeholder="Write your note here..."></textarea>
                    <input type="text" class="noteTags" id="noteTags${noteCount}" placeholder="Tags (comma separated)">
                    <button class="saveButton" id="saveButton${noteCount}">Save</button>
                    <p class="status" id="statusMessage${noteCount}"></p>
                </div>
                <div class="resize-handle" id="resizeHandle${noteCount}"></div>
                <div class="move-handle" id="moveHandle${noteCount}"></div>
            `;
            document.body.appendChild(newNotePad);
            createNote(noteCount);
        } else {
            alert("You can only have up to two open notes at a time.");
        }
    });
});
