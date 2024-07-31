/ Replace 'YOUR_API_ENDPOINT' with the actual endpoint of your LLM service
const API_ENDPOINT = 'YOUR_API_ENDPOINT';

const chatMessages = document.getElementById('chat-messages');
const userInput = document.getElementById('user-input');
const sendButton = document.getElementById('send-button');

sendButton.addEventListener('click', sendMessage);
userInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        sendMessage();
    }
});

function sendMessage() {
    const message = userInput.value.trim();
    if (message) {
        addMessage('user', message);
        userInput.value = '';
        fetchBotResponse(message);
    }
}

function addMessage(sender, text) {
    const messageElement = document.createElement('div');
    messageElement.classList.add('message', `${sender}-message`);
    messageElement.textContent = text;
    chatMessages.appendChild(messageElement);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function addLoadingIndicator() {
    const loadingElement = document.createElement('div');
    loadingElement.classList.add('loading');
    loadingElement.textContent = 'Thinking...';
    loadingElement.id = 'loading-indicator';
    chatMessages.appendChild(loadingElement);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function removeLoadingIndicator() {
    const loadingElement = document.getElementById('loading-indicator');
    if (loadingElement) {
        loadingElement.remove();
    }
}

async function fetchBotResponse(userMessage) {
    addLoadingIndicator();

    try {
        const response = await fetch(API_ENDPOINT, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                // Add any necessary authentication headers here
            },
            body: JSON.stringify({ message: userMessage })
        });

        if (!response.ok) {
            throw new Error('API request failed');
        }

        const data = await response.json();
        removeLoadingIndicator();
        addMessage('bot', data.response);
    } catch (error) {
        console.error('Error:', error);
        removeLoadingIndicator();
        addMessage('bot', 'Sorry, I encountered an error. Please try again later.');
    }
}
