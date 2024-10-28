// src/components/HotelMap.js
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import React from 'react';

const mapContainerStyle = {
    height: "400px",
    width: "100%"
};

const HotelMap = ({ hotels }) => {
    const center = {
        lat: hotels.length > 0 ? hotels[0].location.lat : 13.0827, // Default center if no hotels
        lng: hotels.length > 0 ? hotels[0].location.lng : 80.2707,
    };

    return (
        <LoadScript googleMapsApiKey="YOUR_API_KEY_HERE">
            <GoogleMap
                mapContainerStyle={mapContainerStyle}
                center={center}
                zoom={10}
            >
                {hotels.map((hotel, index) => (
                    <Marker
                        key={index}
                        position={hotel.location}
                        title={hotel.name}
                    />
                ))}
            </GoogleMap>
        </LoadScript>
    );
};

export default HotelMap;
