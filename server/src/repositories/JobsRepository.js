const { jobsModel } = require("../models/Job");

const getAllBy = async (filters) => {
    return await jobsModel.find(filters).sort("createdAt");
};

const create = async (job) => {
    return await jobsModel.create(job);
};

const deleteOneBy = async (filters) => {
    const deleteResult = await jobsModel.findOneAndDelete(filters);

    return deleteResult;
};

const updateOneBy = async (filters, changes) => {
    const updatedJob = await jobsModel.findOneAndUpdate(filters, changes, {
        new: true,
    });

    return updatedJob;
};

module.exports = { getAllBy, create, deleteOneBy, updateOneBy };
