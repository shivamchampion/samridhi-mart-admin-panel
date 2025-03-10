import React from 'react';

export const LogoIcon = ({ className, ...props }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 200 200" 
    className={`w-10 h-10 ${className}`}
    {...props}
  >
    <path 
      d="M100 20L20 70v60l80 50 80-50V70L100 20z" 
      fill="#3d5291" 
    />
    <path 
      d="M100 100l-60-37.5v75L100 175l60-37.5v-75L100 100z" 
      fill="#4d71c1" 
      fillOpacity="0.7" 
    />
    <path 
      d="M100 140l-30-18.75v37.5L100 177.5l30-18.75v-37.5L100 140z" 
      fill="#8099d2" 
      fillOpacity="0.5" 
    />
  </svg>
);

export const LogoText = ({ className, ...props }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 400 100" 
    className={`h-10 ${className}`}
    {...props}
  >
    <text 
      x="0" 
      y="70" 
      fontFamily="Arial, sans-serif" 
      fontSize="60" 
      fontWeight="bold" 
      fill="#3d5291"
    >
      Samridhi Mart
    </text>
  </svg>
);

export const LogoFull = ({ className, ...props }) => (
  <div className={`flex items-center space-x-2 ${className}`} {...props}>
    <LogoIcon />
    <LogoText />
  </div>
);