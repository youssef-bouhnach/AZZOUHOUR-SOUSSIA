import { useState } from "react";
import axios from "../lib/axios";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/authContext";
import { User, Mail, Lock, Eye, EyeOff, Leaf } from "lucide-react";
import "../styles/auth.css";

function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

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
    setErrors({});
    try {
      const response = await axios.post("/auth/register", formData);
      if (response.data.user) {
        setUser(response.data.user);
        if (response.data.user.email_verified_at) {
          navigate(redirectTo);
        } else {
          navigate("/verify-email");
        }
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
    <div className="auth-page">
      {/* ── Left panel ── */}
      <div className="auth-left">
        <div className="auth-left-bg" />
        <div className="auth-left-overlay" />

        <div className="auth-left-top">
          <div className="auth-brand">
            <Leaf />
            <button onClick={ () => navigate("/") } >
              AZZOHOUR SOUSSIYA
            </button>
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
          <button className="auth-tab" onClick={() => navigate(`/login${location.search}`)}>
            Login
          </button>
          <button className="auth-tab active">
            Create account
          </button>
        </div>

        <h2 className="auth-form-title">Plant your roots.</h2>
        <p className="auth-form-subtitle">Join thousands of growers cultivating something beautiful.</p>

        <form className="auth-form" onSubmit={handleSubmit}>
          {/* Full name */}
          <div className="form-group">
            <label className="form-label">Full name</label>
            <div className="input-wrapper">
              <User className="input-icon" />
              <input
                className="form-input"
                type="text"
                name="name"
                placeholder="Jane Appleseed"
                onChange={handleChange}
                required
                autoComplete="name"
              />
            </div>
            {errors.name && <span className="error-text">{errors.name[0]}</span>}
          </div>

          {/* Email */}
          <div className="form-group">
            <label className="form-label">Email address</label>
            <div className="input-wrapper">
              <Mail className="input-icon" />
              <input
                className="form-input"
                type="email"
                name="email"
                placeholder="you@garden.com"
                onChange={handleChange}
                required
                autoComplete="email"
              />
            </div>
            {errors.email && <span className="error-text">{errors.email[0]}</span>}
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
                placeholder="At least 8 characters"
                onChange={handleChange}
                required
                autoComplete="new-password"
              />
              <button type="button" className="password-toggle" onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
            {errors.password && <span className="error-text">{errors.password[0]}</span>}
          </div>

          {/* Confirm password */}
          <div className="form-group">
            <label className="form-label">Confirm password</label>
            <div className="input-wrapper">
              <Lock className="input-icon" />
              <input
                className="form-input"
                type={showConfirm ? "text" : "password"}
                name="password_confirmation"
                placeholder="Repeat your password"
                onChange={handleChange}
                required
                autoComplete="new-password"
              />
              <button type="button" className="password-toggle" onClick={() => setShowConfirm(!showConfirm)}>
                {showConfirm ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          <button type="submit" className="submit-btn">
            Create my garden →
          </button>
        </form>

        <div className="auth-footer">
          <p className="footer-text">
            Already have an account?{" "}
            <span className="footer-link" onClick={() => navigate(`/login${location.search}`)}>
              Login
            </span>
          </p>
        </div>

      </div>
    </div>
  );
}

export default Register;
