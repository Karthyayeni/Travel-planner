// src/components/Navbar.js
import React from 'react';
import { FaHome, FaMapMarkedAlt, FaPlane, FaStar, FaUser, FaUserPlus } from 'react-icons/fa'; // Importing icons
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/">TravelPlanner</Link>
      </div>
      <ul className="navbar-links">
        <li>
          <Link to="/">
            <FaHome className="navbar-icon" /> Home
          </Link>
        </li>
        <li>
          <Link to="/planner">
            <FaMapMarkedAlt className="navbar-icon" /> Planner
          </Link>
        </li>
        <li>
          <Link to="/famous-spots">
            <FaStar className="navbar-icon" /> Famous Spots
          </Link>
        </li>
        <li>
          <Link to="/booking">
            <FaPlane className="navbar-icon" /> Booking
          </Link>
        </li>
        <li>
          <Link to="/login">
            <FaUser className="navbar-icon" /> Login
          </Link>
        </li>
        <li>
          <Link to="/signup">
            <FaUserPlus className="navbar-icon" /> Sign Up
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
