import React from 'react';
import { NavLink } from 'react-router-dom';
import '../styles/profile.css'; // Importing profile.css as it contains the base bottombar styles

/**
 * Reusable bottom navigation bar for main app pages.
 */
const BottomBar = () => {
  // Function to determine if a link is active (for styling)
  const isActive = ({ isActive }) => isActive ? 'active-link' : '';

  return (
    <footer className="bottombar">
      {/* Note: The bottombar styles are likely in profile.css or activity.css. 
          You may need to consolidate common styles into a single file 
          and adjust the import above. */}
      
      <NavLink to="/home" className={isActive}>
        <i className="fa-solid fa-house"></i>
        <div>Home</div>
      </NavLink>
      <NavLink to="/live_channel" className={isActive}>
        <i className="fa-solid fa-magnifying-glass"></i>
        <div>Browse</div>
      </NavLink>
      <NavLink to="/activity" className={isActive}>
        <i className="fa-solid fa-bell"></i>
        <div>Activity</div>
      </NavLink>
      <NavLink to="/profile" className={isActive}>
        <i className="fa-solid fa-user"></i>
        <div>Profile</div>
      </NavLink>

      {/* Add a global style in src/styles/global.css for NavLink active state:
      .bottombar a.active-link i { color: #00fff7 !important; } 
      .bottombar a.active-link div { color: #00fff7; } 
      */}
    </footer>
  );
};

export default BottomBar;