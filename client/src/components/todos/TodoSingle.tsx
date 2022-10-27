import React from 'react';
import { Task } from '../../interfaces/task';

function TodoSingle({ task, deleteTodo }: {task: Task, deleteTodo: Function | undefined}) {
  return (
    <div className='task-cont'>
      <div className='todo-item' role='task'>- {task.content}</div>
      {deleteTodo ? (
        <button className='btn btn-bin' onClick={() => deleteTodo(task._id)}>
          <span className='material-icons'>delete</span>
        </button>
      ) : (
        <></>
      )}
    </div>
  );
}

export default TodoSingle;
