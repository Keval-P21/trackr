import React from 'react';
import JobSummary from './JobSummary';

function JobList({ jobs }) {
  return (
    <div>
      <h3>JobList</h3>
      {jobs.map((data) => {
        return <JobSummary data={data} key={data._id} />;
      })}
    </div>
  );
}

export default JobList;
