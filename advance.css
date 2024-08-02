document.addEventListener('DOMContentLoaded', () => {
    const root = document.getElementById('root');

    const state = {
        isDarkMode: false,
        isNotePadOpen: false,
        isLLMChatOpen: false,
        isMonthView: false,
        tasks: {
            'To Do': ['Task 1', 'Task 2', 'Task 3'],
            'In Progress': ['Task 4', 'Task 5'],
            'Done': ['Task 6']
        }
    };

    const render = () => {
        root.innerHTML = `
            <div class="${state.isDarkMode ? 'dark-mode' : 'light-mode'}">
                <div class="header">
                    <h1>Universitas Pro Productivity Tool</h1>
                    <div>
                        <span>${state.isDarkMode ? 'Dark' : 'Light'} Mode</span>
                        <button onclick="toggleDarkMode()">Switch</button>
                    </div>
                </div>
                <div class="card ${state.isDarkMode ? 'dark-mode' : ''}">
                    <div class="card-content">
                        <div class="flex items-center justify-between mb-2">
                            <button onclick="toggleCalendarView()">Toggle Calendar View</button>
                        </div>
                        <div class="calendar">
                            ${renderCalendar()}
                        </div>
                    </div>
                </div>
                <div class="task-columns">
                    ${renderTasks()}
                </div>
                <div class="fixed-button ${state.isDarkMode ? 'dark-mode' : ''}" style="bottom: 5rem; left: 1rem;" onclick="toggleNotePad()">
                    ${state.isNotePadOpen ? 'X' : '+'}
                </div>
                ${state.isNotePadOpen ? `<div class="note-pad ${state.isDarkMode ? 'dark-mode' : ''}">
                    <textarea placeholder="Type your notes here..."></textarea>
                </div>` : ''}
                <div class="fixed-button ${state.isDarkMode ? 'dark-mode' : ''}" style="bottom: 5rem; right: 1rem;" onclick="toggleLLMChat()">
                    ${state.isLLMChatOpen ? 'X' : 'C'}
                </div>
                ${state.isLLMChatOpen ? `<div class="llm-chat ${state.isDarkMode ? 'dark-mode' : ''}">
                    <div class="chat-content">
                        <input type="text" placeholder="Type your message...">
                        <button>Send</button>
                    </div>
                </div>` : ''}
            </div>
        `;
    };

    window.toggleDarkMode = () => {
        state.isDarkMode = !state.isDarkMode;
        render();
    };

    window.toggleNotePad = () => {
        state.isNotePadOpen = !state.isNotePadOpen;
        render();
    };

    window.toggleLLMChat = () => {
        state.isLLMChatOpen = !state.isLLMChatOpen;
        render();
    };

    window.toggleCalendarView = () => {
        state.isMonthView = !state.isMonthView;
        render();
    };

    const renderCalendar = () => {
        if (state.isMonthView) {
            return Array.from({ length: 31 }, (_, i) => `<div class="calendar-day ${state.isDarkMode ? 'dark-mode' : ''}">${i + 1}</div>`).join('');
        } else {
            return ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(day => `<div class="calendar-day ${state.isDarkMode ? 'dark-mode' : ''}">${day}</div>`).join('');
        }
    };

    const renderTasks = () => {
        return Object.keys(state.tasks).map(column => `
            <div class="task-column ${state.isDarkMode ? 'dark-mode' : ''}">
                <h3>${column}</h3>
                ${state.tasks[column].map(task => `<div class="task ${state.isDarkMode ? 'dark-mode' : ''}">
                    <input type="text" value="${task}" oninput="updateTask('${column}', ${state.tasks[column].indexOf(task)}, this.value)">
                </div>`).join('')}
                <button onclick="addTask('${column}')">Add Task</button>
            </div>
        `).join('');
    };

    window.addTask = (column) => {
        state.tasks[column].push('New Task');
        render();
    };

    window.updateTask = (column, index, newValue) => {
        state.tasks[column][index] = newValue;
        render();
    };

    render();
});
