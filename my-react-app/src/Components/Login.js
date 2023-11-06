import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';

import './login.css';

function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [error, setError] = useState('');
  const [isLoggedIn, setLoggedIn] = useState(false); 

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
        setLoggedIn(true);
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
    return <Navigate to="/userdashboard" />;
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
    </div>
  );
}

export default Login;
