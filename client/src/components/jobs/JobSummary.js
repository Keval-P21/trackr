import React from 'react';
import { Link } from 'react-router-dom';

function JobSummary({ data, color }) {
  return data ? (
    <div className={`card card-panel ${color}`}>
      <h5>{data.title}</h5>
      <p>{data.company}</p>
      <div className='pad-top'>
        <Link to={`/job/${data._id}`} className='btn-detail'>
          Details
        </Link>
      </div>
    </div>
  ) : (
    <div>Loading</div>
  );
}

export default JobSummary;
