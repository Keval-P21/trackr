import React from 'react';
import JobSummary from './JobSummary';

function JobList({ jobs }) {
  return jobs && jobs.length ? (
    <div className='col s12'>
      <h4>JobList</h4>
      {jobs.map((data) => {
        return <JobSummary data={data} key={data._id} />;
      })}
    </div>
  ) : (
    <div>Loading</div>
  );
}

export default JobList;
