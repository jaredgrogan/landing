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
        { left: 200, top: 150 },
        { left: 400, top: 300 },
        { left: 600, top: 450 },
        { left: 800, top: 600 },
        { left: 1000, top: 750 },
        { left: 1200, top: 900 },
        { left: 1400, top: 1050 }
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
                <button class="note-button save-button">💾</button>
                <button class="note-button delete-button">🗑️</button>
            </div>
        `;

        const editorContainer = note.querySelector(`#editor${noteCount}`);
        const toolbarContainer = note.querySelector(`#toolbar${noteCount}`);
        const quill = new Quill(editorContainer, {
            theme: 'snow',
            modules: {
                toolbar: toolbarContainer
            }
        });

        notesContainer.appendChild(note);

        note.querySelector('.delete-button').addEventListener('click', () => {
            note.remove();
            noteCount--;
        });

        noteCount++;
    }

    chatSendButton.addEventListener('click', () => {
        const chatInput = document.getElementById('chatInput').value;
        if (chatInput.trim() !== '') {
            fetchResponse(chatInput);
        }
    });

    function fetchResponse(inputText) {
        const heraklesResponse = document.getElementById('heraklesResponse');
        const endpoint = 'https://api.openai.com/v1/engines/davinci-codex/completions';
        const data = {
            prompt: inputText,
            max_tokens: 50
        };

        fetch(endpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`
            },
            body: JSON.stringify(data)
        })
            .then(response => response.json())
            .then(data => {
                const message = data.choices[0].text.trim();
                heraklesResponse.textContent = message;
            })
            .catch(error => {
                console.error('Error:', error);
                heraklesResponse.textContent = 'Error fetching response';
            });
    }
});
