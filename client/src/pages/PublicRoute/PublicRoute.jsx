import { useContext } from "react";
import { Outlet, Navigate } from "react-router-dom";

import { UserContext } from "../../context/Context";

/**
 * Checks if the user is NOT logged in, if so render the child elements
 * otherwise redirect to the home page
 */
const PublicRoute = () => {
    const {user} = useContext(UserContext);
    return user ? <Navigate to="/" /> : <Outlet />;
};

export default PublicRoute;
