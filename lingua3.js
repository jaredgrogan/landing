body {
    font-family: Arial, sans-serif;
    margin: 0;
    padding: 0;
    background-color: #ffffff;
    color: #000000;
}
.night-mode {
    background-color: #111111;
    color: #ffffff;
}
header {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    padding: 10px 20px;
    background-color: #333333;
    color: #ffffff;
}
.top-right-nav ul {
    display: flex;
    list-style: none;
    padding: 0;
    margin: 0;
}
.top-right-nav ul li {
    margin-left: 20px;
    position: relative;
}
.top-right-nav ul li a {
    text-decoration: none;
    color: #ffffff;
    font-weight: bold;
}
.top-right-nav ul li .dropdown-content {
    display: none;
    position: absolute;
    background-color: #333333;
    min-width: 160px;
    box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
    z-index: 1;
}
.top-right-nav ul li .dropdown-content a {
    color: #ffffff;
    padding: 12px 16px;
    text-decoration: none;
    display: block;
}
.top-right-nav ul li:hover .dropdown-content {
    display: block;
}
#languageSelect {
    margin-left: 20px;
}
#nightModeToggle {
    background: none;
    border: none;
    color: #ffffff;
    cursor: pointer;
    font-size: 1.2em;
    margin-left: 20px;
}
main {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
}
#notesContainer {
    width: 80%;
    margin-bottom: 20px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
}
.note {
    width: 100%;
    margin-bottom: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    padding: 10px;
    background-color: #f9f9f9;
    cursor: move;
}
.note-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.note-title,
.note-tags {
    width: 45%;
    margin-right: 10px;
    padding: 5px;
}
.note-button {
    background-color: #ff4d4d;
    border: none;
    color: white;
    padding: 5px 10px;
    border-radius: 5px;
    cursor: pointer;
}
.note-content {
    margin-top: 10px;
}
#chatContainer {
    width: 80%;
}
.chat-box {
    display: flex;
    flex-direction: column;
}
#heraklesResponse {
    border: 1px solid #ccc;
    border-radius: 5px;
    padding: 10px;
    height: 100px;
    overflow-y: auto;
    margin-bottom: 10px;
}
#chatInput {
    width: 100%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    margin-bottom: 10px;
}
#chatSendButton,
#recordButton,
#newNoteButton {
    background-color: #4CAF50;
    border: none;
    color: white;
    padding: 10px;
    border-radius: 5px;
    cursor: pointer;
    margin-right: 10px;
}
#newNoteButton {
    background-color: #111111;
    color: white;
}

deleteButton = note.querySelector('.delete-button');
deleteButton.addEventListener('click', () => {
notesContainer.removeChild(note);
});
interact(note)
        .draggable({
            inertia: true,
            modifiers: [
                interact.modifiers.restrictRect({
                    restriction: 'parent',
                    endOnly: true
                })
            ],
            autoScroll: true,
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
}

function initializeEditor(index) {
    const toolbarOptions = [
        ['bold', 'italic', 'underline'],
        [{ 'list': 'ordered'}, { 'list': 'bullet' }]
    ];

    new Quill(`#editor${index}`, {
        modules: {
            toolbar: toolbarOptions
        },
        theme: 'snow'
    });
}

newNoteButton.addEventListener('click', createNote);

chatSendButton.addEventListener('click', () => {
    const userMessage = chatInput.value.trim();
    if (userMessage) {
        heraklesResponse.innerHTML += `<p><strong>You:</strong> ${userMessage}</p>`;
        chatInput.value = '';

        // Mock AI response (replace with actual AI integration)
        setTimeout(() => {
            heraklesResponse.innerHTML += `<p><strong>Herakles:</strong> Estoy procesando tu mensaje...</p>`;
        }, 500);
    }
});

recordButton.addEventListener('click', () => {
    alert('¡Función de grabación de voz próximamente!');
});
});
</antArtifact>
