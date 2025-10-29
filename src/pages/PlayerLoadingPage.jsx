import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import GamingHeader from '../components/GamingHeader';
import '../styles/circle.css'; 

const loadingMessages = [
  "INITIALIZING...",
  "CONNECTING...", 
  "LOADING DARER...",
  "ALMOST READY...",
  "COMPLETE!"
];

const PlayerLoadingPage = () => {
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [loadingText, setLoadingText] = useState(loadingMessages[0]);
  const [showPopup, setShowPopup] = useState(false);
  const navigate = useNavigate();

  const circleRef = useRef(null);
  const videoRef = useRef(null);
  const loadingIntervalRef = useRef(null);

  // Function to update loading text based on progress
  const updateLoadingText = (progress) => {
    const messageIndex = Math.floor(progress / 20);
    if (messageIndex < loadingMessages.length) {
      setLoadingText(loadingMessages[messageIndex]);
    }
  };

  // Replaces the core setInterval logic from public/javascripts/circle.js
  useEffect(() => {
    loadingIntervalRef.current = setInterval(() => {
      setLoadingProgress(prevProgress => {
        const newProgress = prevProgress + 2;
        updateLoadingText(newProgress);

        if (newProgress >= 100) {
          clearInterval(loadingIntervalRef.current);
          handleLoadingComplete();
        }
        return newProgress;
      });
    }, 40);

    // Cleanup function for useEffect
    return () => clearInterval(loadingIntervalRef.current);
  }, []);

  // Handler for loading completion (replaces logic inside the clearInterval block)
  const handleLoadingComplete = () => {
    // 1. Stop CSS animations and hide the circle visual elements
    if (circleRef.current) {
        circleRef.current.style.animation = "none";
        circleRef.current.style.transform = "none";
        circleRef.current.style.borderColor = "transparent";
        circleRef.current.style.boxShadow = "none";
    }
    
    // 2. Hide text pulsing
    const textEl = document.getElementById("loadingText");
    if (textEl) textEl.style.animation = "none";

    // 3. Show popup after delay (500ms)
    setTimeout(() => {
      document.getElementById("circle-container") && (document.getElementById("circle-container").style.display = "none");
      setShowPopup(true);
      
      // 4. Handle video playback logic
      const video = videoRef.current;
      if (video) {
        const attemptPlay = () => {
          video.muted = false;
          video.play().catch(e => {
            console.log("Autoplay prevented, user needs to click play or tap the screen.");
            // You might add a visible "Tap to Play" overlay here in a production app.
          });
        };

        if (video.readyState >= 3) {
          attemptPlay();
        } else {
          video.addEventListener('canplay', attemptPlay, { once: true });
        }
      }
    }, 500);
  };

  // Replaces the video "ended" listener
  const handleVideoEnded = () => {
    // Redirect after video ends
    navigate("/html/player_signup.html?music=true");
  };

  // Replaces the click-to-skip keydown listener from public/javascripts/circle.js
  useEffect(() => {
    const skipLoading = (e) => {
      if (e.key === " " || e.key === "Enter") {
        clearInterval(loadingIntervalRef.current);
        setLoadingProgress(100);
        updateLoadingText(100);
        handleLoadingComplete(); 
        // Note: The original JS had slightly different logic for the skip path (200ms timeout vs 500ms for natural end).
      }
    };
    document.addEventListener("keydown", skipLoading);
    return () => document.removeEventListener("keydown", skipLoading);
  }, []);

  return (
    <>
    <div className="bg-animation">
    <div className="bg-particles"></div>
    <div className="bg-grid"></div>
  </div>
      <GamingHeader />
      <main className="main-content">
        {/* Circle Loader */}
        <div id="circle-container" style={{ display: showPopup ? 'none' : 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '100%' }}>
            <div className="circle" id="circle" ref={circleRef}>
              <div className="loading-text" id="loadingText">{loadingText}</div>
            </div>
        </div>

        {/* Popup with video */}
        <div className={`popup ${showPopup ? 'show' : ''}`} id="popup">
          <div className="video-container">
            <video 
              id="darerVideo" 
              controls 
              muted 
              preload="auto" 
              ref={videoRef}
              onEnded={handleVideoEnded} // React event handler
            >
              <source src="/videos/p_video_short.mp4" type="video/mp4" />
              Your browser does not support video.
            </video>
          </div>
        </div>
      </main>

      {/* Footer component reused from LandingPage (styles from circle.css) */}
      <footer className="gaming-footer">
        <div className="footer-container">
          <div className="footer-section"><h3>DARER</h3><p>The World's First AI-Powered Live Dare Platform</p></div>
          <div className="footer-section">
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
    </>
  );
};

export default PlayerLoadingPage;