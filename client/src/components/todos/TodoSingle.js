import React from 'react';

function TodoSingle({ task, deleteTodo }) {
  const taskId = task._id;
  // console.log('TaskId', taskId);

  return (
    <div>
      <span>{task.content}</span>
      {deleteTodo ? (
        <button onClick={() => deleteTodo(task._id)}>
          <i className='material-icons'>delete</i>
        </button>
      ) : (
        <></>
      )}
    </div>
  );
}

export default TodoSingle;
