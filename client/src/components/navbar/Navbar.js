import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav>
      <div className='nav-list'>
        <Link to='/' className='nav-item'>
          Trackr
        </Link>
        <Link to='/' className='nav-item'>
          Dashboard
        </Link>
        <Link to='/tasks' className='nav-item'>
          Tasks
        </Link>
        <Link to='/createJob' className='nav-item'>
          Add Job
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
