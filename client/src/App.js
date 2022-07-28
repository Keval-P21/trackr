import React, { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import SignIn from './components/auth/SignIn';
import Dashboard from './components/dashboard/Dashboard';
import Error from './components/dashboard/Error';
import CreateJob from './components/jobs/CreateJob';
import JobDetails from './components/jobs/JobDetails';
import Navbar from './components/navbar/Navbar';
import ApiClientService from './services/ApiClientService';

function App() {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    getUserJobs();
  }, []);

  async function getUserJobs(userId = 2) {
    let userJobs = await ApiClientService.getJobs(userId);
    console.log(userJobs);
    setJobs(userJobs);
  }

  return (
    <div className='App'>
      <Navbar />
      <Routes>
        <Route path='/' element={<Dashboard jobs={jobs} />} />
        <Route path='/job/:id' element={<JobDetails />} />
        <Route
          path='/job/createJob'
          element={<CreateJob setJobs={setJobs} />}
        />
        <Route path='/signin' element={<SignIn />} />
        <Route path='*' element={<Error />} />
      </Routes>
    </div>
  );
}

export default App;
