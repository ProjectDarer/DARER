// src/components/Sidebar.jsx

import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const COLORS = {
  neonCyan: '#00fff7',
  neonMagenta: '#ff00ff',
  neonYellow: '#fffc00',
  neonPurple: '#b800ff',
  darkBg: '#0a0a0a',
  glowCyan: 'rgba(0, 255, 247, 0.3)',
  glowMagenta: 'rgba(255, 0, 255, 0.3)',
};

// Desktop sizes
const SIDEBAR_WIDTH_OPEN = '280px';
const SIDEBAR_WIDTH_COLLAPSED = '110px';

const Sidebar = ({ isCollapsed, toggleSidebar }) => {
  const location = useLocation();
  const activeLink = location.pathname;

  const isMobile = window.innerWidth < 480; // Mobile detection

  const links = [
    { name: 'Dashboard', path: '/dashboard', icon: '🏠', color: COLORS.neonYellow },
    { name: 'Live Streams', path: '/stream', icon: '🎥', color: COLORS.neonCyan },
    { name: 'My Dares', path: '/dares', icon: '🎯', color: COLORS.neonMagenta },
    { name: 'Wallet', path: '/wallet', icon: '💰', color: COLORS.neonYellow },
    { name: 'Leaderboard', path: '/leaderboard', icon: '🏆', color: COLORS.neonPurple },
    { name: 'Settings', path: '/Setting', icon: '⚙️', color: COLORS.neonCyan },
  ];

  const sidebarStyles = {
    position: 'fixed',
    top: 0,
    left: 0,
    height: '100vh',

    // 🔥 Responsive width fix
    width: isCollapsed
      ? (isMobile ? "70px" : SIDEBAR_WIDTH_COLLAPSED)
      : (isMobile ? "200px" : SIDEBAR_WIDTH_OPEN),

    background: 'linear-gradient(135deg, rgba(0,0,0,0.95) 0%, rgba(20,0,30,0.95) 100%)',
    borderRight: `2px solid ${COLORS.neonCyan}`,
    boxShadow: `0 0 40px ${COLORS.glowCyan}, inset 0 0 40px rgba(0,255,247,0.05)`,
    transition: 'width 0.4s ease',
    zIndex: 1000,

    // 🔥 Enable scroll on small screens
    overflowY: 'auto',
    overflowX: 'hidden',

    backdropFilter: 'blur(10px)',
  };

  const logoStyles = {
    padding: isMobile ? '1rem 0.5rem' : '2rem 1rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: isCollapsed ? 'center' : 'space-between',
    background: `linear-gradient(90deg, ${COLORS.glowMagenta} 0%, transparent 100%)`,
    borderBottom: `1px solid ${COLORS.neonMagenta}40`,
  };

  const logoTextStyles = {
    fontSize: isCollapsed ? '0' : (isMobile ? '1.5rem' : '2rem'),
    fontWeight: 900,
    background: `linear-gradient(135deg, ${COLORS.neonCyan} 0%, ${COLORS.neonMagenta} 100%)`,
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    textShadow: `0 0 30px ${COLORS.glowCyan}`,
    letterSpacing: '2px',
    whiteSpace: 'nowrap',
    transition: '0.3s ease',
  };

  const navLinkStyles = (isActive, color) => ({
    display: 'flex',
    alignItems: 'center',
    padding: isCollapsed ? (isMobile ? '0.7rem' : '1rem 0.5rem') : (isMobile ? '0.7rem' : '1rem 1.5rem'),
    margin: isMobile ? '0.3rem 0.5rem' : '0.4rem 0.8rem',
    borderRadius: '12px',
    background: isActive
      ? `linear-gradient(90deg, ${color}20 0%, transparent 100%)`
      : 'transparent',
    border: isActive ? `1px solid ${color}` : '1px solid transparent',
    color: isActive ? color : '#aaa',
    textDecoration: 'none',
    transition: '0.3s ease',
    cursor: 'pointer',
    position: 'relative',
    overflow: 'hidden',
    boxShadow: isActive ? `0 0 20px ${color}40, inset 0 0 20px ${color}10` : 'none',
    fontWeight: isActive ? 'bold' : 'normal',
  });

  const toggleButtonStyles = {
    background: `linear-gradient(135deg, ${COLORS.neonCyan} 0%, ${COLORS.neonMagenta} 100%)`,
    border: 'none',
    borderRadius: '50%',
    width: isMobile ? '30px' : '40px',
    height: isMobile ? '30px' : '40px',
    fontSize: isMobile ? '1rem' : '1.2rem',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: `0 0 20px ${COLORS.glowCyan}`,
    transition: '0.3s ease',
  };

  return (
    <div style={sidebarStyles}>
      
      {/* Logo + Toggle */}
      <div style={logoStyles}>
        <div style={logoTextStyles}>DARER</div>
        <button type="button" style={toggleButtonStyles} onClick={toggleSidebar}>
          {isCollapsed ? '→' : '←'}
        </button>
      </div>

      {/* Navigation */}
      <nav style={{ paddingBottom: isMobile ? "80px" : "120px" }}>
        {links.map(link => (
          <Link
            key={link.path}
            to={link.path}
            style={navLinkStyles(activeLink === link.path, link.color)}

            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateX(8px)';
              e.currentTarget.style.borderColor = link.color;
              e.currentTarget.style.boxShadow = `0 0 25px ${link.color}60`;
            }}

            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateX(0)';
              if (activeLink !== link.path) {
                e.currentTarget.style.borderColor = 'transparent';
                e.currentTarget.style.boxShadow = 'none';
              }
            }}
          >
            <span style={{ fontSize: isMobile ? '1.5rem' : '1.8rem', marginRight: isCollapsed ? '0' : '1rem' }}>
              {link.icon}
            </span>

            {!isCollapsed && (
              <span style={{ fontSize: isMobile ? '0.85rem' : '1rem' }}>
                {link.name}
              </span>
            )}
          </Link>
        ))}
      </nav>

      {/* Profile (hide on collapsed) */}
      {!isCollapsed && (
        <div style={{
          position: 'absolute',
          bottom: isMobile ? '0.5rem' : '2rem',
          left: '1rem',
          right: '1rem',
          padding: isMobile ? '0.6rem' : '1rem',
          borderRadius: '12px',
          background: `linear-gradient(135deg, ${COLORS.glowMagenta} 0%, ${COLORS.glowCyan} 100%)`,
          boxShadow: `0 0 30px ${COLORS.glowMagenta}`,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{
              width: isMobile ? '40px' : '50px',
              height: isMobile ? '40px' : '50px',
              borderRadius: '50%',
              background: `linear-gradient(135deg, ${COLORS.neonYellow} 0%, ${COLORS.neonMagenta} 100%)`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: isMobile ? '1.2rem' : '1.5rem',
              fontWeight: 'bold',
              boxShadow: `0 0 20px ${COLORS.neonYellow}60`,
            }}>
              P
            </div>

            <div>
              <div style={{ fontWeight: 'bold', color: 'white', fontSize: isMobile ? '0.9rem' : '1rem' }}>
                Player_X
              </div>
              <div style={{ fontSize: isMobile ? '0.7rem' : '0.8rem', color: COLORS.neonYellow }}>
                Level 47
              </div>
            </div>

          </div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
