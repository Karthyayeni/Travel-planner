// src/components/Favorites.js
import axios from 'axios';
import React, { useEffect, useState } from 'react';

function Favorites({ userId }) {
    const [favorites, setFavorites] = useState([]);
    const [placeName, setPlaceName] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchFavorites = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/favorites/${userId}`);
                setFavorites(response.data);
            } catch (error) {
                console.error('Error fetching favorites:', error);
            }
        };

        fetchFavorites();
    }, [userId]);

    const addFavorite = async (e) => {
        e.preventDefault();

        if (!placeName) {
            setError('Place name is required.');
            return;
        }

        try {
            await axios.post('http://localhost:8000/favorites', {
                userId,
                placeName,
            });
            setFavorites((prevFavorites) => [...prevFavorites, { placeName }]);
            setPlaceName('');
            setError('');
        } catch (error) {
            setError('Error adding favorite.');
            console.error('Error adding favorite:', error);
        }
    };

    return (
        <div className="favorites-container">
            <h1>Your Favorite Places</h1>
            <form onSubmit={addFavorite}>
                <input
                    type="text"
                    value={placeName}
                    onChange={(e) => setPlaceName(e.target.value)}
                    placeholder="Add a favorite place"
                    required
                />
                <button type="submit">Add Favorite</button>
                {error && <p className="error-message">{error}</p>}
            </form>
            <ul>
                {favorites.map((favorite, index) => (
                    <li key={index}>{favorite.placeName}</li>
                ))}
            </ul>
        </div>
    );
}

export default Favorites;
