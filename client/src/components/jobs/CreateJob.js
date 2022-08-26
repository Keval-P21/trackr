import React from 'react';
import { useNavigate } from 'react-router-dom';
import ApiClientService from '../../services/ApiClientService';
import { useAuth } from '../context/AuthContext';

function CreateJob({ setJobs }) {
  const navigate = useNavigate();
  const { currentUser } = useAuth();

  const sections = {
    pending: 'lime',
    applied: 'yellow',
    phone: 'blue',
    onsite: 'orange',
    offer: 'purple',
    rejected: 'red',
  };

  async function handleSubmit(event) {
    event.preventDefault();
    const data = {
      company: event.target.company.value,
      title: event.target.title.value,
      status: event.target.status.value,
      userId: currentUser.uid,
      location: event.target.location.value,
      salary: event.target.salary.value,
      post_url: event.target.post_url.value,
      description: event.target.description.value,
      notes: '',
      color: sections[event.target.status.value],
      date_added: new Date().toDateString(),
    };

    try {
      await ApiClientService.addJob(data, currentUser);
    } catch (error) {
      console.log(error);
    }
    setJobs((prev) => [...prev, data]);
    event.target.reset();
    navigate('/');
  }

  return (
    <div className='create-cont purple pad-around'>
      <form onSubmit={handleSubmit}>
        <h2 className='white-text slim'>Add New Job</h2>

        <fieldset>
          <label htmlFor='title' className='form-label'>
            Job Title *
          </label>
          <input
            type='text'
            id='title'
            className='form-input'
            placeholder='Job Title *'
            required
          />
        </fieldset>

        <fieldset>
          <label htmlFor='company' className='form-label'>
            Company *
          </label>
          <input
            type='text'
            id='company'
            className='form-input'
            placeholder='Company *'
            required
          />
        </fieldset>

        <fieldset>
          <label htmlFor='salary' className='form-label'>
            Salary
          </label>
          <input
            type='text'
            id='salary'
            className='form-input'
            placeholder='Salary'
          />
        </fieldset>

        <fieldset>
          <label htmlFor='location' className='form-label'>
            Location
          </label>
          <input
            type='text'
            id='location'
            className='form-input'
            placeholder='Location'
          />
        </fieldset>

        <fieldset>
          <label htmlFor='post_url' className='form-label'>
            URL (Link)
          </label>
          <input
            type='url'
            id='post_url'
            className='form-input'
            placeholder='https://example.com'
          />
        </fieldset>

        <fieldset>
          <label htmlFor='description' className='form-label'>
            Description
          </label>
          <textarea
            type='text'
            id='description'
            className='form-input'
            placeholder='Description'
          />
        </fieldset>

        <fieldset>
          <label htmlFor='status' className='form-label'>
            Application Status
          </label>
          <select id='status' className='form-input' defaultValue={''} required>
            <option value='' disabled>
              Application Status *
            </option>
            <option value='pending'>Pending</option>
            <option value='applied'>Applied</option>
            <option value='phone'>Phone</option>
            <option value='onsite'>Onsite</option>
            <option value='offer'>Offer</option>
            <option value='rejected'>Rejected</option>
          </select>
        </fieldset>

        <div className='input-field'>
          <button className='btn btn-save' type='submit'>
            Add Job
          </button>
        </div>
      </form>
    </div>
  );
}

export default CreateJob;
