$(document).ready(function () {
    // Initialize notes from localStorage
    loadNotes();

    // Add new note
    $('#new-note').click(function () {
        createNewNote();
    });

    // Draggable and resizable note functions
    function makeNoteInteractive($note) {
        $note.draggable().resizable();
    }

    // Save note content to local storage
    function saveNoteContent(noteId, content) {
        localStorage.setItem(noteId, content);
    }

    // Load note content from local storage
    function loadNoteContent(noteId) {
        return localStorage.getItem(noteId);
    }

    // Autosave notes periodically
    setInterval(() => {
        $('.note').each(function () {
            saveNoteContent($(this).attr('id'), $(this).html());
        });
    }, 30000);

    // Create a new note
    function createNewNote() {
        const noteId = 'note-' + new Date().getTime();
        const $note = $(`
            <div id="${noteId}" class="note">
                <div contenteditable="true" class="note-title">New Note</div>
                <div contenteditable="true" class="note-content">Type your content here...</div>
                <div class="note-tags">#tag</div>
                <button onclick="exportToPDF('${noteId}')">Export to PDF</button>
            </div>
        `);
        $('#note-area').append($note);
        makeNoteInteractive($note);
        saveNoteContent(noteId, $note.html());
    }

    // Load all notes from local storage
    function loadNotes() {
        for (let i = 0; i < localStorage.length; i++) {
            const noteId = localStorage.key(i);
            const noteContent = loadNoteContent(noteId);
            const $note = $(`<div id="${noteId}" class="note">${noteContent}</div>`);
            $('#note-area').append($note);
            makeNoteInteractive($note);
        }
    }

    // Export note to PDF
    window.exportToPDF = function(noteId) {
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();
        const content = $('#' + noteId).find('.note-content').text();
        doc.text(content, 10, 10);
        doc.save(noteId + '.pdf');
    }
});
