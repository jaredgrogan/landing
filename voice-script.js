document.addEventListener('DOMContentLoaded', () => {
    // ... (previous code for night mode, language switching, etc. remains the same) ...

    const startRecordingBtn = document.getElementById('startRecordingBtn');
    const stopRecordingBtn = document.getElementById('stopRecordingBtn');
    const audioPlayback = document.getElementById('audioPlayback');
    const videoUpload = document.getElementById('videoUpload');
    const videoPlayer = document.getElementById('videoPlayer');
    const transcriptionText = document.getElementById('transcriptionText');
    const refineTranscriptionBtn = document.getElementById('refineTranscriptionBtn');
    const searchTranscriptions = document.getElementById('searchTranscriptions');
    const transcriptionsList = document.getElementById('transcriptionsList');
    const transcriptionsToMerge = document.getElementById('transcriptionsToMerge');
    const mergeTranscriptionsBtn = document.getElementById('mergeTranscriptionsBtn');

    let mediaRecorder;
    let audioChunks = [];

    startRecordingBtn.addEventListener('click', startRecording);
    stopRecordingBtn.addEventListener('click', stopRecording);
    videoUpload.addEventListener('change', handleVideoUpload);
    refineTranscriptionBtn.addEventListener('click', refineTranscription);
    searchTranscriptions.addEventListener('input', searchSavedTranscriptions);
    mergeTranscriptionsBtn.addEventListener('click', mergeSelectedTranscriptions);

    async function startRecording() {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        mediaRecorder = new MediaRecorder(stream);
        mediaRecorder.ondataavailable = event => {
            audioChunks.push(event.data);
        };
        mediaRecorder.onstop = saveAudioAndTranscribe;
        mediaRecorder.start();
        startRecordingBtn.disabled = true;
        stopRecordingBtn.disabled = false;
    }

    function stopRecording() {
        mediaRecorder.stop();
        startRecordingBtn.disabled = false;
        stopRecordingBtn.disabled = true;
    }

    function saveAudioAndTranscribe() {
        const audioBlob = new Blob(audioChunks, { type: 'audio/webm' });
        audioPlayback.src = URL.createObjectURL(audioBlob);
        audioChunks = [];
        // Here you would send the audioBlob to your speech-to-text API
        // For demonstration, we'll use a mock transcription
        transcriptionText.textContent = "This is a mock transcription of the recorded audio.";
        saveTranscription("Audio Recording", transcriptionText.textContent);
    }

    function handleVideoUpload(event) {
        const file = event.target.files[0];
        videoPlayer.src = URL.createObjectURL(file);
        // Here you would send the video file to your speech-to-text API
        // For demonstration, we'll use a mock transcription
        transcriptionText.textContent = "This is a mock transcription of the uploaded video.";
        saveTranscription(file.name, transcriptionText.textContent);
    }

    function refineTranscription() {
        // Here you would implement your multi-pass transcription refinement logic
        // For demonstration, we'll just append a refinement note
        transcriptionText.textContent += "\n\n[Refined] " + transcriptionText.textContent;
        saveTranscription("Refined Transcription", transcriptionText.textContent);
    }

    function saveTranscription(title, content) {
        const transcriptions = JSON.parse(localStorage.getItem('transcriptions') || '[]');
        transcriptions.push({ title, content, date: new Date().toISOString() });
        localStorage.setItem('transcriptions', JSON.stringify(transcriptions));
        updateTranscriptionsList();
    }

    function updateTranscriptionsList() {
        const transcriptions = JSON.parse(localStorage.getItem('transcriptions') || '[]');
        transcriptionsList.innerHTML = '';
        transcriptionsToMerge.innerHTML = '';
        transcriptions.forEach((t, index) => {
            const li = document.createElement('li');
            li.textContent = `${t.title} (${new Date(t.date).toLocaleDateString()})`;
            li.addEventListener('click', () => loadTranscription(index));
            transcriptionsList.appendChild(li);

            const option = document.createElement('option');
            option.value = index;
            option.textContent = t.title;
            transcriptionsToMerge.appendChild(option);
        });
    }

    function loadTranscription(index) {
        const transcriptions = JSON.parse(localStorage.getItem('transcriptions') || '[]');
        transcriptionText.textContent = transcriptions[index].content;
    }

    function searchSavedTranscriptions() {
        const query = searchTranscriptions.value.toLowerCase();
        const transcriptions = JSON.parse(localStorage.getItem('transcriptions') || '[]');
        const filteredTranscriptions = transcriptions.filter(t => 
            t.title.toLowerCase().includes(query) || t.content.toLowerCase().includes(query)
        );
        updateTranscriptionsList(filteredTranscriptions);
    }

    function mergeSelectedTranscriptions() {
        const selectedIndices = Array.from(transcriptionsToMerge.selectedOptions).map(o => o.value);
        const transcriptions = JSON.parse(localStorage.getItem('transcriptions') || '[]');
        const mergedContent = selectedIndices.map(i => transcriptions[i].content).join('\n\n');
        transcriptionText.textContent = mergedContent;
        saveTranscription("Merged Transcription", mergedContent);
    }

    updateTranscriptionsList();
});
