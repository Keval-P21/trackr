import React from 'react';
import { Link } from 'react-router-dom';

function JobEvents({ singleEvent, jobs }) {
  const job = jobs.filter((el) => el._id === singleEvent.jobId)[0];
  // console.log({ job, singleEvent });
  return (
    <>
      <div>
        {job.title} - {job.company}
        <Link to={`/job/${job._id}`} className='btn'>
          Edit Events
        </Link>
      </div>
    </>
  );
}
/* .filter(
              (data) =>
                Math.floor(
                  new Date(`${data.endDate}T${data.endTime}`).getTime()
                ) > Date.now()
            ) */

export default JobEvents;
