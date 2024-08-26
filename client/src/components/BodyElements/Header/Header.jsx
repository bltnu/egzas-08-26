import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Header = (props) => {
  const { userData, setUserData } = props;
  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear();
    setUserData({ user: null, loggedIn: false });
    navigate("/");
  };

  return (
    <header style={{ height: "7vh" }}>
      {userData.loggedIn && (
        <nav
          className="navbar navbar-expand-lg bg-dark justify-content-end z-3"
          data-bs-theme="dark"
        >
          <div className="container-fluid">
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div
              className="collapse navbar-collapse justify-content-end"
              id="navbarNav"
            >
              <ul className="navbar-nav">
                <li className="nav-item">
                  <Link className="nav-link text-white" to="/todays-lunch">
                    Šiandienos pietūs
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link text-white" to="/all-lunch">
                    Visi patiekalai
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link text-white" to="/orders">
                    Mano užsakymai
                  </Link>
                </li>
                <li className="nav-item">
                  <a
                    className="nav-link text-white"
                    type="button"
                    onClick={logout}
                  >
                    Atsijungti
                  </a>
                </li>
                {userData.user?.role === "admin" && (
                  <li className="nav-item">
                    <Link className="nav-link text-white" to="/admin-panel">
                      <i aria-label="Meniu valdymas" className="bi bi-gear"></i>
                    </Link>
                  </li>
                )}
              </ul>
            </div>
          </div>
        </nav>
      )}
    </header>
  );
};

export default Header;
