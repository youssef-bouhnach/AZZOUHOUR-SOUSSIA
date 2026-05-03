import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../lib/axios";
import { useAuth } from "../context/authContext";
import { Mail, Lock, Eye, EyeOff, Leaf, Sparkles } from "lucide-react";
import "../styles/login.css";

export default function LoginPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  const { setUser } = useAuth();

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
      setUser(response.data.user);

      if (response.data.user.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      {/* Floating leaves animation */}
      <div className="floating-leaves">
        <Leaf className="leaf leaf-1" />
        <Leaf className="leaf leaf-2" />
        <Leaf className="leaf leaf-3" />
        <Leaf className="leaf leaf-4" />
      </div>

      <div className="auth-card">
        {/* Logo & Header */}
        <div className="auth-header">
          <div className="logo-circle">
            <Sparkles className="logo-icon" />
          </div>
          <h1 className="auth-title">Welcome Back</h1>
          <p className="auth-subtitle">Sign in to AZZOUHOUR-SOUSSIA</p>
        </div>

        <form className="auth-form" onSubmit={handleSubmit}>
          {error && (
            <div className="error-banner">
              <div className="error-icon">⚠️</div>
              <div>
                <div className="error-title">Authentication Failed</div>
                <div className="error-message">Invalid email or password. Please try again.</div>
              </div>
            </div>
          )}

          <div className="form-group">
            <label className="form-label">
              <Mail className="label-icon" />
              Email Address
            </label>
            <div className="input-wrapper">
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="your@email.com"
                autoComplete="email"
                className="form-input"
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">
              <Lock className="label-icon" />
              Password
            </label>
            <div className="input-wrapper password-wrapper">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                placeholder="••••••••"
                autoComplete="current-password"
                className="form-input"
              />
              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <button type="submit" disabled={loading} className="submit-btn">
            {loading ? (
              <>
                <div className="spinner"></div>
                Signing in...
              </>
            ) : (
              <>
                <Leaf className="btn-icon" />
                Sign In
              </>
            )}
          </button>

          <div className="auth-footer">
            <p className="footer-text">
              Don't have an account?{" "}
              <span className="footer-link" onClick={() => navigate("/register")}>
                Create Account
              </span>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
