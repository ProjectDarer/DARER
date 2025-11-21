import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const UserOnboardingPage = () => {
  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState(null);

  const handleRoleSelection = (role) => {
    setSelectedRole(role);
    // Simulate role selection process
    setTimeout(() => {
      alert(`Role set to ${role}. Redirecting to Dashboard.`);
      navigate('/dashboard');
    }, 500);
  };
  
  // Shared styles/colors imported from AppLayout for consistency
  const N = { CYAN: '#00fff7', MAGENTA: '#ff00ff', YELLOW: '#fffc00', DARK_BG: '#0a0a0a', TEXT_SECONDARY: '#9ca3af' };
  const S = {
    glowText: (color, intensity = 5) => ({ color: color, textShadow: `0 0 ${intensity}px ${color}80`, transition: 'all 0.2s' }),
    glowBorder: (color) => ({ border: `2px solid ${color}80`, boxShadow: `0 0 10px ${color}50`, transition: 'all 0.2s' }),
  };

  const buttonStyle = (role) => ({
    padding: '1rem 2rem', 
    borderRadius: '0.5rem', 
    fontWeight: 'bold', 
    cursor: 'pointer',
    transition: 'all 0.2s',
    minWidth: '10rem',
    textAlign: 'center',
    margin: '0.5rem 0', 
    backgroundColor: selectedRole === role ? N.CYAN + '30' : N.DARK_BG,
    color: selectedRole === role ? N.CYAN : N.TEXT_SECONDARY, 
    ...S.glowBorder(selectedRole === role ? N.CYAN : N.BORDER_DARK),
    ...S.glowText(selectedRole === role ? N.CYAN : N.TEXT_SECONDARY, selectedRole === role ? 10 : 0),
  });

  const contentContainerStyle = {
    flexGrow: 1, 
    display: 'flex', 
    flexDirection: 'column', 
    alignItems: 'center', 
    justifyContent: 'center', 
    padding: '1.5rem', 
    width: '100%'
  };

  return (
    <>
      <div style={contentContainerStyle}>
        <h1 style={{ fontSize: '2.25rem', fontWeight: 'bold', marginBottom: '2rem', textAlign: 'center', ...S.glowText(N.MAGENTA, 12) }}>
          Welcome to Darer!
        </h1>
        <p style={{ fontSize: '1.125rem', marginBottom: '3rem', color: N.TEXT_SECONDARY, textAlign: 'center' }}>
          Choose your role to start your journey.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '30rem', width: '100%' }}>
          <button
            style={buttonStyle('Player')}
            onClick={() => handleRoleSelection('Player')}
          >
            Player 🎮
          </button>
          <p style={{ color: N.TEXT_SECONDARY, fontSize: '0.875rem', textAlign: 'center', marginBottom: '1.5rem' }}>
            (Streamer: Get dared, get paid.)
          </p>
          
          <button
            style={buttonStyle('Watcher')}
            onClick={() => handleRoleSelection('Watcher')}
          >
            Watcher 👀
          </button>
          <p style={{ color: N.TEXT_SECONDARY, fontSize: '0.875rem', textAlign: 'center' }}>
            (Audience: Dare players, watch the chaos.)
          </p>
        </div>

        <Link to="/dashboard" style={{ marginTop: '4rem', color: N.MAGENTA, textDecoration: 'none', fontSize: '0.875rem', ...S.glowText(N.MAGENTA, 5) }}>
          Skip for now (Go to Dashboard)
        </Link>
      </div>
    </>
  );
};

export default UserOnboardingPage;