import React from 'react';
import { Link, NavLink } from 'react-router-dom';

const SignedOutLinks = () => {
  return (
    <div className='right navlink'>
      <div>
        <NavLink to='/'>Signup</NavLink>
      </div>
      <div>
        <NavLink to='/'>Log In</NavLink>
      </div>
    </div>
  );
};

export default SignedOutLinks;
