import React from 'react';
import { Link } from 'react-router-dom';
import { Event } from '../../interfaces/event';
import { Job } from '../../interfaces/job';

function JobEvents({ singleEvent, jobs } : {singleEvent:Event,jobs:Job[]}) {
  const job = jobs.filter((el) => el._id === singleEvent.jobId)[0];

  return job && singleEvent ? (
    <div>
      <h3 className='slim margin-bottom'>
        {job.title} - {job.company}
        <Link to={`/job/${job._id}`} className='btn margin-left'>
          Details
        </Link>
      </h3>
      <div className='task-cont'>
        <div className='todo-item'>
          <h3 className='slim'>
            <span>
              <label className='form-label'> Event :</label>
            </span>
            {singleEvent.name}
          </h3>
          <h3 className='slim'>
            <span>
              <label className='form-label'> Description :</label>
            </span>
            {singleEvent.description}
          </h3>
          <h3 className='slim'>
            <span>
              <label className='form-label'> Location :</label>
            </span>
            {singleEvent.location}
          </h3>
          <span>
            <h3 className='slim'>
              <span>
                <label className='form-label'> Date :</label>
              </span>
              {singleEvent.startDate}
            </h3>
          </span>
          <span>
            <h3 className='slim'>
              <span>
                <label className='form-label'> Time :</label>
              </span>
              {singleEvent.startTime}
            </h3>
          </span>
        </div>
      </div>
    </div>
  ) : (
    <div>Loading</div>
  );
}

export default JobEvents;
