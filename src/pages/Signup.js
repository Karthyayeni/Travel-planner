import axios from "axios";
import React, { useState } from "react";
import { FaLock, FaUser } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import "./Signup.css";

function Signup() {
  const history = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState(""); // State for confirm password
  const [error, setError] = useState(''); // Error state for validation messages

  async function submit(e) {
    e.preventDefault();

    // Basic validation checks
    if (!validateEmail(email)) {
      setError('Invalid email format.');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    try {
      await axios
        .post("http://localhost:8000/signup", { email, password })
        .then((res) => {
          if (res.data === "exist") {
            alert("User already exists");
            history("/login", { state: { id: email } });
          } else if (res.data === "notexist") {
            alert("Signup successful");
            history("/login", { state: { id: email } });
          } else {
            setError('Signup failed. Please try again.');
          }
        })
        .catch((e) => {
          setError('An error occurred. Please try again.');
          console.log(e);
        });
    } catch (e) {
      console.log(e);
    }
  }

  // Email format validation function
  function validateEmail(email) {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  }

  return (
    <div className="signup-container">
      <div className="card signup-card">
        <h1>Signup</h1>
        <form action="POST" className="signup-form">
          <div className="input-container">
            <FaUser className="input-icon" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              required
            />
          </div>
          <div className="input-container">
            <FaLock className="input-icon" />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
            />
          </div>
          <div className="input-container">
            <FaLock className="input-icon" />
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm Password"
              required
            />
          </div>
          {error && <p className="error-message">{error}</p>} {/* Display error messages */}
          <input type="submit" value="Signup" onClick={submit} className="btn-signup" />
        </form>

        <p>Already have an account? 
        <Link to="/login" className="login-link">Login Page</Link>
        </p>
      </div>
    </div>
  );
}

export default Signup;
