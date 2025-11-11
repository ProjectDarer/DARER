// src/components/LoginPage.jsx

import React, { useState, useEffect, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/login.css';

const LoginPage = () => {
  // --- State Hooks ---
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  // --- Utility Functions ---

  const togglePasswordVisibility = () => {
    setShowPassword(prev => !prev);
  };

  // Memoized login handler to prevent unnecessary re-creation
  const handleLogin = useCallback(async (e) => {
    // Prevent default form submission behavior (page reload)
    if (e) {
        e.preventDefault();
    }

    if (!username || !password) {
      alert("Please enter both username and password.");
      return;
    }

    // A real application would make a 'fetch' or 'axios' API call here
    // Example: const response = await fetch('/api/login', { ... });

    try {
      // Mock API response logic for demonstration
      const isSuccess = username === 'test' && password === 'password';

      if (isSuccess) {
          alert("Login successful!");
          // In a real app, you would save an authentication token here
          navigate("/home"); // Redirect on success
      } else {
          alert("Login failed! Invalid credentials.");
      }
    } catch (err) {
        // Handle network or server errors
        console.error("Login error:", err);
        alert("Error connecting to server. Please try again.");
    }
  }, [username, password, navigate]); // Dependencies for useCallback

  // --- Effect Hook for Enter Key Submission ---
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Check if the target is an input/textarea to prevent accidental submission
      // when typing into the fields. Form's onSubmit already handles this.
      // This is primarily for when the form is fully focused or the user presses
      // enter outside the submit button. Since we're using a <form>,
      // the onSubmit handler is often sufficient, but this explicitly
      // handles the keydown on the document level.

      if (e.key === "Enter") {
        // We use the dependency-free `handleLogin` from `useCallback`
        // which has the latest state via its dependencies.
        handleLogin(e);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [handleLogin]); // Dependency on handleLogin ensures latest logic is used

  // --- JSX Render ---
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
            autoFocus // Good UX practice
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
            {/* Using text for icons for simplicity, but a proper icon library (like FontAwesome or MUI) is better */}
            <span className="eye-icon" onClick={togglePasswordVisibility} aria-label="Toggle password visibility">
              {showPassword ? "🙈" : "👁️"}
            </span>
          </div>

          {/* This should likely link to a password reset page */}
          <Link to="/reset-password" className="trouble-link">Trouble logging in?</Link>

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