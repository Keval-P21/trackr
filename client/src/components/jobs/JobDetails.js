import React, { useRef } from 'react';
import { useParams } from 'react-router-dom';
import ApiClientService from '../../services/ApiClientService';
import AddEventForm from '../events/AddEventForm';
import EventsItem from '../events/EventsItem';
import TodoSingle from '../todos/TodoSingle';
import JobInfo from './JobInfo';

function JobDetails({
  jobs,
  setJobs,
  getUserJobs,
  events,
  setEvents,
  getUserEvents,
}) {
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
    <div className='job-det-cont'>
      <div className={`section-cont ${data[0].color}`}>
        <JobInfo
          jobs={jobs}
          setJobs={setJobs}
          getUserJobs={getUserJobs}
          className={data[0].color}
        />
      </div>
      <div>
        <div>
          <div className={`section-cont ${data[0].color}`}>
            <AddEventForm
              events={events}
              getUserEvents={getUserEvents}
              setEvents={setEvents}
            />
          </div>
          <div className={`section-cont ${data[0].color}`}>
            <h5>Upcoming Events</h5>
            {events
              .filter((el) => el.jobId === jobId.id)
              .map((event) => (
                <EventsItem
                  key={event._id}
                  event={event}
                  getUserEvents={getUserEvents}
                  setEvents={setEvents}
                />
              ))}
          </div>
        </div>
        <div className={`section-cont form-box ${data[0].color}`}>
          <h2 className='white-text slim'>Tasks</h2>
          <form onSubmit={submitTodo}>
            <fieldset>
              <label htmlFor='title' className='form-label'>
                Add Task
              </label>
              <input
                type='text'
                placeholder='Enter as task...'
                ref={todoRef}
                className='form-input'
                required
              />

              <button type='submit' className='btn'>
                +
              </button>
            </fieldset>
          </form>
          {data[0].todos
            .filter((task) => task.active)
            .map((task) => {
              return (
                <TodoSingle
                  task={task}
                  key={task._id}
                  deleteTodo={deleteTodo}
                />
              );
            })}
        </div>
      </div>
    </div>
  ) : (
    <div>Loading</div>
  );
}

export default JobDetails;
