import React from 'react';
import JobList from '../jobs/JobList';

function Dashboard({ jobs, getUserJobs }) {
  const sections = [
    { title: 'Pending', color: 'card-lime' },
    { title: 'Applied', color: 'card-yellow' },
    { title: 'Phone', color: 'card-blue' },
    { title: 'Onsite', color: 'card-orange' },
    { title: 'Offer', color: 'card-purple' },
    { title: 'Rejected', color: 'card-red' },
  ];
  const filteredJobs = jobs.filter(
    (job) => job.status === sections[0].title.toLowerCase()
  );
  return (
    <div className='row'>
      {/* <div className='col s12 m12'> */}
      <h3>Dashboard</h3>
      {sections.map((el, i) => (
        <JobList
          jobs={jobs}
          key={i}
          section={el.title}
          color={el.color}
          getUserJobs={getUserJobs}
        />
      ))}
      {/* </div> */}
    </div>
  );
}

export default Dashboard;
