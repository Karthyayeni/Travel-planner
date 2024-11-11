import React from "react";
import {
    FaBook,
    FaHeart,
    FaHome,
    FaMapMarkedAlt,
    FaPlane,
    FaSignOutAlt,
    FaSmile,
    FaStar,
    FaUser,
    FaUserPlus,
} from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem("user"));

    const handleLogout = () => {
        localStorage.removeItem("user");
        navigate("/login");
    };

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
                {user && (
                    <li>
                        <Link to="/favorites">
                            <FaHeart className="navbar-icon" /> Favorites
                        </Link>
                    </li>
                )}
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

                {/* Conditionally render Itineraries link */}
                {user && (
                    <li>
                        <Link to="/saved-itineraries">
                            <FaBook className="navbar-icon" /> Itineraries
                        </Link>
                    </li>
                )}

                {user ? (
                    <>
                        {/* Greeting with icon */}
                        <li>
                            <span className="navbar-greeting">
                                <FaSmile className="navbar-icon" /> Hello, {user.email}
                            </span>
                        </li>
                        {/* Logout with icon */}
                        <li>
                            <button className="navbar-logout" onClick={handleLogout}>
                                <FaSignOutAlt className="navbar-icon" /> Logout
                            </button>
                        </li>
                    </>
                ) : (
                    <>
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
                    </>
                )}
            </ul>
        </nav>
    );
};

export default Navbar;
