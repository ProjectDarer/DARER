import React, { useEffect } from 'react';
import BottomBar from '../components/BottomBar';
import '../styles/profile.css'; 

const ProfilePage = () => {
  // Logic migrated from public/javascripts/profile.js
  useEffect(() => {
    // Edit profile button logic
    const editBtn = document.querySelector('.edit-btn');
    const handleEditClick = () => {
        alert('Edit profile functionality coming soon!');
    };
    editBtn?.addEventListener('click', handleEditClick);

    // Social links click event logic
    const socials = document.querySelectorAll('.socials a');
    const handleSocialClick = (index) => {
        switch (index) {
            case 0: window.open('https://instagram.com', '_blank'); break;
            case 1: window.open('https://discord.com', '_blank'); break;
            case 2: window.open('https://twitter.com', '_blank'); break;
            default: console.log("Unknown social link clicked.");
        }
    };
    socials.forEach((link, index) => {
        link.style.cursor = 'pointer';
        link.addEventListener('click', () => handleSocialClick(index));
    });

    // Menu item click tracking
    const menuItems = document.querySelectorAll('.menu-item');
    const handleMenuClick = (item) => {
      console.log(`Clicked: ${item.textContent.trim()}`);
      alert(`Redirecting to ${item.textContent.trim()} (not implemented)`);
    };
    menuItems.forEach(item => {
        item.addEventListener('click', () => handleMenuClick(item));
    });

    // Cleanup function for event listeners
    return () => {
      editBtn?.removeEventListener('click', handleEditClick);
      socials.forEach((link, index) => {
          link.removeEventListener('click', () => handleSocialClick(index));
      });
      menuItems.forEach(item => {
          item.removeEventListener('click', () => handleMenuClick(item));
      });
    };
  }, []); // Run once on mount

  return (
    <div className="profile-page">
      <div className="header">
        <div className="activity-item">
          <img src="avatar1.jpg" alt="Avatar" className="avatar" />
          <div className="profile-info">
            <div>
              <h2 className="username">Taylien</h2>
              <p className="last-live">Last live 3 days ago</p>
            </div>
          </div>
        </div>
        <div>
          <p className="bio">Hi! I’m Taylien, I’m a variety creator with an emphasis on trying to build the friendliest community I possibly can. </p>
        </div>
        <button className="edit-btn">Edit Profile</button>
      </div>

      {/* Note: The Unicode characters () need to be replaced with Font Awesome icons or simple text */}
      <div className="socials">
        {/* Original: <a><span>胴 Instagram</span></a> */}
        <a href="#instagram"><span><i className="fab fa-instagram"></i> Instagram</span></a>
        <a href="#discord"><span><i className="fab fa-discord"></i> Discord</span></a>
        <a href="#twitter"><span><i className="fab fa-twitter"></i> Twitter</span></a>
      </div>

      <div className="menu">
        <div className="menu-item">My Channel</div>
        <div className="menu-item">Creator Dashboard</div>
        <div className="menu-item">Stream Manager</div>
        <div className="menu-item">Subscriptions</div>
        <div className="menu-item">Drops & Rewards</div>
        <div className="menu-item turbo">Darer Turbo <span className="badge">GO AD FREE</span></div>
        <div className="menu-item">Settings</div>
      </div>

      <BottomBar />
    </div>
  );
};

export default ProfilePage;