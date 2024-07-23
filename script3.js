document.addEventListener('DOMContentLoaded', () => {
    const codeEditor = document.getElementById('code-editor');
    const codeHighlight = document.getElementById('code-content');
    const languageSelect = document.getElementById('language-select');
    const fontSizeSelect = document.getElementById('font-size-select');
    const runBtn = document.getElementById('run-btn');
    const outputArea = document.getElementById('output-area');
    const aiInput = document.getElementById('ai-input');
    const aiChatBtn = document.getElementById('ai-chat-btn');
    const aiResponse = document.getElementById('ai-response');

    // Initialize Lucide icons
    lucide.createIcons();

    // Set current date and time
    const currentDateTime = document.getElementById('current-date-time');
    currentDateTime.textContent = new Date().toLocaleString();

    // Theme toggle
    const themeToggle = document.getElementById('theme-toggle');
    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-theme');
    });

    // Code editor setup
    function updateLineNumbers() {
        const lines = codeEditor.value.split('\n');
        const lineNumbers = document.querySelector('.line-numbers');
        lineNumbers.innerHTML = lines.map((_, i) => `<span>${i + 1}</span>`).join('');
    }

    function updateCodeHighlight() {
        const code = codeEditor.value;
        const language = languageSelect.value;
        const highlightedCode = Prism.highlight(code, Prism.languages[language], language);
        codeHighlight.innerHTML = highlightedCode;
    }

    codeEditor.addEventListener('input', () => {
        updateLineNumbers();
        updateCodeHighlight();
    });

    codeEditor.addEventListener('scroll', () => {
        codeHighlight.scrollTop = codeEditor.scrollTop;
        document.querySelector('.line-numbers').scrollTop = codeEditor.scrollTop;
    });

    languageSelect.addEventListener('change', updateCodeHighlight);

    fontSizeSelect.addEventListener('change', () => {
        const fontSize = fontSizeSelect.value;
        codeEditor.style.fontSize = fontSize;
        codeHighlight.style.fontSize = fontSize;
        document.querySelector('.line-numbers').style.fontSize = fontSize;
    });

    // Run code
    runBtn.addEventListener('click', () => {
        const code = codeEditor.value;
        const language = languageSelect.value;

        // This is a simple example. In a real-world scenario, you'd want to use a more secure method of code execution.
        try {
            let output;
            if (language === 'javascript') {
                output = eval(code);
            } else {
                output = `Code execution for ${language} is not implemented in this example.`;
            }
            outputArea.textContent = output;
        } catch (error) {
            outputArea.textContent = `Error: ${error.message}`;
        }
    });

    // AI chat (placeholder functionality)
    aiChatBtn.addEventListener('click', () => {
        const userInput = aiInput.value;
        aiResponse.textContent = `AI response to: "${userInput}" (This is a placeholder response)`;
        aiInput.value = '';
    });

    // Initialize
    updateLineNumbers();
    updateCodeHighlight();
});
