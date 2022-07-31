let baseUrl = 'http://localhost:3001/jobs';

async function getJobs(userId) {
  try {
    let jobs = await fetch(`${baseUrl}/${userId}`);
    return jobs.json();
  } catch (error) {
    console.log('GET request error', error);
  }
}

async function addJob(data) {
  try {
    await fetch(`${baseUrl}/${data.userId}`, {
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
    // console.log(data._id);
    const editData = await fetch(`${baseUrl}/${data._id}`, {
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
    await fetch(`${baseUrl}/${id}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.log('DELETE request error', error);
  }
}

module.exports = { getJobs, addJob, editJob, deleteJob };
