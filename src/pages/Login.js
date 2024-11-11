import axios from "axios";
import React, { useState } from "react";
import { MdEmail } from "react-icons/md"; // Email icon
import { RiLockPasswordLine } from "react-icons/ri"; // Password icon
import { useNavigate } from "react-router-dom";
import "./Login.css"; // Import the CSS file

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8000/", {
        email,
        password,
      });

      if (response.data === "exist") {
        // Store user data in localStorage
        localStorage.setItem("user", JSON.stringify({ email }));
        alert("Login successful!");
        navigate("/"); // Redirect to home page
      } else if (response.data === "wrongpassword") {
        alert("Incorrect password. Please try again.");
      } else if (response.data === "notexist") {
        alert("User not found. Please sign up.");
      }
    } catch (error) {
      console.error("Error during login:", error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2 className="login-title">Login</h2>
        <form className="login-form" onSubmit={handleSubmit}>
          <div className="input-container">
            <label className="input-label">Email:</label>
            <div className="input-wrapper">
              <MdEmail className="input-icon" />
              <input
                className="input-field"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="input-container">
            <label className="input-label">Password:</label>
            <div className="input-wrapper">
              <RiLockPasswordLine className="input-icon" />
              <input
                className="input-field"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>
          <button className="btn-login" type="submit">
            Login
          </button>
        </form>
        <p className="signup-text">
          Don't have an account?{" "}
          <a className="signup-link" href="/signup">
            Sign up here
          </a>.
        </p>
      </div>
    </div>
  );
};

export default Login;
