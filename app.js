document.addEventListener('DOMContentLoaded', () => {
    const texts = [
        "Hello, I am Herakles...",
        "Your AI Assistant.",
        "Welcome to Universitas AI.",
        "Let's get started..."
    ];
    let index = 0;
    let charIndex = 0;
    const typingElement = document.getElementById('typingText');

    function type() {
        if (charIndex < texts[index].length) {
            typingElement.innerHTML += texts[index].charAt(charIndex);
            charIndex++;
            setTimeout(type, 100);
        } else {
            charIndex = 0;
            index++;
            if (index < texts.length) {
                setTimeout(() => {
                    typingElement.innerHTML = "";
                    type();
                }, 2500);
            } else {
                displayOnboarding();
            }
        }
    }

    function displayOnboarding() {
        typingElement.innerHTML = '<div>Email: <span id="emailInput" contenteditable="true" class="blinking-cursor"></span></div>';
        document.getElementById('emailInput').focus();
        document.getElementById('emailInput').addEventListener('keydown', function(event) {
            if (event.key === 'Enter') {
                event.preventDefault();
                localStorage.setItem('email', this.textContent.trim());
                this.contentEditable = false;
                displayNameInput();
            }
        });
    }

    function displayNameInput() {
        typingElement.innerHTML = '<div>Name: <span id="nameInput" contenteditable="true" class="blinking-cursor"></span></div>';
        document.getElementById('nameInput').focus();
        document.getElementById('nameInput').addEventListener('keydown', function(event) {
            if (event.key === 'Enter') {
                event.preventDefault();
                localStorage.setItem('name', this.textContent.trim());
                this.contentEditable = false;
                window.location.href = 'profile.html';
            }
        });
    }

    type();
});
