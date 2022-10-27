import React, { FormEvent, useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Event } from '../../interfaces/event';
import { Job } from '../../interfaces/job';
import ApiClientService from '../../services/ApiClientService';
import { useAuth } from '../context/AuthContext';
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
}: {
  jobs: Job[],
  setJobs: Function,
  getUserJobs: Function,
  events: Event[],
  setEvents: Function,
  getUserEvents: Function,
}) {
  const jobId = useParams();
  const todoRef = useRef() as React.MutableRefObject<HTMLInputElement>;
  const { currentUser } = useAuth();

  const job = jobs.filter((job) => job._id === jobId.id)[0];

  const [jobData, setJobData] = useState<Job>(job);

  useEffect(() => {
    setJobData(() => jobs.filter((job) => job._id === jobId.id)[0]);
  }, [jobs])

  if (!jobs) return <div>Loading</div>;

  async function submitTodo(event: FormEvent<HTMLFormElement>) {

    event.preventDefault();

    const todoData = {
      ...jobData,
      todos: [
        ...jobData.todos,
        {
          content: todoRef.current.value,
          completed: false,
        },
      ],
    };


    const newJob = await ApiClientService.editJob(todoData);
    if(newJob) {
    setJobs((prevState: Job[]) => {
        const newJobId = newJob._id;
        return [...prevState.filter((el) => el._id !== newJobId), newJob];
      });
      
      setJobData(newJob);
      getUserJobs(currentUser);
    }

    (document.getElementById("add-task-form") as HTMLFormElement).reset();
  }


  async function deleteTodo(id: String) {
    const todoData = jobData.todos;
    const filteredTodo = todoData.map((el => {
      if (el._id === id)
        el.active = false;
      
      return el;
    }));

    const updatedTodos = {
      ...jobData,
      todos: filteredTodo,
    };


    const newJob = await ApiClientService.editJob(updatedTodos);

    if(newJob){
      setJobs((prevState: Job[]) => {
        return [...prevState.filter((el) => el._id !== newJob._id), newJob];
      });
      
      setJobData(newJob);
      getUserJobs(currentUser);
    }
  }

  const filteredEvents = events.filter((el) => el.jobId === jobId.id);

  return jobs && jobData ? (
    <div className='job-det-cont'>
      <section className='outline'>
        <div className={`form-box ${jobData.color}`}>
          <JobInfo
            jobs={jobs}
            setJobs={setJobs}
            getUserJobs={getUserJobs}
            className={jobData.color}
          />
        </div>
        <div className={`form-box ${jobData.color}`}>
          <h2 className='white-text slim'>Tasks</h2>
          <form id='add-task-form' onSubmit={submitTodo}>
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
          {jobData.todos
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
        <div className={`form-box ${jobData.color}`}>
          <AddEventForm
            events={events}
            getUserEvents={getUserEvents}
            setEvents={setEvents}
            currentUser = {currentUser}
          />
        </div>
        <div className={`form-box ${jobData.color}`}>
          <h2 className='white-text slim margin-bottom'>Upcoming Events</h2>
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
