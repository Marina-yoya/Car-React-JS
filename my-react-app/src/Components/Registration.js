import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './registration.css'

function Registration() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    c_password: '', 
  });

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
    formDataToSend.append('name', formData.username);
    formDataToSend.append('email', formData.email);
    formDataToSend.append('password', formData.password);
    formDataToSend.append('c_password', formData.c_password);

    try {
      const response = await fetch('http://127.0.0.1:8000/api/register', {
        method: 'POST',
        body: formDataToSend,
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Registration successful:', data);
      } else {
        const errorData = await response.json();
        console.error('Registration failed:', errorData);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="registration-container">
      <h2>Register</h2>
      <form className="registration-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
        />
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
        <input
          type="password" 
          name="c_password"
          placeholder="Confirm Password"
          value={formData.c_password}
          onChange={handleChange}
        />
        <button type="submit">Register</button>
      </form>
      <p>
      Already have an account? <Link to="/login">Login here</Link>
    </p>
    </div>
  );
}

export default Registration;

