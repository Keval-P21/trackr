import React, { FormEvent } from 'react';
import { atcb_action } from 'add-to-calendar-button';
import 'add-to-calendar-button/assets/css/atcb.css';
import ApiClientService from '../../services/ApiClientService';
import { useAuth } from '../context/AuthContext';
import { EventItemProps } from '../../interfaces/event';

function EventsItem({ singleEvent, getUserEvents, setEvents } : EventItemProps) {
  const { currentUser } = useAuth();
  function submitEvent(e: FormEvent<HTMLButtonElement>) {
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

  async function deleteEvent(id : string | undefined, user : any) {
    await ApiClientService.deleteEvent(id, user);
    getUserEvents(currentUser);
  }

  return singleEvent ? (
    <div className='task-cont'>
      <div className='todo-item'>
        <div className='slim'>
          <span>
            <label className='form-label'> Event :</label>
          </span>
          {singleEvent.name}
        </div>
        <div className='slim'>
          <span>
            <label className='form-label'> Description :</label>
          </span>
          {singleEvent.description}
        </div>
        <div className='slim'>
          <span>
            <label className='form-label'> Location :</label>
          </span>
          {singleEvent.location}
        </div>
        <span>
          <div className='slim'>
            <span>
              <label className='form-label'> Date :</label>
            </span>
            {singleEvent.startDate}
          </div>
        </span>
        <span>
          <div className='slim'>
            <span>
              <label className='form-label'> Time :</label>
            </span>
            {singleEvent.startTime}
          </div>
        </span>
      </div>
      <div className='btn-cont'>
        <button className='btn btn-bin' onClick={submitEvent}>
          <span className='material-icons'>event_available</span>
        </button>
        <button
          className='btn btn-bin'
          onClick={() => deleteEvent(singleEvent._id, currentUser)}
        >
          <span className='material-icons'>delete</span>
        </button>
      </div>
    </div>
  ) : (
    <div>Loading...</div>
  );
}

export default EventsItem;
