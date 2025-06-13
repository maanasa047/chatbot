// File: frontend/src/pages/Signup.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import './Login.css'; // reuse same CSS

const Signup = () => {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  <button type="submit" className="trychatbot-button">
  Login
</button>


  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!formData.username || !formData.password) {
      setMessage('All fields are required');
      return;
    }

    try {
      const res = await axios.post('http://localhost:5000/api/auth/signup', formData);
      setMessage('Signup successful! Please login.');
      setTimeout(() => navigate('/login'), 1500); // Redirect after short delay
    } catch (err) {
      setMessage('Signup failed. Try a different username.');
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2 className="login-title">Signup</h2>
        <form onSubmit={handleSubmit} className="login-form">
          <input
            name="username"
            placeholder="Username"
            onChange={handleChange}
            className="login-input"
            value={formData.username}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            className="login-input"
            value={formData.password}
          />
          <button type="submit" className="login-button">Signup</button>
        </form>
        <p className="login-message">{message}</p>
        <p className="login-footer">Already have an account? <Link to="/login">Login</Link></p>
      </div>
    </div>
  );
};

export default Signup;
