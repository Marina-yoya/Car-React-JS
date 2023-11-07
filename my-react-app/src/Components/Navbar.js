import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './navbar.css'

function Navbar({ isAuthenticated, userId }) {
  const navigate = useNavigate();
  const handleDashboardClick = () => {
    navigate(`/userdashboard/${userId}`);
  };

  return (
    <nav>
      <ul>
        {!isAuthenticated && (
          <>
            <li>
              <Link to="/register">Register</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
          </>
        )}
        {isAuthenticated && (
          <>

            <li>
              <Link to="/carlist">Car List</Link>
            </li>
            <li onClick={handleDashboardClick}>
              <Link to={`/userdashboard/${userId}`}>Dashboard</Link>
            </li>

          </>
        )}

      </ul>
    </nav>
  );
}

export default Navbar;