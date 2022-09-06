import { useState } from "react";
import {
    BrowserRouter as Router,
    Route,
    Routes,
    Navigate,
} from "react-router-dom";
import Cookies from "js-cookie";

import {
    Home,
    PrivateRoute,
    Dashboard,
    Job,
    PublicRoute,
    Login,
    Error,
    Register,
} from "./pages";
import { UserContext } from "./context/Context";
import Layout from "./layout/Layout";
import "./App.css";

const savedCookie = Cookies.get("user");

const App = () => {
    const [user, setUser] = useState(
        savedCookie ? JSON.parse(savedCookie) : null
    );

    const invalidateUser = () => {
        Cookies.remove("user");
        setUser();
    };

    const validateUser = (user) => {
        Cookies.set("user", JSON.stringify(user));
        setUser(user);
    };

    return (
        <Router>
            <UserContext.Provider
                value={{ user, invalidateUser, validateUser }}
            >
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/" element={<PrivateRoute />}>
                        <Route path="/" element={<Layout />}>
                            <Route path="/dashboard" element={<Dashboard />} />
                            <Route path="/jobs/edit/:id" element={<Job />} />
                        </Route>
                    </Route>
                    <Route path="/" element={<PublicRoute />}>
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                    </Route>
                    <Route path="/error/:code" element={<Error />} />
                    <Route path="*" element={<Navigate to={"/error/404"} />} />
                </Routes>
            </UserContext.Provider>
        </Router>
    );
};

export default App;
