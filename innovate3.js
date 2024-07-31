document.addEventListener('DOMContentLoaded', () => {
    const backgroundAnimation = document.getElementById('background-animation');
    const dateTimeElement = document.getElementById('date-time');

    // Particle system for background
    const particleCanvas = document.getElementById('particle-canvas');
    const ctx = particleCanvas.getContext('2d');

    let particles = [];
    const particleCount = 100;

    const initParticles = () => {
        particles = [];
        for (let i = 0; i < particleCount; i++) {
            particles.push({
                x: Math.random() * particleCanvas.width,
                y: Math.random() * particleCanvas.height,
                r: Math.random() * 3 + 1,
                d: Math.random() * particleCount,
            });
        }
    };

    const drawParticles = () => {
        ctx.clearRect(0, 0, particleCanvas.width, particleCanvas.height);
        ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
        ctx.beginPath();

        for (let i = 0; i < particleCount; i++) {
            let p = particles[i];
            ctx.moveTo(p.x, p.y);
            ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2, true);
        }

        ctx.fill();
        updateParticles();
    };

    const updateParticles = () => {
        for (let i = 0; i < particleCount; i++) {
            let p = particles[i];
            p.y += Math.cos(p.d) + 1 + p.r / 2;
            p.x += Math.sin(p.d) * 2;

            if (p.x > particleCanvas.width + 5 || p.x < -5 || p.y > particleCanvas.height) {
                if (i % 3 > 0) {
                    particles[i] = { x: Math.random() * particleCanvas.width, y: -10, r: p.r, d: p.d };
                } else {
                    if (Math.sin(p.d) > 0) {
                        particles[i] = { x: -5, y: Math.random() * particleCanvas.height, r: p.r, d: p.d };
                    } else {
                        particles[i] = { x: particleCanvas.width + 5, y: Math.random() * particleCanvas.height, r: p.r, d: p.d };
                    }
                }
            }
        }
    };

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

    const onResize = () => {
        particleCanvas.width = window.innerWidth;
        particleCanvas.height = window.innerHeight;
        initParticles();
    };

    // Chat box functionality
    const chatBox = document.getElementById('chat-box');
    const chatCloseButton = document.getElementById('chat-close');
    const chatBody = document.getElementById('chat-body');
    const chatInput = document.getElementById('chat-input');
    const chatSendButton = document.getElementById('chat-send');

    chatCloseButton.addEventListener('click', () => {
        chatBox.style.display = 'none';
    });

    chatSendButton.addEventListener('click', () => {
        const message = chatInput.value.trim();
        if (message) {
            const messageElement = document.createElement('p');
            messageElement.textContent = `You: ${message}`;
            chatBody.appendChild(messageElement);
            chatInput.value = '';
            chatBody.scrollTop = chatBody.scrollHeight;
        }
    });

    window.addEventListener('resize', onResize);
    onResize();

    setInterval(updateBackground, 100);
    setInterval(updateDateTime, 1000);
    setInterval(drawParticles, 33); // ~30 FPS for particle animation
});
