import React, { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import LogIn from './components/auth/LogIn';
import SignUp from './components/auth/SignUp';
import Dashboard from './components/dashboard/Dashboard';
import Error from './components/dashboard/Error';
import CreateJob from './components/jobs/CreateJob';
import JobDetails from './components/jobs/JobDetails';
import Navbar from './components/navbar/Navbar';
import PrivateRoute from './components/privateroutes/PrivateRoute';
import EventsTasks from './components/eventstasks/EventsTasks';
import ApiClientService from './services/ApiClientService';
import { useAuth } from './components/context/AuthContext';

function App() {
  const [jobs, setJobs] = useState([]);
  const [events, setEvents] = useState([]);
  const { currentUser } = useAuth();

  async function getUserJobs(userId) {
    const userJobs = await ApiClientService.getJobs(userId);
    setJobs(userJobs);
  }

  async function getUserEvents(userId) {
    const userEvents = await ApiClientService.getEvents(userId);
    setEvents(userEvents);
  }

  useEffect(() => {
    try {
      if (currentUser) {
        getUserJobs(currentUser.uid);
        getUserEvents(currentUser.uid);
      } else {
        console.log('Test Case');
      }
    } catch (error) {
      console.log(error);
    }
  }, [currentUser]);

  return (
    <div className='App'>
      <Navbar />
      <div className='container'>
        <Routes>
          <Route element={<PrivateRoute />}>
            <Route
              exact
              path='/'
              element={<Dashboard jobs={jobs} getUserJobs={getUserJobs} />}
            />
            <Route
              path='/job/:id'
              element={
                <JobDetails
                  jobs={jobs}
                  setJobs={setJobs}
                  getUserJobs={getUserJobs}
                  events={events}
                  setEvents={setEvents}
                  getUserEvents={getUserEvents}
                />
              }
            />
            <Route
              path='/createJob'
              element={<CreateJob setJobs={setJobs} />}
            />
            <Route
              path='/tasks'
              element={<EventsTasks jobs={jobs} events={events} />}
            />
          </Route>
          <Route path='/signup' element={<SignUp />} />
          <Route path='/login' element={<LogIn />} />
          <Route path='*' element={<Error />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
