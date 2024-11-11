// src/pages/WeatherPage.js
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FaCloud, FaCloudRain, FaCloudSun, FaSun, FaTemperatureHigh, FaTint, FaWind } from 'react-icons/fa'; // Import weather icons
import { useParams } from 'react-router-dom';
import './WeatherPage.css';

const districts = [
    { name: 'Ariyalur', lat: 11.1385, lon: 79.0756 },
    { name: 'Chengalpattu', lat: 12.6929, lon: 79.9764 },
    { name: 'Chennai', lat: 13.0827, lon: 80.2707 },
    { name: 'Coimbatore', lat: 11.0168, lon: 76.9558 },
    { name: 'Cuddalore', lat: 11.7480, lon: 79.7714 },
    { name: 'Dharmapuri', lat: 12.1357, lon: 78.1602 },
    { name: 'Dindigul', lat: 10.3673, lon: 77.9803 },
    { name: 'Erode', lat: 11.3410, lon: 77.7172 },
    { name: 'Kallakurichi', lat: 11.7383, lon: 78.9605 },
    { name: 'Kancheepuram', lat: 12.8342, lon: 79.7036 },
    { name: 'Karur', lat: 10.9601, lon: 78.0766 },
    { name: 'Krishnagiri', lat: 12.5186, lon: 78.2137 },
    { name: 'Madurai', lat: 9.9252, lon: 78.1198 },
    { name: 'Nagapattinam', lat: 10.7657, lon: 79.8430 },
    { name: 'Namakkal', lat: 11.2189, lon: 78.1677 },
    { name: 'Nilgiris', lat: 11.4916, lon: 76.7337 },
    { name: 'Perambalur', lat: 11.2337, lon: 78.8835 },
    { name: 'Pudukkottai', lat: 10.3813, lon: 78.8215 },
    { name: 'Ramanathapuram', lat: 9.4071, lon: 78.7050 },
    { name: 'Ranipet', lat: 12.9213, lon: 79.2338 },
    { name: 'Salem', lat: 11.6643, lon: 78.1460 },
    { name: 'Sivaganga', lat: 9.8457, lon: 78.4836 },
    { name: 'Tenkasi', lat: 8.9591, lon: 77.3152 },
    { name: 'Thanjavur', lat: 10.7870, lon: 79.1378 },
    { name: 'Theni', lat: 10.0104, lon: 77.4777 },
    { name: 'Thoothukudi', lat: 8.7642, lon: 78.1348 },
    { name: 'Tiruchirappalli', lat: 10.7905, lon: 78.7047 },
    { name: 'Tirunelveli', lat: 8.7139, lon: 77.7567 },
    { name: 'Tirupathur', lat: 12.4935, lon: 78.2130 },
    { name: 'Tiruppur', lat: 11.1085, lon: 77.3411 },
    { name: 'Tiruvallur', lat: 13.1437, lon: 79.9082 },
    { name: 'Tiruvannamalai', lat: 12.2253, lon: 79.0747 },
    { name: 'Tiruvarur', lat: 10.7723, lon: 79.6365 },
    { name: 'Vellore', lat: 12.9165, lon: 79.1325 },
    { name: 'Viluppuram', lat: 11.9397, lon: 79.4924 },
    { name: 'Virudhunagar', lat: 9.5680, lon: 77.9624 },
];

const WeatherPage = () => {
    const { districtName } = useParams(); // Get district name from the URL
    const [weatherData, setWeatherData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const selectedDistrict = districts.find(d => d.name === districtName);

    useEffect(() => {
        const fetchWeather = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/weather/${districtName}`);
                setWeatherData(response.data);
            } catch (error) {
                setError("Error fetching weather data");
            } finally {
                setLoading(false);
            }
        };
        fetchWeather();
    }, [districtName]);

    if (loading) return <p>Loading weather...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className={`weather-container ${weatherData.condition.toLowerCase()}`}>
            <h1 className="weather-title">Weather for {districtName}</h1>
            <div className="weather-info">
                <p><FaTemperatureHigh /> Temperature: {weatherData.temperature}°C</p>
                <p><FaCloud /> Condition: {weatherData.condition}</p>
                <p><FaTint /> Humidity: {weatherData.humidity}%</p>
                <p><FaWind /> Wind Speed: {weatherData.windSpeed} m/s</p>
                {weatherData.condition.toLowerCase().includes("clear") && <FaSun size={50} />}
                {weatherData.condition.toLowerCase().includes("cloud") && <FaCloudSun size={50} />}
                {weatherData.condition.toLowerCase().includes("rain") && <FaCloudRain size={50} />}
                <FaWind size={50} />
            </div>

            {/* Google Maps Integration */}
            {selectedDistrict && (
                <div className="map-container">
                    <iframe
                        title="Google Map"
                        width="100%"
                        height="450"
                        style={{ border: 0 }}
                        loading="lazy"
                        allowFullScreen
                        src={`https://www.google.com/maps?q=${selectedDistrict.lat},${selectedDistrict.lon}&z=10&output=embed`}
                    ></iframe>
                </div>
            )}
        </div>
    );
};

export default WeatherPage;