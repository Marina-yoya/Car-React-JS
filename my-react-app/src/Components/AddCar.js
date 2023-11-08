import React, { useState } from 'react';
import './addcar.css'
function AddCar({ userId }) {
  const [carData, setCarData] = useState({
    user_id: userId,
    brand: '',
    model: '',
    year: '',
  });
console.log(userId, "addcar")
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCarData({
      ...carData,
      [name]: value,
    });
  };

  


const handleSubmit = async (e) => {
    e.preventDefault();
  
    const token = localStorage.getItem('token');
    const { user_id, brand, model, year } = carData; 
    const requestData = {
      user_id,
      brand,
      model,
      year,
    };
  
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(requestData), 
    };
  
    try {
      const response = await fetch('http://127.0.0.1:8000/api/addCar', requestOptions);
  
      if (response.ok) {
        const data = await response.json();
        console.log(data, "addCar");
        setMessage(data.message);
        setTimeout(() => setMessage(''), 3000);
        setCarData({
          user_id: 7, 
          brand: '',
          model: '',
          year: '',
        });
      } else {
        const errorData = await response.json();
        setError(errorData.message);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
  

  return (
    <div className="add-car">
      <h2>Add Car</h2>
      {message && <div className="success-message">{message}</div>}
      {error && <div className="error-message">{error}</div>}
      <form className="add-car-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="brand"
          placeholder="Brand"
          value={carData.brand}
          onChange={handleChange}
        />
        <input
          type="text"
          name="model"
          placeholder="Model"
          value={carData.model}
          onChange={handleChange}
        />
        <input
          type="text"
          name="year"
          placeholder="Year"
          value={carData.year}
          onChange={handleChange}
        />
        <button type="submit">Add Car</button>
      </form>
    </div>
  );
}

export default AddCar;
