import { useState, useEffect } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import Header from "../BodyElements/Header/Header";
import Registration from "../Auth/Registration/Registration";
import Login from "../Auth/Login/Login";
import AdminPanelSection from "../AdminPanel/AdminPanelSection/AdminPanelSection";
import TodaysLunchSection from "../PublicLunch/TodaysLunchSection/TodaysLunchSection";
import AllLunchSection from "../PublicLunch/AllLunchSection/AllLunchSection";
import OrdersSection from "../PublicLunch/OrdersSection/OrdersSections";
import Footer from "../BodyElements/Footer/Footer";

const RouterWrapper = () => {
  const [userData, setUserData] = useState({
    userData: { user: {} },
    loggedIn: false,
  });
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      axios
        .get(`${process.env.REACT_APP_SERVER_URL}/api/v1/users/details`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          setUserData({
            user: { ...response.data.user, id: response.data.user._id },
            loggedIn: true,
          });
        })
        .catch((error) => {
          console.error("User details error:", error);
        });
    } else if (!["/", "/register"].includes(location.pathname)) {
      navigate("/"); // tikrina ar pathname yra bet kas apart logino ir registration ir nuveda i logina, bet neismeta is registration
    }
  }, [userData.loggedIn, navigate, setUserData, location.pathname]);

  return (
    <>
      <Header userData={userData} setUserData={setUserData} />
      <main>
        <Routes>
          <Route
            path="/"
            exact
            element={<Login userData={userData} setUserData={setUserData} />}
          />
          <Route path="/register" element={<Registration />} />
          <Route
            path="/todays-lunch"
            element={<TodaysLunchSection userData={userData} />}
          />
          <Route
            path="/all-lunch"
            element={<AllLunchSection userData={userData} />}
          />
          <Route
            path="/orders"
            element={<OrdersSection userData={userData} />}
          />
          <Route
            path="/admin-panel"
            element={
              <AdminPanelSection
                userData={userData}
                setUserData={setUserData}
              />
            }
          />
        </Routes>
      </main>
      <Footer />
    </>
  );
};

export default RouterWrapper;
