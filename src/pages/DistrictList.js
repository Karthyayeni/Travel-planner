// src/pages/HomePage.js
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import './DistrictList.css'; // Make sure to include the updated CSS file

const HomePage = () => {
    const [districts, setDistricts] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

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

    const filteredDistricts = districts.filter(district =>
        district.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div>
            {/* Carousel Section */}
            <div className="parallax-one">
                <div className="carousel-text">
                    <h2>Your Journey Starts Here</h2>
                </div>
            </div>

            {/* Search Bar */}
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
                        </div>
                    ))
                ) : (
                    <p>No districts found</p>
                )}
            </div>
        </div>
    );
};

export default HomePage;
