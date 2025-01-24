import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signupUser } from "../features/user/userSlice";
import axios from "axios";
import { toast } from "react-toastify";

const SignupForm = () => {
  const dispatch = useDispatch();
  const { otpRequired, loading, error } = useSelector((state) => state.user);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
  });
  const [otp, setOtp] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateInputs = () => {
    const { email, password, confirmPassword } = formData;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Check if email format is correct
    if (!emailRegex.test(email)) {
      toast.error("Invalid email format.");
      return false;
    }

    // Check if password is at least 8 characters
    if (password.length < 8) {
      toast.error("Password must be at least 8 characters long.");
      return false;
    }

    // Check if passwords match
    if (password !== confirmPassword) {
      toast.error("Passwords do not match.");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateInputs()) return;

    try {
      // Dispatch signup action
      dispatch(signupUser(formData));

      // Show success notification after signup attempt
      toast.success("Signup request sent. Please check your email for OTP.");
    } catch (error) {
      // Show error notification if signup fails
      toast.error(error.response?.data?.message || "Signup failed.");
    }
  };

  const handleOtpSubmit = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8080/api/auth/verify-otp",
        { otp }
      );
      toast.success(response.data.message || "Verification successful!");
    } catch (error) {
      toast.error(error.response?.data?.message || "OTP verification failed.");
    }
  };

  return (
    <div className="signup-form">
      <h2>Signup</h2>

      {/* If OTP is not required, show the signup form */}
      {!otpRequired ? (
        <form onSubmit={handleSubmit}>
          <div>
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Password:</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Confirm Password:</label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Phone (optional):</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
            />
          </div>
          <button type="submit" disabled={loading}>
            {loading ? "Signing up..." : "Signup"}
          </button>
        </form>
      ) : (
        // If OTP is required, show OTP verification form
        <div>
          <label>Enter OTP:</label>
          <input
            type="text"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            required
          />
          <button onClick={handleOtpSubmit} disabled={loading}>
            Verify OTP
          </button>
        </div>
      )}

      {error && <p className="error">{error}</p>}
    </div>
  );
};

export default SignupForm;
