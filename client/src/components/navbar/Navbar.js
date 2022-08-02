import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Navbar() {
  const { currentUser, logout } = useAuth();
  const [error, setError] = useState();
  const navigate = useNavigate();

  async function handleLogOut() {
    setError('');
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      setError('Failed to Logout');
    }
  }
  return currentUser ? (
    <nav>
      <div className='nav-list'>
        <Link to='/' className='nav-item'>
          Trackr
        </Link>

        <Link to='/' className='nav-item'>
          Dashboard
        </Link>
        <Link to='/tasks' className='nav-item'>
          Events & Tasks
        </Link>
        <Link to='/createJob' className='nav-item'>
          Add Job
        </Link>
        <button className='btn btn-logout' onClick={handleLogOut}>
          Logout
        </button>
      </div>
    </nav>
  ) : (
    <nav>
      <div className='nav-list'>
        <Link to='/' className='nav-item'>
          Trackr
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
