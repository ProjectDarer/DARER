// src/pages/DaresPage.jsx
import React, { useState } from 'react'; // ADDED React and useState

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

const DaresPage = () => {
  const dares = [
    { id: 1, title: 'Beat Dark Souls boss blindfolded', amount: '$250', status: 'active', deadline: '2 days', color: COLORS.neonCyan },
    { id: 2, title: 'Eat 10 hot wings in 5 minutes', amount: '$100', status: 'active', deadline: '5 hours', color: COLORS.neonMagenta },
    { id: 3, title: 'Sing entire Bohemian Rhapsody', amount: '$75', status: 'completed', deadline: 'Completed', color: COLORS.neonYellow },
    { id: 4, title: 'Stream for 24 hours straight', amount: '$500', status: 'active', deadline: '12 hours', color: COLORS.neonPurple },
    { id: 5, title: 'Do 100 pushups on stream', amount: '$50', status: 'completed', deadline: 'Completed', color: COLORS.neonCyan },
  ];

  const DareCard = ({ dare }) => {
    const [isHovered, setIsHovered] = useState(false);
    return (
      <div
        style={{
          background: `linear-gradient(135deg, ${dare.color}10 0%, rgba(26, 26, 26, 0.9) 100%)`,
          borderRadius: '16px',
          padding: '2rem',
          border: `2px solid ${isHovered ? dare.color : 'rgba(255, 255, 255, 0.1)'}`,
          boxShadow: isHovered ? `0 0 30px ${dare.color}40` : '0 5px 20px rgba(0, 0, 0, 0.3)',
          transition: 'all 0.3s',
          transform: isHovered ? 'translateY(-5px)' : 'translateY(0)',
          cursor: 'pointer',
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '1rem' }}>
          <h3 style={{ color: 'white', fontSize: '1.3rem', fontWeight: 'bold', flex: 1 }}>{dare.title}</h3>
          <div style={{
            padding: '0.5rem 1rem',
            background: dare.status === 'completed' ? `${COLORS.neonYellow}20` : `${dare.color}20`,
            border: `1px solid ${dare.status === 'completed' ? COLORS.neonYellow : dare.color}`,
            borderRadius: '8px',
            fontSize: '0.8rem',
            fontWeight: 'bold',
            color: dare.status === 'completed' ? COLORS.neonYellow : dare.color,
            textTransform: 'uppercase',
          }}>
            {dare.status}
          </div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <div style={{ color: '#999', fontSize: '0.9rem', marginBottom: '0.25rem' }}>Reward</div>
            <div style={{ fontSize: '2rem', fontWeight: 'bold', color: dare.color, textShadow: `0 0 20px ${dare.color}80` }}>
              {dare.amount}
            </div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ color: '#999', fontSize: '0.9rem', marginBottom: '0.25rem' }}>
              {dare.status === 'completed' ? 'Status' : 'Time Left'}
            </div>
            <div style={{ fontSize: '1.2rem', fontWeight: 'bold', color: COLORS.neonMagenta }}>
              {dare.deadline}
            </div>
          </div>
        </div>
        {dare.status === 'active' && (
          <button style={{
            marginTop: '1.5rem',
            width: '100%',
            padding: '1rem',
            background: `linear-gradient(135deg, ${dare.color}20 0%, transparent 100%)`,
            border: `2px solid ${dare.color}`,
            borderRadius: '10px',
            color: dare.color,
            fontWeight: 'bold',
            cursor: 'pointer',
            fontSize: '1rem',
            transition: 'all 0.3s',
          }}>
            COMPLETE DARE
          </button>
        )}
      </div>
    );
  };

  return (
    <>
      <div style={{ marginBottom: '3rem', textAlign: 'center' ,  
        marginTop: '45px' }}>
        <h1 style={{
          fontSize: '3.5rem',
          fontWeight: 900,
          background: `linear-gradient(135deg, ${COLORS.neonMagenta} 0%, ${COLORS.neonPurple} 100%)`,
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          marginBottom: '1rem',
        }}>
          🎯 MY DARES
        </h1>
        <p style={{ fontSize: '1.2rem', color: '#999' }}>Complete challenges and earn rewards</p>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
        gap: '2rem',
      }}>
        {dares.map(dare => (
          <DareCard key={dare.id} dare={dare} />
        ))}
      </div>
    </>
  );
};

export default DaresPage