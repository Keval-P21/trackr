import React, { useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import ApiClientService from '../../services/ApiClientService';
import TodoSingle from '../todos/TodoSingle';

function JobDetails({ jobs, setJobs, getUserJobs }) {
  const [isDisabled, setIsDisabled] = useState(true);
  const jobId = useParams();
  const titleRef = useRef(null);
  const companyRef = useRef(null);
  const salaryRef = useRef(null);
  const locationRef = useRef(null);
  const post_urlRef = useRef(null);
  const descriptionRef = useRef(null);
  const statusRef = useRef(null);
  const todoRef = useRef(null);

  if (!jobs) return <div>Loading</div>;

  const data = jobs.filter((job) => job._id === jobId.id);

  function handleClick() {
    setIsDisabled((current) => !current);
  }

  function refresh() {
    window.location.reload();
  }

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
    // console.log(todoData);
    const newJob = await ApiClientService.editJob(todoData);
    setJobs((prevState) => {
      const newJobId = newJob._id;
      return [...prevState.filter((el) => el._id !== newJobId), newJob];
    });
    getUserJobs(2);
    event.target.reset();
  }
  async function deleteTodo(id) {
    // const todoData = data[0];
    const todoData = data[0].todos;
    // console.log('todo Data', todoData, id);
    const filteredTodo = todoData.filter((el) => el._id === id)[0];
    filteredTodo.active = false;
    // console.log('FilteredTodo Active Change', filteredTodo);
    const updatedTodos = {
      ...data[0],
      todos: todoData,
    };

    // console.log(updatedTodos);
    const newJob = await ApiClientService.editJob(updatedTodos);
    setJobs((prevState) => {
      const newJobId = newJob._id;
      return [...prevState.filter((el) => el._id !== newJobId), newJob];
    });
    getUserJobs(2);
  }

  async function handleSave() {
    const editedData = {
      ...data[0],
      company: companyRef.current.value,
      title: titleRef.current.value,
      status: statusRef.current.value,
      userId: '2',
      location: locationRef.current.value,
      salary: salaryRef.current.value,
      post_url: post_urlRef.current.value,
      interview: '',
      description: descriptionRef.current.value,
      notes: '',
    };

    const newJob = await ApiClientService.editJob(editedData);
    setJobs((prevState) => {
      const newJobId = newJob._id;
      return [...prevState.filter((el) => el._id !== newJobId), newJob];
    });
    getUserJobs(2);
    setIsDisabled((current) => !current);
  }

  return jobs && data.length ? (
    <div className='container'>
      <div>
        <div>JobDetails</div>

        {/* <form className='white'> */}
        <div className='input-field col s12 m6'>
          {/* <label htmlFor='title'>Company *</label> */}
          <input
            type='text'
            id='title'
            defaultValue={data[0].title}
            disabled={isDisabled}
            ref={titleRef}
            required
          />
        </div>
        <div className='input-field col s12 m6'>
          {/* <label htmlFor='company'>Company *</label> */}
          <input
            type='text'
            id='company'
            defaultValue={data[0].company}
            disabled={isDisabled}
            ref={companyRef}
            required
          />
        </div>
        <div className='input-field col s12 m6'>
          <label htmlFor='salary'>Salary</label>
          <input
            type='text'
            id='salary'
            defaultValue={data[0].salary ? data[0].salary : ''}
            disabled={isDisabled}
            ref={salaryRef}
          />
        </div>
        <div className='input-field col s12 m6'>
          <label htmlFor='location'>Location</label>
          <input
            type='text'
            id='location'
            defaultValue={data[0].location ? data[0].location : ''}
            disabled={isDisabled}
            ref={locationRef}
          />
        </div>
        <div className='input-field col s12 m6'>
          <label htmlFor='post_url'>URL (Link)</label>
          <input
            type='text'
            id='post_url'
            defaultValue={data[0].post_url ? data[0].post_url : ''}
            disabled={isDisabled}
            ref={post_urlRef}
          />
        </div>
        <div className='input-field col s12 '>
          <label htmlFor='description'>Description</label>
          <input
            type='text'
            id='description'
            defaultValue={data[0].description ? data[0].description : ''}
            disabled={isDisabled}
            ref={descriptionRef}
          />
        </div>
        <div className='input-field col s12 m6'>
          <select
            className='browser-default'
            id='status'
            defaultValue={`${data[0].status}`}
            disabled={isDisabled}
            required
            ref={statusRef}
          >
            <option value='' disabled>
              Application Status *
            </option>
            <option value='pending'>Pending</option>
            <option value='applied'>Applied</option>
            <option value='phone'>Phone</option>
            <option value='onsite'>Onsite</option>
            <option value='offer'>Offer</option>
            <option value='rejected'>Rejected</option>
          </select>
        </div>
        {isDisabled ? (
          <>
            <button onClick={handleClick}>Edit</button>
          </>
        ) : (
          <>
            <button onClick={refresh}>Cancel</button>
            <button onClick={handleSave}>Save</button>
          </>
        )}
        {/* </form> */}
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
