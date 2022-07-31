import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ApiClientService from '../../services/ApiClientService';

function JobSummary({ data, color, getUserJobs }) {
  const [del, setDel] = useState(false);
  function toggleDelete() {
    setDel((current) => !current);
  }

  async function confirmDelete(id) {
    await ApiClientService.deleteJob(id);
    getUserJobs(2);
  }

  return data ? (
    <div className={`card card-panel ${color}`}>
      {del ? (
        <>
          <h5>Are you sure?</h5>
          <p>This action cannot be undone!</p>
          <div>
            <button
              className='btn btn-confirm'
              onClick={() => confirmDelete(data._id)}
            >
              Confirm
            </button>
            <button className='btn btn-cancel' onClick={toggleDelete}>
              Cancel
            </button>
          </div>
        </>
      ) : (
        <>
          <button className='btn-close' onClick={toggleDelete}>
            <span className='material-icons md-18'>close</span>
          </button>
          <h5>{data.title}</h5>
          <p>{data.company}</p>
          <div className='pad-top'>
            <Link to={`/job/${data._id}`} className='btn btn-detail'>
              Details
            </Link>
          </div>
        </>
      )}
    </div>
  ) : (
    <div>Loading</div>
  );
}

export default JobSummary;
