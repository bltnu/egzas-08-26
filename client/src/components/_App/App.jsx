import { BrowserRouter as Router } from "react-router-dom";
import cowBlob from "./cow-blob.svg";
import RouterWrapper from "../RouterWrapper/RouterWrapper";

const App = () => {
  return (
    <div
      style={{
        backgroundImage: `url(${cowBlob})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        minHeight: "86vh",
      }}
    >
      <Router>
        <RouterWrapper />
      </Router>
    </div>
  );
};

export default App;
