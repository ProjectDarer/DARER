import React from 'react';
import { Link } from 'react-router-dom';
import BottomBar from '../components/BottomBar';
import '../styles/following.css';

const LiveStreamItem = ({ title, game, viewers, lang }) => (
  <div className="stream-list">
    <div className="stream-card live">
      <img src="https://via.placeholder.com/150x90.png?text=LIVE" alt="Live Stream" />
      <div className="info">
        <h3><span className="live-dot">🔴</span>{title}</h3>
        <p>RANKED NOW • {game}</p>
        <span className="tag">{lang}</span>
      </div>
      <span className="viewer-count">{viewers}K</span>
    </div>
  </div>
);

const OfflineStreamItem = ({ title }) => (
  <div className="stream-list">
    <div className="stream-card offline" onClick={() => alert('This streamer is currently offline.')}>
      <img src="https://via.placeholder.com/150x90.png?text=OFFLINE" alt="Offline Stream" />
      <div className="info">
        <h3>{title}</h3>
        <p>Offline</p>
      </div>
    </div>
  </div>
);

const FollowingPage = () => {
  return (
    <>
      <header className="header">
        <h1 className="logo">DARER</h1>
        <div className="header-buttons">
          <Link to="/signup" className="btn yellow">Sign Up</Link>
          <button className="btn pink-text">Open App</button>
        </div>
      </header>

      <nav className="tabs">
        <Link to="/following" className="tab active">Following</Link>
        <Link to="/home" className="tab">Live</Link>
      </nav>

      <section className="section-title yellow-text">Your Live Channels</section>
      {[...Array(6)].map((_, i) => (
        <LiveStreamItem 
          key={i} 
          title="shanks_ttv" 
          game="VALORANT" 
          viewers={i % 2 === 0 ? "4.2" : "3.4"} 
          lang="English" 
        />
      ))}

      <section className="section-title yellow-text">Offline Channels</section>
      {[...Array(5)].map((_, i) => (
        <OfflineStreamItem key={i} title="noobmaster_69" />
      ))}

      <BottomBar />
    </>
  );
};

export default FollowingPage;