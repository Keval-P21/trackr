import React from 'react';
import { Link } from 'react-router-dom';
import SignedInLinks from './SignedInLinks';
import SignedOutLinks from './SignedOutLinks';

function Navbar() {
  return (
    <nav className='nav-wrapper blue-grey darken-3'>
      <div className='container'>
        <Link to='/' className='brand-logo'>
          Trackr
        </Link>
        <div className='menu right'>
          {/* <SignedInLinks />
          <SignedOutLinks /> */}
          <Link to='/'>Dashboard</Link>
          <Link to='/tasks'>Tasks</Link>
          <Link to='/createJob'>Add Job</Link>
        </div>
        {/* <button className='hamburger'>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </button> */}
      </div>
    </nav>
  );
}

export default Navbar;
