// src/components/AppLayout.jsx

import React, { useState, useCallback, useEffect } from 'react'; 
import { Outlet, useLocation } from 'react-router-dom';
// FIX: Import the new Sidebar component
import Sidebar from './Sidebar'; 

// Define layout dimensions
const MAIN_CONTENT_MARGIN_OPEN = '320px'; 
const MAIN_CONTENT_MARGIN_COLLAPSED = '120px';

const AppLayout = () => { 
  const [isCollapsed, setIsCollapsed] = useState(false);
  
  // State management and toggle function remain in the parent
  const toggleSidebar = useCallback(() => {
    // Use functional update to ensure correct state change
    setIsCollapsed(prev => !prev);
  }, []);
  
  // The content margin is directly controlled by the isCollapsed state
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
      {/* Render the Sidebar component, passing state and toggle function as props */}
      <Sidebar isCollapsed={isCollapsed} toggleSidebar={toggleSidebar} />
      
      {/* Content Wrapper for pages (children) with margin controlled by isCollapsed */}
      <div id="main-content-wrapper" style={mainContentStyles}>
        <Outlet />
      </div>
    </>
  );
};

export default AppLayout;