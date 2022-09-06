import { useState, useEffect, useContext } from "react";

import "./Dashboard.css";
import { UserContext } from "../../context/Context";
import JobForm from "../../components/JobForm/JobForm";
import JobList from "../../components/JobList/JobList";
import { getAllJobs, deleteJobById, createJob } from "../../api/JobsApi";

const Dashboard = () => {
    const { user, invalidateUser } = useContext(UserContext);
    const [jobs, setJobs] = useState({
        status: "idle",
        data: [],
    });

    useEffect(() => {
        const fetchAllJobs = async () => {
            setJobs((prevJob) => ({ ...prevJob, status: "loading" }));

            const allJobs = await getAllJobs(user.token);

            if (allJobs.status === 200) {
                setJobs({ status: "idle", data: allJobs.data });
            } else if (allJobs.status === 401) {
                invalidateUser();
            } else {
                setJobs((prevJobs) => ({ ...prevJobs, status: "error" }));
            }
        };
        fetchAllJobs();
    }, [invalidateUser, user]);

    const onDelete = async (id) => {
        const { status } = await deleteJobById(id, user.token);

        if (status === 200) {
            setJobs((prevJobs) => ({
                status: "idle",
                data: prevJobs.data.filter((job) => job._id !== id),
            }));
        } else if (status === 401) {
            invalidateUser();
        } else {
            alert("Error during deletion");
        }
    };

    const onCreate = async (newJob) => {
        const { status, data } = await createJob(newJob, user.token);

        if (status === 201) {
            setJobs((prevJobs) => ({
                ...prevJobs,
                data: [...prevJobs.data, data],
            }));
        } else if (status === 401) {
            invalidateUser();
        } else {
            alert("Error during creation");
        }
    };

    return (
        <main className="container">
            <JobForm onCreate={onCreate} />
            {jobs.status === "loading" && "Loading"}
            {jobs.status === "idle" && (
                <JobList jobs={jobs.data} onDelete={onDelete} />
            )}
        </main>
    );
};

export default Dashboard;
