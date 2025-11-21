// src/pages/StreamPage.jsx
import React from 'react';
import AppLayout from '../components/AppLayout';

// Shared styles/colors imported from AppLayout for consistency
const N = {
  CYAN: '#00fff7',
  MAGENTA: '#ff00ff',
  YELLOW: '#fffc00',
  CARD_BG: '#1a1a1a',
  TEXT_LIGHT: '#e5e7eb',
  TEXT_SECONDARY: '#9ca3af',
  BORDER_DARK: '#4b5563',
  DARK_BG: '#0a0a0a',
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

// --- Then define S using the helpers ---
const S = {
  glowText: glowText,
  glowBorder: glowBorder,
  baseCard: {
    backgroundColor: N.CARD_BG,
    borderRadius: '0.75rem',
    padding: '1.5rem',
    marginBottom: '1.5rem',
    ...glowBorder(N.BORDER_DARK), // FIX: Use the standalone helper
  },
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
};

// Placeholder for the Dare Activity Feed
const ActivityFeed = () => {
  const activities = [
    { type: 'DARE', user: 'WatcherX', dare: 'Play with one hand.', amount: 5, color: N.YELLOW },
    { type: 'FOLLOW', user: 'NewFanatic', color: N.CYAN },
    { type: 'DONATE', user: 'BigSpender', amount: 50, color: N.MAGENTA },
  ];
  
  const activityItemStyle = (color) => ({
    padding: '0.5rem 0',
    borderBottom: `1px solid ${N.BORDER_DARK}40`,
    fontSize: '0.9rem',
    display: 'flex',
    justifyContent: 'space-between',
  });

  return (
    <div style={{ ...S.baseCard, maxHeight: '400px', overflowY: 'auto' }}>
      <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem', ...glowText(N.MAGENTA, 5) }}>
        Live Feed
      </h3>
      {activities.map((act, index) => (
        <div key={index} style={activityItemStyle(act.color)}>
          {act.type === 'DARE' && (
            <p style={{ ...glowText(act.color, 3) }}>
              @{act.user} dared you: "{act.dare}"
            </p>
          )}
          {act.type === 'FOLLOW' && (
            <p style={{ ...glowText(act.color, 3) }}>
              @{act.user} just followed!
            </p>
          )}
          {act.type === 'DONATE' && (
            <p style={{ ...glowText(act.color, 3) }}>
              @{act.user} donated!
            </p>
          )}
          <span style={S.glowText(act.color, 5)}>
            {act.amount ? `$${act.amount.toFixed(2)}` : act.type}
          </span>
        </div>
      ))}
      <p style={{ textAlign: 'center', color: N.TEXT_SECONDARY, marginTop: '1rem' }}>...</p>
    </div>
  );
};

const StreamPage = () => {
  return (
    <AppLayout>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1.5rem' }}>
        {/* Main Stream Area */}
        <div style={{ 
          backgroundColor: N.DARK_BG, 
          padding: '1rem', 
          borderRadius: '0.75rem', 
          ...glowBorder(N.CYAN)
        }}>
          <h1 style={{ fontSize: '2.5rem', fontWeight: 'extrabold', marginBottom: '1rem', ...glowText(N.CYAN, 12) }}>
            My Live Stream 🎥
          </h1>
          <p style={{ color: N.TEXT_SECONDARY, marginBottom: '1.5rem' }}>
            Current Stream Key: <code style={{ color: N.YELLOW }}>darer_key_xxxx</code>
          </p>

          <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0, marginBottom: '1.5rem' }}>
            <div style={{ 
              position: 'absolute', 
              top: 0, left: 0, width: '100%', height: '100%', 
              backgroundColor: N.MAGENTA + '20',
              display: 'flex', justifyContent: 'center', alignItems: 'center',
              fontSize: '1.5rem', fontWeight: 'bold', color: N.MAGENTA,
              ...glowText(N.MAGENTA, 15)
            }}>
              OBS/Streamlabs Video Player Placeholder
            </div>
          </div>
          
          <button 
            style={{ 
              ...S.baseButton(true, N.MAGENTA),
              width: '100%', padding: '1rem', fontSize: '1.25rem', fontWeight: 'extrabold',
              ...S.glowText(N.MAGENTA, 15), 
              ...S.glowBorder(N.MAGENTA), 
              backgroundColor: `${N.MAGENTA}10`,
              marginTop: '0.5rem'
            }}
            onClick={() => alert("Simulating GO OFFLINE")}
          >
            GO OFFLINE
          </button>
        </div>
        
        {/* Side Panel (Activity Feed / Dare Submission) - Rendered below main area for mobile/simple grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1.5rem' }}>
          
          {/* Dare Submission Card (Watcher's View) */}
          <div style={S.baseCard}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem', ...glowText(N.CYAN, 8) }}>
              Submit a Dare
            </h2>
            <textarea 
              placeholder="What dare should the streamer do? (e.g., Say 'I love chips' 10 times)"
              style={{ 
                width: '100%', height: '80px', padding: '0.75rem', borderRadius: '0.5rem', 
                backgroundColor: N.DARK_BG, border: `1px solid ${N.BORDER_DARK}`,
                color: N.TEXT_LIGHT, fontSize: '1rem', marginBottom: '1rem',
              }}
            />
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <input 
                type="number" 
                placeholder="Amount ($)" 
                defaultValue="5"
                style={{ 
                  width: '30%', padding: '0.75rem', borderRadius: '0.5rem', 
                  backgroundColor: N.DARK_BG, border: `1px solid ${N.BORDER_DARK}`,
                  color: N.YELLOW, fontSize: '1rem',
                }}
              />
              <button 
                style={{ 
                  ...S.baseButton(true, N.MAGENTA), 
                  padding: '0.75rem 1.5rem', 
                  fontSize: '1rem'
                }}
                onClick={() => alert('Dare submitted for approval!')}
              >
                DARE NOW
              </button>
            </div>
          </div>

          <ActivityFeed />
        </div>
      </div>
    </AppLayout>
  );
};

export default StreamPage;