// src/components/DistrictCard.js
import React from 'react';

const DistrictCard = ({ district, onClick }) => {
  return (
    <div className="district-card" onClick={() => onClick(district.id)}>
      <img src={district.imageUrl} alt={district.name} />
      <h3>{district.name}</h3>
    </div>
  );
};

export default DistrictCard;