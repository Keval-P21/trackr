import React from 'react';
import { atcb_action } from 'add-to-calendar-button';
import 'add-to-calendar-button/assets/css/atcb.css';

function EventsItem({ event }) {
  function submitEvent(e) {
    e.preventDefault();
    atcb_action({
      name: event.name,
      description: event.description,
      startDate: event.startDate,
      endDate: event.endDate,
      startTime: event.startTime,
      endTime: event.endTime,
      location: event.location,
      options: [
        'Apple',
        'Google',
        'iCal',
        'Microsoft365',
        'Outlook.com',
        'Yahoo',
      ],
      iCalFileName: 'Reminder-Event',
    });
  }
  return event ? (
    <div>
      <p>{event.name}</p>
      <button onClick={submitEvent}>Add to calendar</button>
    </div>
  ) : (
    <div>Loading...</div>
  );
}

export default EventsItem;
