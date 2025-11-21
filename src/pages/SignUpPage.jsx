// src/pages/SignUpPage.jsx
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/signup.css';

const SignUpPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [month, setMonth] = useState('Month');
  const [day, setDay] = useState('Day');
  const [year, setYear] = useState('Year');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const isFormValid = username.trim() !== "" &&
    password.length >= 6 &&
    phone.length >= 10 &&
    month !== "Month" &&
    day !== "Day" &&
    year !== "Year";

  // Functions for dropdowns
  const getMonths = () => [
    "Month", "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ].map((m, i) => <option key={m} value={i === 0 ? m : i}>{m}</option>);

  const getDays = () => {
    const days = ["Day"];
    for (let i = 1; i <= 31; i++) days.push(i);
    return days.map(d => <option key={d} value={d}>{d}</option>);
  };

  const getYears = () => {
    const years = ["Year"];
    const currentYear = new Date().getFullYear();
    for (let i = currentYear; i >= 1900; i--) years.push(i);
    return years.map(y => <option key={y} value={y}>{y}</option>);
  };
  
  const togglePasswordVisibility = () => setShowPassword(prev => !prev);
  const handleClose = () => navigate(-1);

  // Form Submission Logic (Simulated)
  const handleSignup = async (e) => {
    e.preventDefault();
    if (!isFormValid) return;

    // Mock API call
    try {
        const isExists = username.toLowerCase() === 'existinguser';
        
        if (isExists) {
            alert("User already exists!");
        } else {
            alert("Signup successful! Redirecting to onboarding.");
            navigate("/onboarding"); // UPDATED: Redirect to new onboarding flow
        }
    } catch (err) {
        alert("Error connecting to server.");
    }
  };

  return (
    <div className="overlay">
      <div className="login-box">
        <div className="top-bar">
          <h2>Join Darer today</h2>
          <span className="close" onClick={handleClose}>&times;</span>
        </div>
        
        <form onSubmit={handleSignup}>
          <div className="usernmame">
            <label>Username</label>
            <input 
              type="text" 
              placeholder="Enter username" 
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <label>Password</label>
          {/* NOTE: .password-box is now a relative container for absolute positioning */}
          <div className="password-box">
            <input 
              type={showPassword ? "text" : "password"} 
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {/* The eye icon is positioned absolutely within .password-box */}
            <span className="eye-icon" onClick={togglePasswordVisibility}>
              {showPassword ? "🙈" : "👁️"}
            </span>
          </div>

          <label>Date of birth</label>
          <div className="dob">
            <select value={month} onChange={(e) => setMonth(e.target.value)}>{getMonths()}</select>
            <select value={day} onChange={(e) => setDay(e.target.value)}>{getDays()}</select>
            <select value={year} onChange={(e) => setYear(e.target.value)}>{getYears()}</select>
          </div>

          <label>Phone number</label>
          <div className="phone-box">
            <select className="code"><option>India +91</option></select>
            <input 
              type="text" 
              placeholder="Phone number" 
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>

{/*           <Link to="#" className="email-link">Use email instead</Link> */}
          <p className="info">
            Darer may use your phone number to call or send text messages with information regarding your account.
          </p>

          <p className="terms">
            By clicking Sign Up, you agree to Darer's <Link to="#">Terms of Service</Link> and <Link to="#">Privacy Notice</Link>.
          </p>

          <button 
            type="submit" 
            className="signup-btn" 
            disabled={!isFormValid}
            style={{ 
              backgroundColor: isFormValid ? "#ff00ff" : "#3a3a3d",
              color: isFormValid ? "#fff" : "#aaa",
              cursor: isFormValid ? "pointer" : "not-allowed"
            }}
          >
            Sign up
          </button>
        </form>

        <p className="login-link">Have an account? <Link to="/login">Log in</Link></p>
      </div>
    </div>
  );
};

export default SignUpPage;