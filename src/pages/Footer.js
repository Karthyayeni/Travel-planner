// src/components/Footer.js
import React from 'react';
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from 'react-icons/fa';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section about">
          <h3>Travel Planner</h3>
          <p>
            Explore your dream destinations with our dynamic travel planner. Plan trips, track weather, and create unforgettable memories!
          </p>
        </div>

        <div className="footer-section contact">
          <h4>Contact Us</h4>
          <p>Email: support@travelplanner.com</p>
          <p>Phone: +91 98765 43210</p>
          <p>Address: 123, Travel Street, Chennai, Tamil Nadu</p>
        </div>

      
        <div className="footer-section social">
          <h4>Follow Us</h4>
          <div className="social-icons">
            <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer"><FaFacebook /></a>
            <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer"><FaTwitter /></a>
            <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
            <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer"><FaLinkedin /></a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Travel Planner. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
