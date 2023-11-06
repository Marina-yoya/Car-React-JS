import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes, } from 'react-router-dom';
import Navbar from './Components/Navbar';
import Registration from './Components/Registration';
import Login from './Components/Login';
import UserDashboard from './Components/UserDashboard';
import CarList from './Components/CarList';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/register" element={<Registration />} />
          <Route path="/login" element={<Login />} />
          <Route path="/userdashboard/:id" element={<UserDashboard />} />

        </Routes>


      </div>
    </Router>
  );
}

export default App;
