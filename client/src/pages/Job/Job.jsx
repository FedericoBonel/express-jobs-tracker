import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDharmachakra } from "@fortawesome/free-solid-svg-icons";

import { getJobById } from "../../api/JobsApi";
import { UserContext } from "../../context/Context";
import { updateJob } from "../../api/JobsApi";
import JobForm from "../../components/JobForm/JobForm";

const Job = () => {
    const { user, invalidateUser } = useContext(UserContext);
    const [job, setJob] = useState({ state: "loading", data: {} });

    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchJob = async (id, token) => {
            const { status, data } = await getJobById(id, token);

            if (status === 200) {
                setJob({ status: "idle", data: data });
            } else if (status === 401) {
                invalidateUser();
            } else if (status === 404) {
                setJob({ state: "idle", data: {} });
                navigate("/error/404");
            } else {
                navigate(`/error/${status}`);
            }
        };

        fetchJob(id, user.token);
    }, [id, user, invalidateUser, navigate]);

    const onSubmit = async (update) => {
        const { status } = await updateJob(
            id,
            {
                company: update.company,
                status: update.status,
                position: update.position,
            },
            user.token
        );

        if (status === 200) {
            setJob({ state: "loading", data: {} });
            navigate("/dashboard");
        } else if (status === 401) {
            invalidateUser();
        } else {
            navigate(`/error/${status}`);
        }
    };

    return (
        <main className="container">
            {job.status === "loading" && (
                <FontAwesomeIcon
                    icon={faDharmachakra}
                    spin
                    size="5x"
                    className="dashboard-loading"
                />
            )}
            {job.status === "idle" && (
                <JobForm onCreate={onSubmit} job={job.data} />
            )}
        </main>
    );
};

export default Job;
