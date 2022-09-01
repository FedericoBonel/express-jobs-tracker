const { Router } = require("express");

const {
    getAllJobs,
    getJobById,
    createJob,
    deleteJob,
    updateJob,
} = require("../controllers/JobsController");
const authenticate = require("../middleware/Auth");
const validateId = require("../middleware/validators/ObjectIdValidator");


const jobsRoutes = Router();

jobsRoutes.use(authenticate);
jobsRoutes.route("/").get(getAllJobs).post(createJob);
jobsRoutes.route("/:id").all(validateId).get(getJobById).patch(updateJob).delete(deleteJob);

module.exports = jobsRoutes;
