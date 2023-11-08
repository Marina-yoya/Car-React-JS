import React, { useState } from 'react';
import { Navigate, Link } from 'react-router-dom';

import './login.css';

function Login({ onLogin }) {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [error, setError] = useState('');
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [userId, setUserId] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    formDataToSend.append('email', formData.email);
    formDataToSend.append('password', formData.password);

    try {
      const response = await fetch('http://127.0.0.1:8000/api/login', {
        method: 'POST',
        body: formDataToSend,
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Login successful:', data);
        const token = data.data.token;
        console.log(data.data.token)
        localStorage.setItem('token', token);
        setUserId(data.data.id);
        setLoggedIn(true);
        setIsAuthenticated(true);
        onLogin(data);
      } else {
        const errorData = await response.json();
        console.log(errorData.message)
        setError('Wrong credentials. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  if (isLoggedIn) {
    return <Navigate to={`/userdashboard/${userId}`} />;
  }

  return (
    <div className="login-container">
      <h2>Login</h2>
      {error && <div className="error-message">{error}</div>}
      <form className="login-form" onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
        />
        <button type="submit">Login</button>
      </form>
      <p>
        Don't have an account? <Link to="/">Register here</Link>
      </p>
    </div>
  );
}

export default Login;
