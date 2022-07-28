import React from 'react';
import { Link } from 'react-router-dom';

function SignedOutLinks() {
  return (
    <div>
      <ul className='right'>
        <li>
          <Link to='/Signin'>Signup</Link>
        </li>
        <li>
          <Link to='/'>Log In</Link>
        </li>
      </ul>
    </div>
  );
}

export default SignedOutLinks;
