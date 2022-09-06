import { Outlet } from "react-router-dom";
import { useContext } from "react";

import { UserContext } from "../context/Context";
import Navbar from "../components/Navbar/Navbar";

const Layout = () => {
    const { user, invalidateUser } = useContext(UserContext);
    return (
        <>
            <Navbar user={user} onLogout={invalidateUser}/>
            <Outlet />
        </>
    );
};

export default Layout;
