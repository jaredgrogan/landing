// components/Calendar.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Calendar = () => {
    const [events, setEvents] = useState([]);

    useEffect(() => {
        const fetchEvents = async () => {
            const response = await axios.get('https://www.googleapis.com/calendar/v3/calendars/primary/events', {
                headers: {
                    Authorization: `Bearer ${process.env.GOOGLE_CALENDAR_API_KEY}`
                }
            });
            setEvents(response.data.items);
        };

        fetchEvents();
    }, []);

    return (
        <div className="calendar">
            <h2>Upcoming Events</h2>
            <ul>
                {events.map(event => (
                    <li key={event.id}>{event.summary} - {event.start.dateTime}</li>
                ))}
            </ul>
        </div>
    );
};

export default Calendar;
