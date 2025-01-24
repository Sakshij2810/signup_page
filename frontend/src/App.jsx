import { BrowserRouter as Router } from "react-router-dom";
import AllRoutes from "./AllRoutes.jsx";
import "./App.css";

const App = () => {
  return (
    <div className="App">
      <Router>
        <AllRoutes />
      </Router>
    </div>
  );
};

export default App;
