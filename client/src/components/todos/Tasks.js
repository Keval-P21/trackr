import React from 'react';
import JobTasks from './JobTasks';

function Tasks({ jobs }) {
  return jobs ? (
    <div className=''>
      <h4>Tasks</h4>
      <div>
        {jobs
          .filter((data) => data.todos.length > 0)
          .map((data) => (
            <JobTasks data={data} key={data._id} />
          ))}
      </div>
    </div>
  ) : (
    <div>Loading...</div>
  );
}

export default Tasks;
