// src/components/AppLayout.jsx
import React, { useState } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom'; 

// --- Shared Styles/Colors (N) ---
const N = {
  CYAN: '#00fff7',
  MAGENTA: '#ff00ff',
  YELLOW: '#fffc00',
  DARK_BG: '#0a0a0a',
  CARD_BG: '#1a1a1a',
  TEXT_LIGHT: '#e5e7eb',
  TEXT_SECONDARY: '#9ca3af',
  BORDER_DARK: '#4b5563',
  PURPLE: '#7f00ff', // New color for background flair
};

// --- Core Style Functions ---
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

// Define S using the helper functions
const S = {
  glowText: glowText,
  glowBorder: glowBorder,
  
  baseCard: {
    backgroundColor: N.CARD_BG,
    borderRadius: '0.75rem',
    padding: '1.5rem',
    marginBottom: '1.5rem',
    ...glowBorder(N.BORDER_DARK), 
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
  
  // Adjusted NavLink style for vertical menu
  navLink: (isActive, color) => ({
    display: 'flex',
    alignItems: 'center',
    padding: '0.75rem 1rem',
    borderRadius: '0.5rem',
    fontWeight: 'bold',
    textDecoration: 'none',
    transition: 'all 0.2s',
    cursor: 'pointer',
    
    backgroundColor: isActive ? color + '20' : N.CARD_BG,
    color: isActive ? color : N.TEXT_SECONDARY,
    ...glowBorder(isActive ? color : N.CARD_BG),
    ...glowText(isActive ? color : N.TEXT_SECONDARY, isActive ? 6 : 0),
    
    '&:hover': {
      backgroundColor: N.CARD_BG,
      ...glowBorder(color),
      ...glowText(color, 8),
    }
  }),
};


// --- Left Sidebar Navigation ---
const Sidebar = ({ isCollapsed, toggleSidebar }) => {
  const links = [
    { name: 'Dashboard', path: '/dashboard', icon: '🏠', color: N.YELLOW },
    { name: 'Dares', path: '/dares', icon: '🎯', color: N.MAGENTA },
    { name: 'Stream', path: '/stream', icon: '🎥', color: N.CYAN },
    { name: 'Settings', path: '/Setting', icon: '⚙️', color: N.TEXT_LIGHT },
  ];
  
  const sidebarStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    height: '100%',
    width: isCollapsed ? '5rem' : '15rem', // 80px when collapsed, 240px when open
    backgroundColor: N.DARK_BG,
    borderRight: `2px solid ${N.PURPLE}20`,
    boxShadow: `5px 0 15px ${N.PURPLE}20`,
    transition: 'width 0.3s ease',
    zIndex: 1000,
    padding: '1rem',
    paddingTop: '0.5rem',
    display: 'flex',
    flexDirection: 'column',
    alignItems: isCollapsed ? 'center' : 'stretch',
  };

  const navLinkInnerStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: isCollapsed ? 'center' : 'flex-start',
    width: '100%',
    textAlign: 'left',
  };

  const linkTextStyle = {
    marginLeft: isCollapsed ? 0 : '0.75rem',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    display: isCollapsed ? 'none' : 'block', // Hide text when collapsed
  };

  return (
    <div style={sidebarStyle}>
      {/* Logo Section */}
      <div style={{ padding: '0.5rem 0', marginBottom: '1.5rem', display: 'flex', justifyContent: isCollapsed ? 'center' : 'space-between', alignItems: 'center' }}>
        <Link to="/dashboard" style={{ ...S.glowText(N.CYAN, 12), fontSize: '1.5rem', fontWeight: 'bold', textDecoration: 'none', display: isCollapsed ? 'none' : 'block' }}>
          DARER
        </Link>
        <button 
          onClick={toggleSidebar} 
          style={{
            background: 'none', 
            border: 'none', 
            cursor: 'pointer', 
            fontSize: '1.5rem', 
            color: N.CYAN,
            ...S.glowText(N.CYAN, 8),
            padding: '0.25rem'
          }}
        >
          {isCollapsed ? '➡️' : '⬅️'}
        </button>
      </div>

      {/* Navigation Links */}
      <nav style={{ flexGrow: 1 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          {links.map(link => (
            <NavLink 
              key={link.name} 
              to={link.path} 
              style={({ isActive }) => S.navLink(isActive, link.color)}
            >
              <div style={navLinkInnerStyle}>
                <span style={{ fontSize: '1.25rem' }} role="img" aria-label={link.name}>{link.icon}</span>
                <span style={linkTextStyle}>{link.name}</span>
              </div>
            </NavLink>
          ))}
        </div>
      </nav>

      {/* Footer/Logout Link */}
      <div style={{ marginTop: 'auto', padding: '1rem 0' }}>
        <Link to="/" style={{ 
          ...S.baseButton(false, N.MAGENTA), 
          width: '100%',
          display: 'flex',
          justifyContent: isCollapsed ? 'center' : 'flex-start',
          alignItems: 'center',
          padding: isCollapsed ? '0.75rem' : '0.75rem 1rem',
          borderRadius: '0.5rem',
          fontSize: isCollapsed ? '1.5rem' : '0.875rem',
          backgroundColor: N.CARD_BG, 
          ...S.glowBorder(N.MAGENTA),
          ...S.glowText(N.MAGENTA),
        }}>
          {isCollapsed ? '🚪' : 'Logout'}
        </Link>
      </div>
    </div>
  );
};


// --- App Layout Component ---
const AppLayout = ({ children }) => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const location = useLocation();

  const toggleSidebar = () => {
    setIsSidebarCollapsed(prev => !prev);
  };

  // List of paths that should NOT show the sidebar (e.g., login, landing, signup)
  const fullScreenPaths = [
    '/login', '/', '/signup', '/html/circle.html', '/html/player_signup.html', 
    '/html/watcher_signup.html', '/error'
  ];
  const isFullScreenLayout = fullScreenPaths.includes(location.pathname) || location.pathname.startsWith('/html');
  
  // Determine content padding based on sidebar state
  const contentPaddingLeft = isSidebarCollapsed ? '6rem' : '16rem'; // 5rem + 1rem padding vs 15rem + 1rem padding

  const baseContainerStyle = {
    minHeight: '100vh',
    backgroundColor: N.DARK_BG,
    color: N.TEXT_LIGHT,
    fontFamily: 'Inter, sans-serif',
    boxSizing: 'border-box',
  };
  
  // Full-screen pages (Auth, Loading)
  if (isFullScreenLayout) {
    return <div style={baseContainerStyle}>{children}</div>;
  }

  // Dashboard Pages (with Sidebar)
  const contentWrapperStyle = {
    padding: '1.5rem',
    maxWidth: '80rem',
    margin: '0 auto',
  };

  return (
    <div style={baseContainerStyle}>
      {/* Background Animation/Glow */}
      <div style={{
          position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: -1, 
          background: `radial-gradient(circle at 10% 90%, ${N.CYAN}05 0%, transparent 40%), radial-gradient(circle at 90% 10%, ${N.MAGENTA}05 0%, transparent 40%), radial-gradient(circle at 50% 50%, ${N.PURPLE}05 0%, transparent 60%)`
      }}></div>
      
      {/* Left Sidebar */}
      <Sidebar isCollapsed={isSidebarCollapsed} toggleSidebar={toggleSidebar} />
      
      {/* Main Content Area */}
      <div style={{ transition: 'margin-left 0.3s ease', marginLeft: contentPaddingLeft, padding: '1rem', minHeight: '100vh' }}>
        <div style={contentWrapperStyle}>
          {children}
        </div>
      </div>
    </div>
  );
};

export default AppLayout;