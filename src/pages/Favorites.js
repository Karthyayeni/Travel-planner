import React, { useEffect, useState } from 'react';
import './Favorites.css';

const Favorites = () => {
  const user = JSON.parse(localStorage.getItem('user')); // Get logged-in user
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    if (user) {
      const storedFavorites = JSON.parse(localStorage.getItem(user.email)) || [];
      setFavorites(storedFavorites);
    }
  }, [user]);

  const removeFromFavorites = (spotId) => {
    if (!user) return;

    const updatedFavorites = favorites.filter((fav) => fav.id !== spotId);
    setFavorites(updatedFavorites);
    localStorage.setItem(user.email, JSON.stringify(updatedFavorites)); // Update localStorage
    alert('Removed from favorites!');
  };

  return (
    <div className="favorites-container">
      <h1>Your Favorites</h1>
      {favorites.length > 0 ? (
        <div className="favorites-list">
          {favorites.map((fav) => (
            <div key={fav.id} className="favorite-card">
              <img src={fav.imageUrl} alt={fav.name} className="favorite-image" />
              <div className="favorite-details">
                <h2>{fav.name}</h2>
                <a href={fav.locationUrl} target="_blank" rel="noopener noreferrer">
                  View on Google Maps
                </a>
                <button className="btn-remove" onClick={() => removeFromFavorites(fav.id)}>
                  Remove from Favorites
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No favorites added yet. Add your favorite tourist spots!</p>
      )}
    </div>
  );
};

export default Favorites;
