import React from 'react';

interface HelicopterProps {
  x: number;
  y: number;
}

export const Helicopter: React.FC<HelicopterProps> = ({ x, y }) => {
  return (
    <div
      className="absolute transition-none"
      style={{ 
        left: `${x}px`, 
        top: `${y}px`, 
        transform: 'translate(-50%, -50%)',
        zIndex: 8 // Above tree and leaves but below UI
      }}
    >
      <svg
        width="100"
        height="80"
        viewBox="0 0 100 80"
        className="drop-shadow-lg"
      >
        {/* Main rotor blades (spinning) */}
        <g transform="translate(50, 15)">
          <ellipse cx="0" cy="0" rx="35" ry="3" fill="#9CA3AF" opacity="0.6"/>
          <ellipse cx="0" cy="0" rx="3" ry="35" fill="#9CA3AF" opacity="0.4"/>
        </g>
        
        {/* Rotor mast */}
        <rect
          x="48"
          y="15"
          width="4"
          height="8"
          fill="#374151"
          stroke="#1F2937"
          strokeWidth="1"
        />
        
        {/* Helicopter body */}
        <ellipse
          cx="50"
          cy="40"
          rx="25"
          ry="15"
          fill="#EA580C"
          stroke="#C2410C"
          strokeWidth="2"
        />
        
        {/* Cockpit bubble */}
        <ellipse
          cx="50"
          cy="35"
          rx="20"
          ry="12"
          fill="rgba(135, 206, 235, 0.7)"
          stroke="#4682B4"
          strokeWidth="2"
        />
        
        {/* Cockpit frame */}
        <path
          d="M 30,35 Q 50,25 70,35"
          stroke="#4682B4"
          strokeWidth="2"
          fill="none"
        />
        <line x1="50" y1="25" x2="50" y2="45" stroke="#4682B4" strokeWidth="2"/>
        <line x1="35" y1="30" x2="35" y2="40" stroke="#4682B4" strokeWidth="1"/>
        <line x1="65" y1="30" x2="65" y2="40" stroke="#4682B4" strokeWidth="1"/>
        
        {/* Landing skids */}
        <rect
          x="20"
          y="52"
          width="60"
          height="3"
          fill="#6B7280"
          stroke="#374151"
          strokeWidth="1"
          rx="1"
        />
        <rect
          x="25"
          y="50"
          width="3"
          height="8"
          fill="#6B7280"
          stroke="#374151"
          strokeWidth="1"
        />
        <rect
          x="72"
          y="50"
          width="3"
          height="8"
          fill="#6B7280"
          stroke="#374151"
          strokeWidth="1"
        />
        
        {/* Tail boom */}
        <rect
          x="75"
          y="38"
          width="20"
          height="6"
          fill="#EA580C"
          stroke="#C2410C"
          strokeWidth="2"
          rx="3"
        />
        
        {/* Tail fin */}
        <path
          d="M 90,35 L 95,30 L 98,35 L 95,45 L 90,45 Z"
          fill="#EA580C"
          stroke="#C2410C"
          strokeWidth="2"
        />
        
        {/* Tail rotor */}
        <g transform="translate(97, 37)">
          <circle cx="0" cy="0" r="6" fill="#9CA3AF" opacity="0.5"/>
          <line x1="-6" y1="0" x2="6" y2="0" stroke="#6B7280" strokeWidth="2" opacity="0.7"/>
          <line x1="0" y1="-6" x2="0" y2="6" stroke="#6B7280" strokeWidth="2" opacity="0.7"/>
        </g>
        
        {/* Cat pilot */}
        <g transform="translate(50, 35)">
          {/* Cat body in cockpit */}
          <ellipse cx="0" cy="5" rx="6" ry="4" fill="#FFFFFF" stroke="#000" strokeWidth="1"/>
          
          {/* Cat head */}
          <circle cx="0" cy="-2" r="5" fill="#FFFFFF" stroke="#000" strokeWidth="2"/>
          
          {/* Aviator goggles */}
          <ellipse cx="-2" cy="-3" rx="2.5" ry="2" fill="#1F2937" stroke="#000" strokeWidth="1"/>
          <ellipse cx="2" cy="-3" rx="2.5" ry="2" fill="#1F2937" stroke="#000" strokeWidth="1"/>
          <path d="M -4.5,-3 Q 0,-5 4.5,-3" stroke="#8B4513" strokeWidth="2" fill="none"/>
          
          {/* Goggle reflections */}
          <ellipse cx="-2" cy="-3.5" rx="1" ry="0.8" fill="#87CEEB" opacity="0.6"/>
          <ellipse cx="2" cy="-3.5" rx="1" ry="0.8" fill="#87CEEB" opacity="0.6"/>
          
          {/* Ears */}
          <path d="M -3,-6 L -5,-9 L -1,-7 Z" fill="#FFFFFF" stroke="#000" strokeWidth="2"/>
          <path d="M 3,-6 L 5,-9 L 1,-7 Z" fill="#FFFFFF" stroke="#000" strokeWidth="2"/>
          <path d="M -3,-6.5 L -4,-8 L -2,-7 Z" fill="#FFB6C1"/>
          <path d="M 3,-6.5 L 4,-8 L 2,-7 Z" fill="#FFB6C1"/>
          
          {/* Nose */}
          <path d="M -0.5,0 L 0.5,0 L 0,1 Z" fill="#FF69B4"/>
          
          {/* Mouth (confident pilot smile) */}
          <path d="M -1.5,1.5 Q 0,2.5 1.5,1.5" stroke="#000" strokeWidth="1" fill="none"/>
          
          {/* Paw on joystick */}
          <circle cx="3" cy="3" r="1.5" fill="#FFFFFF" stroke="#000" strokeWidth="1"/>
          <rect x="2" y="4" width="2" height="4" fill="#374151" stroke="#000" strokeWidth="1"/>
          
          {/* Whiskers */}
          <line x1="-5" y1="-1" x2="-2.5" y2="-1.5" stroke="#000" strokeWidth="0.8"/>
          <line x1="-5" y1="0" x2="-2.5" y2="-0.5" stroke="#000" strokeWidth="0.8"/>
          <line x1="2.5" y1="-1.5" x2="5" y2="-1" stroke="#000" strokeWidth="0.8"/>
          <line x1="2.5" y1="-0.5" x2="5" y2="0" stroke="#000" strokeWidth="0.8"/>
        </g>
        
        {/* Engine exhaust */}
        <ellipse
          cx="85"
          cy="41"
          rx="3"
          ry="2"
          fill="#1F2937"
          stroke="#000"
          strokeWidth="1"
        />
        
        {/* Navigation lights */}
        <circle cx="25" cy="40" r="1.5" fill="#EF4444"/>
        <circle cx="75" cy="40" r="1.5" fill="#22C55E"/>
      </svg>
    </div>
  );
};