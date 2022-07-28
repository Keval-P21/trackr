import React from 'react';
import JobSummary from './JobSummary';

function JobList({ jobs }) {
  return (
    <div>
      <h1>JobList</h1>
      {jobs.map((job) => {
        return <JobSummary job={job} key={job._id} />;
      })}
      <JobSummary />
    </div>
  );
}

export default JobList;
