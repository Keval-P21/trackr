import React from 'react';
import TodoSingle from './TodoSingle';
import { Link } from 'react-router-dom';

function JobTasks({ data }) {
  // console.log(data);
  return (
    <div>
      <div>
        {data.title} - {data.company}
        <Link to={`/job/${data._id}`} className='btn'>
          Edit Tasks
        </Link>
      </div>
      <div>
        {data.todos
          .filter((task) => task.active)
          .map((task) => {
            return <TodoSingle task={task} key={task._id} />;
          })}
      </div>
    </div>
  );
}

export default JobTasks;
