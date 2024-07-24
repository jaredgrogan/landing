function toggleMode() {
    const body = document.body;
    const modeText = document.getElementById('mode-text');
    if (body.classList.contains('night-mode')) {
        body.classList.remove('night-mode');
        body.classList.add('day-mode');
        modeText.textContent = '\u263C'; // Sun icon
    } else {
        body.classList.remove('day-mode');
        body.classList.add('night-mode');
        modeText.textContent = '\u263E'; // Moon icon
    }
}

function launchApp() {
    window.location.href = 'app.html';
}
