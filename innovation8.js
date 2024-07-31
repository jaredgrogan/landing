document.addEventListener('DOMContentLoaded', () => {
    const backgroundAnimation = document.getElementById('background-animation');
    const dateTimeElement = document.getElementById('date-time');

    const updateBackground = () => {
        const time = new Date().getTime() * 0.0005;
        const hue = Math.sin(time) * 360;

        backgroundAnimation.style.background = `linear-gradient(135deg, hsl(${hue}, 70%, 80%) 0%, hsl(${hue + 60}, 70%, 80%) 100%)`;
    };

    const updateDateTime = () => {
        const now = new Date();
        const options = { weekday: 'short', year: 'numeric', month: 'long', day: 'numeric' };
        const formattedDate = now.toLocaleDateString('en-US', options);
        const formattedTime = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' });

        dateTimeElement.textContent = `${formattedDate}, ${formattedTime}`;
    };

    setInterval(updateBackground, 100);
    setInterval(updateDateTime, 1000);
});
