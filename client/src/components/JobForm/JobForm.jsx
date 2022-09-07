import { useState } from "react";

import "./JobForm.css";

const STATUS_OPTIONS = ["interview", "pending", "declined"];

const JobForm = ({ onCreate, job }) => {
    const [jobForm, setJobForm] = useState({
        submissionStatus: "idle",
        data: job
            ? job
            : {
                  company: "",
                  position: "",
              },
    });

    const onChange = (e) => {
        setJobForm((prevJobForm) => ({
            ...prevJobForm,
            data: { ...prevJobForm.data, [e.target.name]: e.target.value },
        }));
    };

    const canSubmit =
        Boolean(jobForm.data.company) && Boolean(jobForm.data.position);

    const onSubmit = async (e) => {
        e.preventDefault();

        setJobForm((prevJobForm) => ({
            ...prevJobForm,
            submissionStatus: "loading",
        }));

        await onCreate({
            company: jobForm.data.company,
            position: jobForm.data.position,
            status: jobForm.data.status,
        });

        setJobForm({
            submissionStatus: "idle",
            data: {
                company: "",
                position: "",
            },
        });
    };

    return (
        <div className="container__jobform">
            <h2>New Job</h2>
            <form>
                <div className="jobform__user-input">
                    <label htmlFor="company">Company:</label>
                    <input
                        id="company"
                        type="text"
                        name="company"
                        value={jobForm.data.company}
                        onChange={onChange}
                        placeholder="Company..."
                    />
                </div>
                <div className="jobform__user-input">
                    <label htmlFor="position">Position:</label>
                    <input
                        id="position"
                        type="text"
                        name="position"
                        value={jobForm.data.position}
                        onChange={onChange}
                        placeholder="Position..."
                    />
                </div>
                {jobForm.data.status && (
                    <div className="jobform__user-input">
                        <label htmlFor="status">Status:</label>
                        <select
                            id="status"
                            name="status"
                            value={jobForm.data.status}
                            onChange={onChange}
                        >
                            {STATUS_OPTIONS.map((option) => (
                                <option key={option} value={option}>
                                    {option}
                                </option>
                            ))}
                        </select>
                    </div>
                )}
                <button className="jobform__submit-btn" onClick={onSubmit} disabled={!canSubmit}>
                    Submit
                </button>
            </form>
        </div>
    );
};

export default JobForm;
