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

module.exports = { getJobs, addJob };
