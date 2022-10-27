import React, { FormEvent, useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function LogIn() {
  const emailRef = useRef() as React.MutableRefObject<HTMLInputElement>;
  const passwordRef = useRef() as React.MutableRefObject<HTMLInputElement>;
  const { login, currentUser } = useAuth();
  const navigate = useNavigate();

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (currentUser) {
      navigate('/');
    }
  }, []);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
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
      <div className='logo-text'> Trackr</div>
      <section className='login-container purple'>
        <p>{error}</p>
        <h2 className='white-text slim'>Login</h2>
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
          </fieldset>

          <button className='btn btn-login' disabled={loading}>
            Log In
          </button>
        </form>
        <p className='login-option'>
          Not registered?
          <span>
            <Link className='login-link' to='/signup'>
              Sign Up
            </Link>
          </span>
        </p>
      </section>
    </>
  );
}

export default LogIn;
