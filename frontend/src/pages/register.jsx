import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/login.css'

function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password_confirmation: ''
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
      const response = await axios.post('http://127.0.0.1:8000/api/register', formData);
      console.log('User registered:', response.data);
      alert('Registration Successful! Please login.');
      navigate('/login');
    } catch (err) {
      if (err.response && err.response.status === 422) {
        // Validation errors from Laravel
        setErrors(err.response.data.errors);
      } else {
        alert('Something went wrong. Please try again.');
      }
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Create Account</h2>

        <div className="input-group">
          <label>Full Name</label>
          <input type="text" name="name" onChange={handleChange} required />
          {errors.name && <span className="error-text">{errors.name[0]}</span>}
        </div>

        <div className="input-group">
          <label>Email Address</label>
          <input type="email" name="email" onChange={handleChange} required />
          {errors.email && <span className="error-text">{errors.email[0]}</span>}
        </div>

        <div className="input-group">
          <label>Password</label>
          <input type="password" name="password" onChange={handleChange} required />
          {errors.password && <span className="error-text">{errors.password[0]}</span>}
        </div>

        <div className="input-group">
          <label>Confirm Password</label>
          <input type="password" name="password_confirmation" onChange={handleChange} required />
        </div>

        <button type="submit">Register</button>
        <p style={{marginTop: '10px'}}>
          Already have an account? <span onClick={() => navigate('/login')} style={{color: '#646cff', cursor: 'pointer'}}>Login</span>
        </p>
      </form>
    </div>
  );
}

export default Register;