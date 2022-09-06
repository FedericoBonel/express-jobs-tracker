import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";

import "./Dashboard.css";
import { UserContext } from "../../context/Context";
import JobForm from "../../components/JobForm/JobForm";
import JobList from "../../components/JobList/JobList";
import { getAllJobs, deleteJobById, createJob } from "../../api/JobsApi";

const Dashboard = () => {
    const navigate = useNavigate();
    const { user, invalidateUser } = useContext(UserContext);
    const [jobs, setJobs] = useState({
        status: "idle",
        data: [],
    });

    useEffect(() => {
        const fetchAllJobs = async () => {
            setJobs((prevJob) => ({ ...prevJob, status: "loading" }));

            const { status, data } = await getAllJobs(user.token);

            if (status === 200) {
                setJobs({ status: "idle", data: data });
            } else if (status === 401) {
                invalidateUser();
            } else {
                navigate(`/error/${status}`);
            }
        };
        fetchAllJobs();
    }, [invalidateUser, user, navigate]);

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
            navigate(`/error/${status}`);
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
            navigate(`/error/${status}`);
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
