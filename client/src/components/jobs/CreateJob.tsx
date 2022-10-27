import { FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { Job } from '../../interfaces/job';
import { Sections } from '../../interfaces/sections';
import { Task } from '../../interfaces/task';
import ApiClientService from '../../services/ApiClientService';
import { useAuth } from '../context/AuthContext';

function CreateJob({setJobs}:{ setJobs: Function } ) {
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

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = {
      company: event.currentTarget.company.value as string,
      title: event.currentTarget.jobTitle.value as string,
      status: event.currentTarget.status.value as string,
      userId: currentUser.uid as string,
      location: event.currentTarget.location.value as string,
      salary: event.currentTarget.salary.value as string,
      post_url: event.currentTarget.post_url.value as string,
      description: event.currentTarget.description.value as string,
      notes: '',
      color: sections[event.currentTarget.status.value as keyof Sections ] ,
      todos: [] as Task[],
      date_added: new Date().toDateString(),
    };

    const newJob = await ApiClientService.addJob(data, currentUser);
    console.log("response is : ",newJob)
    setJobs((prev : Job[] ) => [...prev, newJob]);
    (document.getElementById("createJobForm") as HTMLFormElement).reset();
    navigate('/');
  }

  return (
    <div className='create-cont purple pad-around'>
      {/* <div className='form-cont'> */}
      <form id = "createJobForm" onSubmit={handleSubmit}>
        <h2 className='white-text slim'>Add New Job</h2>

        <fieldset>
          <label htmlFor='jobTitle' className='form-label'>
            Job Title *
          </label>
          <input
            type='text'
            id='jobTitle'
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
      {/* </div> */}
    </div>
  );
}

export default CreateJob;
