import { useEffect } from "react";
import axios from "axios";
import { translateDay } from "../../../apiDataUtils";

const AdminPanelDishTable = (props) => {
  const { setIsCreating, setEditId, setFormData, dishes, getDishes } = props;
  const token = localStorage.getItem("token");

  useEffect(() => {
    getDishes();
  }, []);

  const handleEdit = (id) => {
    setIsCreating(false);
    setEditId(id);
  };

  const deleteHandler = (id) => {
    axios
      .delete(`${process.env.REACT_APP_SERVER_URL}/api/v1/dishes/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        getDishes();
      })
      .catch((error) => {
        console.error("Dish delete error:", error);
      });
  };

  return (
    <div
      className="table-responsive p-3 overflow-y-scroll"
      style={{ height: "45vh" }}
    >
      <table className="table mb-3 w-100">
        <thead>
          <tr>
            <th scope="col">Veiksmai</th>
            <th scope="col">Pavadinimas</th>
            <th scope="col">Diena</th>
            <th scope="col">Kaina</th>
            <th scope="col">Aprašymas</th>
            <th scope="col">Nuotrauka</th>
          </tr>
        </thead>
        <tbody>
          {dishes.length > 0 ? (
            dishes.map((dish, index) => (
              <tr key={index} id={dish._id}>
                <td className="dropdown text-center">
                  <a
                    type="button"
                    className="text-dark "
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <i className="bi bi-three-dots-vertical"></i>
                  </a>
                  <ul className="dropdown-menu">
                    <li>
                      <a
                        type="button"
                        className="dropdown-item"
                        data-bs-toggle="modal"
                        data-bs-target="#dish-form"
                        onClick={() => {
                          handleEdit(dish._id);
                          setFormData({
                            name: dish.name,
                            description: dish.description,
                            photo: dish.photo,
                            price: dish.price,
                            day: dish.day,
                          });
                        }}
                      >
                        Redaguoti
                      </a>
                    </li>
                    <li>
                      <a
                        type="button"
                        className="dropdown-item"
                        onClick={() => {
                          deleteHandler(dish._id);
                        }}
                      >
                        Trinti
                      </a>
                    </li>
                  </ul>
                </td>
                <td className="text-truncate" style={{ with: "60px" }}>
                  {dish.name}
                </td>
                <td className="text-truncate">{translateDay(dish.day)}</td>
                <td className="text-truncate">{dish.price}</td>
                <td className="text-truncate">{dish.description}</td>
                <td className="text-truncate">{dish.photo}</td>
              </tr>
            ))
          ) : (
            <tr key="empty">
              <td className="text-center" colSpan={7}>
                Valgiaraštis tuščias
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AdminPanelDishTable;
