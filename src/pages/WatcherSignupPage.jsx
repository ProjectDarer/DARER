// src/pages/WatcherSignupPage.jsx

import React, { useState, useEffect } from 'react';
import GamingHeader from '../components/GamingHeader';
import AudioPlayer from '../components/AudioPlayer';
import { Link } from 'react-router-dom';
import '../styles/player_signup.css'; // Uses the same visual style as player signup
import API_CONFIG from '../../config.js';

const WatcherSignupPage = () => {
  const [email, setEmail] = useState('');
  
  // Use the custom alert hook
  const { showCustomAlert, AlertComponent } = useCustomGamingAlert(); 

  // Content height logic migrated from watcher_signup.js
  useEffect(() => {
    const setMainContentHeight = () => {
      const header = document.querySelector('.gaming-header');
      const footer = document.querySelector('.gaming-footer');
      const main = document.querySelector('.main-content');
      
      if (!header || !footer || !main) return;
      
      const headerH = header.getBoundingClientRect().height;
      const footerH = footer.getBoundingClientRect().height;
      const viewportH = window.innerHeight;
      const target = Math.max(0, viewportH - headerH - footerH);
      
      main.style.minHeight = target + 'px';
      main.style.maxHeight = target + 'px';
      
      document.body.style.overflow = (window.innerWidth >= 769) ? 'hidden' : 'auto';
    };

    setMainContentHeight();
    window.addEventListener('resize', setMainContentHeight);
    return () => window.removeEventListener('resize', setMainContentHeight);
  }, []);

  const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!email) {
      // Use the custom alert with 'warning' type, and pass the exact title requested by the user
      showCustomAlert('⚠️ Email Required', 'Please enter your email address to continue with watcher signup.', 'warning');
      return;
    }
    
    if (!isValidEmail(email)) {
      // Use the custom alert with 'error' type
      showCustomAlert('❌ Invalid Email', 'Please enter a valid email address (e.g., user@example.com).', 'error');
      return;
    }
    
    try {
      const res = await fetch("http://localhost:3000/api/watcher_signup", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        // credentials: 'include',
        body: JSON.stringify({ email, user_type: 'watcher' })
      });

      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        showAlert('❌ Signup Failed', data?.message || 'Something went wrong during signup.', 'error');
        return;
      }

      if (data.exists) {
        showAlert('👁️ Welcome Back!', 'You\'re already registered as a Watcher. Ready to start daring players?', 'info');
      } else {
        showAlert('🎉 Signup Successful!', 'Welcome to Darer as a Watcher! You can now watch streams and dare players in real-time.', 'success');
      }
    } catch (_err) {
      showAlert('🌐 Network Error', 'Unable to connect to the server.', 'error');
      console.log("the error is :" , _err);
    }
    
    setEmail('');
  };

  return (
    <>
      <div className="bg-animation">
        <div className="bg-particles"></div>
        <div className="bg-grid"></div>
      </div>
      <GamingHeader />
      <AudioPlayer audioId="watcherMusic" src="/videos/darer_music.mp3" />

      <main className="main-content">
        <div className="signup-container">
          <div className="signup-card">
            <div className="card-header">
              <h2 className="signup-title">JOIN DARER AS A WATCHER</h2>
              <div className="title-glow"></div>
              <p className="signup-subtitle">Watch. Dare. Influence.</p>
            </div>
            
            <form className="signup-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="email" className="form-label">EMAIL ADDRESS</label>
                <input 
                  type="email" 
                  id="email" 
                  className="form-input" 
                  placeholder="Enter your email address" 
                  required 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <div className="input-glow"></div>
              </div>
             <button type="submit" className="signup-btn">
            <span>START WATCHING</span>
            <div className="btn-glow"></div>
          </button>
            </form>
          </div>
        </div>
      </main>

      <footer className="gaming-footer">
        {/* Footer content structure reused */}
        <div className="footer-container">
<div className="footer-section">
            <img src="/videos/logo.png" alt="" />
            <p>The world’s first AI dare platform.</p>
          </div>          <div className="footer-section">
            <h4>CONNECT WITH US</h4>
            <div className="social-links">
              <div className="social-link"><a href=""><img src="/videos/social.png" alt="Instagram" width="30" height="30" /></a></div>
              <div className="social-link"><a href=""><img src="/videos/tik-tok.png" alt="TikTok" width="30" height="30" /></a></div>
              <div className="social-link"><a href=""><img src="/videos/twitter.png" alt="Twitter" width="30" height="30" /></a></div>
            </div>
          </div>
        </div>
        <div className="footer-bottom"><p>&copy; 2025 DARER. All rights reserved</p></div>
      </footer>
      
      {/* Render the Custom Alert Modal */}
      <AlertComponent />
    </>
  );
};

export default WatcherSignupPage;