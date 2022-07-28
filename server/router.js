const router = require('express').Router();
const {
  getJobs,
  createNewJob,
  deleteJob,
  updateJob,
} = require('./controllers/jobController');

// Routes for jobs
router.get('/jobs', getJobs);
router.post('/jobs', createNewJob);
router.delete('/jobs/:id', deleteJob);
router.put('/jobs/:id', updateJob);

module.exports = router;
