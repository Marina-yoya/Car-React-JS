import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './carlist.css'

function CarDetails() {
  const [carDetails, setCarDetails] = useState({});
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    async function fetchCarDetails() {
      try {
        const response = await fetch(`http://127.0.0.1:8000/api/getCarById/${id}`);

        if (response.ok) {
          const carData = await response.json();
          setCarDetails({
            make: carData.data[0].brand,
            model: carData.data[0].model,
            year: carData.data[0].year,
          });
          setLoading(false); 
        } else {
          console.error('Failed to fetch car details');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    }

    fetchCarDetails();
  }, [id]);

  return (
    <div className="car-list">
      <h2>Car Details</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="car-cards">
          <div className="car-card">
            <div className="car-image">
              <img src="https://www.willow-car-sales.co.uk/wp-content/uploads/2019/11/placeholder-image-1.jpg" alt="Car" />
            </div>
            <div className="car-details">
              <strong>{carDetails.make}</strong> - {carDetails.model}
              <div><strong>Year:</strong> {carDetails.year}</div>
              <div>Lorem ipsum dolor sit amet, consectetur adipiscing elit</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CarDetails;