import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "../lib/axios";
import { useAuth } from "../context/authContext";
import { Mail, Lock, Eye, EyeOff, Leaf } from "lucide-react";
import "../styles/auth.css";

function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const { setUser } = useAuth();

  const params = new URLSearchParams(location.search);
  const redirectTo = params.get("redirect") || "/";

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const response = await axios.post("/auth/login", formData);
      setUser(response.data.user);

      if (response.data.user.role === "admin") {
        window.location.href =
          (import.meta.env.VITE_APP_URL ?? "http://localhost:8000") + "/admin";
      } else if (response.data.user.role === "deliveryman") {
        if (response.data.user.email_verified_at) {
          navigate("/delivery/orders");
        } else {
          navigate("/unauthorizedPage");
        }
      } else if (response.data.user.email_verified_at) {
        navigate(redirectTo);
      } else {
        navigate("/verify-email");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      {/* ── Left panel ── */}
      <div className="auth-left">
        <div className="auth-left-bg" />
        <div className="auth-left-overlay" />

        <div className="auth-left-top">
          <div className="auth-brand">
            <Leaf />
            AZZOHOUR SOUSSIYA
          </div>
        </div>

        <div className="auth-left-bottom">
          <h1 className="auth-headline">
            Where every<br />garden <span>begins.</span>
          </h1>
          <p className="auth-tagline">
            From rich soil to rare seeds, from heritage trees to wild
            blooms — sourced from growers who care, delivered to
            the door of your dreams.
          </p>
          <div className="auth-badges">
            <span className="auth-badge">Seeds &amp; Soil</span>
            <span className="auth-badge">Blooms</span>
            <span className="auth-badge">Trees</span>
            <span className="auth-badge">Plants</span>
            <span className="auth-badge">Palms</span>
            <span className="auth-badge">Vases</span>
            <span className="auth-badge">Services</span>
          </div>
        </div>
      </div>

      {/* ── Right panel ── */}
      <div className="auth-right">
        {/* Tabs */}
        <div className="auth-tabs">
          <button className="auth-tab active">
            Login
          </button>
          <button className="auth-tab" onClick={() => navigate(`/register${location.search}`)}>
            Create account
          </button>
        </div>

        <h2 className="auth-form-title">Welcome back.</h2>
        <p className="auth-form-subtitle">Sign in to continue growing with AZZOHOUR SOUSSIYA.</p>

        <form className="auth-form" onSubmit={handleSubmit}>
          {error && (
            <div className="error-banner">
              {error}
            </div>
          )}

          {/* Email */}
          <div className="form-group">
            <label className="form-label">Email address</label>
            <div className="input-wrapper">
              <Mail className="input-icon" />
              <input
                className="form-input"
                type="email"
                name="email"
                value={formData.email}
                placeholder="you@garden.com"
                onChange={handleChange}
                required
                autoComplete="email"
              />
            </div>
          </div>

          {/* Password */}
          <div className="form-group">
            <label className="form-label">Password</label>
            <div className="input-wrapper">
              <Lock className="input-icon" />
              <input
                className="form-input"
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                placeholder="••••••••"
                onChange={handleChange}
                required
                autoComplete="current-password"
              />
              <button type="button" className="password-toggle" onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          <button type="submit" disabled={loading} className="submit-btn">
            {loading ? (
              <><div className="spinner" /> Signing in...</>
            ) : (
              "Sign in →"
            )}
          </button>
        </form>

        <div className="auth-footer">
          <p className="footer-text">
            Don't have an account?{" "}
            <span className="footer-link" onClick={() => navigate(`/register${location.search}`)}>
              Create account
            </span>
          </p>
        </div>

      </div>
    </div>
  );
}

export default Login;
