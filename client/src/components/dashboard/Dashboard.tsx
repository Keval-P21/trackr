import React from 'react';
import { Job } from '../../interfaces/job';
import JobList from '../jobs/JobList';

function Dashboard({ jobs, getUserJobs }: {jobs: Job[], getUserJobs: Function}) {
  const sections = [
    'Pending',
    'Applied',
    'Phone',
    'Onsite',
    'Offer',
    'Rejected',
  ];

  return jobs ? (
    <div>
      <h2>Dashboard</h2>
      <div className='container-dash'>
        {sections.map((el, i) => (
          <JobList
            jobs={jobs}
            key={el}
            section={el}
            getUserJobs={getUserJobs}
          />
        ))}
      </div>
    </div>
  ) : (
    <div>You have no applications tracked yet!</div>
  );
}

export default Dashboard;
