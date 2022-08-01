import React, { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function LogIn() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { login, currentUser } = useAuth();
  const navigate = useNavigate();

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (currentUser) {
      navigate('/');
    }
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setError('');
      setLoading(true);
      await login(emailRef.current.value, passwordRef.current.value);
      navigate('/');
    } catch (e) {
      console.log(e);
      setError('Log in failed');
    }

    setLoading(false);
  }
  return (
    <>
      <section className='container purple'>
        <p>{error}</p>
        <h1>Log In</h1>
        <form onSubmit={handleSubmit}>
          <fieldset>
            <label htmlFor='email' className='form-label'>
              Email
            </label>
            <input
              type='text'
              id='email'
              ref={emailRef}
              className='form-input'
              autoComplete='off'
              required
            />
          </fieldset>
          <fieldset>
            <label htmlFor='password' className='form-label'>
              Password
            </label>
            <input
              type='password'
              id='password'
              className='form-input'
              required
              ref={passwordRef}
            />

            <button disabled={loading}>Log In</button>
          </fieldset>
        </form>
        <p>
          Not registered?
          <br />
          <span className='line'>
            <Link to='/sighup'>Sign Up</Link>
          </span>
        </p>
      </section>
    </>
  );
}

export default LogIn;
