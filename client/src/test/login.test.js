import LogIn from "../components/auth/LogIn";
import { render, screen } from '@testing-library/react';
import { toBeDisabled, toBeCalled } from '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event'; 
import { BrowserRouter as Router } from 'react-router-dom';



jest.mock('../components/context/AuthContext', () => ({
  useAuth: () => ({login: () => console.log('login'), currentUser:{uid:'123'}})
}))



it('should disable login button after login', async () => {
  render(
    <Router>
      <LogIn />
    </Router>
  ); 

  const emailInput = screen.getByLabelText(/Email/i);
  const passwordInput = screen.getByLabelText(/Password/i);
  const submit = screen.getByRole('button', {name: /Log in/i});

  expect(submit).not.toBeDisabled();
  
  userEvent.type(emailInput, 'test@gmail.com');
  userEvent.type(passwordInput, 'test123');

  await userEvent.click(submit);
  expect(submit).toBeDisabled();
})





it('form fields should all be required', async () => {

  render(<LogIn />); 
  
  const emailInput = screen.getByLabelText(/Email/i);
  const passwordInput = screen.getByLabelText(/Password/i);

  expect(emailInput).toHaveProperty('required');
  expect(passwordInput).toHaveProperty('required');
})




it('should submit form when all fields are filled ', async () => {

  render(<LogIn />); 
  
  const emailInput = screen.getByLabelText(/Email/i);
  const passwordInput = screen.getByLabelText(/Password/i);
  const submit = screen.getByRole('button', {name: /Log in/i});

  userEvent.type(emailInput, 'test@gmail.com');
  userEvent.type(passwordInput, 'test123');
  await userEvent.click(submit);
  expect(submit).toBeDisabled();
})