import { useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDharmachakra } from "@fortawesome/free-solid-svg-icons";

import "./Register.css";
import { registerUser } from "../../api/AuthApi";

const Register = () => {
    const [registerForm, setRegisterForm] = useState({
        status: "idle",
        email: "",
        password: "",
        confirmPassword: "",
        name: "",
    });

    const onChange = (e) => {
        setRegisterForm((prevForm) => ({
            ...prevForm,
            [e.target.name]: e.target.value,
        }));
    };

    const canRegister =
        Boolean(registerForm.email) &&
        Boolean(registerForm.name) &&
        Boolean(registerForm.password) &&
        registerForm.password === registerForm.confirmPassword;

    const onSubmission = async (e) => {
        e.preventDefault();

        setRegisterForm((prevForm) => ({ ...prevForm, status: "loading" }));

        const { status } = await registerUser({
            email: registerForm.email,
            password: registerForm.password,
            name: registerForm.name,
        });

        if (status === 201) {
            setRegisterForm({
                status: "success",
                email: "",
                password: "",
                confirmPassword: "",
                name: "",
            });
        } else if (status === 400) {
            setRegisterForm((prevForm) => ({
                ...prevForm,
                status: "rejected",
            }));
        } else {
            setRegisterForm((prevForm) => ({ ...prevForm, status: "error" }));
        }
    };

    return (
        <main className="container">
            <form className="container__signup-form">
                <h1>Sign Up</h1>
                <div className="user-input">
                    <label htmlFor="name">Name:</label>
                    <input
                        id="name"
                        type="text"
                        name="name"
                        value={registerForm.name}
                        onChange={onChange}
                        placeholder="Luna Smith"
                    />
                </div>

                <div className="user-input">
                    <label htmlFor="email">Email:</label>
                    <input
                        id="email"
                        type="email"
                        name="email"
                        value={registerForm.email}
                        onChange={onChange}
                        placeholder="your@email.com"
                    />
                </div>

                <div className="user-input">
                    <label htmlFor="password">Password:</label>
                    <input
                        id="password"
                        type="password"
                        name="password"
                        value={registerForm.password}
                        onChange={onChange}
                        placeholder="password..."
                    />
                </div>

                <div className="user-input">
                    <label htmlFor="confirmPassword">Confirm Password:</label>
                    <input
                        id="confirmPassword"
                        type="password"
                        name="confirmPassword"
                        value={registerForm.confirmPassword}
                        onChange={onChange}
                        placeholder="repeat password..."
                    />
                </div>

                <button
                    className="form-submit-btn"
                    disabled={!canRegister}
                    onClick={onSubmission}
                >
                    Sign Up
                </button>

                <p className="form-signin-btn">
                    or <Link to="/login">Sign in</Link>
                </p>

                {registerForm.status === "loading" && (
                    <FontAwesomeIcon icon={faDharmachakra} spin size="5x" />
                )}

                {registerForm.status === "rejected" && (
                    <div className="error-div">
                        User with that email already exists
                    </div>
                )}

                {registerForm.status === "error" && (
                    <div>An error occurred! Please refresh and try again</div>
                )}

                {registerForm.status === "success" && (
                    <div>
                        <p>
                            Your email has been registered, please{" "}
                            <Link to="/login">sign in</Link> to continue
                        </p>
                    </div>
                )}
            </form>
        </main>
    );
};

export default Register;
