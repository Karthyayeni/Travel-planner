import axios from 'axios';
import React, { useState } from 'react';
import { FaAppleAlt, FaSun, FaWalking, FaWater } from 'react-icons/fa';
import './PlannerPage.css'; // Importing icons

// Example district mapping - Replace with actual data
const districtMapping = {
  "Ariyalur": "1",
  "Chengalpattu": "2",
  "Chennai": "3",
  "Coimbatore": "4",
  "Cuddalore": "5",
  "Dharmapuri": "6",
  "Dindigul": "7",
  "Erode": "8",
  "Kallakurichi": "9",
  "Kancheepuram": "10",
  "Karur": "11",
  "Krishnagiri": "12",
  "Madurai": "13",
  "Mayiladuthurai": "14",
  "Nagapattinam": "15",
  "Kanniyakumari": "16",
  "Namakkal": "17",
  "Perambalur": "18",
  "Pudukottai": "19",
  "Ramanathapuram": "20",
  "Ranipet": "21",
  "Salem": "22",
  "Sivagangai": "23",
  "Tenkasi": "24",
  "Thanjavur": "25",
  "Theni": "26",
  "Thiruvallur": "27",
  "Thiruvarur": "28",
  "Thoothukudi": "29",
  "Tiruchirappalli": "30",
  "Thirunelveli": "31",
  "Tirupathur": "32",
  "Tiruppur": "33",
  "Tiruvannamalai": "34",
  "The Nilgiris": "35",
  "Vellore": "36",
  "Viluppuram": "37",
  "Virudhunagar": "38"
};

const itemsToCarry = [
  { name: 'Sunscreen', icon: <FaSun /> },
  { name: 'Water', icon: <FaWater /> },
  { name: 'Snacks', icon: <FaAppleAlt /> },
  { name: 'Comfortable Shoes', icon: <FaWalking /> },
];

const PlannerPage = () => {
  const [district, setDistrict] = useState(''); // State for district input
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [plan, setPlan] = useState(null);
  const [touristSpots, setTouristSpots] = useState([]);
  const [districtInfo, setDistrictInfo] = useState(null);
  const [loading, setLoading] = useState(false); // Loading state

  const handlePlan = async () => {
    if (!district) {
      alert('Please enter a district.');
      return;
    }

    // Get district ID from the mapping
    const districtId = districtMapping[district];

    if (!districtId) {
      alert('District not found. Please enter a valid district name.');
      return;
    }

    if (!startDate || !endDate) {
      alert('Please select both start and end dates.');
      return;
    }

    const start = new Date(startDate);
    const end = new Date(endDate);
    const days = Math.ceil((end - start) / (1000 * 60 * 60 * 24)) + 1; // Add 1 to count both start and end days

    if (days <= 0) {
      alert('End date must be after start date.');
      return;
    }

    setLoading(true);

    // Fetch tourist spots and district info based on user input
    await fetchTouristSpots(districtId);
    await fetchDistrictInfo(districtId);

    setLoading(false);

    const recommendedSpots = touristSpots.slice(0, days); // Get spots based on the number of days

    const plan = {
      days,
      recommendedSpots,
      thingsToCarry: districtInfo?.thingsToCarry || "No information available",
      bestTimeToVisit: districtInfo?.bestTime || "No information available",
      bestMonths: districtInfo?.bestMonths || "No information available",
      recommendedHotels: districtInfo?.recommendedHotels || []
    };

    setPlan(plan);
  };

  const fetchTouristSpots = async (districtId) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/tourist-spots/${districtId}`);
      setTouristSpots(response.data);
    } catch (error) {
      console.error('Error fetching tourist spots:', error);
    }
  };

  const fetchDistrictInfo = async (districtId) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/districts/${districtId}`);
      console.log('District Info Response:', response.data);
      setDistrictInfo(response.data);
    } catch (error) {
      console.error('Error fetching district info:', error);
    }
  };

  return (
    <div className="planner-container">
      <div className="input-card">
        <h2>Travel Planner</h2>
        <input
          type="text"
          value={district}
          onChange={(e) => setDistrict(e.target.value)}
          placeholder="Enter District"
        />
        <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
        <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
        <button onClick={handlePlan} disabled={loading}>Plan My Trip</button>
      </div>

      {loading && <p>Loading...</p>} {/* Loading state */}

      {plan && (
        <div className="card">
          <h3>Your Travel Plan</h3>
          <p><strong>Number of Days:</strong> {plan.days}</p>
          
          <h4>Recommended Tourist Spots:</h4>
          <ul>
            {plan.recommendedSpots.length > 0 ? (
              plan.recommendedSpots.map((spot, index) => (
                <li key={spot.id}>
                  {"Day " + (index + 1) + " => " + spot.name}
                </li>
              ))
            ) : (
              <li>No tourist spots available.</li>
            )}
          </ul>

          <h4>Things to Carry:</h4>
          <ul>
            {itemsToCarry.map((item, index) => (
              <li key={index}>
                {item.icon} {item.name}
              </li>
            ))}
          </ul>

          <p><strong>Best Time to Visit:</strong> {plan.bestTimeToVisit}</p>
          
          <h4>Recommended Hotels:</h4>
          <ul>
            {plan.recommendedHotels.length > 0 ? (
              plan.recommendedHotels.map((hotel, index) => (
                <li key={index}>
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
      )}
    </div>
  );
};

export default PlannerPage;
