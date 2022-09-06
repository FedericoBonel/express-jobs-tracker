import { useContext } from "react";
import { Navigate, Link } from "react-router-dom";

import "./Home.css";
import briefcase from "../../assets/images/main.svg";
import { UserContext } from "../../context/Context";

const Home = () => {
    const {user} = useContext(UserContext);

    const homePage = (
        <div className="container">
            <div className="container-card">
                <div className="container__text">
                    <h1>Job Tracker</h1>
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                        sed do eiusmod tempor incididunt ut labore et dolore
                        magna aliqua. Sed cras ornare arcu dui. Nibh mauris
                        cursus mattis molestie a iaculis. Praesent tristique
                        magna sit amet purus. In massa tempor nec feugiat nisl
                        pretium fusce.
                    </p>
                    <Link className="container__login-btn" to="/login">
                        Sign in
                    </Link>
                    <Link className="container__signup-btn" to="/register">
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
