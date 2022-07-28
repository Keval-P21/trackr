const JobModel = require('./jobSchema');

const getAll = async function () {
  try {
    return await JobModel.find();
  } catch (error) {
    console.log('Error in getAll:', error);
  }
};

const setOne = async function (job) {
  try {
    console.log(job);
    return await JobModel.create(job);
  } catch (error) {
    console.log('Error in setOne (create):', error);
  }
};

const deleteOne = async function (_id) {
  try {
    return await JobModel.deleteOne({ _id });
  } catch (error) {
    console.log('Error in deleteOne:', error);
  }
};

const updateOne = async function (_id, data) {
  try {
    return await JobModel.findByIdAndUpdate({ _id }, { data });
  } catch (error) {
    console.log('Error in updateOne:', error);
  }
};

module.exports = { getAll, setOne, deleteOne, updateOne };
