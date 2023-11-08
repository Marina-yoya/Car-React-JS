import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './carlist.css'

function CarList() {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCars() {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/getAllCars');

        if (response.ok) {
          const carData = await response.json();
          setCars(carData.data);
          console.log(carData.data)
        } else {
          console.error('Failed to fetch cars data');
        }

        setLoading(false);
      } catch (error) {
        console.error('Error:', error);
      }
    }

    fetchCars();
  }, []);

  return (
    <div className="car-list">
      <h2>Car List</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="car-cards">
          {cars.map((car) => (
            <div key={car.id} className="car-card">
              <div className="car-image">
                <img src="/car.jpeg" alt="Car" />
              </div>
              <div className="car-details">
                <strong>{car.brand}</strong> - {car.model}
              </div>
              <p>
                <Link to={`/cardetails/${car.id}`}>View Details</Link>
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default CarList;

