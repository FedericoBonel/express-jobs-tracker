const { StatusCodes } = require("http-status-codes");

const { SuccessPayload } = require("../payloads");
const { findAllJobs, findJobById } = require("../services/JobsService");

const getAllJobs = async (req, res) => {
    const { _id: userId } = req.user;
    const allJobs = await findAllJobs(userId);
    res.status(StatusCodes.OK).json(new SuccessPayload(allJobs));
};

const getJobById = async (req, res) => {
    const { _id: userId } = req.user;
    const { id } = req.params;

    const job = await findJobById(userId, id);
    res.status(StatusCodes.OK).json(new SuccessPayload(job));
};

const createJob = async (req, res) => {
    const newJob = req.body;
    res.status(StatusCodes.CREATED).json(new SuccessPayload(newJob));
};

const deleteJob = async (req, res) => {
    const { id } = req.params;
    res.status(StatusCodes.OK).json(new SuccessPayload(id));
};

const updateJob = async (req, res) => {
    const updatedJob = req.body;
    res.status(StatusCodes.OK).json(new SuccessPayload(updatedJob));
};

module.exports = { getAllJobs, getJobById, createJob, deleteJob, updateJob };
