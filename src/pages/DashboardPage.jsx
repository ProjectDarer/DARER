// src/pages/DashboardPage.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import AppLayout from '../components/AppLayout';

// Shared styles/colors (N) copied from AppLayout.jsx for consistency
const N = {
  CYAN: '#00fff7',
  MAGENTA: '#ff00ff',
  YELLOW: '#fffc00',
  DARK_BG: '#0a0a0a',
  CARD_BG: '#1a1a1a',
  TEXT_LIGHT: '#e5e7eb',
  TEXT_SECONDARY: '#9ca3af',
  BORDER_DARK: '#4b5563',
};

const glowText = (color, intensity = 5) => ({
  color: color,
  textShadow: `0 0 ${intensity}px ${color}80`,
  transition: 'all 0.2s',
});
const glowBorder = (color) => ({
  border: `1px solid ${color}80`,
  boxShadow: `0 0 10px ${color}50`,
  transition: 'all 0.2s',
});

const S = {
  glowText: glowText,
  glowBorder: glowBorder,
  // --- FIX: Added the missing baseButton function ---
  baseButton: (isActive = false, color = N.CYAN) => ({
    backgroundColor: isActive ? color + '20' : N.CARD_BG,
    color: isActive ? color : N.TEXT_LIGHT,
    padding: '0.6rem 1rem',
    borderRadius: '0.5rem',
    fontWeight: 'bold',
    textDecoration: 'none',
    transition: 'all 0.2s',
    cursor: 'pointer',
    ...glowBorder(isActive ? color : N.BORDER_DARK),
    ...glowText(isActive ? color : N.TEXT_LIGHT, isActive ? 10 : 0),
  }),
  // Integrated baseCard into S for consistency
  baseCard: {
    backgroundColor: N.CARD_BG,
    borderRadius: '0.75rem', 
    padding: '1.5rem', 
    marginBottom: '1.5rem', 
    ...glowBorder(N.BORDER_DARK),
  },
};

// --- New Live Stream Card Component ---
const LiveStreamCard = ({ user, title, viewers, category, userColor }) => {
  const color = userColor;
  
  const cardStyle = {
    backgroundColor: N.CARD_BG,
    borderRadius: '0.75rem',
    overflow: 'hidden',
    transition: 'all 0.3s ease',
    cursor: 'pointer',
    ...glowBorder(N.BORDER_DARK),
    '&:hover': {
      ...glowBorder(color),
      boxShadow: `0 0 20px ${color}50`,
      transform: 'translateY(-5px)',
    }
  };
  
  const thumbnailStyle = {
    position: 'relative',
    height: '150px',
    background: `${color}20`,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: '2rem',
    fontWeight: 'bold',
    ...glowText(color, 15),
  };
  
  const liveIndicatorStyle = {
    position: 'absolute',
    top: '10px',
    left: '10px',
    backgroundColor: N.MAGENTA,
    color: N.TEXT_LIGHT,
    padding: '0.25rem 0.5rem',
    borderRadius: '0.25rem',
    fontSize: '0.75rem',
    fontWeight: 'bold',
    ...glowText(N.MAGENTA, 10),
  };

  return (
    <Link to={`/stream?user=${user}`} style={{ textDecoration: 'none' }}>
      <div style={cardStyle}>
        {/* Thumbnail Area */}
        <div style={thumbnailStyle}>
          <span style={liveIndicatorStyle}>LIVE</span>
          {/* Placeholder for video frame */}
          {user.substring(0, 1)}
        </div>
        
        {/* Stream Info */}
        <div style={{ padding: '1rem', textAlign: 'left' }}>
          <p style={{ fontWeight: 'bold', marginBottom: '0.5rem', fontSize: '1.1rem', ...glowText(N.TEXT_LIGHT, 0) }}>
            {title}
          </p>
          <p style={{ color: color, fontSize: '0.9rem', marginBottom: '0.25rem' }}>
            @{user}
          </p>
          <div style={{ display: 'flex', justifyContent: 'space-between', color: N.TEXT_SECONDARY, fontSize: '0.8rem' }}>
            <span>{category}</span>
            <span>{viewers} viewers</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

const DashboardPage = () => {
  const liveStreams = [
    { user: 'CyberPlayerX', title: 'Epic Dare: Beat this level blindfolded!', viewers: '5.2K', category: 'FPS', color: N.CYAN },
    { user: 'DareMaster_47', title: 'Just singing bad 80s songs for $100 dares.', viewers: '1.8K', category: 'IRL', color: N.MAGENTA },
    { user: 'CodeName:Yellow', title: 'Playing Horror Games - Must accept all jump scares!', viewers: '850', category: 'Horror', color: N.YELLOW },
    { user: 'StreamQueen', title: 'Chill stream & chat - Dare me to do silly things!', viewers: '3.1K', category: 'Just Chatting', color: N.MAGENTA },
    { user: 'SynthWaveGamer', title: 'Retro Games Dare Night. Come and challenge me!', viewers: '420', category: 'Retro', color: N.CYAN },
    { user: 'TheChaosKing', title: 'Currently eating something gross for a $50 dare.', viewers: '2.5K', category: 'IRL', color: N.YELLOW },
  ];

  const titleStyle = {
    fontSize: '2.5rem', 
    fontWeight: 'extrabold', 
    marginBottom: '2rem', 
    textAlign: 'center', 
    ...glowText(N.YELLOW, 12)
  };

  return (
    <AppLayout>
      <h1 style={titleStyle}>
        🔥 Live Streams Right Now
      </h1>

      {/* Live Stream Grid */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
        gap: '1.5rem', 
        marginBottom: '3rem' 
      }}>
        {liveStreams.map((stream, index) => (
          <LiveStreamCard 
            key={index}
            user={stream.user} 
            title={stream.title} 
            viewers={stream.viewers} 
            category={stream.category}
            userColor={stream.color}
          />
        ))}
      </div>
      
      {/* Quick Links Section */}
      <div style={{ ...S.baseCard, textAlign: 'center' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem', ...glowText(N.MAGENTA, 8) }}>
          My Stats & Actions
        </h2>
        <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          {/* S.baseButton is now available */}
          <Link to="/stream" style={{...S.baseButton(false, N.CYAN), ...glowText(N.CYAN, 8), ...glowBorder(N.CYAN)}}>
            Go Live Now 🎥
          </Link>
          <Link to="/dares" style={{...S.baseButton(false, N.MAGENTA), ...glowText(N.MAGENTA, 8), ...glowBorder(N.MAGENTA)}}>
            My Active Dares 🎯
          </Link>
          <Link to="/Setting" style={{...S.baseButton(false, N.YELLOW), ...glowText(N.YELLOW, 8), ...glowBorder(N.YELLOW)}}>
            Edit Profile ⚙️
          </Link>
        </div>
      </div>
    </AppLayout>
  );
};

export default DashboardPage;