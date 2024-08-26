import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

const Login = (props) => {
  const { userData, setUserData } = props;
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    if (userData.loggedIn) {
      navigate("/todays-lunch");
    }
  }, [userData.loggedIn]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    if (document.querySelector("#login-form").checkValidity()) {
      e.preventDefault();
      axios
        .post(
          `${process.env.REACT_APP_SERVER_URL}/api/v1/users/login`,
          formData
        )
        .then((response) => {
          // Issaugo token local storage
          localStorage.setItem("token", response.data.data.token);
          setUserData({
            user: response.data.data,
            loggedIn: response.data.status === "success",
          });
          if (response.data.data.role === "admin") {
            navigate("/admin-panel");
          } else {
            navigate("/todays-lunch");
          }
        })
        .catch((error) => {
          console.error("Login error:", error);
          document.getElementById("login-error-message").textContent =
            "Hmm... Kažkas ne taip.";
        });
    }
  };

  return (
    <section
      className="container d-flex justify-content-center align-items-center"
      style={{ height: "86vh" }}
    >
      <div className="mb-3 p-3">
        <form id="login-form" onSubmit={handleSubmit}>
          <div className="mb-3">
            <input
              className="form-control border border-black border-opacity-50"
              type="email"
              pattern=".+@[a-z0-9\.\-]+\.[a-z]{2,}"
              placeholder="El. pašto adresas"
              aria-label="El. pašto adresas"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <input
              className="form-control border border-black border-opacity-50"
              type="password"
              placeholder="Slaptažodis"
              aria-label="Slaptažodis"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <button
              type="submit"
              className="btn btn-dark w-100 border border-white border-opacity-25"
            >
              Prisijungti
            </button>
          </div>
          <div className="mb-3 bg-white rounded">
            <p id="login-error-message" className="text-center text-dark"></p>
          </div>
          <div className="mb-3">
            <div
              className="alert alert-light bg-white w-100 border border-white border-opacity-25 p-0"
              role="alert"
            >
              <p className="text-center text-dark m-0 p-1">
                Dar neturite paskyros?{" "}
                <Link className="link-dark" to="/register">
                  Registruotis
                </Link>
              </p>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Login;
