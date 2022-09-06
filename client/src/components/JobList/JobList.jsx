import { memo } from "react";

import "./JobList.css";
import JobExcerpt from "../JobExcerpt/JobExcerpt";

let JobList = ({ jobs, onDelete }) => {
    const renderedJobs = jobs.map((job) => (
        <JobExcerpt key={job._id} job={job} onDelete={() => onDelete(job._id)} />
    ));
    return <div className="joblist__container">{renderedJobs}</div>;
};

export default memo(JobList);
