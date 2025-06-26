import React from 'react';

interface NetProps {
  x: number;
}

export const Net: React.FC<NetProps> = ({ x }) => {
  return (
    <div
      className="absolute bottom-4 transition-all duration-150 ease-out"
      style={{ left: x, transform: 'translateX(-50%)' }}
    >
      <svg
        width="120"
        height="100"
        viewBox="0 0 120 100"
        className="drop-shadow-lg"
      >
        {/* Net handle - wooden with grip */}
        <rect
          x="55"
          y="70"
          width="10"
          height="30"
          fill="#D2691E"
          stroke="#8B4513"
          strokeWidth="2"
          rx="5"
        />
        
        {/* Handle wood grain - simplified */}
        <line x1="57" y1="75" x2="57" y2="95" stroke="#8B4513" strokeWidth="1" opacity="0.6"/>
        <line x1="63" y1="75" x2="63" y2="95" stroke="#8B4513" strokeWidth="1" opacity="0.6"/>
        
        {/* Handle grip wrapping */}
        <rect x="54" y="80" width="12" height="2" fill="#654321" rx="1"/>
        <rect x="54" y="85" width="12" height="2" fill="#654321" rx="1"/>
        <rect x="54" y="90" width="12" height="2" fill="#654321" rx="1"/>
        
        {/* Net rim - metal hoop with better contrast */}
        <ellipse
          cx="60"
          cy="55"
          rx="50"
          ry="15"
          fill="none"
          stroke="#2A2A2A"
          strokeWidth="4"
        />
        
        {/* Rim highlight - more prominent */}
        <ellipse
          cx="60"
          cy="55"
          rx="50"
          ry="15"
          fill="none"
          stroke="#E0E0E0"
          strokeWidth="2"
          opacity="0.9"
        />
        
        {/* Net bag - main shape with better visibility */}
        <path
          d="M 15 55 Q 60 25 105 55 Q 85 75 60 85 Q 35 75 15 55"
          fill="rgba(70, 130, 180, 0.25)"
          stroke="#1F4F4F"
          strokeWidth="2"
        />
        
        {/* Net mesh pattern - vertical lines (simplified) */}
        <g stroke="#1F4F4F" strokeWidth="2" opacity="0.8">
          <line x1="25" y1="50" x2="30" y2="30" />
          <line x1="35" y1="48" x2="40" y2="25" />
          <line x1="45" y1="47" x2="50" y2="23" />
          <line x1="55" y1="47" x2="60" y2="23" />
          <line x1="65" y1="47" x2="70" y2="24" />
          <line x1="75" y1="48" x2="80" y2="27" />
          <line x1="85" y1="50" x2="90" y2="35" />
          <line x1="95" y1="52" x2="95" y2="35" />
        </g>
        
        {/* Net mesh pattern - horizontal curves (simplified) */}
        <g stroke="#1F4F4F" strokeWidth="2" opacity="0.8" fill="none">
          <path d="M 30 42 Q 60 39 90 42" />
          <path d="M 35 37 Q 60 34 85 37" />
          <path d="M 40 32 Q 60 29 80 32" />
          <path d="M 45 27 Q 60 24 75 27" />
        </g>
        
        {/* Net mesh pattern - diamond cross-hatch (reduced and lighter) */}
        <g stroke="#1F4F4F" strokeWidth="1" opacity="0.5">
          <line x1="30" y1="42" x2="40" y2="32" />
          <line x1="40" y1="42" x2="50" y2="32" />
          <line x1="50" y1="42" x2="60" y2="32" />
          <line x1="60" y1="42" x2="70" y2="32" />
          <line x1="70" y1="42" x2="80" y2="32" />
          <line x1="80" y1="42" x2="90" y2="32" />
          
          {/* Reverse diagonal - reduced */}
          <line x1="40" y1="32" x2="30" y2="42" />
          <line x1="50" y1="32" x2="40" y2="42" />
          <line x1="60" y1="32" x2="50" y2="42" />
          <line x1="70" y1="32" x2="60" y2="42" />
          <line x1="80" y1="32" x2="70" y2="42" />
          <line x1="90" y1="32" x2="80" y2="42" />
        </g>
        
        {/* Net depth/shadow */}
        <path
          d="M 20 55 Q 60 70 100 55 Q 80 80 60 85 Q 40 80 20 55"
          fill="rgba(47, 79, 79, 0.3)"
          stroke="none"
        />
        
        {/* Rim connection points - cleaner */}
        <circle cx="15" cy="55" r="2" fill="#2A2A2A"/>
        <circle cx="105" cy="55" r="2" fill="#2A2A2A"/>
        <circle cx="60" cy="40" r="2" fill="#2A2A2A"/>
        <circle cx="60" cy="70" r="2" fill="#2A2A2A"/>
        
        {/* Net highlight/shine effect */}
        <ellipse
          cx="45"
          cy="40"
          rx="12"
          ry="6"
          fill="rgba(255,255,255,0.4)"
        />
        
        {/* Handle end cap */}
        <ellipse
          cx="60"
          cy="100"
          rx="6"
          ry="3"
          fill="#8B4513"
          stroke="#654321"
          strokeWidth="1"
        />
      </svg>
    </div>
  );
};