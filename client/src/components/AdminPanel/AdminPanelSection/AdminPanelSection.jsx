import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import AdminPanelNewDishForm from "../AdminPanelNewDishForm/AdminPanelNewDishForm";
import AdminPanelDishTable from "../AdminPanelDishTable/AdminPanelDishTable";
import SectionDescription from "../../Alerts/SectionDescription/SectionDescription";

const AdminPanelSection = (props) => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const { userData } = props;
  const [isCreating, setIsCreating] = useState(true);
  const [editId, setEditId] = useState(null);
  const [dishes, setDishes] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    photo: "",
    price: "",
    day: "",
  });

  useEffect(() => {
    if (userData.user?.role && userData.user?.role !== "admin") {
      navigate("/todays-lunch");
    }
  }, [userData.user]);

  const getDishes = () => {
    axios
      .get(`${process.env.REACT_APP_SERVER_URL}/api/v1/dishes`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setDishes(response.data.data || []);
      })
      .catch((error) => {
        console.error("Get all dishes error:", error);
      });
  };

  return (
    <section
      className="container d-flex flex-column justify-content-center align-items-center"
      style={{ minHeight: "86vh" }}
    >
      <SectionDescription
        headline="Valgiaraščio valdymas"
        text="Čia matomi visi patiekalai. Naujus patiekalus pridėti galima paspaudus apskritą pliuso ženklą. Redaguoti ar trinti valgiaraščio patiekalus galima paspaudus ant trijų vertikalių taškų patiekalo kairėje."
      />
      <div className="container bg-white rounded d-flex flex-column justify-content-center border border-black border-opacity-50 p-3">
        <div className="mb-3">
          <a
            href=""
            className="link-dark"
            aria-label="Naujas patiekalas"
            data-bs-toggle="modal"
            data-bs-target="#dish-form"
          >
            <i className="bi bi-plus-circle-fill h1"></i>
          </a>
          <AdminPanelNewDishForm
            setFormData={setFormData}
            formData={formData}
            userData={userData}
            isCreating={isCreating}
            editId={editId}
            getDishes={getDishes}
          />
        </div>
        <div className="mb-3">
          <AdminPanelDishTable
            setFormData={setFormData}
            setIsCreating={setIsCreating}
            setEditId={setEditId}
            dishes={dishes}
            getDishes={getDishes}
          />
        </div>
      </div>
    </section>
  );
};

export default AdminPanelSection;
