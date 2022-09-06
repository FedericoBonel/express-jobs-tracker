import "./Navbar.css";

const Navbar = ({ user, onLogout }) => {

    const onSignout = (e) => {
        e.preventDefault();

        onLogout();
    }

    return (
        <nav className="navbar">
            <h1>Job Tracker</h1>
            <div className="navbar__right">
                <p>Hello {user.name}</p>
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
