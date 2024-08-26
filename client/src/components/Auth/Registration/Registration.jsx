import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Registration = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (document.querySelector("#registration-form").checkValidity()) {
      axios
        .post(
          `${process.env.REACT_APP_SERVER_URL}/api/v1/users/register`,
          formData
        )
        .then(() => {
          navigate("/");
        })
        .catch((error) => {
          console.error("Registration error:", error);
          document.getElementById("register-error-message").textContent =
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
        <form id="registration-form" onSubmit={handleSubmit}>
          <div className="mb-3">
            <input
              className="form-control border border-black border-opacity-50"
              type="text"
              placeholder="Slapyvardis"
              aria-label="Slapyvardis"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>
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
          <div className="mb-3 input-group">
            <input
              className="form-control border border-black border-opacity-50"
              type="password"
              minLength="8"
              pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$"
              placeholder="Slaptažodis"
              aria-label="Slaptažodis"
              aria-describedby="password-info"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <span
              className="input-group-text dropdown border border-black border-opacity-50"
              id="password-info"
            >
              <a
                href=""
                className="link-dark"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <i className="bi bi-info-circle"></i>
              </a>
              <ul className="dropdown-menu p-3">
                <li>Bent 8 simbolių ilgio</li>
                <li>Bent 1 mažoji raidė</li>
                <li>Bent 1 didžioji raidė</li>
                <li>Bent 1 skaičius</li>
                <li>Bent 1 specialusis simbolis</li>
              </ul>
            </span>
          </div>
          <div className="mb-3">
            <button
              type="submit"
              className="btn btn-dark w-100 border border-white border-opacity-25"
            >
              Registruotis
            </button>
          </div>
          <div className="mb-3 bg-white rounded">
            <p
              id="register-error-message"
              className="text-center text-dark"
            ></p>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Registration;
