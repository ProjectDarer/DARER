import React, { useState } from 'react';
import '../styles/error.css';

const ErrorPage = () => {
  const [retryText, setRetryText] = useState('Retry');
  const [isRetrying, setIsRetrying] = useState(false);

  const handleRetry = () => {
    if (isRetrying) return;

    setRetryText("Retrying...");
    setIsRetrying(true);

    // Simulate retry logic (from public/javascripts/error.js)
    setTimeout(() => {
      // In a real app, this would be a check or a specific fetch call
      window.location.reload(); // Simple page reload
      // For a SPA, you'd typically navigate('/home') or execute error handling logic
    }, 1000);
  };

  return (
    <div className="error-container">
      <div className="error-box">
        <h1 className="error-title">Network Error</h1>
        <p className="error-message">There was a problem connecting. Please try again.</p>
        <button 
          className="retry-btn"
          onClick={handleRetry}
          disabled={isRetrying}
        >
          {retryText}
        </button>
      </div>
    </div>
  );
};

export default ErrorPage;