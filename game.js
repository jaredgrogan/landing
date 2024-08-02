// game.js

const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Game elements
const spaceship = { x: 400, y: 300, width: 50, height: 50, speed: 5 };
const asteroids = [];
const particles = [];

// Helper functions
function drawSpaceship() {
  ctx.fillStyle = '#00FF00';
  ctx.fillRect(spaceship.x, spaceship.y, spaceship.width, spaceship.height);
}

function drawAsteroids() {
  ctx.fillStyle = '#FF0000';
  asteroids.forEach(asteroid => {
    ctx.fillRect(asteroid.x, asteroid.y, asteroid.size, asteroid.size);
  });
}

function drawParticles() {
  particles.forEach(particle => {
    ctx.fillStyle = `rgba(${particle.r}, ${particle.g}, ${particle.b}, ${particle.alpha})`;
    ctx.fillRect(particle.x, particle.y, particle.size, particle.size);
  });
}

function updateParticles() {
  particles.forEach(particle => {
    particle.x += particle.vx;
    particle.y += particle.vy;
    particle.alpha -= 0.01;
  });
  particles = particles.filter(particle => particle.alpha > 0);
}

// Game loop
function gameLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawSpaceship();
  drawAsteroids();
  drawParticles();
  updateParticles();
  requestAnimationFrame(gameLoop);
}

gameLoop();
