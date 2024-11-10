import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FaHeart } from 'react-icons/fa';
import { useParams } from 'react-router-dom';
import './TouristSpots.css';

const TouristSpots = () => {
  const { districtId } = useParams();
  const [touristSpots, setTouristSpots] = useState([]);
  const user = JSON.parse(localStorage.getItem('user')); // Retrieve logged-in user info

  useEffect(() => {
    const fetchTouristSpots = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/tourist-spots/${districtId}`);
        setTouristSpots(response.data);
      } catch (error) {
        console.error('Error fetching tourist spots:', error);
        alert('Failed to load tourist spots. Please try again later.');
      }
    };

    fetchTouristSpots();
  }, [districtId]);

  const addToFavorites = (spot) => {
    if (!user) {
      alert('Please log in to add favorites.');
      return;
    }

    const userFavorites = JSON.parse(localStorage.getItem(user.email)) || [];
    if (userFavorites.some((fav) => fav.id === spot.id)) {
      alert('This spot is already in your favorites.');
      return;
    }

    const updatedFavorites = [...userFavorites, spot];
    localStorage.setItem(user.email, JSON.stringify(updatedFavorites)); // Store in localStorage
    alert(`${spot.name} has been added to your favorites!`);
  };

  return (
    <div className="tourist-spots">
      <h1>Tourist Spots</h1>
      <div className="spot-list">
        {touristSpots.length > 0 ? (
          touristSpots.map((spot) => (
            <div key={spot.id} className="spot-card">
              <img src={spot.imageUrl} alt={spot.name} className="spot-image" />
              <h2>{spot.name}</h2>
              <a href={spot.locationUrl} target="_blank" rel="noopener noreferrer">
                View on Google Maps
              </a>
              <button className="btn-favorite" onClick={() => addToFavorites(spot)}>
                <FaHeart className="favorite-icon" /> Add to Favorites
              </button>
            </div>
          ))
        ) : (
          <p>No tourist spots available for this district.</p>
        )}
      </div>
    </div>
  );
};

export default TouristSpots;
