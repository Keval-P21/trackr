const EventModel = require('./eventSchema');

const getAllEvents = async function (userId) {
  try {
    return await EventModel.find(userId);
  } catch (error) {
    console.log('Error in getAllEvents:', error);
  }
};

const setOneEvent = async function (event) {
  try {
    return await EventModel.create(event);
  } catch (error) {
    console.log('Error in setOneEvent (create):', error);
  }
};

const deleteOneEvent = async function (_id) {
  try {
    return await EventModel.deleteOne({ _id: _id });
  } catch (error) {
    console.log('Error in deleteOneEVent:', error);
  }
};

const updateOneEvent = async function (_id, data) {
  try {
    const updatedata = await EventModel.findByIdAndUpdate(_id, data);
    return updatedata;
  } catch (error) {
    console.log('Error in updateOneEvent:', error);
  }
};
module.exports = { getAllEvents, setOneEvent, deleteOneEvent, updateOneEvent };
