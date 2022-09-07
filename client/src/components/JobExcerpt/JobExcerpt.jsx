import { memo } from "react";
import { Link } from "react-router-dom";

import "./JobExcerpt.css";

let JobExcerpt = ({ job, onDelete }) => {
    const date = new Date(job.createdAt);
    const stringDate = `${date.toUTCString().substring(0, 16)}`;

    return (
        <div className="joblist__item">
            <p className="joblist__item-date">{stringDate}</p>
            <h3>{job.position}</h3>
            <p className="joblist__item-company">{job.company}</p>
            <p className="joblist__item-status">{`${job.status.toUpperCase()}`}</p>
            <div className="joblist__item-inputrow">
                <Link
                    className="joblist__item-editbtn"
                    to={`/jobs/edit/${job._id}`}
                >
                    Edit
                </Link>
                <button className="joblist__item-deletebtn" onClick={onDelete}>
                    Delete
                </button>
            </div>
        </div>
    );
};

export default memo(JobExcerpt);
