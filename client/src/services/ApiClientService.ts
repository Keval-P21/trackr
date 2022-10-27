import { Event } from "../interfaces/event";
import { Job } from "../interfaces/job";

const baseUrl = process.env.REACT_APP_BASE_URL;

async function getJobs (user: any) : Promise<Job[] | undefined> {
  try {
    const jobs : Response = await fetch(`${baseUrl}/jobs/${user.uid}`, {
      headers: {
        Authorization: 'Bearer ' + user.accessToken,
      },
    });
    return jobs.json();
  } catch (error) {
    console.log('GET request error', error);
  }

}

async function addJob (data: Job, user: any) : Promise<Job | undefined> {
  try {
    const response : Response = await fetch(`${baseUrl}/jobs/${data.userId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + user.accessToken,
      },
      body: JSON.stringify(data),  
    });
    return response.json();
    
  } catch (error) {
    console.log('POST request error', error);
  }

}

async function editJob(data: Job) : Promise<Job | undefined> {
  try {
    const editData = await fetch(`${baseUrl}/jobs/${data._id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return editData.json();
  } catch (error) {
    console.log('PUT request error', error);
  }
}

async function deleteJob(id: string, user: any) : Promise<Boolean> {

  let response : Response;

  try {
    response = await fetch(`${baseUrl}/jobs/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + user.accessToken,
      },
    });

    console.log(response.ok)
    return response.ok

  } catch (error) {
    console.log('DELETE request error', error);
    return false;
   
  }
}

async function getEvents(user:any) : Promise<Event[] | undefined> {
  try {
    const events : Response = await fetch(`${baseUrl}/events/${user.uid}`, {
      headers: {
        Authorization: 'Bearer ' + user.accessToken,
      },
    });
    return events.json();
  } catch (error) {
    console.log('GET request error', error);
  }

}

async function addEvent(data:Event, user:any) {
  try {
    await fetch(`${baseUrl}/events/${data.jobId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + user.accessToken,
      },
      body: JSON.stringify(data),
    });
  } catch (error) {
    console.log('POST request error', error);
  }
}

async function deleteEvent(id:string | undefined, user:any) {
  try {
    await fetch(`${baseUrl}/events/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + user.accessToken,
      },
    });
  } catch (error) {
    console.log('DELETE request error', error);
  }
}

export default  {
  getJobs,
  addJob,
  editJob,
  deleteJob,
  getEvents,
  addEvent,
  deleteEvent,
};
