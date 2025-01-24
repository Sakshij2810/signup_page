import { Route, Routes } from "react-router-dom";
import Home from "./Pages/Home/Home";

import SignupForm from "./components/SignupForm";
import LoginForm from "./components/LoginForm";

const AllRoutes = () => {
  return (
    <Routes>
      <Route exact path="/" Component={Home} />
      <Route exact path="/login" Component={LoginForm} />
      <Route exact path="/api/auth/signup" Component={SignupForm} />
    </Routes>
  );
};

export default AllRoutes;
