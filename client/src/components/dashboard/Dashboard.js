import React from 'react';
import JobList from '../jobs/JobList';

function Dashboard({ jobs }) {
  return (
    <div className='dashboard container'>
      <div className='row'>
        <div className='col s12 m12'>
          <h1>Dashboard</h1>
          {/* Map for all Job Lists */}
          <JobList jobs={jobs} />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
