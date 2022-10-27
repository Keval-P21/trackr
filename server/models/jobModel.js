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

    const createRes = await JobModel.create(job);
    // console.log("RESPONSE FROM DB: ",createRes);
    return createRes;
  } catch (error) {
    console.log('Error in setOne (create):', error);
  }
};

const deleteOne = async function (_id) {
  try {
    const deleteOne = await JobModel.deleteOne({ _id: _id });
    console.log("from model:", deleteOne);
    return deleteOne;
  } catch (error) {
    throw new Error ( error.message)
    // console.log("from model catch",{"message" : error.message})
    return ({"message" : error.message})
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
