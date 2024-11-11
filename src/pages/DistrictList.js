import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { Link } from 'react-router-dom'; // Import useLocation
import './DistrictList.css';
import Footer from './Footer';

const HomePage = () => {
    const [districts, setDistricts] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

    // Fetch districts
    // Fetch districts
    useEffect(() => {
        const fetchDistricts = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/districts');
                setDistricts(response.data);
            } catch (error) {
                console.error('Error fetching districts:', error);
            }
        };
        fetchDistricts();
    }, []);

    // Filter districts based on the search term
    // Filter districts based on the search term
    const filteredDistricts = districts.filter(district =>
        district.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div>
            {/* Carousel Section */}
            <div className="parallax-one">
                <div className="carousel-text">
                    <h2>Your Journey Starts Here</h2>
                    {/* Display user name after successful login */}
                    {/* Display user name after successful login */}
                </div>
            </div>

            <div className="search-container">
                <div className="search-wrapper">
                    <FaSearch className="search-icon" />
                    <input
                        type="text"
                        placeholder="Search districts..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="search-input"
                    />
                </div>
            </div>
            
            <div className="districts-container">
                {filteredDistricts.length > 0 ? (
                    filteredDistricts.map((district) => (
                        <div key={district.id} className="district-card">
                            <a href={`/tourist-spots/${district.id}`}>
                                <img src={district.imageUrl} alt={district.name} />
                                <h2>{district.name}</h2>
                            </a>
                            {/* Weather Button that links to the weather page */}
                            <Link to={`/weather/${district.name}`} className="weather-btn">
                                Get Weather
                            </Link>
                        </div>
                    ))
                ) : (
                    <p>No districts found</p>
                )}
            </div>
            <Footer />
        </div>
    );
};

export default HomePage;
