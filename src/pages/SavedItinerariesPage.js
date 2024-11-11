import React, { useEffect, useState } from 'react';
import './SavedItinerariesPage.css'; // Add your custom styles here (optional)

const SavedItinerariesPage = () => {
  const [savedItineraries, setSavedItineraries] = useState([]);

  // Fetch saved itineraries based on logged-in user
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      // Fetch itineraries using user email from localStorage
      const userItineraries = JSON.parse(localStorage.getItem(user.email));

      // Safely set itineraries as an array (in case parsing fails)
      if (Array.isArray(userItineraries)) {
        setSavedItineraries(userItineraries);
      } else {
        setSavedItineraries([]); // Default to empty array if no itineraries found
      }
    }
  }, []);

  // Function to remove itinerary from localStorage
  const removeItinerary = (index) => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) {
      alert("Please log in to remove itineraries.");
      return;
    }

    const updatedItineraries = savedItineraries.filter((_, i) => i !== index);
    localStorage.setItem(user.email, JSON.stringify(updatedItineraries));
    setSavedItineraries(updatedItineraries); // Update the state to reflect changes
  };

  return (
    <div className="saved-itineraries-container">
      <h3>Saved Itineraries</h3>
      {savedItineraries.length === 0 ? (
        <p>No itineraries saved.</p>
      ) : (
        savedItineraries.map((itinerary, index) => (
          <div key={index} className="itinerary-card">
            <div className="itinerary-card-header">
              <h4>Itinerary {index + 1}</h4>
              <button 
                className="remove-btn"
                onClick={() => removeItinerary(index)}
              >
                Remove
              </button>
            </div>
            <div className="itinerary-card-body">
              <p><strong>Number of Days:</strong> {itinerary.days}</p>
              <p><strong>Estimated Cost:</strong> ₹{itinerary.estimatedCost}</p>

              <h5>Recommended Tourist Spots:</h5>
              <ul>
                {itinerary.recommendedSpots?.length > 0 ? (
                  itinerary.recommendedSpots.map((spot, spotIndex) => (
                    <li key={spotIndex}>
                      Day {spotIndex + 1}: {spot.name}
                    </li>
                  ))
                ) : (
                  <li>No tourist spots available.</li>
                )}
              </ul>

              <p><strong>Best Time to Visit:</strong> {itinerary.bestTimeToVisit}</p>

              <h5>Recommended Hotels:</h5>
              <ul>
                {itinerary.recommendedHotels?.length > 0 ? (
                  itinerary.recommendedHotels.map((hotel, hotelIndex) => (
                    <li key={hotelIndex}>
                      <a href={hotel.websiteUrl} target="_blank" rel="noopener noreferrer">
                        {hotel.name} - {hotel.priceRange}
                      </a>
                    </li>
                  ))
                ) : (
                  <li>No hotel recommendations available.</li>
                )}
              </ul>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default SavedItinerariesPage;
