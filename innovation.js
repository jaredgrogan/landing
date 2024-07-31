document.addEventListener('DOMContentLoaded', () => {
    const backgroundAnimation = document.getElementById('background-animation');

    const updateBackground = () => {
        const time = new Date().getTime() * 0.0005;
        const hue = Math.sin(time) * 360;

        backgroundAnimation.style.background = `linear-gradient(135deg, hsl(${hue}, 70%, 80%) 0%, hsl(${hue + 60}, 70%, 80%) 100%)`;
    };

    setInterval(updateBackground, 100);
});
