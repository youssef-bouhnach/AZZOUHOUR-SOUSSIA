import React, { useState } from 'react';
import './LoginRegister.css';

const LoginRegister = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'User'
  });
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError(''); 
  };

  const validateForm = (e) => {
    e.preventDefault();
    const { fullName, email, password, confirmPassword } = formData;

    if (isLogin) {
      if (!email || !password) return setError('Please fill in all fields');
    } else {
      if (!fullName || !email || !password) return setError('All fields are required');
      if (password !== confirmPassword) return setError('Passwords do not match');
    }
    
    console.log("Form Submitted:", formData);
    alert(`${isLogin ? 'Login' : 'Registration'} Successful!`);
  };

  return (
    <div className="auth-container">
      <div className="background-overlay"></div>
      
      <div className="auth-card">
        <div className="form-box">
          <div className="brand-header">
            <span className="logo-icon">🌿</span>
            <h1>GreenGarden</h1>
          </div>

          <div className="toggle-container">
            <button 
              className={isLogin ? 'active' : ''} 
              onClick={() => { setIsLogin(true); setError(''); }}
            >
              Login
            </button>
            <button 
              className={!isLogin ? 'active' : ''} 
              onClick={() => { setIsLogin(false); setError(''); }}
            >
              Register
            </button>
          </div>

          <form onSubmit={validateForm} className="auth-form">
            {!isLogin && (
              <div className="input-group">
                <input 
                  type="text" name="fullName" placeholder="Full Name" 
                  value={formData.fullName} onChange={handleInputChange}
                />
              </div>
            )}

            <div className="input-group">
              <input 
                type="email" name="email" placeholder="Email Address" 
                value={formData.email} onChange={handleInputChange}
              />
            </div>

            <div className="input-group password-group">
              <input 
                type={showPassword ? "text" : "password"} 
                name="password" placeholder="Password" 
                value={formData.password} onChange={handleInputChange}
              />
              <span className="pwd-toggle" onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? "👁️" : "🙈"}
              </span>
            </div>

            {!isLogin && (
              <>
                <div className="input-group">
                  <input 
                    type="password" name="confirmPassword" placeholder="Confirm Password" 
                    value={formData.confirmPassword} onChange={handleInputChange}
                  />
                </div>
                <div className="input-group">
                  <select name="role" value={formData.role} onChange={handleInputChange}>
                    <option value="User">User</option>
                    <option value="Admin">Admin</option>
                  </select>
                </div>
              </>
            )}

            {isLogin && (
              <div className="form-options">
                <label className="checkbox-container">
                  <input type="checkbox" />
                  <span className="checkmark"></span>
                  Remember me
                </label>
                <a href="#forgot" className="forgot-link">Forgot?</a>
              </div>
            )}

            {error && <p className="error-msg">{error}</p>}

            <button type="submit" className="submit-btn">
              {isLogin ? 'Sign In' : 'Join the Garden'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginRegister;