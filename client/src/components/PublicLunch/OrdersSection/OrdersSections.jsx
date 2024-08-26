import { useState, useEffect } from "react";
import axios from "axios";
import DishCard from "../DishCard/DishCard";
import { convertDate } from "../../../apiDataUtils";
import SectionDescription from "../../Alerts/SectionDescription/SectionDescription";
import EmptyAlert from "../../Alerts/EmptyAlert/EmptyAlert";

const OrdersSection = (props) => {
  const { userData } = props;
  const [allOrders, setAllOrders] = useState([]);

  useEffect(() => {
    if (userData.user?.id) {
      const token = localStorage.getItem("token");
      axios
        .get(
          `${process.env.REACT_APP_SERVER_URL}/api/v1/dishes/${userData.user?.id}/orders`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((response) => {
          setAllOrders(response.data.data || []);
        })
        .catch((error) => {
          console.error("Get all dishes error:", error);
        });
    }
  }, [userData.user]);

  return (
    <section
      className="container d-flex flex-column justify-content-start align-items-center"
      style={{ minHeight: "86vh" }}
    >
      <SectionDescription
        headline="Užsakymų istorija"
        text="Čia rasite visų savo užsakymus."
      />
      <div className="d-flex flex-wrap w-100 justify-content-center align-items-center">
        {allOrders.length ? (
          allOrders.map((dishData, index) => (
            <div key={index} className="position-relative">
              <DishCard dishData={dishData.dish} userData={userData}>
                <span
                  aria-label="Užsakymo data"
                  className="position-absolute top-0 start-50 translate-middle badge bg-dark border border-white border-opacity-25"
                >
                  {convertDate(dishData.createdAt)}
                  <span className="visually-hidden">Užsakymo data</span>
                </span>
              </DishCard>
            </div>
          ))
        ) : (
          <EmptyAlert text="Užsakymų nėra." />
        )}
      </div>
    </section>
  );
};

export default OrdersSection;
