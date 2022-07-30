import React from 'react';
import JobList from '../jobs/JobList';

function Dashboard({ jobs }) {
  const sections = [
    { title: 'Pending', color: 'card-lime' },
    { title: 'Applied', color: 'card-yellow' },
    { title: 'Phone', color: 'card-blue' },
    { title: 'Onsite', color: 'card-orange' },
    { title: 'Offer', color: 'card-purple' },
    { title: 'Rejected', color: 'card-red' },
  ];

  return (
    <div className='row'>
      {/* <div className='col s12 m12'> */}
      <h3>Dashboard</h3>
      {sections.map((el, i) => (
        <JobList jobs={jobs} key={i} section={el.title} color={el.color} />
      ))}
      {/* </div> */}
    </div>
  );
}

export default Dashboard;
