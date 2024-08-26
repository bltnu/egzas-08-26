import { translateDay } from "../../../apiDataUtils";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";

const DishCard = (props) => {
  const { dishData, userData, children, fetchAllLunch, fetchTodaysLunch } =
    props;
  // console.log(dishData);
  const navigate = useNavigate();
  const location = useLocation();
  const today = Date().slice(0, 3);
  const token = localStorage.getItem("token");
  const placeOrder = (userId, dishId) => {
    axios
      .post(
        `${process.env.REACT_APP_SERVER_URL}/api/v1/dishes/${userId}/orders/${dishId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          // pridedu tuscia object, nes nesiunciu paciu duomenu, o tik parametrus, pagal kuriuos duombaze pati sudes user ir dish i order
        }
      )
      .then(() => {
        navigate("/orders");
      })
      .catch((error) => {
        console.error("Order error:", error);
      });
  };

  const enableLikeBtn = (likes) => {
    if (likes.length === 0) {
      return false;
    } else {
      return likes.some((like) => like.user._id === userData.user.id);
    }
  };

  const likeDish = (dishId, userId) => {
    axios
      .post(
        `${process.env.REACT_APP_SERVER_URL}/api/v1/dishes/${dishId}/likes/${userId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          // pridedu tuscia object, nes siunciu parametrus ir default Like verte (1)
        }
      )
      .then(() => {
        if (location.pathname === "/all-lunch") {
          fetchAllLunch();
        } else if (location.pathname === "/todays-lunch") {
          fetchTodaysLunch();
        }
      })
      .catch((error) => {
        console.error("Order error:", error);
      });
  };

  return (
    <div
      className="card border border-black border-opacity-50 m-3 rounded"
      style={{ width: "18rem" }}
    >
      {children}
      <div className="w-100 rounded-top" style={{ height: "200px" }}>
        <img
          src={dishData.photo}
          className="w-100 rounded-top"
          alt={dishData.name}
          style={{
            height: "200px",
            objectFit: "cover",
          }}
        />
      </div>
      <div className="card-body" style={{ height: "120px" }}>
        <h5 className="card-title">{dishData.name}</h5>
        <p className="card-text">{dishData.description}</p>
      </div>
      <div
        className="card-body d-flex justify-content-evenly"
        style={{ height: "80px" }}
      >
        <p className="card-text">
          <i className="bi bi-currency-euro"></i>
          <span>{dishData.price}</span>
        </p>
        <p className="card-text">
          <i className="bi bi-calendar-event"></i>{" "}
          <span>{translateDay(dishData.day)}</span>
        </p>
      </div>
      {location.pathname !== "/orders" && (
        <div className="card-footer d-flex justify-content-evenly">
          <button
            type="button"
            className={
              dishData.day === today
                ? "btn btn-success w-50 mx-1"
                : "btn btn-secondary w-50 mx-1"
            }
            aria-label={
              dishData.day === today
                ? "Užsakyti"
                : "Užsakymas galimas kitą dieną"
            }
            disabled={dishData.day === today ? false : true}
            onClick={() => {
              placeOrder(userData.user.id, dishData._id);
            }}
          >
            <i className="bi bi-bag-plus"></i>
          </button>
          <button
            type="button"
            onClick={() => likeDish(dishData._id, userData.user.id)}
            className="btn btn-warning w-50 mx-1"
            disabled={enableLikeBtn(dishData.likes)}
            aria-label="Įvertinimas"
          >
            <span className="text-white">
              {dishData.likes?.length ? dishData.likes.length : ""}
            </span>{" "}
            <i
              className={
                dishData.likes?.length
                  ? "bi bi-star-fill text-white"
                  : "bi bi-star text-white"
              }
            ></i>
          </button>
        </div>
      )}
    </div>
  );
};

export default DishCard;
