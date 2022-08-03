const baseUrl = 'http://localhost:3001';

async function getJobs(userId) {
  try {
    let jobs = await fetch(`${baseUrl}/jobs/${userId}`);
    return jobs.json();
  } catch (error) {
    console.log('GET request error', error);
  }
}

async function addJob(data) {
  try {
    await fetch(`${baseUrl}/jobs/${data.userId}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
  } catch (error) {
    console.log('POST request error', error);
  }
}

async function editJob(data) {
  try {
    const editData = await fetch(`${baseUrl}/jobs/${data._id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return await editData.json();
  } catch (error) {
    console.log('PUT request error', error);
  }
}

async function deleteJob(id) {
  try {
    await fetch(`${baseUrl}/jobs/${id}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.log('DELETE request error', error);
  }
}

async function getEvents(userId) {
  try {
    let events = await fetch(`${baseUrl}/events/${userId}`);
    return events.json();
  } catch (error) {
    console.log('GET request error', error);
  }
}

async function addEvent(data) {
  try {
    await fetch(`${baseUrl}/events/${data.jobId}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
  } catch (error) {
    console.log('POST request error', error);
  }
}

async function deleteEvent(id) {
  try {
    await fetch(`${baseUrl}/events/${id}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.log('DELETE request error', error);
  }
}

module.exports = {
  getJobs,
  addJob,
  editJob,
  deleteJob,
  getEvents,
  addEvent,
  deleteEvent,
};
