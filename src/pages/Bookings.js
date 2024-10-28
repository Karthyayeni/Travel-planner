import React, { useState } from 'react';
import './Booking.css'; // Import the CSS file for styles

const Booking = () => {
  const [transportType, setTransportType] = useState('');
  const [destination, setDestination] = useState('');
  const [date, setDate] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (transportType === 'Train') {
      window.location.href = 'https://www.irctc.co.in';
    } else if (transportType === 'Flight') {
      window.location.href = 'https://www.makemytrip.com/flights/';
    } else {
      alert(`Please select a valid transport type`);
    }
  };

  return (
    <div className="booking-container">
      <h1>Travel Booking</h1>
      <form onSubmit={handleSubmit} className="booking-form">
        <label htmlFor="name">Full Name:</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter your full name"
          required
        />

        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          required
        />

        <label htmlFor="phone">Phone Number:</label>
        <input
          type="tel"
          id="phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="Enter your phone number"
          required
        />

        <label htmlFor="transport">Transport Type:</label>
        <select
          id="transport"
          value={transportType}
          onChange={(e) => setTransportType(e.target.value)}
          required
        >
          <option value="">--Select--</option>
          <option value="Flight">Flight</option>
          <option value="Train">Train</option>
        </select>

        <label htmlFor="destination">Destination:</label>
        <input
          type="text"
          id="destination"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
          placeholder="Enter your destination"
          required
        />

        <label htmlFor="date">Travel Date:</label>
        <input
          type="date"
          id="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />

        <button type="submit" className="booking-button">Book Now</button>
      </form>
    </div>
  );
};

export default Booking;
