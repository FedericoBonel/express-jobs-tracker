import { useState, useContext } from "react";
import { Link } from "react-router-dom";

import "./Login.css";
import { authenticate } from "../../api/AuthApi";
import { UserContext } from "../../context/Context";

const Login = () => {
    const { validateUser } = useContext(UserContext);
    const [loginForm, setLoginForm] = useState({
        password: "",
        email: "",
        status: "idle",
    });

    const onType = (e) => {
        setLoginForm((prevForm) => ({
            ...prevForm,
            [e.target.name]: e.target.value,
        }));
    };

    const onSubmit = async (e) => {
        e.preventDefault();

        setLoginForm((prevUser) => ({ ...prevUser, status: "loading" }));

        const { status, data } = await authenticate(loginForm);

        if (status === 200) {
            setLoginForm({
                password: "",
                email: "",
                status: "idle",
            });

            validateUser({
                id: data.user._id,
                name: data.user.name,
                token: data.token,
            });
        } else if (status === 401) {
            setLoginForm((prevForm) => ({ ...prevForm, status: "rejected" }));
        } else {
            setLoginForm((prevForm) => ({ ...prevForm, status: "error" }));
        }
    };

    return (
        <main className="container">
            <form className="container__login-form">
                <h1>Sign in</h1>
                <div className="user-input">
                    <label htmlFor="email">Email:</label>
                    <input
                        id="email"
                        type="email"
                        name="email"
                        value={loginForm.email}
                        onChange={onType}
                        placeholder="your@email.com"
                    />
                </div>

                <div className="user-input">
                    <label htmlFor="password">Password:</label>
                    <input
                        id="password"
                        type="password"
                        name="password"
                        value={loginForm.password}
                        onChange={onType}
                    />
                </div>

                <button className="form-submit-btn" onClick={onSubmit}>
                    Sign in
                </button>

                <p className="form-signup-btn" >
                    or{" "}
                    <Link to="/register">
                        Sign up
                    </Link>
                </p>

                {loginForm.status === "rejected" && (
                    <div className="error-div">
                        Email or password are incorrect
                    </div>
                )}

                {loginForm.status === "error" && (
                    <div>An error occurred! Please refresh and try again</div>
                )}
            </form>
        </main>
    );
};

export default Login;
