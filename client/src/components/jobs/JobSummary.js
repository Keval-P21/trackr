import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ApiClientService from '../../services/ApiClientService';
import { useAuth } from '../context/AuthContext';

function JobSummary({ data, getUserJobs }) {
  const { currentUser } = useAuth();
  const [del, setDel] = useState(false);
  function toggleDelete() {
    setDel((current) => !current);
  }

  async function confirmDelete(id) {
    await ApiClientService.deleteJob(id);
    getUserJobs(currentUser.uid);
  }

  return data ? (
    <div className={`card card-panel ${data.color}`}>
      {del ? (
        <>
          <h4>Are you sure?</h4>
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
          <h4>{data.title}</h4>
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
