import React from 'react';
import './Logo.css';

const Logo = ({ size = 'medium' }) => {
  return (
    <div className={`logo-container ${size}`}>
      <div className="logo-icon">
        <svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
          {/* White background circle for visibility */}
          <circle cx="60" cy="60" r="55" fill="white" opacity="0.95"/>

          {/* Main circular badge */}
          <circle cx="60" cy="60" r="50" fill="url(#logoGradient)" stroke="white" strokeWidth="3"/>

          {/* Dollar sign with modern styling */}
          <text
            x="60"
            y="75"
            fontSize="48"
            fontWeight="900"
            fill="white"
            textAnchor="middle"
            fontFamily="Arial, sans-serif"
          >
            $
          </text>

          {/* Upward trend arrow */}
          <path
            d="M 35 70 L 50 55 L 65 62 L 85 40"
            fill="none"
            stroke="white"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity="0.9"
          />

          {/* Arrow head */}
          <path
            d="M 85 40 L 78 42 L 82 48 Z"
            fill="white"
            opacity="0.9"
          />

          {/* Small accent dots for data visualization feel */}
          <circle cx="35" cy="70" r="3" fill="white" opacity="0.9"/>
          <circle cx="50" cy="55" r="3" fill="white" opacity="0.9"/>
          <circle cx="65" cy="62" r="3" fill="white" opacity="0.9"/>
          <circle cx="85" cy="40" r="3" fill="white" opacity="0.9"/>

          {/* Gradient definition */}
          <defs>
            <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style={{stopColor: '#10b981', stopOpacity: 1}} />
              <stop offset="100%" style={{stopColor: '#059669', stopOpacity: 1}} />
            </linearGradient>
          </defs>
        </svg>
      </div>
      <div className="logo-text">
        <span className="logo-brand">CashFlow</span>
        <span className="logo-location">MTL</span>
      </div>
    </div>
  );
};

export default Logo;
