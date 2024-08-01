document.addEventListener('DOMContentLoaded', () => {
  const app = document.getElementById('app');
  const themeIcon = document.getElementById('themeIcon');
  const darkModeSwitch = document.getElementById('darkModeSwitch');
  const chatComponent = document.getElementById('chatComponent');
  const chatMessages = document.getElementById('chatMessages');
  const userInput = document.getElementById('userInput');
  const eventsList = document.getElementById('eventsList');
  const briefingList = document.getElementById('briefingList');
  const minimizedCalendarBtn = document.getElementById('minimizedCalendarBtn');
  const notepad = document.getElementById('notepad');

  let isDarkMode = false;
  let isChatOpen = false;
  let isCalendarMinimized = false;
  let isNotepadOpen = false;
  let messages = [{ sender: 'AI', message: "Hi, I'm Herakles" }];

  function renderThemeIcon() {
    themeIcon.innerHTML = isDarkMode ? 
      `<path d="M12 9V3M21 15.6L20 21M4 15.6L3 21M12 21h.01M6.3 6.3l-4.3 4.3M17.7 6.3l4.3 4.3M12 15l-3-3 3-3"/>` :
      `<path d="M12 2L12 2c-1.104 0-2 .896-2 2 0 1.104.896 2 2 2s2-.896 2-2c0-1.104-.896-2-2-2zM12 22L12 22c-1.104 0-2-.896-2-2 0-1.104.896-2 2-2s2 .896 2 2c0 1.104-.896 2-2 2zM4.222 4.222l-.707-.707a2 2 0 1 1 2.828 2.828l-.707-.707a2 2 0 1 1-2.828-2.828zM18.364 18.364l-.707-.707a2 2 0 1 1 2.828 2.828l-.707-.707a2 2 0 1 1-2.828-2.828zM2 12l0 0c0 1.104-.896 2-2 2s-2-.896-2-2 .896-2 2-2 2 .896 2 2zM22 12l0 0c0 1.104-.896 2-2 2s-2-.896-2-2 .896-2 2-2 2 .896 2 2zM4.222 19.778l-.707-.707a2 2 0 1 1 2.828 2.828l-.707-.707a2 2 0 1 1-2.828-2.828zM18.364 5.636l-.707-.707a2 2 0 1 1 2.828 2.828l-.707-.707a2 2 0 1 1-2.828-2.828z"/>`;
  }

  function toggleDarkMode() {
    isDarkMode = !isDarkMode;
    app.classList.toggle('bg-gray-900', isDarkMode);
    app.classList.toggle('text-white', isDarkMode);
    app.classList.toggle('bg-gray-100', !isDarkMode);
    app.classList.toggle('text-gray-900', !isDarkMode);
    darkModeSwitch.checked = isDarkMode;
    renderThemeIcon();
  }

  function toggleChat() {
    isChatOpen = !isChatOpen;
    chatComponent.classList.toggle('w-64', isChatOpen);
    chatComponent.classList.toggle('h-96', isChatOpen);
    chatComponent.querySelector('.card').classList.toggle('hidden', !isChatOpen);
  }

  function closeChat() {
    isChatOpen = false;
    chatComponent.classList.remove('w-64', 'h-96');
    chatComponent.querySelector('.card').classList.add('hidden');
  }

  function toggleCalendar() {
    isCalendarMinimized = !isCalendarMinimized;
    document.getElementById('calendarCard').classList.toggle('hidden', isCalendarMinimized);
    minimizedCalendarBtn.classList.toggle('hidden', !isCalendarMinimized);
  }

  function toggleNotepad() {
    isNotepadOpen = !isNotepadOpen;
    notepad.classList.toggle('hidden', !isNotepadOpen);
  }

  function handleSendMessage(event) {
    event.preventDefault();
    const message = userInput.value.trim();
    if (message) {
      messages.push({ sender: 'User', message });
      chatMessages.innerHTML += `<div class="mb-2 text-green-500"><strong>User:</strong> ${message}</div>`;
      userInput.value = '';
      // Simulate AI response
      setTimeout(() => {
        const aiResponse = { sender: 'AI', message: 'How can I assist you?' };
        messages.push(aiResponse);
        chatMessages.innerHTML += `<div class="mb-2 text-blue-500"><strong>${aiResponse.sender}:</strong> ${aiResponse.message}</div>`;
        chatMessages.scrollTop = chatMessages.scrollHeight;
      }, 1000);
    }
  }

  function populateEvents() {
    eventsList.innerHTML = '';
    const events = [
      { id: 1, title: 'Team Meeting', date: '2024-07-31', time: '10:00 AM' },
      { id: 2, title: 'Project Deadline', date: '2024-08-02', time: '5:00 PM' },
    ];
    events.forEach(event => {
      eventsList.innerHTML += `
        <li class="flex items-center">
          <svg class="mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path d="M12 8v4l3 3M4 4h16M5 4a1 1 0 100 2h14a1 1 0 100-2H5zm14 4H5a1 1 0 00-1 1v11a1 1 0 001 1h14a1 1 0 001-1V9a1 1 0 00-1-1z"/>
          </svg>
          <span>${event.title} - ${event.date} at ${event.time}</span>
        </li>
      `;
    });
  }

  function populateBriefing() {
    briefingList.innerHTML = '';
    const briefingItems = [
      'Review lecture notes for Advanced AI Ethics',
      'Complete research paper draft',
      'Attend virtual lab meeting at 2 PM',
      'Submit grant proposal for quantum computing project',
    ];
    briefingItems.forEach(item => {
      briefingList.innerHTML += `<li class="flex items-center"><span>• ${item}</span></li>`;
    });
  }

  renderThemeIcon();
  populateEvents();
  populateBriefing();

  document.getElementById('toggleDarkMode').addEventListener('click', toggleDarkMode);
  darkModeSwitch.addEventListener('change', toggleDarkMode);
});
