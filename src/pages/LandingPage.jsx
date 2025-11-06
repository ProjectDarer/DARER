import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import GamingHeader from '../components/GamingHeader';
import '../styles/global.css'; // Contains the main landing page CSS (index.css content)

/**
 * Custom alert function logic migrated from public/script.js.
 * In a real React app, this would be a separate Modal component.
 */
const useGamingAlert = () => {
  const [modalState, setModalState] = useState({
    show: false,
    message: '',
    icon: '',
    redirectUrl: '',
  });
  const navigate = useNavigate();

  const showGamingAlert = (message, icon, redirectUrl) => {
    setModalState({ show: true, message, icon, redirectUrl });
  };

  const handleContinue = () => {
    setModalState(s => ({ ...s, show: false }));
    if (modalState.redirectUrl) {
      setTimeout(() => {
        navigate(modalState.redirectUrl);
      }, 300);
    }
  };

  const GamingAlertModal = () => (
    <div 
        className={`gaming-alert-modal ${modalState.show ? 'show' : ''}`} 
        id="gamingAlertModal" 
        style={{display: modalState.show ? 'flex' : 'none'}}
    >
      <div className="alert-backdrop"></div>
      <div className="alert-container">
        <div className="alert-header">
          <h3 className="alert-title">PATH SELECTED</h3>
          <div className="alert-glow"></div>
        </div>
        <div className="alert-content">
          <p className="alert-message">{modalState.message}</p>
          <div className="alert-icon">{modalState.icon}</div>
        </div>
        <div className="alert-actions">
          <button className="alert-btn" onClick={handleContinue}>CONTINUE</button>
        </div>
      </div>
    </div>
  );

  return { showGamingAlert, GamingAlertModal };
};

const LandingPage = () => {
  const { showGamingAlert, GamingAlertModal } = useGamingAlert();

  // Replaces the vanilla JS mute/autoplay logic from public/script.js
  useEffect(() => {
    const introVideo = document.getElementById("introVideo");

    const enableSoundOnce = () => {
      if (!introVideo) return;
      introVideo.muted = false;
      introVideo.volume = 1.0;
      const playPromise = introVideo.play();
      if (playPromise && typeof playPromise.then === "function") {
        playPromise.catch(() => { /* ignore */ });
      }
      window.removeEventListener("click", enableSoundOnce);
      window.removeEventListener("touchstart", enableSoundOnce);
      window.removeEventListener("keydown", enableSoundOnce);
    };

    window.addEventListener("click", enableSoundOnce, { once: true });
    window.addEventListener("touchstart", enableSoundOnce, { once: true });
    window.addEventListener("keydown", enableSoundOnce, { once: true });

    // Cleanup listeners on component unmount
    return () => {
      window.removeEventListener("click", enableSoundOnce);
      window.removeEventListener("touchstart", enableSoundOnce);
      window.removeEventListener("keydown", enableSoundOnce);
    };
  }, []);

  const handlePlayerClick = (e) => {
    e.preventDefault();
    showGamingAlert("You chose to be a PLAYER!", "🎮", "/html/circle.html");
  };

  const handleWatcherClick = (e) => {
    e.preventDefault();
    showGamingAlert("You chose to be a WATCHER!", "👀", "/html/watcher_signup.html?music=true");
  };

  return (
    <>
      <GamingHeader />
      <div className="container">
        <h1 className="heading">The world’s first AI dare platform</h1>
                <h3 className="tagline">STREAM. GET DARED. GET PAID.</h3>

        <div className="video-container">
          <video id="introVideo" autoPlay muted loop playsInline controls>
            <source src="/videos/intro.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>

        <h2 className="choose-path">CHOOSE YOUR PATH</h2>
        <div className="path-buttons">
          <button className="player" onClick={handlePlayerClick}>PLAYER</button>
          <button className="watcher" onClick={handleWatcherClick}>WATCHER</button>
        </div>

        <p className="coming-soon">Join the Waitlist <br />Be first to play & earn when Darer Launches</p>
        
        {/* Custom Gaming Alert Modal */}
        <GamingAlertModal />

      </div>

      <footer className="gaming-footer">
        {/* Footer content from index.html (repeated structure) */}
        <div className="footer-container">
          <div className="footer-section">
            <img src="/videos/logo.png" alt="" />
            <p>The world’s first AI dare platform.</p>
          </div>
          
          <div className="footer-section">
            <h4>CONNECT WITH US</h4>
            <div className="social-links">
              <div className="social-link">
                <a href="">
                  <img src="/videos/social.png" alt="Instagram" width="30" height="30" />
                </a>
              </div>
              <div className="social-link">
                <a href="">
                  <img src="/videos/tik-tok.png" alt="TikTok" width="30" height="30" />
                </a>
              </div>
              <div className="social-link">
                <a href="">
                  <img src="/videos/twitter.png" alt="Twitter" width="30" height="30" />
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2025 DARER. All rights reserved</p>
        </div>
      </footer>
    </>
  );
};

export default LandingPage;