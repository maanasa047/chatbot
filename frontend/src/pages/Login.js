// File: frontend/src/pages/Login.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import './Login.css';

const Login = () => {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.username || !formData.password) {
      setMessage('All fields are required');
      return;
    }

    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', formData);
      localStorage.setItem('username', formData.username);
      localStorage.setItem('isLoggedIn', 'true');
      setMessage(res.data.message);
      navigate('/dashboard');  // Redirect to Home
    } catch (err) {
      setMessage('Login failed. Please check your credentials.');
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2 className="login-title">Login</h2>
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
          <button type="submit" className="login-button">Login</button>
        </form>
        <p className="login-message">{message}</p>
        <p className="login-footer">
          Don’t have an account? <Link to="/signup">Signup</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
