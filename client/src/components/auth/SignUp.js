import React, { useRef, useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function SignUp() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const { signup, currentUser } = useAuth();
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

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError('Passwords do not match');
    }

    try {
      setError('');
      setLoading(true);
      await signup(emailRef.current.value, passwordRef.current.value);
      navigate('/');
    } catch (e) {
      console.log(e);
      setError('Failed to create an account');
    }

    setLoading(false);
  }
  return (
    <>
      <div className='logo-text'> Trackr</div>
      <section className='login-container purple'>
        <p>{error}</p>
        <h2 className='white-text slim'>Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <fieldset>
            <label htmlFor='email' className='form-label'>
              Email
            </label>
            <input
              type='text'
              id='email'
              ref={emailRef}
              autoComplete='off'
              className='form-input'
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
          <fieldset>
            <label htmlFor='confirm-password' className='form-label'>
              Confirm Password
            </label>
            <input
              type='password'
              id='confirm-password'
              className='form-input'
              required
              ref={passwordConfirmRef}
            />
          </fieldset>

          <button className='btn btn-login' disabled={loading}>
            Sign Up
          </button>
        </form>
        <p className='login-option'>
          Already registered?
          <span>
            <Link className='login-link' to='/login'>
              Login
            </Link>
          </span>
        </p>
      </section>
    </>
  );
}

export default SignUp;
