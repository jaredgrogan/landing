document.addEventListener('DOMContentLoaded', () => {
    const calendarGrid = document.getElementById('calendar-grid');
    const currentMonthElement = document.getElementById('current-month');
    const prevMonthButton = document.getElementById('prev-month');
    const nextMonthButton = document.getElementById('next-month');
    const eventList = document.getElementById('event-list');
    
    let currentDate = new Date();

    function generateCalendar(year, month) {
        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);
        
        currentMonthElement.textContent = firstDay.toLocaleString('default', { month: 'long', year: 'numeric' });
        
        calendarGrid.innerHTML = '';

        for (let i = 0; i < firstDay.getDay(); i++) {
            calendarGrid.appendChild(createDayElement('', 'other-month'));
        }

        for (let i = 1; i <= lastDay.getDate(); i++) {
            const isToday = year === currentDate.getFullYear() && month === currentDate.getMonth() && i === currentDate.getDate();
            calendarGrid.appendChild(createDayElement(i, isToday ? 'today' : ''));
        }

        const remainingDays = 7 - (lastDay.getDay() + 1);
        for (let i = 1; i <= remainingDays; i++) {
            calendarGrid.appendChild(createDayElement('', 'other-month'));
        }
    }

    function createDayElement(day, className = '') {
        const dayElement = document.createElement('div');
        dayElement.className = `calendar-day ${className}`;
        dayElement.textContent = day;
        return dayElement;
    }

    function updateCalendar() {
        generateCalendar(currentDate.getFullYear(), currentDate.getMonth());
    }

    prevMonthButton.addEventListener('click', () => {
        currentDate.setMonth(currentDate.getMonth() - 1);
        updateCalendar();
    });

    nextMonthButton.addEventListener('click', () => {
        currentDate.setMonth(currentDate.getMonth() + 1);
        updateCalendar();
    });

    // Initialize calendar
    updateCalendar();

    // Placeholder functions for API integration
    async function authenticateGoogleCalendar() {
        // Implement Google OAuth2 flow here
        console.log('Authenticating with Google Calendar');
    }

    async function fetchGoogleCalendarEvents(calendarId, timeMin, timeMax) {
        // Fetch events from Google Calendar API
        console.log(`Fetching events for calendar ${calendarId} from ${timeMin} to ${timeMax}`);
        // Simulated API call
        return [
            { id: '1', summary: 'Meeting with team', start: { dateTime: '2023-06-15T10:00:00' } },
            { id: '2', summary: 'Lunch with client', start: { dateTime: '2023-06-16T12:30:00' } }
        ];
    }

    // Similar functions would be needed for Outlook and iCloud calendars

    // Event handling for connect buttons
    document.getElementById('connect-gmail').addEventListener('click', authenticateGoogleCalendar);
    // Add similar event listeners for Outlook and iCloud buttons

    // Function to display events
    function displayEvents(events) {
        eventList.innerHTML = '';
        events.forEach(event => {
            const eventElement = document.createElement('div');
            eventElement.className = 'event-item';
            eventElement.textContent = `${event.summary} - ${new Date(event.start.dateTime).toLocaleTimeString()}`;
            eventList.appendChild(eventElement);
        });
    }

    // Simulated event fetching and display
    const simulatedEvents = [
        { id: '1', summary: 'Team Meeting', start: { dateTime: '2023-06-15T10:00:00' } },
        { id: '2', summary: 'Project Deadline', start: { dateTime: '2023-06-16T17:00:00' } }
    ];
    displayEvents(simulatedEvents);
});
