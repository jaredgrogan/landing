
document.addEventListener('DOMContentLoaded', () => {
    const texts = [
        "// Discover the Universe,",
        "// Discover the Universe,"
        "// Descubre el Universo",
        "// Scopri l'Universo.",
        "// Découvrez l'Univers",
        "// Entdecke das Universum",
        "// اكتشف الكون ",
        "Coming 09.09.2024",
        "// Universitas Pro",
        "Your Cognitive Computer."
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
