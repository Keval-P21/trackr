import React from 'react';
import EventsItem from '../events/EventsItem';
import JobEvents from '../events/JobEvents';
import JobTasks from '../todos/JobTasks';

function EventsTasks({ jobs, events }) {
  // console.log(events);
  return jobs && events ? (
    <section>
      <div className=''>
        <h4>Tasks</h4>
        <div>
          {jobs
            .filter((data) => data.todos.length > 0)
            .map((data) => (
              <JobTasks data={data} key={data._id} />
            ))}
        </div>
      </div>
      <div className=''>
        <h4>Events</h4>
        <div>
          {events.map((data) => (
            <>
              {/* <EventsItem singleEvent={data} /> */}
              <JobEvents key={data._id} singleEvent={data} jobs={jobs} />
            </>
          ))}
        </div>
      </div>
    </section>
  ) : (
    <div>Loading...</div>
  );
}

export default EventsTasks;
