import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Booking from './pages/Bookings';
import DistrictList from './pages/DistrictList';
import FamousSpots from './pages/FamousSpots';
import Favorites from './pages/Favorites';
import Login from './pages/Login';
import PlannerPage from './pages/PlannerPage';
import Signup from './pages/Signup';
import TouristSpots from './pages/TouristSpots';
import WeatherPage from './pages/WeatherPage';

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<DistrictList />} />
        <Route path="/planner" element={<PlannerPage />} />
        <Route path="/famous-spots" element={<FamousSpots />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/tourist-spots/:districtId" element={<TouristSpots />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/booking" element={<Booking />} />
        <Route path="/weather/:districtName" element={<WeatherPage />} />
      </Routes>
    </Router>
  );
};

export default App;
