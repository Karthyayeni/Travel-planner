import axios from "axios";
import React, { useState } from "react";
import { FaLock, FaUser } from 'react-icons/fa';
import { Link, useNavigate } from "react-router-dom";
import './Login.css';

function Login() {

    const history = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
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

        try {
            await axios.post("http://localhost:8000/", { email, password })
                .then(res => {
                    if (res.data === "exist") {
                        alert("Login successful");
                        history("/", { state: { id: email } });
                    } else if (res.data === "notexist") {
                        setError("User does not exist.");
                    } else if (res.data === "wrongpassword") {
                        setError("Incorrect password.");
                    } else {
                        setError('Login failed. Please try again.');
                    }
                })
                .catch(e => {
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
        <div className="login-container">
            <div className="card login-card">
                <h1>Login</h1>
                <form action="POST" className="login-form">
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
                    {error && <p className="error-message">{error}</p>} {/* Display error messages */}
                    <input type="submit" value="Login" onClick={submit} className="btn-login" />
                </form>

                <p>Don't have an account? 
                <Link to="/signup" className="signup-link">Signup Page</Link>
                </p>
            </div>
        </div>
    );
}

export default Login;
