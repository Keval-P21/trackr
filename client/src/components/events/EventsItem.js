import React from 'react';
import { atcb_action } from 'add-to-calendar-button';
import 'add-to-calendar-button/assets/css/atcb.css';
import ApiClientService from '../../services/ApiClientService';
import { useAuth } from '../context/AuthContext';

function EventsItem({ singleEvent, getUserEvents }) {
  const { currentUser } = useAuth();
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

  async function deleteEvent(id) {
    await ApiClientService.deleteEvent(id);
    getUserEvents(currentUser.uid);
  }

  return singleEvent ? (
    <div>
      <span>
        <label className='form-label'> Event: </label> <p>{singleEvent.name}</p>
      </span>
      <button onClick={submitEvent}>Add to calendar</button>
      <button onClick={() => deleteEvent(singleEvent._id)}>Delete</button>
      <p>{singleEvent.location}</p>
      <p>{singleEvent.description}</p>
    </div>
  ) : (
    <div>Loading...</div>
  );
}

export default EventsItem;
