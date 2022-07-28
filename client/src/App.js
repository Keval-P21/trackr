import React from 'react';
import { Routes, Route } from 'react-router-dom';
import SignIn from './components/auth/SignIn';
import Dashboard from './components/dashboard/Dashboard';
import Error from './components/dashboard/Error';
import JobDetails from './components/jobs/JobDetails';
import Navbar from './components/layout/Navbar';

function App() {
  return (
    <div className='App'>
      <Navbar />
      <Routes>
        <Route path='/' element={<Dashboard />} />
        <Route path='/job/:id' element={<JobDetails />} />
        <Route path='/signin' element={<SignIn />} />
        <Route path='*' element={<Error />} />
      </Routes>
    </div>
  );
}

export default App;
