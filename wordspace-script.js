<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Minimalist Note Pad</title>
    <link rel="stylesheet" href="studio.css">
    <link href="https://fonts.googleapis.com/css2?family=Berkeley+Mono&display=swap" rel="stylesheet">
    <link href="https://cdn.quilljs.com/1.3.6/quill.snow.css" rel="stylesheet">
    <link rel="icon" href="favicon5.svg" type="image/svg+xml">
</head>
<body>
    <header>
        <img src="favicon5.svg" alt="Logo" class="logo" id="mainLogo">
        <nav>
            <a href="index.html">Home</a>
            <a href="#">Features</a>
            <div class="dropdown">
                <button class="dropbtn">Menu</button>
                <div class="dropdown-content">
                    <a href="#">Profile</a>
                    <a href="#">Settings</a>
                    <a href="#">Logout</a>
                </div>
            </div>
            <button id="nightModeToggle" class="toggle-button">
                <img src="moon.svg" alt="Night Mode" id="nightIcon" class="toggle-icon">
                <img src="sun.svg" alt="Day Mode" id="dayIcon" class="toggle-icon" style="display:none;">
            </button>
        </nav>
    </header>
    <button id="newNoteButton" class="button">New Note</button>
    <div id="fileStructureContainer"></div>
    <div id="notesContainer"></div>
    <div id="chatContainer">
        <div id="heraklesResponse" class="response-area">Herakles will answer here...</div>
        <textarea id="chatInput" placeholder="Type your message here..."></textarea>
        <button id="chatSendButton" class="send-button"><img src="mic.svg" alt="Send" class="send-icon"></button>
    </div>
    <script src="https://cdn.quilljs.com/1.3.6/quill.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/marked/3.0.4/marked.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jqueryui/1.12.1/jquery-ui.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.3.1/jspdf.umd.min.js"></script>
    <script src="studio.js"></script>
</body>
</html>
JavaScript
javascript
Copy code
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
        note.className = 'note resizable draggable';
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
                <button class="note-button save-button" onclick="saveNoteContent('noteContent${noteCount}')">💾</button>
                <button class="note-button delete-button" onclick="deleteNote(this)">🗑️</button>
                <button class="note-button export-button" onclick="exportToPDF('noteContent${noteCount}')">📄</button>
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

        $(note).draggable();
        $(note).resizable();

        noteCount++;
    }

    function saveNoteContent(noteId) {
        localStorage.setItem(noteId, document.getElementById(noteId).innerHTML);
    }

    function loadNoteContent(noteId) {
        if (localStorage.getItem(noteId)) {
            document.getElementById(noteId).innerHTML = localStorage.getItem(noteId);
        }
    }

    function deleteNote(element) {
        element.parentElement.parentElement.remove();
        noteCount--;
    }

    function exportToPDF(noteId) {
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();
        const content = document.getElementById(noteId).innerText;
        doc.text(content, 10, 10);
        doc.save(`${noteId}.pdf`);
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

    setInterval(() => {
        document.querySelectorAll('.note').forEach(note => {
            const noteId = note.querySelector('.note-content').id;
            saveNoteContent(noteId);
        });
    }, 30000);
});
