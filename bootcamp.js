// JavaScript code for additional interactivity (if needed)

// Example: Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// JavaScript for chat widget functionality

document.getElementById('open-chat').addEventListener('click', function() {
    document.getElementById('chat-widget').style.display = 'flex';
    document.getElementById('open-chat').style.display = 'none';
});

document.getElementById('close-chat').addEventListener('click', function() {
    document.getElementById('chat-widget').style.display = 'none';
    document.getElementById('open-chat').style.display = 'flex';
});

document.getElementById('send-message').addEventListener('click', function() {
    const input = document.getElementById('message-input');
    const message = input.value.trim();
    if (message) {
        const chatMessages = document.getElementById('chat-messages');
        chatMessages.innerHTML += `<p><strong>You:</strong> ${message}</p>`;
        input.value = '';
        chatMessages.scrollTop = chatMessages.scrollHeight;
        // Here you can add logic to send the message to a server or chatbot
    }
});

// Optional: Add enter key functionality
document.getElementById('message-input').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        document.getElementById('send-message').click();
    }
});
