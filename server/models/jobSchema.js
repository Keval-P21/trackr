const mongoose = require('mongoose');

const jobsSchema = mongoose.Schema({
  company: {
    type: String,
    required: true,
    default: '',
  },
  title: {
    type: String,
    required: true,
    default: 'No Job Title',
  },
  status: {
    type: String,
    required: true,
    default: 'Pending',
  },
  userId: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: false,
  },
  salary: {
    type: String,
    required: false,
  },
  post_url: {
    type: String,
    required: false,
  },
  description: {
    type: String,
    required: false,
    default: '',
  },
  notes: {
    type: String,
    required: false,
    default: '',
  },
  date_added: {
    type: String,
    required: false,
    default: new Date().toDateString(),
  },
  color: {
    type: String,
    required: false,
  },
  todos: [
    {
      content: {
        type: String,
        required: false,
      },
      active: {
        type: Boolean,
        required: false,
        default: true,
      },
      completed: {
        type: Boolean,
        required: false,
        default: false,
      },
    },
  ],
});

const JobModel = mongoose.model('Jobs', jobsSchema);

module.exports = JobModel;
