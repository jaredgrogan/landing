// animation.js
document.addEventListener("DOMContentLoaded", function() {
    const textElement = document.getElementById('typing-text');
    const phrases = [
        "Discover a Cognitive Universe."
    ];

    let phraseIndex = 0;
    let charIndex = 0;
    let isTyping = true;

    function type() {
        if (isTyping) {
            textElement.textContent += phrases[phraseIndex][charIndex];
            charIndex++;
            if (charIndex >= phrases[phraseIndex].length) {
                isTyping = false;
                setTimeout(deleteText, 3500); // Wait 3.5 seconds before deleting
            } else {
                setTimeout(type, 100); // Adjust typing speed
            }
        }
    }

    function deleteText() {
        if (charIndex > 0) {
            textElement.textContent = textElement.textContent.slice(0, -1);
            charIndex--;
            setTimeout(deleteText, 50); // Adjust typing speed for deletion
        } else {
            isTyping = true;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            setTimeout(type, 500); // Wait before typing new phrase
        }
    }

    type();
});
