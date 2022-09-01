const { getAllBy } = require("../repositories/JobsRepository");
const { NotFoundError } = require("../errors");

const findAllJobs = async (userId, filters = {}) => {
    const allJobs = await getAllBy({ ...filters, createdBy: userId });

    return allJobs;
};

const findJobById = async (userId, jobId) => {
    const foundJobs = await getAllBy({ createdBy: userId, _id: jobId });

    if (!foundJobs) {
        throw new NotFoundError(`Job with id: ${jobId} not found`);
    }

    return foundJobs[0];
};

module.exports = { findAllJobs, findJobById };
