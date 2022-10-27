import React, { ChangeEvent, ChangeEventHandler, FormEvent, useState } from 'react';
import { useParams } from 'react-router-dom';
import ApiClientService from '../../services/ApiClientService';
import {Event} from '../../interfaces/event'

// types for props

function AddEventForm(
  { setEvents, 
    events, 
    getUserEvents, 
    currentUser } : 
    { setEvents : Function, 
      events : Event[], 
      getUserEvents : Function, 
      currentUser : any

    }) {

  //const { currentUser } = useAuth();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [loading, setLoading] = useState(false);

  const jobId = useParams();

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    setLoading(true);
    event.preventDefault();
    const data = {
      jobId: jobId.id as string,
      userId: currentUser.uid as string,
      name,
      description,
      startDate,
      endDate,
      startTime,
      endTime,
      location,
    };
    try {
      await ApiClientService.addEvent(data, currentUser);
    } catch (error) {
      console.log(error);
    }
    setEvents((prev : Event[]) => [...prev, data]);

    //event.target.reset();
    (document.getElementById("add-event") as HTMLFormElement).reset();
    getUserEvents(currentUser);
  }

  function handleStartDateChange(e : ChangeEvent<HTMLInputElement>) {
    setStartDate(new Date(e.target.value).toISOString().slice(0, 10));
    setStartTime(new Date(e.currentTarget.value).toISOString().slice(11, 16));
  }

  function handleEndDateChange(e : ChangeEvent<HTMLInputElement>) {
    setEndDate(new Date(e.currentTarget.value).toISOString().slice(0, 10));
    setEndTime(new Date(e.currentTarget.value).toISOString().slice(11, 16));
  }

  function handleNameChange(e  : ChangeEvent<HTMLInputElement>) {
    setName(e.currentTarget.value);
  }

  function handleLocationChange(e  : ChangeEvent<HTMLInputElement>) {
    setLocation(e.currentTarget.value);
  }

  function handleDescriptionChange(e  : ChangeEvent<HTMLInputElement>) {
    setDescription(e.currentTarget.value);
  }

  const minStartDate = new Date().toISOString().slice(0, 16);

  return (
    <div className="">
      <h2 className='white-text slim'>Add Event</h2>
      <form id="add-event" onSubmit={handleSubmit}>
        <fieldset>
          <label className='form-label' htmlFor='name'>
            Event Title
          </label>
          <input
            id='name'
            placeholder='Event title'
          
            onChange={handleNameChange}
            className='form-input'
            required
          />
        </fieldset>
        <fieldset>
          <label className='form-label' htmlFor='description'>
            Description
          </label>
          <input
            id='description'
            placeholder='Decription'
            className='form-input'
            onChange={handleDescriptionChange}
          />
        </fieldset>
        <fieldset>
          <label className='form-label' htmlFor='location'>
            Location
          </label>

          <input
            id='location'
            placeholder='Location'
            className='form-input'
            onChange={handleLocationChange}
          />
        </fieldset>
        <fieldset>
          <label className='form-label' htmlFor='startDateTime'>
            Start Date & Time
          </label>
          <input
            id='startDateTime'
            type='datetime-local'
            className='form-input'
            min={minStartDate}
            onChange={handleStartDateChange}
            required
          />
        </fieldset>
        <fieldset>
          <label className='form-label' htmlFor='endDateTime'>
            End Date & Time
          </label>
          <input
            id='endDateTime'
            type='datetime-local'
            className='form-input'
            onChange={handleEndDateChange}
            min={startDate ? `${startDate}T${startTime}` : minStartDate}
            required
          />
        </fieldset>
        <input disabled={loading} type='submit' value='Save' className='btn btn-save' />
      </form>
    </div>
  );
}

export default AddEventForm;
