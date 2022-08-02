import React from 'react';

function TodoSingle({ task, deleteTodo }) {
  return (
    <div className='task-cont'>
      <div className='todo-item'>- {task.content}</div>
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
