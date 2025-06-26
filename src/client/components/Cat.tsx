import React from 'react';

interface CatProps {
  x: number;
  y: number;
  variant: number;
  isRunningAway?: boolean;
  isFalling?: boolean;
  isCaught?: boolean;
}

export const Cat: React.FC<CatProps> = ({ 
  x, 
  y, 
  variant, 
  isRunningAway = false, 
  isFalling = false,
  isCaught = false
}) => {
  const getCatColor = (variant: number) => {
    const colors = [
      { body: '#F5E6D3', accent: '#8B7355', stripes: true }, // Tabby
      { body: '#FFFFFF', accent: '#E0E0E0', stripes: false }, // White
      { body: '#2F2F2F', accent: '#1A1A1A', stripes: false }, // Black
      { body: '#FF8C42', accent: '#D2691E', stripes: true }, // Orange
      { body: '#C0C0C0', accent: '#808080', stripes: false }, // Gray
      { body: '#8B4513', accent: '#654321', stripes: false }, // Brown
    ];
    return colors[variant % colors.length];
  };

  const catColor = getCatColor(variant);

  if (isRunningAway) {
    // Running away cat (side view, running)
    return (
      <div
        className="absolute transition-all duration-300 animate-bounce"
        style={{ 
          left: `${x}px`, 
          top: `${y}px`, 
          transform: 'translate(-50%, -50%)',
          transition: 'none' // Remove transitions for smooth physics
        }}
      >
        <svg
          width="50"
          height="35"
          viewBox="0 0 50 35"
          className="drop-shadow-md"
        >
          {/* Running cat body */}
          <ellipse cx="25" cy="20" rx="15" ry="8" fill={catColor.body} stroke="#000" strokeWidth="2"/>
          
          {/* Head */}
          <circle cx="35" cy="15" r="8" fill={catColor.body} stroke="#000" strokeWidth="2"/>
          
          {/* Ears */}
          <path d="M 30,8 L 32,3 L 35,8 Z" fill={catColor.body} stroke="#000" strokeWidth="2"/>
          <path d="M 35,8 L 38,3 L 40,8 Z" fill={catColor.body} stroke="#000" strokeWidth="2"/>
          <path d="M 31,7 L 32,5 L 34,7 Z" fill="#FFB6C1"/>
          <path d="M 36,7 L 37,5 L 39,7 Z" fill="#FFB6C1"/>
          
          {/* Eyes (worried) */}
          <ellipse cx="32" cy="13" rx="2" ry="3" fill="#FFF"/>
          <ellipse cx="38" cy="13" rx="2" ry="3" fill="#FFF"/>
          <circle cx="32" cy="14" r="1.5" fill="#000"/>
          <circle cx="38" cy="14" r="1.5" fill="#000"/>
          
          {/* Nose */}
          <path d="M 34,16 L 36,16 L 35,17 Z" fill="#FF69B4"/>
          
          {/* Mouth (open/worried) */}
          <ellipse cx="35" cy="18" rx="2" ry="1" fill="#FF69B4"/>
          
          {/* Running legs */}
          <ellipse cx="15" cy="25" rx="3" ry="6" fill={catColor.body} stroke="#000" strokeWidth="1"/>
          <ellipse cx="22" cy="27" rx="2" ry="5" fill={catColor.body} stroke="#000" strokeWidth="1"/>
          <ellipse cx="28" cy="25" rx="2" ry="5" fill={catColor.body} stroke="#000" strokeWidth="1"/>
          <ellipse cx="35" cy="27" rx="3" ry="6" fill={catColor.body} stroke="#000" strokeWidth="1"/>
          
          {/* Tail (curved up in alarm) */}
          <path d="M 12,18 Q 5,10 8,5" stroke={catColor.body} strokeWidth="4" fill="none" strokeLinecap="round"/>
          
          {/* Motion lines */}
          <line x1="5" y1="12" x2="10" y2="12" stroke="#000" strokeWidth="1" opacity="0.5"/>
          <line x1="3" y1="16" x2="8" y2="16" stroke="#000" strokeWidth="1" opacity="0.5"/>
          <line x1="6" y1="20" x2="11" y2="20" stroke="#000" strokeWidth="1" opacity="0.5"/>
        </svg>
      </div>
    );
  }

  // Falling cat (arms up, surprised expression) - Tetris-like falling
  return (
    <div
      className={`absolute ${isCaught ? 'animate-caught' : ''}`}
      style={{ 
        left: `${x}px`, 
        top: `${y}px`, 
        transform: 'translate(-50%, -50%)',
        transition: 'none', // Remove transitions for smooth physics
        zIndex: 10
      }}
    >
      <svg
        width="45"
        height="50"
        viewBox="0 0 45 50"
        className="drop-shadow-md"
      >
        {/* Cat body */}
        <ellipse cx="22" cy="35" rx="12" ry="10" fill={catColor.body} stroke="#000" strokeWidth="3"/>
        
        {/* Head */}
        <circle cx="22" cy="20" r="12" fill={catColor.body} stroke="#000" strokeWidth="3"/>
        
        {/* Ears */}
        <path d="M 12,12 L 15,5 L 20,12 Z" fill={catColor.body} stroke="#000" strokeWidth="3"/>
        <path d="M 24,12 L 29,5 L 32,12 Z" fill={catColor.body} stroke="#000" strokeWidth="3"/>
        <path d="M 14,11 L 16,8 L 18,11 Z" fill="#FFB6C1"/>
        <path d="M 26,11 L 28,8 L 30,11 Z" fill="#FFB6C1"/>
        
        {/* Eyes (wide with surprise) */}
        <circle cx="17" cy="18" r="4" fill="#FFF"/>
        <circle cx="27" cy="18" r="4" fill="#FFF"/>
        <circle cx="17" cy="18" r="3" fill="#000"/>
        <circle cx="27" cy="18" r="3" fill="#000"/>
        <circle cx="18" cy="16" r="1" fill="#FFF"/>
        <circle cx="28" cy="16" r="1" fill="#FFF"/>
        
        {/* Nose */}
        <path d="M 21,23 L 23,23 L 22,25 Z" fill="#FF69B4"/>
        
        {/* Mouth (surprised 'O') */}
        <circle cx="22" cy="27" r="2" fill="#8B0000"/>
        
        {/* Arms up (surprised/falling) */}
        <ellipse cx="8" cy="25" rx="4" ry="8" fill={catColor.body} stroke="#000" strokeWidth="2" transform="rotate(-30 8 25)"/>
        <ellipse cx="36" cy="25" rx="4" ry="8" fill={catColor.body} stroke="#000" strokeWidth="2" transform="rotate(30 36 25)"/>
        
        {/* Paws */}
        <circle cx="5" cy="18" r="3" fill={catColor.body} stroke="#000" strokeWidth="2"/>
        <circle cx="39" cy="18" r="3" fill={catColor.body} stroke="#000" strokeWidth="2"/>
        
        {/* Paw pads */}
        <circle cx="5" cy="18" r="1" fill="#FFB6C1"/>
        <circle cx="39" cy="18" r="1" fill="#FFB6C1"/>
        
        {/* Legs */}
        <ellipse cx="16" cy="42" rx="3" ry="6" fill={catColor.body} stroke="#000" strokeWidth="2"/>
        <ellipse cx="28" cy="42" rx="3" ry="6" fill={catColor.body} stroke="#000" strokeWidth="2"/>
        
        {/* Feet */}
        <ellipse cx="16" cy="47" rx="4" ry="2" fill={catColor.body} stroke="#000" strokeWidth="2"/>
        <ellipse cx="28" cy="47" rx="4" ry="2" fill={catColor.body} stroke="#000" strokeWidth="2"/>
        
        {/* Tail */}
        <path d="M 32,40 Q 40,35 38,28" stroke={catColor.body} strokeWidth="5" fill="none" strokeLinecap="round"/>
        
        {/* Stripes for tabby cats */}
        {catColor.stripes && (
          <>
            <path d="M 12,18 Q 22,16 32,18" stroke={catColor.accent} strokeWidth="2" fill="none"/>
            <path d="M 14,32 Q 22,30 30,32" stroke={catColor.accent} strokeWidth="2" fill="none"/>
            <path d="M 16,38 Q 22,36 28,38" stroke={catColor.accent} strokeWidth="2" fill="none"/>
          </>
        )}
        
        {/* Whiskers */}
        <line x1="8" y1="20" x2="14" y2="19" stroke="#000" strokeWidth="1"/>
        <line x1="8" y1="22" x2="14" y2="21" stroke="#000" strokeWidth="1"/>
        <line x1="30" y1="19" x2="36" y2="20" stroke="#000" strokeWidth="1"/>
        <line x1="30" y1="21" x2="36" y2="22" stroke="#000" strokeWidth="1"/>
        
        {/* Falling motion effect - subtle blur */}
        {isFalling && (
          <defs>
            <filter id="motionBlur">
              <feGaussianBlur in="SourceGraphic" stdDeviation="0,1"/>
            </filter>
          </defs>
        )}
      </svg>
    </div>
  );
};