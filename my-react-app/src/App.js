import './App.css';
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, } from 'react-router-dom';
import Navbar from './Components/Navbar';
import Registration from './Components/Registration';
import Login from './Components/Login';
import UserDashboard from './Components/UserDashboard';
import CarList from './Components/CarList';
import CarDetails from './Components/CarDetails';
import AddCar from './Components/AddCar';

function App() {

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userId, setUserId] = useState(null);
  const handleSuccessfulLogin = (userData) => {
    setUserId(userData.data.id);
    setIsAuthenticated(true);
  };
  console.log(userId, "app.js")


  return (
    <Router>
      <div className="App">
        <Navbar isAuthenticated={isAuthenticated} userId={userId} />
        <Routes>
          <Route path="/" element={<Registration />} />
          <Route path="/login" element={<Login onLogin={handleSuccessfulLogin} />} />
          <Route path="/userdashboard/:id" element={<UserDashboard />} />
          <Route path="/carlist" element={<CarList />} />
          <Route path="/cardetails/:id" element={<CarDetails />} />
          <Route path="/addcar" element={<AddCar userId={userId} />} />

        </Routes>


      </div>
    </Router>
  );
}

export default App;
