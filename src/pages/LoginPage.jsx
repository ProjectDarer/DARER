import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/login.css'; 

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  // Replaces the toggle password visibility logic from public/javascripts/login.js
  const togglePasswordVisibility = () => {
    setShowPassword(prev => !prev);
  };

  // Replaces the form submission logic from public/javascripts/login.js
  const handleLogin = async (e) => {
    e.preventDefault();

    if (!username || !password) {
      alert("Please enter both username and password.");
      return;
    }
    
    // Simulating API call from original JS
    try {
      // Mock API response logic: success if username is 'test' and password is 'password'
      const isSuccess = username === 'test' && password === 'password';
      
      if (isSuccess) {
          alert("Login successful!");
          navigate("/home"); // Redirect on success
      } else {
          alert("Login failed! Invalid credentials.");
      }
    } catch (err) {
        alert("Error connecting to server.");
    }
  };
  
  // Replaces the optional Enter key submission logic
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Enter") {
        // Trigger form submission handler directly
        handleLogin(e); 
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [username, password]); // Dependency array ensures we use the latest state values

  return (
    <div className="login-page">
      <div className="login-container">
        <h2>Log in to Darer</h2>

        <form onSubmit={handleLogin}>
          <label htmlFor="username">Username</label>
          <input 
            type="text" 
            id="username" 
            placeholder="Enter your username" 
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />

          <label htmlFor="password">Password</label>
          <div className="password-field">
            <input 
              type={showPassword ? "text" : "password"} 
              id="password" 
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <span className="eye-icon" onClick={togglePasswordVisibility}>
              {showPassword ? "🙈" : "👁️"}
            </span>
          </div>

          <Link to="#" className="trouble-link">Trouble logging in?</Link>

          <button type="submit" className="login-btn">Log In</button>
        </form>

        <p className="signup-text">
          Don't have an account? <Link to="/signup">Sign up</Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;