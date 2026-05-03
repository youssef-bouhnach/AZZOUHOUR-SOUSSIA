import { useState } from "react";
import axios from "../lib/axios";
import { useNavigate } from "react-router-dom";
import { Mail, Lock, User, Eye, EyeOff, Leaf, Sparkles } from "lucide-react";
import "../styles/login.css";

function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    setLoading(true);

    try {
      await axios.get("/sanctum/csrf-cookie");
      const response = await axios.post("/auth/register", formData);
      console.log("User registered:", response.data);

      // Success notification
      alert("🌿 Registration Successful! Please login.");
      navigate("/login");
    } catch (err) {
      if (err.response?.status === 422) {
        setErrors(err.response.data.errors);
      } else {
        console.log("Status:", err.response?.status);
        console.log("Data:", err.response?.data);
        alert("Something went wrong: " + err.response?.status);
      }
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
          <h1 className="auth-title">Create Account</h1>
          <p className="auth-subtitle">Join AZZOUHOUR-SOUSSIA today</p>
        </div>

        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">
              <User className="label-icon" />
              Full Name
            </label>
            <div className="input-wrapper">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="John Doe"
                autoComplete="name"
                className="form-input"
              />
            </div>
            {errors.name && <span className="error-text">{errors.name[0]}</span>}
          </div>

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
            {errors.email && <span className="error-text">{errors.email[0]}</span>}
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
                autoComplete="new-password"
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
            {errors.password && <span className="error-text">{errors.password[0]}</span>}
          </div>

          <div className="form-group">
            <label className="form-label">
              <Lock className="label-icon" />
              Confirm Password
            </label>
            <div className="input-wrapper password-wrapper">
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="password_confirmation"
                value={formData.password_confirmation}
                onChange={handleChange}
                required
                placeholder="••••••••"
                autoComplete="new-password"
                className="form-input"
              />
              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <button type="submit" disabled={loading} className="submit-btn">
            {loading ? (
              <>
                <div className="spinner"></div>
                Creating Account...
              </>
            ) : (
              <>
                <Leaf className="btn-icon" />
                Create Account
              </>
            )}
          </button>

          <div className="auth-footer">
            <p className="footer-text">
              Already have an account?{" "}
              <span className="footer-link" onClick={() => navigate("/login")}>
                Sign In
              </span>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;
