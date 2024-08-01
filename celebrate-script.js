// Smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Chat toggling
const chatWidget = document.getElementById('chat-widget');
const chatToggle = document.getElementById('chat-toggle');

chatToggle.addEventListener('click', () => {
    chatWidget.classList.toggle('chat-open');
    chatWidget.classList.toggle('chat-closed');
});

// Typing effect
function typeEffect(element, text, speed = 50) {
    let i = 0;
    const timer = setInterval(() => {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
        } else {
            clearInterval(timer);
        }
    }, speed);
}

// Apply typing effect to tagline
window.addEventListener('load', () => {
    const tagline = document.querySelector('.tagline');
    typeEffect(tagline, "Your intelligent companion for everyday tasks");
});

// Form submission
const form = document.querySelector('form');
form.addEventListener('submit', (e) => {
    e.preventDefault();
    // Here you would typically send the form data to a server
    alert('Thank you for your message! We will get back to you soon.');
    form.reset();
});

// Responsive navigation
const nav = document.querySelector('nav');
const menuToggle = document.createElement('button');
menuToggle.textContent = 'Menu';
menuToggle.classList.add('menu-toggle');
nav.prepend(menuToggle);

menuToggle.addEventListener('click', () => {
    nav.classList.toggle('nav-open');
});

// Intersection Observer for fade-in effect
const fadeInElements = document.querySelectorAll('.fade-in');
const fadeInObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.1 });

fadeInElements.forEach(element => {
    fadeInObserver.observe(element);
});
