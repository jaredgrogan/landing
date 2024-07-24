const DateTime = luxon.DateTime;

let isLightMode = true;
let currentDateTime = DateTime.now();
let selectedDate = DateTime.now();
let currentMonth = DateTime.now();

const app = document.getElementById('app');
const themeToggle = document.getElementById('theme-toggle');
const prevMonthBtn = document.getElementById('prev-month');
const nextMonthBtn = document.getElementById('next-month');
const currentMonthElement = document.getElementById('current-month');
const calendarGrid = document.getElementById('calendar-grid');
const selectedDateElement = document.getElementById('selected-date');

function updateTheme() {
    app.className = isLightMode ? 'dark-mode' : 'light-mode';
    themeToggle.innerHTML = isDarkMode ? '☀️' : '🌙';
}

function toggleTheme() {
        this.theme = this.theme === 'light' ? 'dark' : 'light';
        document.body.classList.toggle('dark-mode');
        this.themeToggle.innerHTML = this.theme === 'light' 
            ? '<i data-lucide="moon"></i>' 
            : '<i data-lucide="sun"></i>';
        lucide.createIcons();
    }

function updateDateTime() {
    currentDateTime = DateTime.now();
    renderCalendar();
}

function changeMonth(delta) {
    currentMonth = currentMonth.plus({ months: delta });
    renderCalendar();
}

function renderCalendar() {
    currentMonthElement.textContent = currentMonth.toFormat('MMMM yyyy');
    selectedDateElement.textContent = selectedDate.toFormat('cccc, MMMM d, yyyy');

    const daysInMonth = currentMonth.daysInMonth;
    const firstDayOfMonth = currentMonth.startOf('month').weekday;

    calendarGrid.innerHTML = '';

    // Add weekday headers
    ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].forEach(day => {
        const dayElement = document.createElement('div');
        dayElement.className = 'calendar-day';
        dayElement.style.fontWeight = 'bold';
        dayElement.textContent = day;
        calendarGrid.appendChild(dayElement);
    });

    // Add filler days
    for (let i = 1; i < firstDayOfMonth; i++) {
        const fillerDay = document.createElement('div');
        fillerDay.className = 'calendar-day';
        calendarGrid.appendChild(fillerDay);
    }

    // Add month days
    for (let day = 1; day <= daysInMonth; day++) {
        const dayElement = document.createElement('div');
        dayElement.className = 'calendar-day';
        dayElement.textContent = day;

        if (day === selectedDate.day && 
            currentMonth.month === selectedDate.month && 
            currentMonth.year === selectedDate.year) {
            dayElement.classList.add('active');
        }

        dayElement.addEventListener('click', () => {
            selectedDate = currentMonth.set({ day });
            renderCalendar();
        });

        calendarGrid.appendChild(dayElement);
    }
}

themeToggle.addEventListener('click', toggleTheme);
prevMonthBtn.addEventListener('click', () => changeMonth(-1));
nextMonthBtn.addEventListener('click', () => changeMonth(1));

updateTheme();
renderCalendar();

// Update date and time every second
setInterval(updateDateTime, 1000);
