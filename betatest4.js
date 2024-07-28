document.addEventListener('DOMContentLoaded', () => {
    let noteCount = 0;
    const notes = [];

    const loadNote = (index) => {
        const savedNote = localStorage.getItem(`note${index}`);
        if (savedNote) {
            const noteData = JSON.parse(savedNote);
            notes[index].title.value = noteData.title;
            notes[index].content.value = noteData.content;
            notes[index].tags.value = noteData.tags;
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
        const isCollapsed = note.classList.contains('collapsed');
        if (isCollapsed) {
            note.classList.remove('collapsed');
            note.classList.add('expanded');
            note.querySelector('.note-content').classList.add('visible');
            notes[index].toggleButton.textContent = 'Collapse NotePad';
        } else {
            note.classList.remove('expanded');
            note.classList.add('collapsed');
            note.querySelector('.note-content').classList.remove('visible');
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
        updateNoteLists();
    });

    const chatButton = document.getElementById('chatButton');
    const chatPad = document.getElementById('chatPad');
    const chatCloseButton = document.getElementById('chatCloseButton');
    chatButton.addEventListener('click', () => {
        chatPad.classList.add('expanded');
    });
    chatCloseButton.addEventListener('click', () => {
        chatPad.classList.remove('expanded');
    });

    const sendButton = document.getElementById('sendButton');
    const chatContent = document.getElementById('chatContent');
    const chatStatusMessage = document.getElementById('chatStatusMessage');
    sendButton.addEventListener('click', () => {
        const message = chatContent.value;
        if (message.trim() !== '') {
            // Placeholder for API integration
            console.log('Send message:', message);
            chatStatusMessage.textContent = 'Message sent!';
            chatStatusMessage.classList.remove('error');
            chatStatusMessage.style.display = 'block';
            chatContent.value = '';
        } else {
            chatStatusMessage.textContent = 'Please enter a message.';
            chatStatusMessage.classList.add('error');
            chatStatusMessage.style.display = 'block';
        }
    });

    const makeResizable = (note, index) => {
        const handle = note.querySelector('.resize-handle');
        handle.addEventListener('mousedown', (e) => {
            e.preventDefault();
            window.addEventListener('mousemove', resize);
            window.addEventListener('mouseup', stopResize);
        });

        const resize = (e) => {
            note.style.width = `${e.pageX - note.offsetLeft}px`;
            note.style.height = `${e.pageY - note.offsetTop}px`;
        };

        const stopResize = () => {
            window.removeEventListener('mousemove', resize);
        };
    };

    const makeMovable = (note, index) => {
        const handle = note.querySelector('.move-handle');
        handle.addEventListener('mousedown', (e) => {
            e.preventDefault();
            window.addEventListener('mousemove', move);
            window.addEventListener('mouseup', stopMove);
        });

        const move = (e) => {
            note.style.left = `${e.pageX - note.offsetWidth / 2}px`;
            note.style.top = `${e.pageY - note.offsetHeight / 2}px`;
        };

        const stopMove = () => {
            window.removeEventListener('mousemove', move);
        };
    };

    const updateNoteLists = () => {
        const noteList = document.getElementById('noteList');
        const draftList = document.getElementById('draftList');
        noteList.innerHTML = '';
        draftList.innerHTML = '';

        for (let i = 1; i <= noteCount; i++) {
            const note = JSON.parse(localStorage.getItem(`note${i}`));
            if (note) {
                const noteItem = document.createElement('div');
                noteItem.textContent = note.title;
                noteItem.classList.add('note-item');
                noteItem.addEventListener('click', () => {
                    toggleNotePad(i);
                });
                noteList.appendChild(noteItem);
            }
        }
    };

    updateNoteLists();
});
