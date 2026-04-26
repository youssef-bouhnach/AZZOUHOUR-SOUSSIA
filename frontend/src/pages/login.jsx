import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "../lib/axios";
import { useAuth } from "../context/authContext";
import "../styles/login.css";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { setUser } = useAuth();

  const location = useLocation();
  const verified = new URLSearchParams(location.search).get("verified");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await axios.get("/sanctum/csrf-cookie");

      const response = await axios.post("/auth/login", formData);

      setUser(response.data.user); // store user in context

      // test
      console.log("User data:", response.data.user);

      if (response.data.user.role === "admin") {
        navigate("/admin/dashboard");
      } else {
        navigate("/dashboard");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      {verified && (
        <div className="success-message">
          ✅ Email verified! You can now login.
        </div>
      )}
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Welcome Back</h2>

        {error && <div className="error-message">{error}</div>}

        <div className="input-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            placeholder="enter your email"
            autoComplete="email"
          />
        </div>

        <div className="input-group">
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            placeholder="••••••••"
            autoComplete="current-password"
          />
        </div>

        <button type="submit" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>
        <p>
          Don't have an account? please{" "}
          <span
            onClick={() => navigate("/register")}
            style={{ color: "#646cff", cursor: "pointer" }}
          >
            Register
          </span>
        </p>
      </form>
    </div>
  );
}

export default Login;
