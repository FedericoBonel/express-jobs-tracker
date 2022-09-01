const { StatusCodes } = require("http-status-codes");

const { SuccessPayload } = require("../payloads");
// const 

const getAllJobs = async (req, res) => {
    const allJobs = [];
    res.status(StatusCodes.OK).json(new SuccessPayload(allJobs));
};

const getJobById = async (req, res) => {
    const { jobId } = req.params;
    res.status(StatusCodes.OK).json(new SuccessPayload(jobId));
};

const createJob = async (req, res) => {
    const newJob = req.body;
    res.status(StatusCodes.CREATED).json(new SuccessPayload(newJob));
};

const deleteJob = async (req, res) => {
    const { jobId } = req.params;
    res.status(StatusCodes.OK).json(new SuccessPayload(jobId));
};

const updateJob = async (req, res) => {
    const updatedJob = req.body;
    res.status(StatusCodes.OK).json(new SuccessPayload(updatedJob));
};

module.exports = { getAllJobs, getJobById, createJob, deleteJob, updateJob };
