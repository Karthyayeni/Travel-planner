// import axios from "axios";
// import React, { useState } from "react";
// import { FaLock, FaUser } from 'react-icons/fa'; // Icons for input fields
// import { Link, useNavigate } from "react-router-dom";
// import './Login.css';

// function Login() {
//     const navigate = useNavigate();
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const [error, setError] = useState(''); // Error state for validation messages

//     async function submit(e) {
//         e.preventDefault();

//         // Basic validation checks
//         if (!validateEmail(email)) {
//             setError('Invalid email format.');
//             return;
//         }

//         if (password.length < 6) {
//             setError('Password must be at least 6 characters long.');
//             return;
//         }

//         try {
//             // Sending login credentials to backend
//             const response = await axios.post("http://localhost:8000/", { email, password });
            
//             if (response.data === "exist") {
//                 alert("Login successful");

//                 // Save userId or token in local storage for session management
//                 localStorage.setItem("userId", response.data.userId);

//                 // Navigate to home page with user email
//                 navigate("/", { state: { name: email } });
//             } else if (response.data === "notexist") {
//                 setError("User does not exist.");
//             } else if (response.data === "wrongpassword") {
//                 setError("Incorrect password.");
//             } else {
//                 setError('Login failed. Please try again.');
//             }
//         } catch (error) {
//             setError('An error occurred. Please try again.');
//             console.error(error);
//         }
//     }

//     // Email format validation function
//     function validateEmail(email) {
//         const re = /\S+@\S+\.\S+/;
//         return re.test(email);
//     }

//     return (
//         <div className="login-container">
//             <div className="card login-card">
//                 <h1>Login</h1>
//                 <form className="login-form" onSubmit={submit}>
//                     {/* Email Input */}
//                     <div className="input-container">
//                         <FaUser className="input-icon" />
//                         <input
//                             type="email"
//                             value={email}
//                             onChange={(e) => setEmail(e.target.value)}
//                             placeholder="Email"
//                             required
//                         />
//                     </div>
//                     {/* Password Input */}
//                     <div className="input-container">
//                         <FaLock className="input-icon" />
//                         <input
//                             type="password"
//                             value={password}
//                             onChange={(e) => setPassword(e.target.value)}
//                             placeholder="Password"
//                             required
//                         />
//                     </div>
//                     {/* Error Messages */}
//                     {error && <p className="error-message">{error}</p>}
//                     {/* Login Button */}
//                     <input type="submit" value="Login" className="btn-login" />
//                 </form>

//                 <p>
//                     Don't have an account? 
//                     <Link to="/signup" className="signup-link">Signup Page</Link>
//                 </p>
//             </div>
//         </div>
//     );
// }

// export default Login;


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
