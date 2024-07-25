document.addEventListener('DOMContentLoaded', () => {
    const texts = [
        "Hi, I'm Herakles",
        "Your AI Assistant",
        "Let's get started!"
        "Universitas Pro"
    ];
    let index = 0;
    const typingElement = document.getElementById('typingAnimation');

    function typeText(text, callback) {
        let i = 0;
        typingElement.textContent = '';
        function addChar() {
            if (i < text.length) {
                typingElement.textContent += text.charAt(i);
                i++;
                setTimeout(addChar, 50);
            } else {
                setTimeout(callback, 1500);
            }
        }
        addChar();
    }

    function nextText() {
        if (index < texts.length) {
            typeText(texts[index], () => {
                index++;
                nextText();
            });
        }
    }

    nextText();

    const emailForm = document.getElementById('emailForm');
    emailForm.addEventListener('submit', async function(event) {
        event.preventDefault();
        const email = document.getElementById('emailInput').value;
        const response = await fetch('/submit_email', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email: email }),
        });
        if (response.ok) {
            window.location.href = 'login.html';
        } else {
            alert('Failed to submit email. Please try again.');
        }
    });

    function toggleMode() {
        const body = document.body;
        if (body.classList.contains('night-mode')) {
            body.classList.remove('night-mode');
            body.classList.add('day-mode');
        } else {
            body.classList.remove('day-mode');
            body.classList.add('night-mode');
        }
    }

    document.addEventListener('keydown', function(event) {
        if (event.key === 'd') {
            toggleMode();
        }
    });
});
