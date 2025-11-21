// src/pages/StreamPage.jsx
"use client"

import React , {useState} from "react";
// FIX: Define COLORS object to prevent ReferenceError
const COLORS = {
  neonCyan: '#00fff7',
  neonMagenta: '#ff00ff',
  neonYellow: '#fffc00',
  neonPurple: '#b800ff',
  darkBg: '#0a0a0a',
  cardBg: 'rgba(26, 26, 26, 0.8)',
  glowCyan: 'rgba(0, 255, 247, 0.3)',
  glowMagenta: 'rgba(255, 0, 255, 0.3)',
  glowYellow: 'rgba(255, 252, 0, 0.3)',
};

// FIX: Define StreamCard (copied from DashboardPage.jsx to resolve dependency issue)
const StreamCard = ({ stream }) => {
    const [isHovered, setIsHovered] = useState(false);
  
    const cardStyles = {
      background: 'linear-gradient(135deg, rgba(26, 26, 26, 0.9) 0%, rgba(40, 0, 60, 0.9) 100%)',
      borderRadius: '16px',
      overflow: 'hidden',
      border: `2px solid ${isHovered ? stream.color : 'rgba(255, 255, 255, 0.1)'}`,
      boxShadow: isHovered 
        ? `0 10px 40px ${stream.color}60, inset 0 0 20px ${stream.color}20`
        : '0 5px 20px rgba(0, 0, 0, 0.5)',
      transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
      transform: isHovered ? 'translateY(-10px) scale(1.02)' : 'translateY(0) scale(1)',
      cursor: 'pointer',
      position: 'relative',
    };
  
    const thumbnailStyles = {
      height: '180px',
      background: `linear-gradient(135deg, ${stream.color}40 0%, ${stream.color}10 100%)`,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '3rem',
      fontWeight: 'bold',
      color: stream.color,
      textShadow: `0 0 30px ${stream.color}`,
      position: 'relative',
      overflow: 'hidden',
    };
  
    return (
      <div 
        style={cardStyles}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Thumbnail */}
        <div style={thumbnailStyles}>
          {/* Animated background */}
          <div style={{
            position: 'absolute',
            width: '200%',
            height: '200%',
            background: `radial-gradient(circle, ${stream.color}20 0%, transparent 70%)`,
            animation: 'rotate 8s linear infinite',
          }} />
          
          {/* LIVE Badge */}
          <div style={{
            position: 'absolute',
            top: '1rem',
            left: '1rem',
            padding: '0.5rem 1rem',
            background: COLORS.neonMagenta,
            borderRadius: '8px',
            fontWeight: 'bold',
            fontSize: '0.8rem',
            color: 'white',
            boxShadow: `0 0 20px ${COLORS.glowMagenta}`,
          }}>
            🔴 LIVE
          </div>
  
          <span style={{ position: 'relative', zIndex: 2 }}>{stream.user[0]}</span>
        </div>
  
        {/* Stream Info */}
        <div style={{ padding: '1.5rem' }}>
          <h3 style={{
            color: 'white',
            marginBottom: '0.5rem',
            fontSize: '1.1rem',
            fontWeight: 'bold',
          }}>
            {stream.title}
          </h3>
          <p style={{
            color: stream.color,
            marginBottom: '0.5rem',
            fontWeight: 'bold',
          }}>
            @{stream.user}
          </p>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            fontSize: '0.85rem',
            color: '#999',
          }}>
            <span style={{
              padding: '0.25rem 0.75rem',
              background: `${stream.color}20`,
              borderRadius: '6px',
              border: `1px solid ${stream.color}40`,
            }}>
              {stream.category}
            </span>
            <span style={{ fontWeight: 'bold', color: COLORS.neonYellow }}>
              👁️ {stream.viewers}
            </span>
          </div>
        </div>
      </div>
    );
  };


const StreamsPage = () => { 
  const [filter, setFilter] = useState('all');
  const categories = ['all', 'FPS', 'IRL', 'Horror', 'Chat', 'Retro'];
  
  // FIX: Define streams data locally
  const streams = [
    { user: 'CyberPlayerX', title: 'Epic Dare: Beat this level blindfolded!', viewers: '5.2K', category: 'FPS', color: COLORS.neonCyan },
    { user: 'DareMaster_47', title: 'Singing bad 80s songs for $100 dares', viewers: '1.8K', category: 'IRL', color: COLORS.neonMagenta },
    { user: 'CodeName_Yellow', title: 'Horror Games - All jump scares!', viewers: '850', category: 'Horror', color: COLORS.neonYellow },
    { user: 'StreamQueen', title: 'Chill stream - Dare me to do silly things!', viewers: '3.1K', category: 'Chat', color: COLORS.neonPurple },
    { user: 'SynthWaveGamer', title: 'Retro Games Dare Night', viewers: '420', category: 'Retro', color: COLORS.neonCyan },
    { user: 'TheChaosKing', title: 'Eating gross stuff for $50 dares', viewers: '2.5K', category: 'IRL', color: COLORS.neonYellow },
  ];


  return (
    <>
      <div style={{ marginBottom: '3rem', textAlign: 'center' ,   height: '100vh' ,
        marginTop: '45px' }}>
        <h1 style={{
          fontSize: '3.5rem',
          fontWeight: 900,
          background: `linear-gradient(135deg, ${COLORS.neonCyan} 0%, ${COLORS.neonMagenta} 100%)`,
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          marginBottom: '1rem',
        }}>
          🎥 ALL LIVE STREAMS
        </h1>
      </div>

      <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', justifyContent: 'center', flexWrap: 'wrap' }}>
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            style={{
              padding: '0.75rem 1.5rem',
              background: filter === cat ? `${COLORS.neonCyan}20` : 'rgba(26, 26, 26, 0.9)',
              border: `2px solid ${filter === cat ? COLORS.neonCyan : 'rgba(255, 255, 255, 0.1)'}`,
              borderRadius: '12px',
              color: filter === cat ? COLORS.neonCyan : '#999',
              fontSize: '1rem',
              fontWeight: 'bold',
              cursor: 'pointer',
              transition: 'all 0.3s',
              textTransform: 'uppercase',
              boxShadow: filter === cat ? `0 0 20px ${COLORS.neonCyan}40` : 'none',
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
        gap: '2rem',
      }}>
        {streams
          .filter(s => filter === 'all' || s.category === filter)
          .map((stream, i) => (
            // FIX: Use the local StreamCard definition
            <StreamCard key={i} stream={stream} /> 
          ))}
      </div>
    </>
  );
};

export default StreamsPage