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
        <SignedInLinks />
        <SignedOutLinks />
      </div>
    </nav>
  );
}

export default Navbar;
