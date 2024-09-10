let editor;

document.addEventListener('DOMContentLoaded', (event) => {
    const codeEditor = document.getElementById('code-editor');
    
    editor = CodeMirror.fromTextArea(codeEditor, {
        lineNumbers: true,
        mode: 'javascript', // default mode
        theme: 'default',
        autofocus: true,
        tabSize: 2,
    });

    // Handle language changes
    const languageSelect = document.getElementById('language-select');
    languageSelect.addEventListener('change', (event) => {
        const language = event.target.value;
        editor.setOption('mode', language);
    });

    // Handle font size changes
    const fontSizeSelect = document.getElementById('font-size-select');
    fontSizeSelect.addEventListener('change', (event) => {
        const fontSize = event.target.value;
        editor.getWrapperElement().style.fontSize = fontSize;
    });

    // Handle minimap toggle
    const minimapToggle = document.getElementById('minimap-toggle');
    minimapToggle.addEventListener('click', () => {
        const minimap = document.getElementById('minimap');
        minimap.classList.toggle('hidden');
        // You may need to implement custom minimap functionality
    });

    // Handle run button click
    const runBtn = document.getElementById('run-btn');
    runBtn.addEventListener('click', () => {
        const code = editor.getValue();
        // Implement code execution logic here
        console.log('Code to run:', code);
    });

    // AI Chat functionality
    const aiInput = document.getElementById('ai-input');
    const aiChatBtn = document.getElementById('ai-chat-btn');
    const aiResponse = document.getElementById('ai-response');

    aiChatBtn.addEventListener('click', sendMessage);
    aiInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });

    async function sendMessage() {
        const message = aiInput.value.trim();
        if (message) {
            const userBubble = document.createElement('div');
            userBubble.classList.add('chat-bubble', 'user');
            userBubble.textContent = message;
            aiResponse.appendChild(userBubble);
            aiInput.value = '';
            aiResponse.scrollTop = aiResponse.scrollHeight;

            showTypingIndicator();

            try {
                const response = await fetch('/api/chat', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ message: message }),
                });
                const data = await response.json();

                hideTypingIndicator();

                const aiBubble = document.createElement('div');
                aiBubble.classList.add('chat-bubble', 'ai');
                aiBubble.textContent = data.response;
                aiResponse.appendChild(aiBubble);
                aiResponse.scrollTop = aiResponse.scrollHeight;
            } catch (error) {
                hideTypingIndicator();

                const aiBubble = document.createElement('div');
                aiBubble.classList.add('chat-bubble', 'ai');
                aiBubble.textContent = 'Error connecting to the server. Please try again later.';
                aiResponse.appendChild(aiBubble);
                aiResponse.scrollTop = aiResponse.scrollHeight;
            }
        }
    }

    function showTypingIndicator() {
        const typingIndicator = document.createElement('div');
        typingIndicator.classList.add('typing-indicator');
        typingIndicator.textContent = 'AI is typing...';
        aiResponse.appendChild(typingIndicator);
        aiResponse.scrollTop = aiResponse.scrollHeight;
    }

    function hideTypingIndicator() {
        const typingIndicator = aiResponse.querySelector('.typing-indicator');
        if (typingIndicator) {
            typingIndicator.remove();
        }
    }
});
