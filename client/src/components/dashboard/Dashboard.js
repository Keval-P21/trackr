import React from 'react';
import JobList from '../jobs/JobList';

function Dashboard({ jobs, getUserJobs }) {
  const sections = [
    'Pending',
    'Applied',
    'Phone',
    'Onsite',
    'Offer',
    'Rejected',
  ];

  return (
    <div className='row'>
      <h3>Dashboard</h3>
      {sections.map((el, i) => (
        <JobList jobs={jobs} key={el} section={el} getUserJobs={getUserJobs} />
      ))}
    </div>
  );
}

export default Dashboard;
