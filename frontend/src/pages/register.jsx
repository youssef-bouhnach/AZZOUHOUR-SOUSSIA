import { useState } from "react";
import axios from "../lib/axios";
import { useNavigate } from "react-router-dom";
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

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});

    try {
      await axios.get("/sanctum/csrf-cookie");
      const response = await axios.post("/auth/register", formData);
      console.log("Cookies after csrf:", document.cookie);
      console.log("User registered:", response.data);

      alert("Registration Successful! Please login.");

      navigate("/login");
    } catch (err) {
      if (err.response?.status === 422) {
        setErrors(err.response.data.errors);
      } else {
        console.log("Status:", err.response?.status);
        console.log("Data:", err.response?.data);
        console.log("Full error:", err);
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
            onClick={() => navigate("/login")}
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
