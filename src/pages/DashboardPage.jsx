// src/pages/DashboardPage.jsx

import React, { useState } from 'react';
import { Link } from 'react-router-dom';

// COLORS defined locally for component styling
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

// Stats Card Component
const StatsCard = ({ icon, label, value, color, change }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      style={{
        background: `linear-gradient(135deg, ${color}10 0%, rgba(26, 26, 26, 0.9) 100%)`,
        borderRadius: '16px',
        padding: '2rem',
        border: `2px solid ${isHovered ? color : 'rgba(255, 255, 255, 0.1)'}`,
        boxShadow: isHovered ? `0 0 30px ${color}40` : '0 5px 20px rgba(0, 0, 0, 0.3)',
        transition: 'all 0.3s ease',
        transform: isHovered ? 'scale(1.05)' : 'scale(1)',
        cursor: 'pointer',
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>{icon}</div>
      <div style={{ color: '#999', fontSize: '0.9rem', marginBottom: '0.5rem' }}>{label}</div>
      <div style={{
        fontSize: '2rem',
        fontWeight: 'bold',
        color: color,
        textShadow: `0 0 20px ${color}80`,
      }}>
        {value}
      </div>
      {change && (
        <div style={{
          marginTop: '0.5rem',
          color: change > 0 ? COLORS.neonYellow : COLORS.neonMagenta,
          fontSize: '0.85rem',
        }}>
          {change > 0 ? '↑' : '↓'} {Math.abs(change)}% this week
        </div>
      )}
    </div>
  );
};

// Main Dashboard Component
const DashboardPage = () => {
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
      <div style={{
        position: 'relative',
        zIndex: 1,
        height: '100vh' ,
        marginTop: '45px'
      }}>
        {/* Hero Section */}
        <div style={{
          marginBottom: '3rem',
          textAlign: 'center',
        }}>
          <h1 style={{
            fontSize: '3.5rem',
            fontWeight: 900,
            background: `linear-gradient(135deg, ${COLORS.neonCyan} 0%, ${COLORS.neonMagenta} 50%, ${COLORS.neonYellow} 100%)`,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            textShadow: `0 0 60px ${COLORS.glowCyan}`,
            marginBottom: '1rem',
            letterSpacing: '2px',
          }}>
            🔥 LIVE STREAMS RIGHT NOW
          </h1>
          <p style={{
            fontSize: '1.2rem',
            color: '#999',
            textTransform: 'uppercase',
            letterSpacing: '3px',
          }}>
            Stream • Get Dared • Get Paid
          </p>
        </div>

        {/* Stats Overview */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '1.5rem',
          marginBottom: '3rem',
        }}>
          <StatsCard 
            icon="💰" 
            label="Total Earnings" 
            value="$2,847" 
            color={COLORS.neonYellow}
            change={15}
          />
          <StatsCard 
            icon="🎯" 
            label="Dares Completed" 
            value="142" 
            color={COLORS.neonMagenta}
            change={8}
          />
          <StatsCard 
            icon="👁️" 
            label="Total Views" 
            value="52.3K" 
            color={COLORS.neonCyan}
            change={23}
          />
          <StatsCard 
            icon="⚡" 
            label="Streak Days" 
            value="27" 
            color={COLORS.neonPurple}
            change={-2}
          />
        </div>

        {/* Live Streams Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
          gap: '2rem',
        }}>
          {streams.map((stream, i) => (
            <StreamCard key={i} stream={stream} />
          ))}
        </div>
      </div>

      <style>{`
        @keyframes rotate {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes backgroundShift {
          0%, 100% { opacity: 0.15; }
          50% { opacity: 0.25; }
        }
        @keyframes pulse {
          0% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.05); opacity: 0.8; }
          100% { transform: scale(1); opacity: 1; }
        }
      `}</style>
    </>
  );
};

export default DashboardPage;