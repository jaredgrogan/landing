document.addEventListener('DOMContentLoaded', function() {
    const newNoteButton = document.getElementById('newNoteButton');
    const notesContainer = document.getElementById('notesContainer');
    const chatSendButton = document.getElementById('chatSendButton');
    const chatInput = document.getElementById('chatInput');
    const heraklesResponse = document.getElementById('heraklesResponse');
    const recordButton = document.getElementById('recordButton');
    const nightModeToggle = document.getElementById('nightModeToggle');

    let noteCount = 0;

    nightModeToggle.addEventListener('click', () => {
        document.body.classList.toggle('night-mode');
        const nightMode = document.body.classList.contains('night-mode');
        const links = document.querySelectorAll('nav ul li a');
        links.forEach(link => {
            link.style.color = nightMode ? '#ffffff' : '#000000';
        });
    });

    function createNote() {
        const note = document.createElement('div');
        note.classList.add('note');
        note.innerHTML = `
            <div class="note-header">
                <input type="text" class="note-title" placeholder="Título">
                <input type="text" class="note-tags" placeholder="Etiquetas">
                <button class="delete-button note-button">Eliminar</button>
            </div>
            <div class="note-content">
                <div id="editor${noteCount}"></div>
            </div>
        `;
        noteCount++;
        notesContainer.appendChild(note);
        initializeEditor(noteCount - 1);

        const deleteButton = note.querySelector('.delete-button');
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
            })
            .resizable({
                edges: { left: true, right: true, bottom: true, top: true },
                listeners: {
                    move(event) {
                        const target = event.target;
                        let x = (parseFloat(target.getAttribute('data-x')) || 0);
                        let y = (parseFloat(target.getAttribute('data-y')) || 0);

                        target.style.width = `${event.rect.width}px`;
                        target.style.height = `${event.rect.height}px`;

                        x += event.deltaRect.left;
                        y += event.deltaRect.top;

                        target.style.transform = `translate(${x}px, ${y}px)`;
                        target.setAttribute('data-x', x);
                        target.setAttribute('data-y', y);
                    }
                }
            });
    }

    function initializeEditor(index) {
        const editorId = `editor${index}`;
        const editor = new Quill(`#${editorId}`, {
            theme: 'snow',
        });
    }

    newNoteButton.addEventListener('click', createNote);

    chatSendButton.addEventListener('click', () => {
        const message = chatInput.value.trim();
        if (message) {
            heraklesResponse.innerHTML += `<p>${message}</p>`;
            chatInput.value = '';
            heraklesResponse.scrollTop = heraklesResponse.scrollHeight;
        }
    });

    recordButton.addEventListener('click', () => {
        alert('Recording functionality not implemented yet.');
    });
});
