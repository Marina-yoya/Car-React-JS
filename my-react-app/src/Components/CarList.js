import React, { useState, useEffect } from 'react';

function CarList() {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCars() {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/getAllCars');

        if (response.ok) {
          const carData = await response.json();
          console.log(carData)
          setCars(carData);
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
        <ul>
          {cars.data.map((car) => (
            <li key={car.id}>
              <strong>{car.make}</strong> - {car.model}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default CarList;
