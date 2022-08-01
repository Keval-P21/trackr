import React from 'react';
import { useNavigate } from 'react-router-dom';
import ApiClientService from '../../services/ApiClientService';

function CreateJob({ setJobs }) {
  let navigate = useNavigate();

  async function handleSubmit(event) {
    event.preventDefault();
    const data = {
      company: event.target.company.value,
      title: event.target.title.value,
      status: event.target.status.value,
      userId: '2',
      location: event.target.location.value,
      salary: event.target.salary.value,
      post_url: event.target.post_url.value,
      interview: '',
      description: event.target.description.value,
      notes: '',
      color: 'red',
      date_added: new Date().toDateString(),
    };

    await ApiClientService.addJob(data);
    setJobs((prev) => [...prev, data]);
    event.target.reset();
    navigate('/');
  }

  return (
    <div className='container'>
      <form className='white' onSubmit={handleSubmit}>
        <h5 className='grey-text text-darken-4'>Add New Job</h5>
        <div className='row'>
          <div className='input-field col s12 m6'>
            <label htmlFor='title'>Job Title *</label>
            <input type='text' id='title' required />
          </div>
          <div className='input-field col s12 m6'>
            <label htmlFor='company'>Company *</label>
            <input type='text' id='company' required />
          </div>
          <div className='input-field col s12 m6'>
            <label htmlFor='salary'>Salary</label>
            <input type='text' id='salary' />
          </div>
          <div className='input-field col s12 m6'>
            <label htmlFor='location'>Location</label>
            <input type='text' id='location' />
          </div>
          <div className='input-field col s12 m6'>
            <label htmlFor='post_url'>URL (Link)</label>
            <input type='text' id='post_url' />
          </div>
          <div className='input-field col s12 '>
            <label htmlFor='description'>Description</label>
            <input type='text' id='description' />
          </div>
          <div className='input-field col s12 m6'>
            <select
              className='browser-default'
              id='status'
              defaultValue={''}
              required
            >
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
          </div>
        </div>
        <div className='row'></div>
        <div className='input-field'>
          <button className='btn' type='submit'>
            Add Job
          </button>
        </div>
      </form>
    </div>
  );
}

export default CreateJob;
