import React from 'react';
import { Link } from 'react-router-dom';

function JobSummary({ data }) {
  return data ? (
    // <div className='row'>
    <div className='col s12 m5'>
      <div className={`card-panel ${data.color}`}>
        <div className='white-text'>
          <h6>{data.title}</h6>
          <p>{data.company}</p>
          <Link to={`/job/${data._id}`} className='btn'>
            Details
          </Link>
        </div>
      </div>
    </div>
  ) : (
    // </div>
    <div>Loading</div>
  );
}

export default JobSummary;
