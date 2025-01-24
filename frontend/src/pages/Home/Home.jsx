import { Link } from "react-router-dom";
import "./Home.css";

const Home = () => {
  return (
    <div className="home-page">
      <h1>Welcome to Signup Project</h1>
      <p>Please Login or Sigup to access this portal...</p>
      <div className="auth-button">
        <Link className="auth-links" to="/login">
          Login
        </Link>
        <Link className="auth-links" to="/api/auth/signup">
          Signup
        </Link>
      </div>
    </div>
  );
};

export default Home;
