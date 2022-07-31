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
          {/* <div className='nav-icon'>
            <span class='material-icons md-18'>format_list_bulleted</span> */}
          Tasks
          {/* </div> */}
        </Link>
        <Link to='/createJob' className='nav-item'>
          Add Job
        </Link>
        {/* <Link to='/calendar' className='nav-item'>
          Calendar
        </Link> */}
      </div>
    </nav>
  );
}

export default Navbar;
