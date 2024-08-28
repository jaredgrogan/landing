document.getElementById('start-btn').addEventListener('click', function() {
    document.getElementById('intro').classList.add('hidden');
    document.getElementById('voice-interaction').classList.remove('hidden');
});

document.getElementById('record-btn').addEventListener('click', function() {
    // Placeholder for voice recording and transcription functionality
    document.getElementById('user-input').innerText = "Transcribing voice input...";
    setTimeout(() => {
        document.getElementById('user-input').innerText = "I want to create a suspenseful trailer about discovering ancient ruins in a futuristic city.";
        document.getElementById('confirm-btn').classList.remove('hidden');
    }, 2000);
});

document.getElementById('confirm-btn').addEventListener('click', function() {
    document.getElementById('voice-interaction').classList.add('hidden');
    document.getElementById('project-settings').classList.remove('hidden');
});

document.getElementById('settings-form').addEventListener('submit', function(event) {
    event.preventDefault();
    document.getElementById('project-settings').classList.add('hidden');
    document.getElementById('progress').classList.remove('hidden');
    setTimeout(() => {
        document.getElementById('progress').classList.add('hidden');
        document.getElementById('preview').classList.remove('hidden');
        document.getElementById('trailer-preview').src = "sample-trailer.mp4"; // Placeholder video source
    }, 3000);
});
