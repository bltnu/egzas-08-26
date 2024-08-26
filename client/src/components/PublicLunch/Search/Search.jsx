import { useState } from "react";
import axios from "axios";

const Search = (props) => {
  const { setAllLunch } = props;
  const [formData, setFormData] = useState({
    day: "",
    name: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    axios
      .get(`${process.env.REACT_APP_SERVER_URL}/api/v1/dishes/search`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          day: formData.day,
          name: formData.name,
        },
      })
      .then((response) => {
        setAllLunch(response.data.data);
      })
      .catch((error) => {
        console.error("Get filtered dishes error:", error);
      });
  };

  return (
    <div className="m-3">
      <form onSubmit={onSubmit}>
        <div className="input-group">
          <select
            className="form-select border border-black border-opacity-50"
            aria-label="Diena"
            name="day"
            value={formData.day}
            onChange={handleChange}
          >
            <option value="" disabled>
              Pasirinkite dieną
            </option>
            <option value="Mon">Pirmadienis</option>
            <option value="Tue">Antradienis</option>
            <option value="Wed">Trečiadienis</option>
            <option value="Thu">Ketvirtadienis</option>
            <option value="Fri">Penktadienis</option>
            <option value="Sat">Šeštadienis</option>
            <option value="Sun">Sekmadienis</option>
            <option value="">Bet kuri diena</option>
          </select>
          <input
            type="text"
            aria-label="Pavadinimas"
            placeholder="Įrašykite pavadinimą"
            className="form-control border border-black border-opacity-50"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
          <button type="submit" className="btn btn-dark">
            Ieškoti
          </button>
        </div>
      </form>
    </div>
  );
};

export default Search;
