import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FaHeart } from 'react-icons/fa'; // Importing heart icon
import { useParams } from 'react-router-dom';
import './TouristSpots.css';

const TouristSpots = ({ days, userId }) => { // Accept `userId` as a prop
  const { districtId } = useParams();
  const [touristSpots, setTouristSpots] = useState([]);

  useEffect(() => {
    const fetchTouristSpots = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/tourist-spots/${districtId}`);
        setTouristSpots(response.data);
      } catch (error) {
        console.error('Error fetching tourist spots:', error);
      }
    };

    fetchTouristSpots();
  }, [districtId]);

  // Function to split tourist spots by days
  const splitTouristSpotsByDays = (spots, days) => {
    console.log(`Splitting ${spots.length} spots into ${days} days`);
    const spotsPerDay = Math.ceil(spots.length / days); // Calculate how many spots per day
    const daysArray = [];

    for (let i = 0; i < days; i++) {
      const daySpots = spots.slice(i * spotsPerDay, (i + 1) * spotsPerDay);
      daysArray.push(daySpots);
    }

    return daysArray;
  };

  // Split the tourist spots into days if `days` prop is available
  const spotsByDays = days ? splitTouristSpotsByDays(touristSpots, days) : [touristSpots];

  // Function to handle adding a spot to favorites
  const addToFavorites = async (spot) => {
    if (!userId) {
      alert("Please log in to add favorites.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:8000/api/favorites", {
        userId,
        spotId: spot.id,
        spotName: spot.name,
        spotImage: spot.imageUrl,
      });
      if (response.data.success) {
        alert("Added to favorites!");
      } else {
        alert("Could not add to favorites. Please try again.");
      }
    } catch (error) {
      console.error('Error adding to favorites:', error);
    }
  };

  return (
    <div>
      <h1>Tourist Spots</h1>
      {spotsByDays.map((daySpots, index) => (
        <div key={index}>
          <div className="spot-list">
            {daySpots.length > 0 ? (
              daySpots.map(spot => (
                <div key={spot.id} className="spot-card">
                  <img src={spot.imageUrl} alt={spot.name} />
                  <h2>{spot.name}</h2>
                  <a href={spot.locationUrl} target="_blank" rel="noopener noreferrer">View on Google Maps</a>
                  <button className="btn-favorite" onClick={() => addToFavorites(spot)}>
                    <FaHeart className="favorite-icon" /> {/* Heart icon */}
                  </button>
                </div>
              ))
            ) : (
              <p>No tourist spots available for this day.</p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default TouristSpots;
