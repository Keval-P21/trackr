import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import './Navbar.css';

const SignedInLinks = () => {
  return (
    <div className='right navlink'>
      <div>
        <NavLink to='/'>Add Job</NavLink>
      </div>
      <div>
        <NavLink to='/'>Log Out</NavLink>
      </div>
      <div>
        <NavLink to='/'>KK</NavLink>
      </div>
    </div>
  );
};

export default SignedInLinks;
