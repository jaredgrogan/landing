function toggleMode() {
    const body = document.body;
    const modeText = document.getElementById('mode-text');
    if (body.classList.contains('night-mode')) {
        body.classList.remove('night-mode');
        body.classList.add('day-mode');
        modeText.textContent = 'day';
    } else {
        body.classList.remove('day-mode');
        body.classList.add('night-mode');
        modeText.textContent = 'night';
    }
}

function launchApp() {
    window.location.href = 'app.html';
}
