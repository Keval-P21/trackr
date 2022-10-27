const eventModel = require('../models/eventModel');

const getEvents = async (req, res) => {
  try {
    events = await eventModel.getAllEvents(req.params);
    res.status(200).send(events);
  } catch (error) {
    console.log('Error in getEvents', error);
    res.status(500);
  }
};

const createNewEvent = async (req, res) => {
  try {
    await eventModel.setOneEvent(req.body);
    res.status(201).send('ok');
  } catch (error) {
    console.log('Error in createNewEvent', error);
    res.status(500);
  }
};

const deleteEvent = async (req, res) => {
  try {
    await eventModel.deleteOneEvent(req.params.id);
    res.status(204).send('Deleted Job');
  } catch (error) {
    console.log('Error in deleteEvent', error);
    res.status(500);
  }
};

const updateEvent = async (req, res) => {
  try {
    const updated = await eventModel.updateOneEvent(req.params.id, req.body);
    res.status(200).send(updated);
  } catch (error) {
    console.log('Error in updateEvent', error);
    res.status(500);
  }
};

module.exports = { getEvents, createNewEvent, deleteEvent, updateEvent };
