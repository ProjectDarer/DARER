// src/pages/DaresPage.jsx
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
};
// --- Define helper functions first to avoid ReferenceError ---
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
  glowText: glowText, // Expose helpers on S for consistency
  glowBorder: glowBorder,
  baseCard: {
    backgroundColor: N.CARD_BG,
    borderRadius: '0.75rem',
    padding: '1.5rem',
    marginBottom: '1.5rem',
    ...glowBorder(N.BORDER_DARK), 
  },
  // --- FIX: Add the missing baseButton style function ---
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

const DaresPage = () => {
  const dares = [
    { id: 1, text: "Say 'I love chips' 10 times in a row.", amount: 5, user: 'Watcher1' },
    { id: 2, text: "Play the next round using only the knife.", amount: 20, user: 'WatcherKing' },
    { id: 3, text: "Sing your favorite 80s song (badly).", amount: 10, user: 'Fanatic' },
    { id: 4, text: "Wear sunglasses for the next 30 minutes.", amount: 5, user: 'ShadowBot' },
  ];

  const dareItemStyle = (color) => ({
    ...S.baseCard,
    padding: '1rem',
    borderLeft: `5px solid ${color}`,
    marginBottom: '1rem',
    cursor: 'pointer',
    ...S.glowBorder(color),
    transition: 'transform 0.3s',
  });

  return (
    <AppLayout>
      <h1 style={{ fontSize: '2.5rem', fontWeight: 'extrabold', marginBottom: '2rem', textAlign: 'center', ...S.glowText(N.MAGENTA, 12) }}>
        Active Dares ({dares.length})
      </h1>
      <p style={{ textAlign: 'center', color: N.TEXT_SECONDARY, marginBottom: '2rem' }}>
        New challenges from your Watchers. Accept the dare to earn the reward!
      </p>

      <div style={{ display: 'grid', gap: '1.5rem' }}>
        {dares.map((dare, index) => (
          <div key={dare.id} style={dareItemStyle(index % 2 === 0 ? N.YELLOW : N.CYAN)}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
              <span style={{ fontWeight: 'bold', ...S.glowText(index % 2 === 0 ? N.YELLOW : N.CYAN, 8) }}>
                {dare.amount} DR ($)
              </span>
              <span style={{ color: N.TEXT_SECONDARY, fontSize: '0.75rem' }}>
                From @{dare.user}
              </span>
            </div>
            <p style={{ fontSize: '1.1rem', marginBottom: '1rem' }}>{dare.text}</p>
            <button 
              style={{ ...S.baseButton(false, N.MAGENTA), ...S.glowBorder(N.MAGENTA), ...S.glowText(N.MAGENTA, 5), padding: '0.5rem 1rem', float: 'right' }}
              onClick={() => alert(`Accepted Dare ${dare.id}: ${dare.text}`)}
            >
              Accept Challenge
            </button>
            <div style={{ clear: 'both' }}></div>
          </div>
        ))}
      </div>
    </AppLayout>
  );
};

export default DaresPage;