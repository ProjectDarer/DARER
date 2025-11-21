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

const S = {
  glowText: glowText, // Expose helpers on S for consistency
  glowBorder: glowBorder,
  baseCard: {
    backgroundColor: N.CARD_BG,
    borderRadius: '0.75rem',
    padding: '1.5rem',
    marginBottom: '1.5rem',
    ...glowBorder(N.BORDER_DARK), // FIX: Use the standalone helper
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

const SettingsPage = () => {
  const settingItemStyle = {
    padding: '1rem 0',
    borderBottom: `1px solid ${N.BORDER_DARK}40`,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    cursor: 'pointer',
  };
  
  const linkStyle = {
    color: N.CYAN,
    textDecoration: 'none',
    ...S.glowText(N.CYAN, 3),
  };

  return (
    <AppLayout>
      <h1 style={{ fontSize: '2.5rem', fontWeight: 'extrabold', marginBottom: '2rem', textAlign: 'center', ...S.glowText(N.YELLOW, 12) }}>
        User Settings
      </h1>

      <div style={S.baseCard}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem', ...S.glowText(N.MAGENTA, 8) }}>Account</h2>
        
        <div style={settingItemStyle} onClick={() => alert('Editing Profile Info...')}>
          <p>Edit Profile Information</p>
          <span style={linkStyle}>Manage</span>
        </div>
        
        <div style={settingItemStyle} onClick={() => alert('Changing Password...')}>
          <p>Change Password</p>
          <span style={linkStyle}>Manage</span>
        </div>
        
        <div style={{...settingItemStyle, borderBottom: 'none'}} onClick={() => alert('Viewing Privacy Settings...')}>
          <p>Privacy Settings</p>
          <span style={linkStyle}>View</span>
        </div>
      </div>

      <div style={S.baseCard}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem', ...S.glowText(N.MAGENTA, 8) }}>Security</h2>
        
        <div style={settingItemStyle} onClick={() => alert('Enabling Two-Factor Authentication...')}>
          <p>Two-Factor Authentication</p>
          <span style={{ color: N.YELLOW, fontWeight: 'bold' }}>Disabled</span>
        </div>
        
        <div style={{...settingItemStyle, borderBottom: 'none'}} onClick={() => alert('Viewing Connected Apps...')}>
          <p>Connected Applications</p>
          <span style={linkStyle}>View (3)</span>
        </div>
      </div>
      
      <div style={{ textAlign: 'center', marginTop: '3rem' }}>
        <a 
          href="#" 
          style={{ 
            ...S.baseButton(false, N.MAGENTA), 
            ...S.glowText(N.MAGENTA, 8), 
            ...S.glowBorder(N.MAGENTA),
            backgroundColor: `${N.MAGENTA}10`,
            padding: '1rem 2rem',
            fontSize: '1.1rem'
          }}
          onClick={(e) => { e.preventDefault(); alert("Logging out and returning to Landing Page."); window.location.href = '/'; }}
        >
          Sign Out
        </a>
      </div>
    </AppLayout>
  );
};

export default SettingsPage;