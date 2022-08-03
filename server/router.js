const router = require('express').Router();
const {
  getJobs,
  createNewJob,
  deleteJob,
  updateJob,
} = require('./controllers/jobController');
const {
  getEvents,
  createNewEvent,
  deleteEvent,
  updateEvent,
} = require('./controllers/eventController');

const authMiddleware = require('./middlewares/auth');

// Routes for jobs
router.get('/jobs/:userId', authMiddleware, getJobs);
router.post('/jobs/:userId', authMiddleware, createNewJob);
router.delete('/jobs/:id', authMiddleware, deleteJob);
router.put('/jobs/:id', updateJob);

// Router for events
router.get('/events/:userId', authMiddleware, getEvents);
router.post('/events/:jobId', authMiddleware, createNewEvent);
router.delete('/events/:id', authMiddleware, deleteEvent);
router.put('/events/:id', updateEvent);

module.exports = router;
