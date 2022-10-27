import React from 'react';
import TodoSingle from './TodoSingle';
import { Link } from 'react-router-dom';
import { Job } from '../../interfaces/job';

function JobTasks({ data }: { data: Job}) {
  return data ? (
    <div>
      <h3 className='slim margin-bottom'>
        {data.title} - {data.company}
        <Link to={`/job/${data._id}`} className='btn margin-left'>
          Details
        </Link>
      </h3>
      <div>
        {data.todos
          .filter((task) => task.active)
          .map((task) => {
            return <TodoSingle task={task} key={task._id} deleteTodo={undefined}/>;
          })}
      </div>
    </div>
  ) : (
    <div>No Tasks Yet</div>
  );
}

export default JobTasks;
