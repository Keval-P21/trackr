import React from 'react';

function JobSummary({ data }) {
  if (!data) {
    return <div>Loading</div>;
  }

  return (
    <div className='row'>
      <div className='col s12 m5'>
        <div className={`card-panel ${data.color}`}>
          <div className='white-text'>
            <h6>{data.title}</h6>
            <p>{data.company}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default JobSummary;
