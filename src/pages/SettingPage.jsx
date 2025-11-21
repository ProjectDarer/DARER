// src/pages/SettingPage.jsx
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

const SettingPage = () => {
  const [settings, setSettings] = useState({
    notifications: true,
    autoAcceptDares: false,
    privateProfile: false,
  });

  const SettingToggle = ({ label, desc, value, onChange, color }) => (
    <div style={{
      background: 'rgba(26, 26, 26, 0.9)', borderRadius: '12px', padding: '1.5rem',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      marginBottom: '1rem',
    }}>
      <div>
        <div style={{ fontSize: '1.2rem', fontWeight: 'bold', color: 'white', marginBottom: '0.5rem' }}>
          {label}
        </div>
        <div style={{ color: '#999', fontSize: '0.9rem' }}>{desc}</div>
      </div>
      <div onClick={onChange} style={{
        width: '60px', height: '30px', borderRadius: '15px',
        background: value ? `linear-gradient(135deg, ${color} 0%, ${color}80 100%)` : '#333',
        position: 'relative', cursor: 'pointer', transition: 'all 0.3s',
        boxShadow: value ? `0 0 20px ${color}60` : 'none',
      }}>
        <div style={{
          width: '24px', height: '24px', borderRadius: '50%',
          background: 'white', position: 'absolute', top: '3px',
          left: value ? '33px' : '3px', transition: 'all 0.3s',
        }} />
      </div>
    </div>
  );

  return (
    <>
      <div style={{ marginBottom: '3rem', textAlign: 'center'  , 
        marginTop: '45px' }}>
        <h1 style={{
          fontSize: '3.5rem', fontWeight: 900,
          background: `linear-gradient(135deg, ${COLORS.neonCyan} 0%, ${COLORS.neonPurple} 100%)`,
          WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
          marginBottom: '1rem',
        }}>⚙️ SETTINGS</h1>
      </div>

      {/* Profile Section */}
      <div style={{
        background: `linear-gradient(135deg, ${COLORS.neonMagenta}10 0%, rgba(26, 26, 26, 0.9) 100%)`,
        borderRadius: '16px', padding: '2rem', marginBottom: '3rem',
        border: `2px solid ${COLORS.neonMagenta}40`,
      }}>
        <h2 style={{
          fontSize: '1.8rem', fontWeight: 'bold', color: COLORS.neonMagenta,
          marginBottom: '2rem', textShadow: `0 0 20px ${COLORS.neonMagenta}`,
        }}>Profile Settings</h2>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '2rem', marginBottom: '2rem' }}>
          <div style={{
            width: '100px', height: '100px', borderRadius: '50%',
            background: `linear-gradient(135deg, ${COLORS.neonYellow} 0%, ${COLORS.neonMagenta} 100%)`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '3rem', fontWeight: 'bold',
            boxShadow: `0 0 30px ${COLORS.neonYellow}60`,
            cursor: 'pointer',
          }}>P</div>
          <div style={{ flex: 1 }}>
            <input type="text" placeholder="Username" defaultValue="Player_X" style={{
              width: '100%', padding: '1rem', marginBottom: '1rem',
              background: 'rgba(0, 0, 0, 0.5)',
              border: `2px solid ${COLORS.neonCyan}40`,
              borderRadius: '8px', color: 'white', fontSize: '1.1rem',
              outline: 'none',
            }} />
            <textarea placeholder="Bio" defaultValue="Professional dare taker and streamer. Let's make it epic! 🎮" style={{
              width: '100%', padding: '1rem',
              background: 'rgba(0, 0, 0, 0.5)',
              border: `2px solid ${COLORS.neonCyan}40`,
              borderRadius: '8px', color: 'white', fontSize: '1rem',
              outline: 'none', minHeight: '100px', resize: 'vertical',
            }} />
          </div>
        </div>

        <button style={{
          padding: '1rem 2rem',
          background: `linear-gradient(135deg, ${COLORS.neonMagenta}30 0%, transparent 100%)`,
          border: `2px solid ${COLORS.neonMagenta}`, borderRadius: '12px',
          color: COLORS.neonMagenta, fontWeight: 'bold', cursor: 'pointer',
          fontSize: '1rem', transition: 'all 0.3s',
        }}>💾 SAVE CHANGES</button>
      </div>

      {/* Preferences Section */}
      <div style={{
        background: `linear-gradient(135deg, ${COLORS.neonCyan}10 0%, rgba(26, 26, 26, 0.9) 100%)`,
        borderRadius: '16px', padding: '2rem', marginBottom: '3rem',
        border: `2px solid ${COLORS.neonCyan}40`,
      }}>
        <h2 style={{
          fontSize: '1.8rem', fontWeight: 'bold', color: COLORS.neonCyan,
          marginBottom: '2rem', textShadow: `0 0 20px ${COLORS.neonCyan}`,
        }}>Preferences</h2>

        <SettingToggle
          label="Notifications"
          desc="Receive notifications for new dares and messages"
          value={settings.notifications}
          onChange={() => setSettings({...settings, notifications: !settings.notifications})}
          color={COLORS.neonCyan}
        />

        <SettingToggle
          label="Auto-Accept Dares"
          desc="Automatically accept dares within your price range"
          value={settings.autoAcceptDares}
          onChange={() => setSettings({...settings, autoAcceptDares: !settings.autoAcceptDares})}
          color={COLORS.neonMagenta}
        />

        <SettingToggle
          label="Private Profile"
          desc="Only show your profile to followers"
          value={settings.privateProfile}
          onChange={() => setSettings({...settings, privateProfile: !settings.privateProfile})}
          color={COLORS.neonYellow}
        />
      </div>

      {/* Payment Methods */}
      <div style={{
        background: `linear-gradient(135deg, ${COLORS.neonYellow}10 0%, rgba(26, 26, 26, 0.9) 100%)`,
        borderRadius: '16px', padding: '2rem', marginBottom: '3rem',
        border: `2px solid ${COLORS.neonYellow}40`,
      }}>
        <h2 style={{
          fontSize: '1.8rem', fontWeight: 'bold', color: COLORS.neonYellow,
          marginBottom: '2rem', textShadow: `0 0 20px ${COLORS.neonYellow}`,
        }}>Payment Methods</h2>

        <div style={{
          background: 'rgba(26, 26, 26, 0.9)', borderRadius: '12px',
          padding: '1.5rem', border: '1px solid rgba(255, 255, 255, 0.1)',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          marginBottom: '1rem',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{ fontSize: '2rem' }}>💳</div>
            <div>
              <div style={{ color: 'white', fontWeight: 'bold', marginBottom: '0.25rem' }}>
                PayPal
              </div>
              <div style={{ color: '#999', fontSize: '0.9rem' }}>player_x@email.com</div>
            </div>
          </div>
          <button style={{
            padding: '0.5rem 1rem', background: 'transparent',
            border: `1px solid ${COLORS.neonYellow}`, borderRadius: '8px',
            color: COLORS.neonYellow, cursor: 'pointer', fontSize: '0.9rem',
          }}>Edit</button>
        </div>

        <button style={{
          padding: '1rem 2rem',
          background: `linear-gradient(135deg, ${COLORS.neonYellow}30 0%, transparent 100%)`,
          border: `2px solid ${COLORS.neonYellow}`, borderRadius: '12px',
          color: COLORS.neonYellow, fontWeight: 'bold', cursor: 'pointer',
          fontSize: '1rem', transition: 'all 0.3s',
        }}>➕ ADD PAYMENT METHOD</button>
      </div>

      {/* Danger Zone */}
      <div style={{
        background: 'rgba(255, 0, 0, 0.05)', borderRadius: '16px', padding: '2rem',
        border: '2px solid rgba(255, 0, 0, 0.3)',
      }}>
        <h2 style={{
          fontSize: '1.8rem', fontWeight: 'bold', color: '#ff4444',
          marginBottom: '1rem',
        }}>Danger Zone</h2>
        <p style={{ color: '#999', marginBottom: '1.5rem' }}>
          These actions are permanent and cannot be undone.
        </p>
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <button style={{
            padding: '1rem 2rem', background: 'rgba(255, 0, 0, 0.1)',
            border: '2px solid #ff4444', borderRadius: '12px',
            color: '#ff4444', fontWeight: 'bold', cursor: 'pointer',
            fontSize: '1rem', transition: 'all 0.3s',
          }}>🔒 DEACTIVATE ACCOUNT</button>
          <button style={{
            padding: '1rem 2rem', background: 'rgba(255, 0, 0, 0.1)',
            border: '2px solid #ff4444', borderRadius: '12px',
            color: '#ff4444', fontWeight: 'bold', cursor: 'pointer',
            fontSize: '1rem', transition: 'all 0.3s',
          }}>🗑️ DELETE ACCOUNT</button>
        </div>
      </div>
    </>
  );
};
export default SettingPage