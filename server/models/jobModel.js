//@ts-check
const JobModel = require('./jobSchema');

const getAll = async function (userId) {
  try {
    return await JobModel.find(userId);
  } catch (error) {
    console.log('Error in getAll:', error);
  }
};

const setOne = async function (job) {
  try {
    return await JobModel.create(job);
  } catch (error) {
    console.log('Error in setOne (create):', error);
  }
};

const deleteOne = async function (_id) {
  try {
    return await JobModel.deleteOne({ _id: _id });
  } catch (error) {
    console.log('Error in deleteOne:', error);
  }
};

const updateOne = async function (_id, data) {
  try {
    const updatedata = await JobModel.findByIdAndUpdate(_id, data);
    return updatedata;
  } catch (error) {
    console.log('Error in updateOne:', error);
  }
};

module.exports = { getAll, setOne, deleteOne, updateOne };
