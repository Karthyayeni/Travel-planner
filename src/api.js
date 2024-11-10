// src/api.js
import axios from 'axios';

const API_URL = 'http://localhost:5000/api'; // Adjust the URL as needed

export const fetchDistricts = async () => {
  const response = await axios.get(`${API_URL}/districts`);
  return response.data;
};

export const fetchTouristSpots = async (districtId) => {
  const response = await axios.get(`${API_URL}/tourist-spots/${districtId}`);
  return response.data;
};