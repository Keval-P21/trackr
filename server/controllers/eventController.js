const eventModel = require('../models/eventModel');

const getEvents = async (req, res) => {
  try {
    events = await eventModel.getAllEvents(req.params);
    res.status(200).send(events);
  } catch (error) {
    console.log('Error in getEvents', error);
    res.status(500).send(error);
  }
};

const createNewEvent = async (req, res) => {
  try {
    const newEvent = await eventModel.setOneEvent(req.body);
    res.status(201).send(newEvent);
  } catch (error) {
    console.log('Error in createNewEvent', error);
    res.status(500).send(error);
  }
};

const deleteEvent = async (req, res) => {
  try {
    const deletedEvent = await eventModel.deleteOneEvent(req.params.id);
    res.status(204).send(deleteEvent);
  } catch (error) {
    console.log('Error in deleteEvent', error);
    res.status(500).send(error);
  }
};

const updateEvent = async (req, res) => {
  try {
    const updatedEvent = await eventModel.updateOneEvents(
      req.params.id,
      req.body
    );
    res.status(200).send(updatedEvent);
  } catch (error) {
    console.log('Error in updateEvent', error);
    res.status(500).send(error);
  }
};

module.exports = { getEvents, createNewEvent, deleteEvent, updateEvent };
