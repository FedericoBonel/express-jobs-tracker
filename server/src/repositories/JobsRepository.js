const { jobsModel } = require("../models/Job");

/**
 * Gets all the jobs that match the given filter
 * @param {any} filters Properties and values you 
 *                      wish to match in your search, if empty returns all the jobs
 * @returns All the jobs that match the given filters sorted by creation date in ascending order
 */
const getAllBy = async (filters) => {
    return await jobsModel.find(filters).sort("createdAt");
};

/**
 * Creates a new Job
 * @param {any} job Job to create in database 
 * @returns The created job
 */
const create = async (job) => {
    const { _id, ...jobToSave } = job;
    return await jobsModel.create(jobToSave);
};

/**
 * Deletes one job by the given filters
 * @param {any} filters fields you want to filter by 
 * @returns the deleted job
 */
const deleteOneBy = async (filters) => {
    const deleteResult = await jobsModel.findOneAndDelete(filters);

    return deleteResult;
};

/**
 * Updates one job by the given filters
 * @param {any} filters fields and values you want to filter by
 * @param {any} changes fields and values you want to update 
 * @returns The updated job
 */
const updateOneBy = async (filters, changes) => {
    const updatedJob = await jobsModel.findOneAndUpdate(filters, changes, {
        new: true,
    });

    return updatedJob;
};

module.exports = { getAllBy, create, deleteOneBy, updateOneBy };
