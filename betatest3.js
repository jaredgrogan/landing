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
        const noteData = {
            title: notes[index].title.value,
            content: notes[index].content.value,
            tags: notes[index].tags.value
        };
        localStorage.setItem(`note${index}`, JSON.stringify(noteData));
        notes[index].status.textContent = 'Saved!';
        notes[index].status.classList.remove('error');
        notes[index].status.style.display = 'block';
    };

    const createNote = (index) => {
        const note = document.getElementById(`notePad${index}`);
        notes[index] = {
            element: note,
            title: note.querySelector('.noteTitle'),
            content: note.querySelector('.noteContent'),
            tags: note.querySelector('.noteTags'),
            saveButton: note.querySelector('.saveButton'),
            status: note.querySelector('.status'),
            closeButton: note.querySelector('.closeButton'),
            toggleButton: note.querySelector('.toggleButton')
        };

        notes[index].saveButton.addEventListener('click', () => saveNote(index));
        notes[index].closeButton.addEventListener('click', () => closeNotePad(index));
        notes[index].toggleButton.addEventListener('click', () => toggleNotePad(index));
        loadNote (index);

        makeResizable(note, index);
        makeMovable(note, index);
    };

    const toggleNotePad = (index) => {
        const note = notes[index].element;
        const content = notes[index].element.querySelector('.note-content');
        const isCollapsed = note.classList.contains('collapsed');
        if (isCollapsed) {
            note.classList.remove('collapsed');
            note.classList.add('expanded');
            content.classList.add('visible');
            notes[index].toggleButton.textContent = 'Collapse NotePad';
        } else {
            note.classList.remove('expanded');
            note.classList.add('collapsed');
            content.classList.remove('visible');
            notes[index].toggleButton.textContent = 'Expand NotePad';
        }
    };

    const closeNotePad = (index) => {
        const note = notes[index].element;
        note.style.display = 'none';
    };

    const newNoteButton = document.getElementById('newNoteButton');
    newNoteButton.addEventListener('click', () => {
        if (noteCount < 4) {
            noteCount++;
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
                <button class="closeButton" id="closeButton${noteCount}">X</button>
            `;
            document.body.appendChild(newNotePad);
            createNote(noteCount);
        } else {
            alert("You can only have up to four open notes at a time.");
        }
    });

    const folderButton = document.getElementById('folderButton');
    const folderWindow = document.getElementById('folderWindow');
    folderButton.addEventListener('click', () => {
        const isCollapsed = folderWindow.classList.contains('collapsed');
        if (isCollapsed) {
            folderWindow.classList.remove('collapsed');
            folderWindow.classList.add('expanded');
        } else {
            folderWindow.classList.remove('expanded');
            folderWindow.classList.add('collapsed');
        }
        updateNoteList();
    });

    const updateNoteList = () => {
        const noteList = document.getElementById('noteList');
        const draftList = document.getElementById('draftList');
        noteList.innerHTML = '';
        draftList.innerHTML = '';

        for (let i = 1; i <= noteCount; i++) {
            const savedNote = JSON.parse(localStorage.getItem(`note${i}`));
            if (savedNote) {
                const noteItem = document.createElement('div');
                noteItem.classList.add('note-item');
                noteItem.textContent = savedNote.title || `Untitled Note ${i}`;
                noteItem.addEventListener('click', () => openNotePad(i));
                noteList.appendChild(noteItem);
            } else {
                const draftItem = document.createElement('div');
                draftItem.classList.add('draft-item');
                draftItem.textContent = `Draft ${i}`;
                draftItem.addEventListener('click', () => openNotePad(i));
                draftList.appendChild(draftItem);
            }
        }
    };

    const openNotePad = (index) => {
        const note = document.getElementById(`notePad${index}`);
        note.style.display = 'block';
        note.classList.remove('collapsed');
        note.classList.add('expanded');
        note.querySelector('.note-content').classList.add('visible');
    };

    const chatButton = document.getElementById('chatButton');
    const chatPad = document.getElementById('chatPad');
    const chatCloseButton = document.getElementById('chatCloseButton');

    chatButton.addEventListener('click', () => {
        chatPad.classList.toggle('collapsed');
        chatPad.classList.toggle('expanded');
        chatPad.querySelector('.chat-content').classList.toggle('visible');
    });

    chatCloseButton.addEventListener('click', () => {
        chatPad.classList.add('collapsed');
        chatPad.classList.remove('expanded');
        chatPad.querySelector('.chat-content').classList.remove('visible');
    });

    const sendButton = document.getElementById('sendButton');
    sendButton.addEventListener('click', () => {
        // Implement API call to OpenAI or Anthropic AI
        const chatContent = document.getElementById('chatContent').value;
        console.log('Send message:', chatContent);
        document.getElementById('chatStatusMessage').textContent = 'Message sent!';
        document.getElementById('chatStatusMessage').style.display = 'block';
    });

    // Utility functions
    const makeResizable = (element, index) => {
        const resizer = element.querySelector('.resize-handle');
        resizer.addEventListener('mousedown', (e) => {
            e.preventDefault();
            window.addEventListener('mousemove', resize);
            window.addEventListener('mouseup', stopResize);
        });

        const resize = (e) => {
            element.style.width = e.clientX - element.offsetLeft + 'px';
            element.style.height = e.clientY - element.offsetTop + 'px';
        };

        const stopResize = () => {
            window.removeEventListener('mousemove', resize);
            window.removeEventListener('mouseup', stopResize);
        };
    };

    const makeMovable = (element, index) => {
        const mover = element.querySelector('.move-handle');
        mover.addEventListener('mousedown', (e) => {
            e.preventDefault();
            const offsetX = e.clientX - element.offsetLeft;
            const offsetY = e.clientY - element.offsetTop;
            window.addEventListener('mousemove', move);
            window.addEventListener('mouseup', stopMove);

            const move = (e) => {
                element.style.left = e.clientX - offsetX + 'px';
                element.style.top = e.clientY - offsetY + 'px';
            };

            const stopMove = () => {
                window.removeEventListener('mousemove', move);
                window.removeEventListener('mouseup', stopMove);
            };
        });
    };

    // Initialize first note pad
    createNote(1);
});
