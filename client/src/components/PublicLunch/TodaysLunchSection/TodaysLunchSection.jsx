import { useEffect, useState } from "react";
import axios from "axios";
import DishCard from "../DishCard/DishCard";
import SectionDescription from "../../Alerts/SectionDescription/SectionDescription";
import EmptyAlert from "../../Alerts/EmptyAlert/EmptyAlert";

const TodaysLunchSection = (props) => {
  const { userData } = props;
  const [todaysLunch, setTodaysLunch] = useState([]);

  const fetchTodaysLunch = () => {
    const token = localStorage.getItem("token");
    axios
      .get(`${process.env.REACT_APP_SERVER_URL}/api/v1/dishes/today`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setTodaysLunch(response.data.data || []);
      })
      .catch((error) => {
        console.error("Get today's dishes error:", error);
      });
  };

  useEffect(() => {
    fetchTodaysLunch();
  }, []);

  return (
    <section
      className="container d-flex flex-column justify-content-start align-items-center g-3"
      style={{ minHeight: "86vh" }}
    >
      <SectionDescription
        headline="Šiandienos pietūs"
        text="Šiandien mūsų virėjai gamina šiuos patiekalus. Kviečiame užsisakyti ir įvertinti."
      />
      <div className="d-flex flex-wrap w-100 justify-content-center align-items-center">
        {todaysLunch.length ? (
          todaysLunch.map((dishData, index) => {
            return (
              <DishCard
                key={index}
                dishData={dishData}
                userData={userData}
                fetchTodaysLunch={fetchTodaysLunch}
              />
            );
          })
        ) : (
          <EmptyAlert text="Atsiprašome, šiandien dienos pietų nėra." />
        )}
      </div>
    </section>
  );
};

export default TodaysLunchSection;
