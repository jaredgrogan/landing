// Hamburger Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('open');
});

// ChatGPT 3.5 Turbo Integration Placeholder
const chatInput = document.getElementById('chat-input');
const chatBox = document.getElementById('chat-box');
const sendBtn = document.getElementById('send-btn');

sendBtn.addEventListener('click', () => {
    const message = chatInput.value;
    if (message) {
        // Simulate sending message to GPT-3.5 Turbo
        chatBox.innerHTML += `<p>You: ${message}</p>`;
        chatInput.value = ''; // Clear input
        // Here you would send the message to GPT-3.5 Turbo via API
    }
});
