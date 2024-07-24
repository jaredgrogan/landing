document.addEventListener('DOMContentLoaded', () => {
    const app = {
        isDarkMode: false,
        currentDateTime: new Date(),
        selectedDate: new Date(),
        currentMonth: new Date(),

        init() {
            this.cacheDom();
            this.bindEvents();
            this.updateDateTime();
            this.updateCalendar();
            this.updateTheme();
            setInterval(() => this.updateDateTime(), 1000);
        },

        cacheDom() {
            this.themeToggle = document.getElementById('theme-toggle');
            this.dateTimeEl = document.getElementById('date-time');
            this.calendarGrid = document.getElementById('calendar-grid');
            this.currentMonthEl = document.getElementById('current-month');
            this.selectedDateEl = document.getElementById('selected-date');
            this.prevMonthBtn = document.getElementById('prev-month');
            this.nextMonthBtn = document.getElementById('next-month');
        },

        bindEvents() {
            this.themeToggle.addEventListener('click', () => this.toggleTheme());
            this.prevMonthBtn.addEventListener('click', () => this.changeMonth(-1));
            this.nextMonthBtn.addEventListener('click', () => this.changeMonth(1));
        },

        toggleTheme() {
            this.isDarkMode = !this.isDarkMode;
            this.updateTheme();
        },

        updateTheme() {
            document.body.classList.toggle('dark-mode', this.isDarkMode);
            this.themeToggle.innerHTML = this.isDarkMode 
                ? '<i data-lucide="sun"></i>' 
                : '<i data-lucide="moon"></i>';
            lucide.createIcons();
        },

        updateDateTime() {
            this.currentDateTime = new Date();
            this.dateTimeEl.textContent = this.currentDateTime.toLocaleString();
        },

        changeMonth(delta) {
            this.currentMonth = new Date(this.currentMonth.getFullYear(), this.currentMonth.getMonth() + delta, 1);
            this.updateCalendar();
        },

        updateCalendar() {
            this.currentMonthEl.textContent = this.currentMonth.toLocaleString('default', { month: 'long', year: 'numeric' });
            this.calendarGrid.innerHTML = '';

            const daysInMonth = new Date(this.currentMonth.getFullYear(), this.currentMonth.getMonth() + 1, 0).getDate();
            const firstDayOfMonth = new Date(this.currentMonth.getFullYear(), this.currentMonth.getMonth(), 1).getDay();

            for (let i = 0; i < 7; i++) {
                const dayName = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][i];
                const dayEl = document.createElement('div');
                dayEl.textContent = dayName;
                dayEl.classList.add('calendar-day');
                dayEl.style.fontWeight = 'bold';
                this.calendarGrid.appendChild(dayEl);
            }

            for (let i = 0; i < firstDayOfMonth; i++) {
                const fillerEl = document.createElement('div');
                fillerEl.classList.add('calendar-day');
                this.calendarGrid.appendChild(fillerEl);
            }

            for (let day = 1; day <= daysInMonth; day++) {
                const dayEl = document.createElement('div');
                dayEl.textContent = day;
                dayEl.classList.add('calendar-day');
                if (day === this.selectedDate.getDate() &&
                    this.currentMonth.getMonth() === this.selectedDate.getMonth() &&
                    this.currentMonth.getFullYear() === this.selectedDate.getFullYear()) {
                    dayEl.classList.add('active');
                }
                dayEl.addEventListener('click', () => this.selectDate(day));
                this.calendarGrid.appendChild(dayEl);
            }
        },

        selectDate(day) {
            this.selectedDate = new Date(this.currentMonth.getFullYear(), this.currentMonth.getMonth(), day);
            this.selectedDateEl.textContent = this.selectedDate.toDateString();
            this.updateCalendar();
        }
    };

    app.init();
});
