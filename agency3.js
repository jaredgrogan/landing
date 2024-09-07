// Toggle chat open/close
const chatContainer = document.getElementById('chat-container');
document.getElementById('mic-btn').addEventListener('click', function() {
    chatContainer.classList.toggle('open');
});

// Simulate chat interaction
document.getElementById('send-btn').addEventListener('click', function() {
    const input = document.getElementById('chat-input').value;
    if (input) {
        document.getElementById('chat-box').innerHTML += `<p>You: ${input}</p>`;
        document.getElementById('chat-input').value = '';
    }
});

// Mic button interactivity
const micBtn = document.getElementById('mic-btn');
micBtn.addEventListener('click', () => {
    micBtn.classList.toggle('recording');
});
