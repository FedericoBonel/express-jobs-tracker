import React, { useContext } from "react";
import { Outlet, Navigate } from "react-router-dom";

import { UserContext } from "../../context/Context";

/**
 * Checks if the user is logged in, if so render the child elements
 * otherwise redirect to the home page
 */
const PrivateRoute = () => {
    const {user} = useContext(UserContext);
    // Outlet is a placeholder for all the children of the route component 
    // where this PrivateComponent is used
    return user ? <Outlet /> : <Navigate to="/" />;
};

export default PrivateRoute;
