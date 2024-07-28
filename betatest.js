// script.js
document.addEventListener('DOMContentLoaded', () => {
    const notePad = document.getElementById('notePad');
    const toggleButton = document.getElementById('toggleButton');
    const noteContent = document.querySelector('.note-content');
    const noteTitle = document.getElementById('noteTitle');
    const noteContentText = document.getElementById('noteContent');
    const noteTags = document.getElementById('noteTags');
    const saveButton = document.getElementById('saveButton');
    const statusMessage = document.getElementById('statusMessage');

    const loadNote = () => {
        const savedNote = JSON.parse(localStorage.getItem('note'));
        if (savedNote) {
            noteTitle.value = savedNote.title;
            noteContentText.value = savedNote.content;
            noteTags.value = savedNote.tags;
        }
    };

    const saveNote = () => {
        const note = {
            title: noteTitle.value,
            content: noteContentText.value,
            tags: noteTags.value,
        };

        try {
            localStorage.setItem('note', JSON.stringify(note));
            statusMessage.textContent = 'Saved successfully';
            statusMessage.classList.remove('error');
        } catch (e) {
            statusMessage.textContent = 'Failed to save';
            statusMessage.classList.add('error');
        }
        statusMessage.style.display = 'block';
        setTimeout(() => {
            statusMessage.style.display = 'none';
        }, 3000);
    };

    toggleButton.addEventListener('click', () => {
        const isExpanded = notePad.classList.toggle('expanded');
        notePad.classList.toggle('collapsed', !isExpanded);
        noteContent.classList.toggle('visible', isExpanded);
        toggleButton.textContent = isExpanded ? 'Collapse NotePad' : 'Expand NotePad';
    });

    saveButton.addEventListener('click', saveNote);

    loadNote();
});
