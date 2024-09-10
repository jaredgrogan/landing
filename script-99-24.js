let editor;
let isNightMode = false;

document.addEventListener('DOMContentLoaded', (event) => {
    const codeEditor = document.getElementById('code-editor');
    
    editor = CodeMirror.fromTextArea(codeEditor, {
        lineNumbers: true,
        mode: 'javascript', // default mode
        theme: 'default',
        autofocus: true,
        tabSize: 2,
    });

    // Tab switching
    const tabs = document.querySelectorAll('.tab');
    const tabContents = document.querySelectorAll('.tab-content');
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const tabName = tab.getAttribute('data-tab');
            tabs.forEach(t => t.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));
            tab.classList.add('active');
            document.getElementById(`${tabName}-tab`).classList.add('active');
        });
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

    // Handle run button click
    const runBtn = document.getElementById('run-btn');
    runBtn.addEventListener('click', () => {
        const code = editor.getValue();
        const outputArea = document.getElementById('output-area');
        try {
            // Only support JavaScript execution for now
            const result = eval(code);
            outputArea.textContent = result;
        } catch (error) {
            outputArea.textContent = `Error: ${error.message}`;
        }
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
            displayMessage(message, 'user');
            aiInput.value = '';

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
                displayMessage(data.response, 'ai');

                // If the AI response contains code, update the editor
                if (data.code) {
                    editor.setValue(data.code);
                }
            } catch (error) {
                hideTypingIndicator();
                displayMessage('Error connecting to the server. Please try again later.', 'ai');
            }
        }
    }

    function displayMessage(message, sender) {
        const bubble = document.createElement('div');
        bubble.classList.add('chat-bubble', sender);
        bubble.textContent = message;
        aiResponse.appendChild(bubble);
        aiResponse.scrollTop = aiResponse.scrollHeight;
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

    // Night mode toggle
    const themeToggle = document.getElementById('theme-toggle');
    themeToggle.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-moon"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>';
    
    themeToggle.addEventListener('click', toggleNightMode);

    function toggleNightMode() {
        isNightMode = !isNightMode;
        document.body.classList.toggle('night-mode');
        updateButtonStyles();
        
        if (isNightMode) {
            themeToggle.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-sun"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>';
            editor.setOption('theme', 'monokai');
        } else {
            themeToggle.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-moon"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>';
            editor.setOption('theme', 'default');
        }
    }

    function updateButtonStyles() {
        const buttons = document.querySelectorAll('.btn');
        buttons.forEach(button => {
            if (isNightMode) {
                button.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
                button.style.color = 'white';
                button.style.backdropFilter = 'blur(10px)';
            } else {
                button.style.backgroundColor = 'black';
                button.style.color = 'white';
                button.style.backdropFilter = 'none';
            }
        });
    }

    // Add tooltips
    const interactiveElements = document.querySelectorAll('button, select, input');
    interactiveElements.forEach(element => {
        const tooltip = element.getAttribute('title') || element.getAttribute('aria-label') || element.textContent.trim();
        if (tooltip) {
            element.setAttribute('data-tooltip', tooltip);
            element.removeAttribute('title'); // Remove default title tooltip
        }
    });
});
