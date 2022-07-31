import React, { useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import ApiClientService from '../../services/ApiClientService';
import TodoSingle from '../todos/TodoSingle';
import JobInfo from './JobInfo';

function JobDetails({ jobs, setJobs, getUserJobs }) {
  const jobId = useParams();
  const todoRef = useRef(null);

  if (!jobs) return <div>Loading</div>;

  const data = jobs.filter((job) => job._id === jobId.id);

  async function submitTodo(event) {
    const todoData = {
      ...data[0],
      todos: [
        ...data[0].todos,
        {
          content: todoRef.current.value,
          completed: false,
        },
      ],
    };
    const newJob = await ApiClientService.editJob(todoData);
    setJobs((prevState) => {
      const newJobId = newJob._id;
      return [...prevState.filter((el) => el._id !== newJobId), newJob];
    });
    getUserJobs(2);
    event.target.reset();
  }
  async function deleteTodo(id) {
    const todoData = data[0].todos;
    const filteredTodo = todoData.filter((el) => el._id === id)[0];
    filteredTodo.active = false;
    const updatedTodos = {
      ...data[0],
      todos: todoData,
    };

    const newJob = await ApiClientService.editJob(updatedTodos);
    setJobs((prevState) => {
      const newJobId = newJob._id;
      return [...prevState.filter((el) => el._id !== newJobId), newJob];
    });
    getUserJobs(2);
  }

  return jobs && data.length ? (
    <div>
      <div className='edit-cont'>
        <div>JobDetails</div>
        <JobInfo jobs={jobs} setJobs={setJobs} getUserJobs={getUserJobs} />
      </div>
      <div>
        <form onSubmit={submitTodo}>
          <input
            type='text'
            placeholder='Enter as task...'
            ref={todoRef}
            required
          />
          <button type='submit'>+</button>
        </form>
        {data[0].todos
          .filter((task) => task.active)
          .map((task) => {
            return (
              <TodoSingle task={task} key={task._id} deleteTodo={deleteTodo} />
            );
          })}
      </div>
    </div>
  ) : (
    <div>Loading</div>
  );
}

export default JobDetails;
