const { getAll } = require("../repositories/JobsRepository");

const getAllJobs = async () => {
    const allJobs = await getAll();

    return allJobs;
};
