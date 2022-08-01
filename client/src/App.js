import React, { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Dashboard from './components/dashboard/Dashboard';
import Error from './components/dashboard/Error';
import CreateJob from './components/jobs/CreateJob';
import JobDetails from './components/jobs/JobDetails';
import Navbar from './components/navbar/Navbar';
import Tasks from './components/todos/Tasks';
import ApiClientService from './services/ApiClientService';

function App() {
  const [jobs, setJobs] = useState([]);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    getUserJobs();
    getUserEvents();
  }, []);

  async function getUserJobs(userId = 2) {
    let userJobs = await ApiClientService.getJobs(userId);
    setJobs(userJobs);
  }

  async function getUserEvents() {
    let userEvents = await ApiClientService.getEvents();
    setEvents(userEvents);
  }
  return (
    <div className='App'>
      <Navbar />
      <div className='container'>
        <Routes>
          <Route
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
          <Route path='/createJob' element={<CreateJob setJobs={setJobs} />} />
          <Route path='/tasks' element={<Tasks jobs={jobs} />} />
          <Route path='*' element={<Error />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
