import React, { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Dashboard from './components/dashboard/Dashboard';
import Error from './components/dashboard/Error';
import CreateJob from './components/jobs/CreateJob';
import JobDetails from './components/jobs/JobDetails';
import Navbar from './components/navbar/Navbar';
import Tasks from './components/todos/Tasks';
import Calendar from './components/calendar/Calendar';
import ApiClientService from './services/ApiClientService';

function App() {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    getUserJobs();
  }, []);

  async function getUserJobs(userId = 2) {
    let userJobs = await ApiClientService.getJobs(userId);
    setJobs(userJobs);
  }

  return (
    <div className='App'>
      <Navbar />
      <div className='container'>
        <Routes>
          <Route path='/' element={<Dashboard jobs={jobs} />} />
          <Route
            path='/job/:id'
            element={
              <JobDetails
                jobs={jobs}
                setJobs={setJobs}
                getUserJobs={getUserJobs}
              />
            }
          />
          <Route path='/createJob' element={<CreateJob setJobs={setJobs} />} />
          <Route path='/tasks' element={<Tasks jobs={jobs} />} />
          <Route path='/calendar' element={<Calendar />} />
          <Route path='*' element={<Error />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
