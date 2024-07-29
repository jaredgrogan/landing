(document).ready(function() {
    // Initialize Quill editors
    $('.note').each(function() {
        var quill = new Quill($(this).find('.quill')[0], {
            theme: 'snow'
        });
        $(this).data('quill', quill);
    });

    // Add new note
    $('.button').click(function() {
        var newNote = $('.note').first().clone();
        newNote.find('.quill').empty();
        newNote.data('quill', new Quill(newNote.find('.quill')[0], {
            theme: 'snow'
        }));
        $('.note-container').append(newNote);
        newNote.draggable().resizable();
    });

    // Minimize note
    $(document).on('click', '.note-button.minimize', function() {
        $(this).closest('.note').find('.quill').slideToggle();
    });

    // Close note
    $(document).on('click', '.note-button.close', function() {
        $(this).closest('.note').remove();
    });

    // Draggable and resizable
    $('.note').draggable().resizable();

    // Handle chat input submission
    $('.send-button').click(function() {
        var input = $('#chatInput').val();
        if (input.trim() === '') return;

        var response = 'Response to: ' + input;
        $('#heraklesResponse').text(response);

        $('#chatInput').val('');
    });

    // Handle night mode toggle
    $('.toggle-button').click(function() {
        $('body').toggleClass('night-mode');
    });

    // Close dropdown if clicked outside
    $(window).click(function(event) {
        if (!event.target.matches('.dropbtn')) {
            $('.dropdown-content').hide();
        }
    });
});
