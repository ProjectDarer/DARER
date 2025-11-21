// src/components/AppLayout.jsx

import React, { useState, useEffect } from 'react';
import { Link, useLocation, Outlet } from 'react-router-dom'; // FIX 1: Import Outlet

// Cyberpunk color palette matching landing page
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

// Define sidebar widths
const SIDEBAR_WIDTH_OPEN = '280px';
const SIDEBAR_WIDTH_COLLAPSED = '80px';
const MAIN_CONTENT_MARGIN_OPEN = '320px'; 
const MAIN_CONTENT_MARGIN_COLLAPSED = '120px';

// Animated Sidebar Component
const AppLayout = () => { // FIX 2: Removed 'children' from props
  const [isCollapsed, setIsCollapsed] = useState(false);
  const toggleSidebar = () => setIsCollapsed(!isCollapsed);
  
  const location = useLocation(); 
  const [activeLink, setActiveLink] = useState(location.pathname); 

  // Sync activeLink state whenever the route changes
  useEffect(() => {
    setActiveLink(location.pathname);
  }, [location.pathname]);

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
    width: isCollapsed ? SIDEBAR_WIDTH_COLLAPSED : SIDEBAR_WIDTH_OPEN, 
    background: 'linear-gradient(135deg, rgba(0, 0, 0, 0.95) 0%, rgba(20, 0, 30, 0.95) 100%)',
    borderRight: `2px solid ${COLORS.neonCyan}`,
    boxShadow: `0 0 40px ${COLORS.glowCyan}, inset 0 0 40px rgba(0, 255, 247, 0.05)`,
    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
    zIndex: 1000,
    overflow: 'hidden',
    backdropFilter: 'blur(10px)',
  };

  const logoStyles = {
    padding: '2rem 1.5rem',
    borderBottom: `1px solid ${COLORS.neonMagenta}40`,
    display: 'flex',
    alignItems: 'center',
    justifyContent: isCollapsed ? 'center' : 'space-between', 
    background: `linear-gradient(90deg, ${COLORS.glowMagenta} 0%, transparent 100%)`,
  };

  const logoTextStyles = {
    fontSize: isCollapsed ? '0' : '2rem',
    fontWeight: 900,
    background: `linear-gradient(135deg, ${COLORS.neonCyan} 0%, ${COLORS.neonMagenta} 100%)`,
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    textShadow: `0 0 30px ${COLORS.glowCyan}`,
    letterSpacing: '2px',
    transition: 'all 0.3s ease',
    whiteSpace: 'nowrap',
  };

  const navLinkStyles = (isActive, color) => ({
    display: 'flex',
    alignItems: 'center',
    padding: '1rem 1.5rem',
    margin: '0.5rem 1rem',
    borderRadius: '12px',
    background: isActive 
      ? `linear-gradient(90deg, ${color}20 0%, transparent 100%)`
      : 'transparent',
    border: isActive ? `1px solid ${color}` : '1px solid transparent',
    color: isActive ? color : '#999',
    textDecoration: 'none',
    transition: 'all 0.3s ease',
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
    width: '40px',
    height: '40px',
    cursor: 'pointer',
    fontSize: '1.2rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: `0 0 20px ${COLORS.glowCyan}`,
    transition: 'all 0.3s ease',
  };

  const mainContentStyles = {
    marginLeft: isCollapsed ? MAIN_CONTENT_MARGIN_COLLAPSED : MAIN_CONTENT_MARGIN_OPEN,
    padding: '3rem',
    transition: 'margin-left 0.4s ease',
   height : '100vh' , 
    position: 'relative',
    zIndex: 1,
  };

  return (
    <>
      <div style={sidebarStyles}>
        {/* Animated background particles */}
        <div style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          background: `radial-gradient(circle at 20% 50%, ${COLORS.glowCyan} 0%, transparent 50%), radial-gradient(circle at 80% 80%, ${COLORS.glowMagenta} 0%, transparent 50%)`,
          opacity: 0.1,
          animation: 'pulse 4s ease-in-out infinite',
        }} />

        {/* Logo Section */}
        <div style={logoStyles}>
          <div style={logoTextStyles}>DARER</div>
          <button type="button" style={toggleButtonStyles} onClick={toggleSidebar}>
            {isCollapsed ? '→' : '←'}
          </button>
        </div>

        {/* Navigation Links */}
        <nav style={{ padding: '2rem 0', position: 'relative', zIndex: 2 }}>
          {links.map(link => (
            <Link
              key={link.path}
              to={link.path}
              style={navLinkStyles(activeLink === link.path, link.color)}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateX(10px)';
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
              <span style={{ fontSize: '1.5rem', marginRight: isCollapsed ? '0' : '1rem' }}>
                {link.icon}
              </span>
              {!isCollapsed && <span style={{ fontSize: '1rem' }}>{link.name}</span>}
            </Link>
          ))}
        </nav>

        {/* User Profile Section */}
        {!isCollapsed && (
          <div style={{
            position: 'absolute',
            bottom: '2rem',
            left: '1rem',
            right: '1rem',
            padding: '1rem',
            borderRadius: '12px',
            background: `linear-gradient(135deg, ${COLORS.glowMagenta} 0%, ${COLORS.glowCyan} 100%)`,
            boxShadow: `0 0 30px ${COLORS.glowMagenta}`,
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div style={{
                width: '50px',
                height: '50px',
                borderRadius: '50%',
                background: `linear-gradient(135deg, ${COLORS.neonYellow} 0%, ${COLORS.neonMagenta} 100%)`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.5rem',
                fontWeight: 'bold',
                boxShadow: `0 0 20px ${COLORS.glowYellow}`,
              }}>
                P
              </div>
              <div>
                <div style={{ fontWeight: 'bold', color: 'white' }}>Player_X</div>
                <div style={{ fontSize: '0.8rem', color: COLORS.neonYellow }}>Level 47</div>
              </div>
            </div>
          </div>
        )}

        <style>{`
          @keyframes pulse {
            0%, 100% { opacity: 0.1; }
            50% { opacity: 0.2; }
          }
          @keyframes rotate {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
        `}</style>
      </div>
      
      {/* Content Wrapper for pages (children) */}
      <div style={mainContentStyles}>
        <Outlet /> {/* FIX 3: Renders the child component (e.g., DashboardPage) */}
      </div>
    </>
  );
};

export default AppLayout;