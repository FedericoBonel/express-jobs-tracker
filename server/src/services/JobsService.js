const {
    getAllBy,
    create,
    deleteOneBy,
    updateOneBy,
} = require("../repositories/JobsRepository");
const { NotFoundError } = require("../errors");

/**
 * Gets all the jobs in database for the logged in user
 * @param {String} userId User id of the logged in user
 * @param {any} filters Optional filter to search for specific values 
 * @returns All the jobs for the logged in user
 */
const findAllJobsBy = async (userId, filters = {}) => {
    const allJobs = await getAllBy({ ...filters, createdBy: userId });

    return allJobs;
};

/**
 * Finds the job with the specific id passed
 * @param {String} userId User id of the logged in user
 * @param {String} jobId Job id of the specific required job
 * @throws {NotFoundError} If the job with that id is not found
 * @returns The job with the given id
 */
const findJobById = async (userId, jobId) => {
    const foundJobs = await getAllBy({ createdBy: userId, _id: jobId });

    if (!foundJobs[0]) {
        throw new NotFoundError(`Job with id: ${jobId} not found`);
    }

    return foundJobs[0];
};

/**
 * Saves the job in the database with the user id of the logged in user
 * @param {String} userId User id of the logged in user
 * @param {any} newJob Job to save in database
 * @returns The saved job with all its populated data
 */
const saveJob = async (userId, newJob) => {
    const jobToSave = { ...newJob, createdBy: userId };

    return await create(jobToSave);
};

/**
 * Deletes a job in the database
 * @param {String} userId User id of the logged in user
 * @param {String} jobId Id of the job to be deleted 
 * @throws {NotFoundError} If the job with that id is not found
 * @returns The deleted job
 */
const delJob = async (userId, jobId) => {
    const deletedJob = await deleteOneBy({ createdBy: userId, _id: jobId });

    if (!deletedJob) {
        throw new NotFoundError(`Job with id: ${jobId} not found`);
    }

    return deletedJob;
};

/**
 * Updated a job in the database
 * @param {String} userId User id of the logged in user
 * @param {String} jobId Id of the job to be updated 
 * @param {any} changes fields to be updated in the job
 * @throws {NotFoundError} If the job with that id is not found
 * @returns The updated job
 */
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

module.exports = { findAllJobsBy, findJobById, saveJob, delJob, updateOneJob };
