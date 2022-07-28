const router = require('express').Router();
const {
  getJobs,
  createNewJob,
  deleteJob,
  updateJob,
} = require('./controllers/jobController');

// Routes for jobs
router.get('/jobs/:userId', getJobs);
router.post('/jobs/:userId', createNewJob);
router.delete('/jobs/:id', deleteJob);
router.put('/jobs/:id', updateJob);

module.exports = router;
