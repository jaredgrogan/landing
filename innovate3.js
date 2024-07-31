@import url('https://fonts.googleapis.com/css2?family=Courier+Prime&family=Roboto:wght@400;700&display=swap');

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Courier Prime', Courier, monospace;
}

body {
    background: #f5f5f5;
    color: #333;
    overflow-x: hidden;
}

header {
    background: rgba(255, 255, 255, 0.9);
    padding: 1em 0;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    position: fixed;
    top: 0;
    z-index: 1000;
}

.header-left, .header-center {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
}

.header-left {
    justify-content: flex-start;
    margin-left: 20px;
}

#favicon-link {
    margin-right: 20px;
}

#favicon {
    width: 50px;
    transition: transform 0.3s ease;
}

#favicon:hover {
    transform: scale(1.5);
}

#discover-text {
    font-size: 1.5em;
    color: #000;
}

.header-center #date-time {
    font-size: 1.2em;
    color: #333;
    font-family: 'Berkeley Mono', monospace;
    padding: 10px;
    background: rgba(255, 255, 255, 0.8);
    border-radius: 5px;
    text-align: right;
}

main {
    padding-top: 7em; /* Increased padding to account for header */
    display: flex;
    flex-direction: column;
    align-items: center;
}

section#home {
    background: transparent;
    color: black;
    text-align: center;
    margin-bottom: 20px;
    font-family: 'Roboto', sans-serif;
}

.bars {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
    width: 90%;
    max-width: 1200px;
    margin: 0 auto;
}

.bar {
    background: white;
    padding: 20px;
    border-radius: 25px;
    width: 100%;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    cursor: pointer;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.bar:hover {
    transform: scale(1.05);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
}

footer {
    background: #333;
    color: #fff;
    text-align: center;
    padding: 1em 0;
    position: relative;
    bottom: 0;
    width: 100%;
    font-family: 'Courier Prime', Courier, monospace;
}

footer nav ul {
    list-style: none;
    display: flex;
    gap: 2em;
    justify-content: center;
    padding: 0;
}

footer nav a {
    text-decoration: none;
    color: #fff;
    font-family: 'Roboto', sans-serif;
    font-weight: 500;
    font-size: 1.2em;
    transition: transform 0.3s ease;
}

footer nav a:hover {
    transform: scale(1.5);
}

#background-animation {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
    overflow: hidden;
}

.wave {
    position: absolute;
    width: 200%;
    height: 200%;
    top: -50%;
    left: -50%;
    background: radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.3), rgba(255, 255, 255, 0) 70%);
    animation: wave-animation 10s infinite ease-in-out;
    opacity: 0.7;
}

.wave:nth-child(2) {
    animation-delay: 5s;
}

.wave:nth-child(3) {
    animation-delay: 10s;
}

@keyframes wave-animation {
    0%, 100% {
        transform: translate(0, 0) scale(1);
    }
    50% {
        transform: translate(-20px, -20px) scale(1.1);
    }
}

#particle-canvas {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -2;
}

/* Chat Box */
#chat-box {
    position: fixed;
    bottom: 20px;
    right: 20px;
    width: 300px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    border-radius: 8px;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    background-color: #fff;
    font-family: 'Courier Prime', Courier, monospace;
    z-index: 1000;
}

#chat-header {
    background-color: #333;
    color: #fff;
    padding: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

#chat-body {
    padding: 10px;
    height: 200px;
    overflow-y: auto;
}

#chat-input-container {
    display: flex;
    padding: 10px;
    border-top: 1px solid #ddd;
}

#chat-input {
    flex: 1;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 4px;
    outline: none;
}

#chat-send {
    background-color: #333;
    color: #fff;
    border: none;
    padding: 10px 15px;
    margin-left: 10px;
    cursor: pointer;
    border-radius: 4px;
}

#chat-send:hover {
    background-color: #555;
}

#chat-close {
    background: none;
    border: none;
    color: #fff;
    font-size: 1.2em;
    cursor: pointer;
}
