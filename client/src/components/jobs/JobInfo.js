import React, { useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import ApiClientService from '../../services/ApiClientService';
import { useAuth } from '../context/AuthContext';

function JobInfo({ jobs, setJobs, getUserJobs }) {
  const { currentUser } = useAuth();

  const [isDisabled, setIsDisabled] = useState(true);
  const jobId = useParams();
  const titleRef = useRef(null);
  const companyRef = useRef(null);
  const salaryRef = useRef(null);
  const locationRef = useRef(null);
  const post_urlRef = useRef(null);
  const descriptionRef = useRef(null);
  const statusRef = useRef(null);
  const notesRef = useRef(null);

  if (!jobs) return <div>Loading</div>;

  const sections = {
    pending: 'lime',
    applied: 'yellow',
    phone: 'blue',
    onsite: 'orange',
    offer: 'purple',
    rejected: 'red',
  };

  const data = jobs.filter((job) => job._id === jobId.id);

  function handleClick() {
    setIsDisabled((current) => !current);
  }

  function refresh() {
    window.location.reload();
  }

  async function handleSave() {
    const editedData = {
      ...data[0],
      company: companyRef.current.value,
      title: titleRef.current.value,
      status: statusRef.current.value,
      location: locationRef.current.value,
      salary: salaryRef.current.value,
      post_url: post_urlRef.current.value,
      description: descriptionRef.current.value,
      notes: notesRef.current.value,
      color: sections[statusRef.current.value],
    };

    const newJob = await ApiClientService.editJob(editedData);
    setJobs((prevState) => {
      const newJobId = newJob._id;
      return [...prevState.filter((el) => el._id !== newJobId), newJob];
    });
    getUserJobs(currentUser.uid);
    setIsDisabled((current) => !current);
  }
  return jobs && data.length ? (
    <>
      <div>
        <h2 className='white-text slim'>Job Details</h2>
        <fieldset>
          <label htmlFor='title' className='form-label'>
            Job Title *
          </label>
          <input
            type='text'
            id='title'
            className='form-input'
            defaultValue={data[0].title}
            disabled={isDisabled}
            ref={titleRef}
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
            defaultValue={data[0].company}
            disabled={isDisabled}
            ref={companyRef}
            required
          />
        </fieldset>
        <fieldset>
          <label htmlFor='status' className='form-label'>
            Application Status *
          </label>
          <select
            id='status'
            className='form-input'
            defaultValue={data[0].status}
            disabled={isDisabled}
            required
            ref={statusRef}
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
        </fieldset>
        <fieldset>
          <label htmlFor='salary' className='form-label'>
            Salary
          </label>
          <input
            type='text'
            id='salary'
            className='form-input'
            defaultValue={data[0].salary ?? ''}
            disabled={isDisabled}
            ref={salaryRef}
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
            defaultValue={data[0].location ?? ''}
            disabled={isDisabled}
            ref={locationRef}
          />
        </fieldset>
        <fieldset>
          <label htmlFor='post_url' className='form-label'>
            URL (Link)
          </label>
          <input
            type='text'
            id='post_url'
            className='form-input'
            defaultValue={data[0].post_url ?? ''}
            disabled={isDisabled}
            ref={post_urlRef}
          />
        </fieldset>
        <fieldset>
          <label htmlFor='description' className='form-label'>
            Description
          </label>
          <input
            type='text'
            id='description'
            className='form-input'
            defaultValue={data[0].description ?? ''}
            disabled={isDisabled}
            ref={descriptionRef}
          />
        </fieldset>
        <fieldset>
          <label htmlFor='notes' className='form-label'>
            Notes
          </label>
          <input
            type='text'
            id='notes'
            className='form-input'
            defaultValue={data[0].notes ?? ''}
            disabled={isDisabled}
            ref={notesRef}
          />
        </fieldset>

        {isDisabled ? (
          <>
            <button className='btn' onClick={handleClick}>
              Edit
            </button>
          </>
        ) : (
          <>
            <button className='btn' onClick={refresh}>
              Cancel
            </button>
            <button className='btn' onClick={handleSave}>
              Save
            </button>
          </>
        )}
      </div>
    </>
  ) : (
    <div>Loading</div>
  );
}

export default JobInfo;
