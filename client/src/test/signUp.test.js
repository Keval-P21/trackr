import SignUp from "../components/auth/SignUp";
import { render, screen } from '@testing-library/react';
import { toBeDisabled, toBeCalled } from '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event'; 
import { BrowserRouter as Router } from 'react-router-dom';


jest.mock('../components/context/AuthContext', () => ({
  useAuth: () => ({signup: () => console.log('signup')})
}))



it('should show error message when passwords do not match', async () => {

  render(
    <Router>
      <SignUp />
    </Router>
  ); 
  
  const emailInput = screen.getByLabelText(/Email/i);
  const passwordInput = screen.getAllByLabelText(/Password/i)[0];
  const confirmPasswordInput = screen.getAllByLabelText(/Password/i)[1];
  const submit = screen.getByRole('button', {name: /Sign Up/i});

  const errorMessage = screen.getByRole('error');

  userEvent.type(emailInput, 'test@gmail.com');
  userEvent.type(passwordInput, 'test123');
  await userEvent.click(submit);
  expect(errorMessage).toContainHTML('Passwords do not match');


  userEvent.type(confirmPasswordInput, 'hello world');
  await userEvent.click(submit);


  expect(errorMessage).toContainHTML('Passwords do not match');
});





it('should disable sign up button after form submission', async () => {
  render(<SignUp />); 

  const emailInput = screen.getByLabelText(/Email/i);
  const passwordInput = screen.getAllByLabelText(/Password/i)[0];
  const confirmPasswordInput = screen.getAllByLabelText(/Password/i)[1];
  const submit = screen.getByRole('button', {name: /Sign Up/i});

  expect(submit).not.toBeDisabled();
  
  userEvent.type(emailInput, 'test@gmail.com');
  userEvent.type(passwordInput, 'test123');
  userEvent.type(confirmPasswordInput, 'test123');

  await userEvent.click(submit);
  expect(submit).toBeDisabled();
})



it('form fields should all be required', async () => {

  render(<SignUp />); 
  
  const emailInput = screen.getByLabelText(/Email/i);
  const passwordInput = screen.getAllByLabelText(/Password/i)[0];
  const confirmPasswordInput = screen.getAllByLabelText(/Password/i)[1];

  expect(emailInput).toHaveProperty('required');
  expect(passwordInput).toHaveProperty('required');
  expect(confirmPasswordInput).toHaveProperty('required');
})