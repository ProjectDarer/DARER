import React from 'react';
import { Link } from 'react-router-dom';
// The Gaming Header styles are defined in index.css and player_signup.css.
// We import global.css which should contain these styles.
import '../styles/global.css'; 

/**
 * Reusable header for landing and signup pages.
 */
const GamingHeader = () => {
  return (
    <header className="gaming-header">
      <div className="header-container">
        <div className="logo-section">
          <Link to="/" className="logo"><img src="./videos/logo.png" alt="" /></Link>
          {/* <div className="logo-glow"></div> */}
        </div>
<div>
  <p className="claim-now">
    Claim Your Spot Now!{" "}
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      fill="currentColor"
      viewBox="0 0 16 16"
      style={{ display: "inline", verticalAlign: "middle", marginLeft: "4px" }}
    >
      <path
        fillRule="evenodd"
        d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 1 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"
      />
    </svg>
  </p>
</div>

        {/* The original file had a nav with HOME/PLAYER/WATCHER nav-items, 
            which is often removed in the final build or implemented via routing logic.
        <nav className="gaming-nav">...</nav> */}
      </div>
    </header>
  );
};

export default GamingHeader;