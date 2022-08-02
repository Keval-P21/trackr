import React from 'react';
import { atcb_action } from 'add-to-calendar-button';
import 'add-to-calendar-button/assets/css/atcb.css';
import ApiClientService from '../../services/ApiClientService';

function EventsItem({ singleEvent, getUserEvents }) {
  function submitEvent(e) {
    e.preventDefault();
    atcb_action({
      name: singleEvent.name,
      description: singleEvent.description,
      startDate: singleEvent.startDate,
      endDate: singleEvent.endDate,
      startTime: singleEvent.startTime,
      endTime: singleEvent.endTime,
      location: singleEvent.location,
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

  // console.log(singleEvent);

  async function deleteEvent(id) {
    console.log(id);
    // await ApiClientService.deleteEvent(id);
    // getUserEvents();
  }

  return singleEvent ? (
    <div>
      <p>{singleEvent.name}</p>
      <button onClick={submitEvent}>Add to calendar</button>
      <button oncClick={() => deleteEvent(singleEvent._id)}>Delete</button>
    </div>
  ) : (
    <div>Loading...</div>
  );
}

export default EventsItem;
