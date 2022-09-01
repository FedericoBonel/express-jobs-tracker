const jobsModel = require("../models/Job");

const getAllBy = async (filters) => {
    const jobs = await jobsModel
        .find(filters)
        .populate("createdBy")
        .sort("createdAt");

    jobs.forEach((job) => {
        const { password, ...user } = job.createdBy;
        job.createdBy = user;
    });
    return jobs;
};

module.exports = { getAllBy };
