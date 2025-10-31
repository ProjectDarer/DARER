// src/components/CustomGamingAlert.jsx

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// --- Theme Definitions ---
const alertThemes = {
  success: {
    color: '#00D4FF', 
    shadowColor: 'rgba(0, 212, 255, 0.5)',
    title: 'OPERATION SUCCESS',
    icon: '✅',
  },
  info: {
    color: '#00D4FF', 
    shadowColor: 'rgba(0, 212, 255, 0.5)',
    title: 'SYSTEM MESSAGE',
    icon: '👁️',
  },
  warning: {
    color: '#FFCC00', // Yellow/Orange for Warning
    shadowColor: 'rgba(255, 204, 0, 0.7)',
    title: 'ACCESS DENIED',
    icon: '⚠️',
  },
  error: {
    color: '#FF3366', // Red/Pink for Error
    shadowColor: 'rgba(255, 51, 102, 0.8)',
    title: 'CRITICAL ERROR',
    icon: '❌',
  },
};

// --- Style Generator Function ---
const getStyles = (theme) => {
  const { color, shadowColor } = theme;

  return {
    overlay: {
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      // Dynamic background gradient based on theme color
      background: `radial-gradient(circle at 20% 80%, ${color}0C 0%, transparent 50%), radial-gradient(circle at 80% 20%, #FF00FF0C 0%, transparent 50%), radial-gradient(circle at 40% 40%, #FFFF000C 0%, transparent 50%), linear-gradient(135deg, rgba(0, 0, 0, 0.9) 0%, rgba(10, 10, 10, 0.95) 100%)`,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 10000,
      backdropFilter: 'blur(10px)',
    },
    container: {
      background: 'linear-gradient(135deg, rgba(0, 0, 0, 0.95) 0%, rgba(26, 26, 46, 0.9) 50%, rgba(22, 33, 62, 0.95) 100%)',
      border: `3px solid ${color}`,
      borderRadius: '20px',
      padding: '40px',
      maxWidth: '450px',
      width: '90%',
      textAlign: 'center',
      position: 'relative',
      overflow: 'hidden',
      backdropFilter: 'blur(20px)',
      // Dynamic box shadow based on theme color
      boxShadow: `${color}14 0px 0px 8px, ${color}08 0px 0px 8px inset, ${color}0F 0px 0px 15px, ${color}05 0px 0px 20px`,
    },
    title: {
      color: color,
      margin: '0 0 20px',
      fontSize: '1.6em',
      fontWeight: 900,
      letterSpacing: '3px',
      // Dynamic text shadow based on theme color
      textShadow: `${color} 0px 0px 3px, ${shadowColor} 0px 0px 6px, ${shadowColor}80 0px 0px 9px`,
      fontFamily: 'Arial, sans-serif',
      textTransform: 'uppercase',
      position: 'relative',
      filter: `drop-shadow(${shadowColor} 0px 0px 3px)`,
    },
    message: {
      color: 'rgb(255, 255, 255)',
      margin: '0 0 30px',
      lineHeight: 1.6,
      fontSize: '1.1em',
      fontWeight: 700,
      letterSpacing: '1.5px',
      textShadow: 'rgb(255, 255, 255) 0px 0px 5px, rgb(255, 255, 255) 0px 0px 10px, rgba(255, 255, 255, 0.8) 0px 0px 15px',
      fontFamily: 'Arial, sans-serif',
      position: 'relative',
    },
    button: {
      // Dynamic button background and border
      background: `linear-gradient(45deg, ${color}30, ${color}20, ${color}30)`,
      border: `2px solid ${color}`,
      color: color,
      padding: '15px 40px',
      borderRadius: '30px',
      fontWeight: 900,
      cursor: 'pointer',
      fontSize: '1.1em',
      transition: '0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
      textTransform: 'uppercase',
      letterSpacing: '3px',
      textShadow: `${color} 0px 0px 2px, ${shadowColor} 0px 0px 4px`,
      fontFamily: 'Arial, sans-serif',
      position: 'relative',
      overflow: 'hidden',
      backdropFilter: 'blur(10px)',
      boxShadow: `${color}1F 0px 0px 6px, ${color}08 0px 0px 6px inset`,
    },
    buttonGlow: {
      position: 'absolute',
      top: 0,
      left: '-100%',
      width: '100%',
      height: '100%',
      background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent)',
      transition: 'left 0.6s',
    },
    // Styles for the inner visual effects (particles/grid)
    bgEffect: {
        background: 'none', 
        position: 'absolute', 
        top: 0, 
        left: 0, 
        width: '100%',
        height: '100%',
        zIndex: -1, 
        pointerEvents: 'none', 
        opacity: 0.3,
    }
  };
};

/**
 * Custom Gaming Alert Modal Component
 */
const CustomGamingAlert = ({ isVisible, title, message, type, onContinue }) => {
  if (!isVisible) return null;

  const theme = alertThemes[type] || alertThemes.info;
  const styles = getStyles(theme);

  // Dynamic particle effect style
  const particleStyle = {
    ...styles.bgEffect,
    backgroundImage: 'radial-gradient(2px 2px at 20px 30px, ' + theme.color + ', transparent), radial-gradient(2px 2px at 40px 70px, ' + theme.color + '80, transparent), radial-gradient(1px 1px at 90px 40px, ' + theme.color + '60, transparent), radial-gradient(1px 1px at 130px 80px, ' + theme.color + '40, transparent)',
    backgroundRepeat: 'repeat',
    backgroundSize: '200px 150px'
  };

  // Dynamic grid effect style
  const gridStyle = {
    ...styles.bgEffect,
    opacity: 0.2,
    backgroundImage: 'linear-gradient(' + theme.color + '20 1px, transparent 1px), linear-gradient(90deg, ' + theme.color + '20 1px, transparent 1px)',
    backgroundRepeat: 'repeat',
    backgroundSize: '30px 30px'
  };


  return (
    <div className="custom-gaming-alert-modal" style={styles.overlay}>
      <div className="alert-container" style={styles.container}>
        {/* Background Effects */}
        <div style={particleStyle}></div>
        <div style={gridStyle}></div>

        <h3 style={styles.title}>{theme.icon} {title}</h3>
        <p style={styles.message}>{message}</p>
        <button 
          style={styles.button} 
          onClick={onContinue}
          onMouseOver={(e) => {
            const glow = e.currentTarget.querySelector('.btn-hover-glow');
            if (glow) glow.style.left = '100%';
          }}
          onMouseOut={(e) => {
            const glow = e.currentTarget.querySelector('.btn-hover-glow');
            if (glow) glow.style.left = '-100%';
          }}
        >
          OK
          <div className="btn-hover-glow" style={styles.buttonGlow}></div>
        </button>
      </div>
    </div>
  );
};

export default CustomGamingAlert;

// --- Custom Hook for Alert Logic ---
export const useCustomGamingAlert = () => {
  const [modalState, setModalState] = useState({
    isVisible: false,
    title: '',
    message: '',
    type: 'info', // 'success', 'warning', 'error', 'info'
    redirectUrl: null,
  });
  const navigate = useNavigate();

  const showCustomAlert = (customTitle, message, type = 'info', redirectUrl = null) => {
    // We use the predefined title from alertThemes, but allow overriding the message and type
    setModalState({
      isVisible: true,
      title: customTitle,
      message,
      type,
      redirectUrl,
    });
  };

  const handleContinue = () => {
    setModalState(s => ({ ...s, isVisible: false }));
    if (modalState.redirectUrl) {
      setTimeout(() => {
        navigate(modalState.redirectUrl);
      }, 300); 
    }
  };

  const AlertComponent = () => (
    <CustomGamingAlert
      isVisible={modalState.isVisible}
      // Pass the theme's title or the custom title if provided in the call
      title={modalState.title || alertThemes[modalState.type]?.title} 
      message={modalState.message}
      type={modalState.type}
      onContinue={handleContinue}
    />
  );

  return { showCustomAlert, AlertComponent };
};