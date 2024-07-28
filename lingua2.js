document.addEventListener('DOMContentLoaded', () => {
    const nightModeToggle = document.getElementById('nightModeToggle');
    const nightIcon = document.getElementById('nightIcon');
    const dayIcon = document.getElementById('dayIcon');
    const languageToggle = document.getElementById('languageToggle');
    const newNoteButton = document.getElementById('newNoteButton');
    const notesContainer = document.getElementById('notesContainer');
    const chatSendButton = document.getElementById('chatSendButton');
    const recordButton = document.getElementById('recordButton');
    const heraklesResponse = document.getElementById('heraklesResponse');
    const chatInput = document.getElementById('chatInput');
    let noteCount = 0;
    const maxNotes = 10;

    // Predefined note positions
    const notePositions = [
        { left: 100, top: 50 },
        { left: 300, top: 50 },
        { left: 500, top: 50 },
        { left: 700, top: 50 },
        { left: 900, top: 50 },
        { left: 100, top: 300 },
        { left: 300, top: 300 },
        { left: 500, top: 300 },
        { left: 700, top: 300 },
        { left: 900, top: 300 }
    ];

    // Toggle night mode
    nightModeToggle.addEventListener('click', () => {
        document.body.classList.toggle('night-mode');
        if (document.body.classList.contains('night-mode')) {
            nightIcon.style.display = 'none';
            dayIcon.style.display = 'inline';
        } else {
            nightIcon.style.display = 'inline';
            dayIcon.style.display = 'none';
        }
    });

    // Toggle language
    languageToggle.addEventListener('click', () => {
        const currentLang = document.documentElement.lang;
        document.documentElement.lang = currentLang === 'en' ? 'ar' : 'en';
    });

    // Show/hide notes container and add a new note
    newNoteButton.addEventListener('click', () => {
        if (notesContainer.style.display === 'none' || notesContainer.style.display === '') {
            notesContainer.style.display = 'flex';
            if (noteCount >= maxNotes) {
                alert('Maximum number of notes reached');
                return;
            }

            // Create a new note
            const note = document.createElement('div');
            note.className = 'note';
            note.id = 'note-' + noteCount;
            const noteIndex = noteCount % notePositions.length;
            note.style.left = notePositions[noteIndex].left + 'px';
            note.style.top = notePositions[noteIndex].top + 'px';
            note.innerHTML = `
                <div class="note-header">
                    <input type="text" class="note-title" placeholder="Title">
                    <input type="text" class="note-tags" placeholder="Tags">
                </div>
                <div class="note-content" contenteditable="true" placeholder="Write your note here..."></div>
                <div class="note-buttons">
                    <button class="note-button save-button">Save</button>
                    <button class="note-button delete-button">Delete</button>
                </div>
            `;
            notesContainer.appendChild(note);
            noteCount++;

            // Make notes draggable
            interact('.note').draggable({
                listeners: {
                    move(event) {
                        const target = event.target;
                        const x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx;
                        const y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;
                        target.style.transform = `translate(${x}px, ${y}px)`;
                        target.setAttribute('data-x', x);
                        target.setAttribute('data-y', y);
                    }
                }
            });
        } else {
            notesContainer.style.display = 'none';
        }
    });

    // Handle chat input
    chatSendButton.addEventListener('click', () => {
        const userMessage = chatInput.value;
        if (userMessage.trim() === '') {
            alert('Please enter a message.');
            return;
        }
        const userMessageElement = document.createElement('div');
        userMessageElement.textContent = userMessage;
        heraklesResponse.appendChild(userMessageElement);
        chatInput.value = '';
    });

    // Record button functionality (currently not implemented)
    recordButton.addEventListener('click', () => {
        alert('Record functionality not implemented.');
    });
});
