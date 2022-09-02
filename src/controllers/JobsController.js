const { StatusCodes } = require("http-status-codes");

const { SuccessPayload } = require("../payloads");
const {
    findAllJobs,
    findJobById,
    saveJob,
    delJob,
    updateOneJob,
} = require("../services/JobsService");

const getAllJobs = async (req, res) => {
    const { _id: userId } = req.user;

    const allJobs = await findAllJobs(userId);
    res.status(StatusCodes.OK).json(new SuccessPayload(allJobs));
};

const getJobById = async (req, res) => {
    const { _id: userId } = req.user;
    console.log(userId);
    const { id } = req.params;

    const job = await findJobById(userId, id);
    res.status(StatusCodes.OK).json(new SuccessPayload(job));
};

const createJob = async (req, res) => {
    const { _id: userId } = req.user;
    const newJob = req.body;

    const createdJob = await saveJob(userId, newJob);
    res.status(StatusCodes.CREATED).json(new SuccessPayload(createdJob));
};

const deleteJob = async (req, res) => {
    const { _id: userId } = req.user;
    const { id } = req.params;

    const deletedJob = await delJob(userId, id);
    res.status(StatusCodes.OK).json(
        new SuccessPayload(deletedJob)
    );
};

const updateJob = async (req, res) => {
    const { _id: userId } = req.user;
    const { id } = req.params;
    const updatedJob = req.body;

    const savedJob = await updateOneJob(userId, id, updatedJob);

    res.status(StatusCodes.OK).json(new SuccessPayload(savedJob));
};

module.exports = { getAllJobs, getJobById, createJob, deleteJob, updateJob };
