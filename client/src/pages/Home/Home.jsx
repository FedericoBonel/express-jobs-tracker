import { useContext } from "react";
import { Navigate, Link } from "react-router-dom";

import "./Home.css";
import briefcase from "../../assets/images/main.svg";
import { UserContext } from "../../context/Context";

const Home = () => {
    const { user } = useContext(UserContext);

    const homePage = (
        <div className="container__home">
            <div className="container__home-card">
                <div className="container__home-text">
                    <h1>Job Tracker</h1>
                    <p className="container__home-description">
                        Have you ever applied to so many different jobs and
                        internships that you lost track of which ones were
                        pending, which ones were declined, and when did you
                        apply to one or another? If so, you are in the right
                        place, this website allows you to keep track and
                        organize all your jobs applications in a simple and
                        minimalistic manner. 
                        {`\n`}
                        This way, if you ever feel lost or
                        you don't remember if you already applied for a specific
                        company you can always look back at all your previous
                        submissions!
                    </p>
                    <Link className="container__home-login" to="/login">
                        Sign in
                    </Link>
                    <Link className="container__home-signup" to="/register">
                        Sign up
                    </Link>
                </div>
                <img className="container__icon" src={briefcase} alt="icon" />
            </div>
        </div>
    );

    return (
        <>
            {user && <Navigate to="/dashboard" />}
            {homePage}
        </>
    );
};

export default Home;
