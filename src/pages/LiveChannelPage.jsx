import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import BottomBar from '../components/BottomBar';
import '../styles/live_channel.css';

const StreamCard = ({ title, streamer, game, tags }) => (
  <div className="stream-card" data-title={title} data-streamer={streamer}>
    <img src="https://placehold.co/300x180" alt="Stream thumbnail" />
    <span className="live-tag">LIVE</span>
    <span className="viewer-count">79 viewers</span>
    <div className="stream-info">
      <h4 className="stream-title green-text">🔴{title}</h4>
      <p className="streamer green-text">{streamer}</p>
      <p className="game-title">{game}</p>
      {tags.map((tag, i) => (
        <span key={i} className="lang yellow-tag">{tag}</span>
      ))}
    </div>
  </div>
);

const initialStreams = [
  { title: 'T1 VS HLE🔴Lets kill All GO', streamer: 'Caedrel', game: 'League of Legend', tags: ['English', 'LPL', 'LCK'] },
  { title: 'Dota 2 Pro Match LIVE', streamer: 'Sumail', game: 'Dota 2', tags: ['English', 'DPC'] },
  { title: 'Just Chatting Chill Vibe', streamer: 'Luna', game: 'Just Chatting', tags: ['Korean'] },
  { title: 'VALORANT ASCENDANT GRIND', streamer: 'Shanks', game: 'VALORANT', tags: ['English', 'FPS'] },
  { title: 'NUCLEAR WARHEAD DROP', streamer: 'Cawcaw', game: 'League of Legend', tags: ['English', 'LCK'] },
];

const LiveChannelPage = () => {
  const [searchText, setSearchText] = useState('');
  const [filteredStreams, setFilteredStreams] = useState(initialStreams);

  // Replaces the live search functionality from public/javascripts/live_channel.js
  useEffect(() => {
    const lowerCaseSearch = searchText.toLowerCase();
    const filtered = initialStreams.filter(stream =>
      stream.title.toLowerCase().includes(lowerCaseSearch) ||
      stream.streamer.toLowerCase().includes(lowerCaseSearch)
    );
    setFilteredStreams(filtered);
  }, [searchText]);

  const handleStreamClick = (title) => {
    console.log("Clicked on stream:", title);
    alert(`Redirecting to watch stream: ${title}`);
    // In a real app, you'd use navigate('/watch/${titleId}')
  };

  return (
    <>
      <header>
        <div className="search-box">
          <input 
            type="text" 
            placeholder="Search" 
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
        </div>

        <nav className="tabs">
          <Link to="/live_channel" className="tab active">Live Channels</Link>
        </nav>
      </header>

      <section>
        <div className="sec-box">
          {filteredStreams.map((stream, index) => (
            <div key={index} onClick={() => handleStreamClick(stream.title)}>
              <StreamCard {...stream} />
            </div>
          ))}
          {filteredStreams.length === 0 && (
            <p style={{ color: '#ff00ff', textAlign: 'center', marginTop: '20px' }}>
              No streams found matching "{searchText}"
            </p>
          )}
        </div>
      </section>

      <BottomBar />
    </>
  );
};

export default LiveChannelPage;