import React from 'react';
import { Link } from 'react-router-dom';
import BottomBar from '../components/BottomBar';
import '../styles/home.css';

const StreamCard = ({ title, streamer, game, viewers, lang, isLive = true }) => (
  <div className="stream-card">
    <img src="https://placehold.co/300x180" alt="Stream thumbnail" />
    {isLive && <span className="live-tag">LIVE</span>}
    <span className="viewer-count">{viewers} viewers</span>
    <div className="stream-info">
      <h3 className="stream-title green-text">{title}</h3>
      <p className="streamer green-text">@{streamer}</p>
      <p className="game-title">{game}</p>
      <span className="lang yellow-tag">{lang}</span>
    </div>
  </div>
);

const CategoryCard = ({ title, viewers }) => (
  <div className="category">
    <img src="https://placehold.co/100x100" alt={title} />
    <p>
      {title}
      <br />
      <span>{viewers} viewers</span>
    </p>
  </div>
);

const HomePage = () => {
  // Helper function to generate stream cards (must be outside JSX)
  const renderStreams = (count = 8, game = 'VALORANT') => (
    <div className="streams">
      {[...Array(count)].map((_, i) => (
        <StreamCard 
          key={i}
          title={i % 2 === 0 ? "SHANKS X HAMY" : "NUCLEAR"}
          streamer={i % 2 === 0 ? "shanks_ttv" : "cawcawTV"}
          game={game}
          viewers={i % 3 === 0 ? "3.4K" : "79"}
          lang={i % 3 === 0 ? "English" : "Hindi"}
        />
      ))}
    </div>
  );

  return (
    <div className="home-wrapper">
      <header className="header">
        <h1 className="logo">DARER</h1>
        <div className="header-buttons">
          <Link to="/signup" className="btn yellow">Sign Up</Link>
          <button className="btn pink-text">Open App</button>
        </div>
      </header>

      <nav className="tabs">
        <Link to="/following" className="tab">Following</Link>
        <Link to="/home" className="tab active">Live</Link>
      </nav>

      <section className="live-section">
        <h2 className="section-title yellow-text">Live on Darer</h2>
        {renderStreams(8, 'VALORANT')}
      </section>

      <section className="just_chating">
        <h2 className="section-title pink-text">Just Chatting & IRL</h2>
        {renderStreams(8, 'Just Chatting')}
      </section>

      <section className="categories">
        <h2 className="section-title green-text">Categories we think you'll like</h2>
        <div className="category-list">
          <CategoryCard title="Just Chatting" viewers="224.4K" />
          <CategoryCard title="VALORANT" viewers="111.5K" />
          <CategoryCard title="IRL" viewers="55K" />
          {[...Array(8)].map((_, i) => (
            <CategoryCard key={i+3} title="More Games" viewers="10K" />
          ))}
        </div>
      </section>

      <section className="team_fps">
        <h2 className="section-title pink-text">Team FPS</h2>
        {renderStreams(8, 'COUNTER-STRIKE')}
      </section>

      <BottomBar />
    </div>
  );
};

export default HomePage;