import React, { useState } from 'react';

function SignIn() {
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
  });

  function handleChange(event) {
    setCredentials({
      [event.target.id]: event.target.value,
    });
  }

  function handleSubmit(event) {
    event.preventDefalts();
    const signInData = {
      email: event.target.email.value,
      password: event.target.password.value,
    };
    console.log(signInData);
    console.log(credentials);
  }

  return (
    <div className='container'>
      <form className='white' onSubmit={handleSubmit}>
        <h5 className='grey-text text-darken-4'>Sign In</h5>
        <div className='input-field'>
          <label htmlFor='email'> Email</label>
          <input type='email' id='email' onChange={handleChange} required />
        </div>
        <div className='input-field'>
          <label htmlFor='password'> Password</label>
          <input
            type='password'
            id='password'
            onChange={handleChange}
            required
          />
        </div>
        <div className='input-field'>
          <button className='btn' type='submit'>
            Login
          </button>
        </div>
      </form>
    </div>
  );
}

export default SignIn;
