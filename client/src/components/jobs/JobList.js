import React from 'react';
import JobSummary from './JobSummary';

function JobList({ jobs, section, color, getUserJobs }) {
  return jobs && jobs.length && section ? (
    <>
      <h4>{section}</h4>
      <div className='card-container'>
        {jobs
          .filter((job) => job.status === section.toLowerCase())
          .map((data) => {
            return (
              <JobSummary
                data={data}
                key={data._id}
                color={color}
                getUserJobs={getUserJobs}
              />
            );
          })}
      </div>
      <br></br>
    </>
  ) : (
    <div>Loading</div>
  );
}

export default JobList;
