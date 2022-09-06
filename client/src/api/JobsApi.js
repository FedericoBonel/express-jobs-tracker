const JOBS_URI = `${process.env.REACT_APP_BACKEND_URI}/jobs`;

const getAllJobs = async (token) => {
    try {
        const response = await fetch(JOBS_URI, {
            method: "GET",
            headers: {
                authorization: `Bearer ${token}`,
                accept: "application/json",
            },
        });

        const responseStatus = response.status;
        const allJobs = await response.json();

        if (responseStatus === 200) {
            return { status: responseStatus, data: allJobs.data };
        } else {
            return { status: responseStatus, data: [] };
        }
    } catch (error) {
        console.log(`Error ocurred during fetching all jobs: ${error}`);
    }
};

const getJobById = async (id, token) => {
    try {
        const response = await fetch(`${JOBS_URI}/${id}`, {
            method: "GET",
            headers: {
                authorization: `Bearer ${token}`,
                accept: "application/json",
            },
        });

        const responseStatus = response.status;
        const job = await response.json();

        if (responseStatus === 200) {
            return { status: responseStatus, data: job.data };
        } else {
            return { status: responseStatus, data: {} };
        }
    } catch (error) {
        console.log(`Error ocurred during fetching a job by id: ${error}`);
    }
};

const deleteJobById = async (id, token) => {
    try {
        const response = await fetch(`${JOBS_URI}/${id}`, {
            method: "DELETE",
            headers: {
                authorization: `Bearer ${token}`,
                accept: "application/json",
            },
        });

        const responseStatus = response.status;
        const deletedJob = await response.json();

        if (responseStatus === 200) {
            return { status: responseStatus, data: deletedJob.data };
        } else {
            return { status: response, data: {} };
        }
    } catch (error) {
        console.log(`Error ocurred during deletion of a job: ${error}`);
    }
};

const createJob = async (newJob, token) => {
    try {
        const response = await fetch(`${JOBS_URI}`, {
            method: "POST",
            headers: {
                authorization: `Bearer ${token}`,
                "content-type": "application/json",
            },
            body: JSON.stringify(newJob),
        });

        const responseStatus = response.status;
        const createdJob = await response.json();

        if (responseStatus === 201) {
            return { status: responseStatus, data: createdJob.data };
        } else {
            return { status: responseStatus, data: {} };
        }
    } catch (error) {
        console.log(`Error ocurred during addition of a job: ${error}`);
    }
};

const updateJob = async (id, updatedJob, token) => {
    try {
        const response = await fetch(`${JOBS_URI}/${id}`, {
            method: "PATCH",
            headers: {
                authorization: `Bearer ${token}`,
                "content-type": "application/json",
            },
            body: JSON.stringify(updatedJob),
        });

        const responseStatus = response.status;
        const savedJob = await response.json();

        if (responseStatus === 200) {
            return { status: responseStatus, data: savedJob.data };
        } else {
            return { status: response, data: {} };
        }
    } catch (error) {
        console.log(`Error ocurred during update of a job: ${error}`);
    }
};

export {
    getAllJobs,
    deleteJobById,
    createJob,
    getJobById,
    updateJob,
};
