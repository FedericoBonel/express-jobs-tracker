const {
    getAllBy,
    create,
    deleteOneBy,
    updateOneBy,
} = require("../repositories/JobsRepository");
const { NotFoundError } = require("../errors");

const findAllJobs = async (userId, filters = {}) => {
    const allJobs = await getAllBy({ ...filters, createdBy: userId });

    return allJobs;
};

const findJobById = async (userId, jobId) => {
    const foundJobs = await getAllBy({ createdBy: userId, _id: jobId });

    if (!foundJobs[0]) {
        throw new NotFoundError(`Job with id: ${jobId} not found`);
    }

    return foundJobs[0];
};

const saveJob = async (userId, jobId) => {
    const jobToSave = { ...jobId, createdBy: userId };

    return await create(jobToSave);
};

const delJob = async (userId, jobId) => {
    const deletedJob = await deleteOneBy({ createdBy: userId, _id: jobId });

    if (!deletedJob) {
        throw new NotFoundError(`Job with id: ${jobId} not found`);
    }

    return deletedJob;
};

const updateOneJob = async (userId, jobId, changes) => {
    const updatedJob = await updateOneBy(
        { createdBy: userId, _id: jobId },
        changes
    );

    if (!updatedJob) {
        throw new NotFoundError(`Job with id: ${jobId} not found`);
    }

    return updatedJob;
};

module.exports = { findAllJobs, findJobById, saveJob, delJob, updateOneJob };
