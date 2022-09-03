const { StatusCodes } = require("http-status-codes");

const { SuccessPayload } = require("../payloads");
const { 
    findAllJobsBy,
    findJobById,
    saveJob,
    delJob,
    updateOneJob,
} = require("../services/JobsService");

/**
 * Controller to get all the jobs from database
 */
const getAllJobs = async (req, res) => {
    const { _id: userId } = req.user;

    const allJobs = await findAllJobsBy(userId);
    res.status(StatusCodes.OK).json(new SuccessPayload(allJobs));
};

/**
 * Controller to get a job by id from database
 * @Note Params validation is derived to previous middleware
 */
const getJobById = async (req, res) => {
    const { _id: userId } = req.user;
    const { id: jobId } = req.params;

    const job = await findJobById(userId, jobId);
    res.status(StatusCodes.OK).json(new SuccessPayload(job));
};

/**
 * Controller to create a new job in database
 * @Note payload validation is derived to previous middleware
 */
const createJob = async (req, res) => {
    const { _id: userId } = req.user;
    const newJob = req.body;

    const createdJob = await saveJob(userId, newJob);
    res.status(StatusCodes.CREATED).json(new SuccessPayload(createdJob));
};

/**
 * Controller to delete a job in database
 * @Note Params validation is derived to previous middleware
 */
const deleteJob = async (req, res) => {
    const { _id: userId } = req.user;
    const { id: jobId } = req.params;

    const deletedJob = await delJob(userId, jobId);
    res.status(StatusCodes.OK).json(
        new SuccessPayload(deletedJob)
    );
};

/**
 * Controller to update a job in the database
 * @Note payload validation is derived to previous middleware
 */
const updateJob = async (req, res) => {
    const { _id: userId } = req.user;
    const { id: jobId } = req.params;
    const updatedJob = req.body;

    const savedJob = await updateOneJob(userId, jobId, updatedJob);
    res.status(StatusCodes.OK).json(new SuccessPayload(savedJob));
};

module.exports = { getAllJobs, getJobById, createJob, deleteJob, updateJob };
