import React from 'react';

function SignIn() {
  function handleSubmit(event) {
    event.preventDefalts();
    const signInData = {
      email: event.target.email.value,
      password: event.target.password.value,
    };
    console.log(signInData);
  }

  return (
    <div className='container'>
      <form className='white' onSubmit={handleSubmit}>
        <h5 className='grey-text text-darken-4'>Sign In</h5>
        <div className='input-field'>
          <label htmlFor='email'> Email</label>
          <input type='email' id='email' />
        </div>
        <div className='input-field'>
          <label htmlFor='password'> Password</label>
          <input type='password' id='password' />
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
