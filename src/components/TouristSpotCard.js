// src/components/TouristSpotCard.js
import React from 'react';

const TouristSpotCard = ({ spot }) => {
  return (
    <div className="tourist-spot-card">
      <img src={spot.imageUrl} alt={spot.name} />
      <h4>{spot.name}</h4>
    </div>
  );
};

export default TouristSpotCard;