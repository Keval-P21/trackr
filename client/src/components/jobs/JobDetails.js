import React, { useRef } from 'react';
import { useParams } from 'react-router-dom';
import ApiClientService from '../../services/ApiClientService';
import AddEventForm from '../events/AddEventForm';
import EventsItem from '../events/EventsItem';
import TodoSingle from '../todos/TodoSingle';
import JobInfo from './JobInfo';
import { useAuth } from '../context/AuthContext';

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
  const { currentUser } = useAuth();

  if (!jobs) return <div>Loading</div>;

  const data = jobs.filter((job) => job._id === jobId.id)[0];

  async function submitTodo(event) {
    const todoData = {
      ...data,
      todos: [
        ...data.todos,
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
    getUserJobs(currentUser.uid);
    event.target.reset();
  }
  async function deleteTodo(id) {
    const todoData = data.todos;
    const filteredTodo = todoData.filter((el) => el._id === id)[0];
    filteredTodo.active = false;
    const updatedTodos = {
      ...data,
      todos: todoData,
    };

    const newJob = await ApiClientService.editJob(updatedTodos);
    setJobs((prevState) => {
      const newJobId = newJob._id;
      return [...prevState.filter((el) => el._id !== newJobId), newJob];
    });
    getUserJobs(currentUser.uid);
  }

  const filteredEvents = events.filter((el) => el.jobId === jobId.id);

  return jobs && data ? (
    <div className='job-det-cont'>
      <section className='outline'>
        <div className={`form-box ${data.color}`}>
          <JobInfo
            jobs={jobs}
            setJobs={setJobs}
            getUserJobs={getUserJobs}
            className={data.color}
          />
        </div>
        <div className={`form-box ${data.color}`}>
          <h2 className='white-text slim'>Tasks</h2>
          <form onSubmit={submitTodo}>
            <fieldset>
              <label htmlFor='title' className='form-label'>
                Add Task
              </label>
              <div className='task-cont'>
                <input
                  type='text'
                  placeholder='Enter as task...'
                  ref={todoRef}
                  className='form-input-task'
                  required
                />

                <button type='submit' className='btn btn-add'>
                  +
                </button>
              </div>
              <br></br>
            </fieldset>
          </form>
          {data.todos
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
      </section>
      <section className='outline'>
        <div className={`form-box ${data.color}`}>
          <AddEventForm
            events={events}
            getUserEvents={getUserEvents}
            setEvents={setEvents}
          />
        </div>
        <div className={`form-box ${data.color}`}>
          <h2 className='white-text slim'>Upcoming Events</h2>
          {filteredEvents.length ? (
            filteredEvents.map((singleEvent) => (
              <EventsItem
                key={singleEvent._id}
                singleEvent={singleEvent}
                getUserEvents={getUserEvents}
                setEvents={setEvents}
              />
            ))
          ) : (
            <div className='white-text pad-top'>No Upcoming Events</div>
          )}
        </div>
      </section>
    </div>
  ) : (
    <div>Loading</div>
  );
}

export default JobDetails;
