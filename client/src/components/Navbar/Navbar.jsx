import {Link} from "react-router-dom";

import "./Navbar.css";

const Navbar = ({ user, onLogout }) => {

    const onSignout = (e) => {
        e.preventDefault();

        onLogout();
    }

    return (
        <nav className="navbar">
            <h1><Link className="navbar__left-icon" to="/">Job Tracker</Link></h1>
            <div className="navbar__right">
                <p className="navbar__right-message">Hello {user.name}</p>
                <a
                    className="navbar__right-signout"
                    href="/"
                    onClick={onSignout}
                >
                    Sign out
                </a>
            </div>
        </nav>
    );
};

export default Navbar;
