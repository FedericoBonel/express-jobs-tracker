const jobsModel = require("../models/Jobs");

const getAllFor = async (user) => {
    const jobs = await jobsModel
        .find({ createdBy: user })
        .populate("createdBy");
    return jobs;
};

module.exports = { getAllFor };
