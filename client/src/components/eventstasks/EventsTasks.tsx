import React from 'react';
import { Event } from '../../interfaces/event';
import { Job } from '../../interfaces/job';
import JobEvents from '../events/JobEvents';
import JobTasks from '../todos/JobTasks.';

function EventsTasks({ jobs, events }: { jobs: Job[], events: Event[]}) {
  return jobs && events ? (
    <section className='task-event-cont'>
      <div className='form-box blue white-text'>
        <h2 className='white-text slim margin-bottom'>Tasks</h2>
        <div>
          {jobs ? (
            jobs
              .filter((data) => data.todos.length > 0)
              .map((data) => <JobTasks data={data} key={data._id} />)
          ) : (
            <p>No Tasks</p>
          )}
        </div>
      </div>
      <div className='form-box purple white-text '>
        <h2 className='white-text slim margin-bottom'>Events</h2>
        <div>
          {events ? (
            events.map((data) => (
              <JobEvents key={data._id} singleEvent={data} jobs={jobs} />
            ))
          ) : (
            <p>No Tasks</p>
          )}
        </div>
      </div>
    </section>
  ) : (
    <div>Loading...</div>
  );
}

export default EventsTasks;
