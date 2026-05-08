import { useState } from "react";
import axios from "../lib/axios";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/authContext";
import "../styles/login.css";

function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const location = useLocation();
  const { setUser } = useAuth();

  // Read ?redirect= so we can send the user back after registration
  const params = new URLSearchParams(location.search);
  const redirectTo = params.get("redirect") || "/";

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});

    try {
      const response = await axios.post("/auth/register", formData);

      // Auto-login after register — store user in context
      if (response.data.user) {
        setUser(response.data.user);
        navigate(redirectTo);
      } else {
        // Email verification required
        navigate("/verify-email");
      }
    } catch (err) {
      if (err.response?.status === 422) {
        setErrors(err.response.data.errors);
      } else {
        alert("Something went wrong: " + err.response?.status);
      }
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Create Account</h2>

        <div className="input-group">
          <label>Full Name</label>
          <input
            type="text"
            name="name"
            onChange={handleChange}
            required
            autoComplete="name"
          />
          {errors.name && <span className="error-text">{errors.name[0]}</span>}
        </div>

        <div className="input-group">
          <label>Email Address</label>
          <input
            type="email"
            name="email"
            onChange={handleChange}
            required
            autoComplete="email"
          />
          {errors.email && (
            <span className="error-text">{errors.email[0]}</span>
          )}
        </div>

        <div className="input-group">
          <label>Password</label>
          <input
            type="password"
            name="password"
            onChange={handleChange}
            required
            autoComplete="new-password"
          />
          {errors.password && (
            <span className="error-text">{errors.password[0]}</span>
          )}
        </div>

        <div className="input-group">
          <label>Confirm Password</label>
          <input
            type="password"
            name="password_confirmation"
            onChange={handleChange}
            required
            autoComplete="new-password"
          />
        </div>

        <button type="submit">Register</button>
        <p style={{ marginTop: "10px" }}>
          Already have an account?{" "}
          <span
            onClick={() => navigate(`/login${location.search}`)}
            style={{ color: "#646cff", cursor: "pointer" }}
          >
            Login
          </span>
        </p>
      </form>
    </div>
  );
}

export default Register;
