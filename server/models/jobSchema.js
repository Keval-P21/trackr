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
  interview: {
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
  color: {
    type: String,
    required: false,
    default: 'blue',
  },
  date_added: {
    type: String,
    required: false,
    default: new Date().toDateString(),
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
      deadline: {
        type: String,
        required: false,
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
