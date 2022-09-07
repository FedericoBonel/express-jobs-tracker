import { useParams, Navigate, Link } from "react-router-dom";

import "./Error.css";

const Error = () => {
    const { code } = useParams();

    const errorToRender = (code) => {
        if (code === "404") {
            return (
                <p className="error-description">
                    We seem to not be able to find that page!
                </p>
            );
        } else if (code === "401") {
            return <Navigate to={"/login"} />;
        } else {
            return (
                <p className="error-description">
                    An error occurred please try again!
                </p>
            );
        }
    };

    return (
        <main className="container">
            <div className="error-card">
            <h1 className="error-title">Error!</h1>
            {errorToRender(code)}
            <p className="error-back">
                <Link to={"/"}>Go back home</Link>.
            </p>
            </div>
        </main>
    );
};

export default Error;
