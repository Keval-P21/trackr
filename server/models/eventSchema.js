const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema({
  jobId: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: false,
  },
  startDate: {
    type: String,
    required: true,
  },
  endDate: {
    type: String,
    required: false,
  },
  startTime: {
    type: String,
    required: true,
  },
  endTime: {
    type: String,
    required: false,
  },
  location: {
    type: String,
    required: false,
  },
});

const EventModel = mongoose.model('Event', EventSchema);

module.exports = EventModel;
