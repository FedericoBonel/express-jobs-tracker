const { Router } = require("express");

const {
    getAllJobs,
    getJobById,
    createJob,
    deleteJob,
    updateJob,
} = require("../controllers/JobsController");
const authenticate = require("../middleware/Auth");


const jobsRoutes = Router();

jobsRoutes.use(authenticate);
jobsRoutes.route("/").get(getAllJobs).post(createJob);
jobsRoutes.route("/:jobId").get(getJobById).patch(updateJob).delete(deleteJob);

module.exports = jobsRoutes;
