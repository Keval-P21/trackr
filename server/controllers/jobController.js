const jobModel = require('../models/jobModel');

const getJobs = async (req, res) => {
  try {
    jobs = await jobModel.getAll(req.params);
    res.status(200).send(jobs);
  } catch (error) {
    console.log('Error in getJobs', error);
    res.status(500).send(error);
  }
};

const createNewJob = async (req, res) => {
  try {
    const newJob = await jobModel.setOne(req.body);
    res.status(201).send(newJob);
  } catch (error) {
    console.log('Error in createNewJob', error);
    res.status(500).send(error);
  }
};

const deleteJob = async (req, res) => {
  try {
    const deletedJob = await jobModel.deleteOne(req.params.id);
    res.status(204).send(deletedJob);
  } catch (error) {
    console.log('Error in deleteJob', error);
    res.status(500).send(error);
  }
};

const updateJob = async (req, res) => {
  try {
    const updatedJob = await jobModel.updateOne(req.params.id, req.body);
    res.status(200).send(updatedJob);
  } catch (error) {
    console.log('Error in updateJob', error);
    res.status(500).send(error);
  }
};

module.exports = { getJobs, createNewJob, deleteJob, updateJob };
