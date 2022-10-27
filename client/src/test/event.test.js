
import AddEventForm from "../components/events/AddEventForm";
import { render, screen } from '@testing-library/react';
import { toBeDisabled } from '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event'; 

jest.mock('uuid')

const setEvents = jest.fn();
const getUserEvents = jest.fn();
const currentUser = {uid:'123'};

const events = [{
  jobId: '123',
  userId: '123',
  name: '123',
  description : '123',
  startDate: '123',
  endDate: '123',
  startTime : '123',
  endTime : '123',
  location : '123',
},{
  jobId: '1234',
  userId: '1234',
  name: '1234',
  description : '1234',
  startDate: '1234',
  endDate: '1234',
  startTime : '1234',
  endTime : '1234',
  location : '1234',
}]

it('should set button to disabled after clicking', async () => {

  render(<AddEventForm events={events} setEvents={setEvents} getUserEvents={getUserEvents} currentUser={currentUser}/>); 

  const Event_Title = screen.getByLabelText(/Event Title/i)
  const Description = screen.getByLabelText(/Description/i);
  const Location = screen.getByLabelText(/Location/i);
  const StartDate = screen.getByLabelText(/Start Date & Time/i);
  const EndDate = screen.getByLabelText(/End Date & Time/i);

  const submit = screen.getByDisplayValue('Save');
  
  userEvent.type(Event_Title, 'Technical Interview');
  userEvent.type(Description, 'Coding session for 1hour online');
  userEvent.type(Location, 'online');
  userEvent.type(StartDate, '2022-08-02T23:32');
  userEvent.type(EndDate,  '2022-08-26T23:32');

   await userEvent.click(submit);
   expect(submit).toBeDisabled();
   
})