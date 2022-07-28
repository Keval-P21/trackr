import React from 'react';
import { Link } from 'react-router-dom';

function SignedInLinks() {
  return (
    <div>
      <ul className='right'>
        <li>
          <Link to='/'>Add Job</Link>
        </li>
        <li>
          <Link to='/'>Log Out</Link>
        </li>
        <li>
          <Link to='/' className='btn btn-floating purple darken-2'>
            KP
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default SignedInLinks;
