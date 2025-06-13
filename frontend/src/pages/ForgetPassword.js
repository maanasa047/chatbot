// File: frontend/src/pages/ForgotPassword.js
import React, { useState } from 'react';
import axios from 'axios';

const ForgotPassword = () => {
  const [formData, setFormData] = useState({ username: '', newPassword: '' });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/auth/forgot-password', formData);
      setMessage(res.data.message);
    } catch (err) {
      setMessage('Password reset failed');
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Reset Password</h2>
        <form onSubmit={handleSubmit} style={styles.form}>
          <input
            name="username"
            placeholder="Enter Username"
            onChange={handleChange}
            style={styles.input}
          />
          <input
            type="password"
            name="newPassword"
            placeholder="New Password"
            onChange={handleChange}
            style={styles.input}
          />
          <button type="submit" style={styles.button}>Reset Password</button>
        </form>
        <p style={styles.message}>{message}</p>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex', justifyContent: 'center', alignItems: 'center',
    height: '100vh', background: '#f4f6f8',
  },
  card: {
    background: '#fff', padding: '30px', borderRadius: '10px',
    boxShadow: '0 2px 12px rgba(0,0,0,0.1)', width: '320px',
  },
  title: {
    marginBottom: '20px', fontSize: '22px', textAlign: 'center',
  },
  form: {
    display: 'flex', flexDirection: 'column',
  },
  input: {
    marginBottom: '15px', padding: '10px',
    border: '1px solid #ccc', borderRadius: '6px',
  },
  button: {
    padding: '10px', background: '#007bff', color: '#fff',
    border: 'none', borderRadius: '6px', cursor: 'pointer',
  },
  message: {
    marginTop: '15px', color: '#28a745', textAlign: 'center',
  },
};

export default ForgotPassword;
