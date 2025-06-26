import React from 'react';

interface FireTruckProps {
  x: number;
  y: number;
}

export const FireTruck: React.FC<FireTruckProps> = ({ x, y }) => {
  return (
    <div
      className="absolute transition-none"
      style={{ 
        left: `${x}px`, 
        top: `${y}px`, 
        transform: 'translate(-50%, -50%)',
        zIndex: 5 // Above ground but below flying cats and UI
      }}
    >
      <svg
        width="120"
        height="80"
        viewBox="0 0 120 80"
        className="drop-shadow-md"
      >
        {/* Fire truck body */}
        <rect
          x="10"
          y="25"
          width="90"
          height="35"
          fill="#DC2626"
          stroke="#991B1B"
          strokeWidth="2"
          rx="4"
        />
        
        {/* Truck cab */}
        <rect
          x="75"
          y="15"
          width="25"
          height="25"
          fill="#DC2626"
          stroke="#991B1B"
          strokeWidth="2"
          rx="3"
        />
        
        {/* Windshield */}
        <rect
          x="77"
          y="17"
          width="21"
          height="15"
          fill="#87CEEB"
          stroke="#4682B4"
          strokeWidth="1"
          rx="2"
        />
        
        {/* Side windows */}
        <rect
          x="80"
          y="33"
          width="8"
          height="6"
          fill="#87CEEB"
          stroke="#4682B4"
          strokeWidth="1"
          rx="1"
        />
        <rect
          x="90"
          y="33"
          width="8"
          height="6"
          fill="#87CEEB"
          stroke="#4682B4"
          strokeWidth="1"
          rx="1"
        />
        
        {/* Equipment compartments */}
        <rect
          x="15"
          y="30"
          width="15"
          height="25"
          fill="#B91C1C"
          stroke="#7F1D1D"
          strokeWidth="1"
          rx="2"
        />
        <rect
          x="35"
          y="30"
          width="15"
          height="25"
          fill="#B91C1C"
          stroke="#7F1D1D"
          strokeWidth="1"
          rx="2"
        />
        <rect
          x="55"
          y="30"
          width="15"
          height="25"
          fill="#B91C1C"
          stroke="#7F1D1D"
          strokeWidth="1"
          rx="2"
        />
        
        {/* Compartment handles */}
        <circle cx="22" cy="42" r="2" fill="#4B5563"/>
        <circle cx="42" cy="42" r="2" fill="#4B5563"/>
        <circle cx="62" cy="42" r="2" fill="#4B5563"/>
        
        {/* Ladder on top */}
        <rect
          x="20"
          y="20"
          width="50"
          height="4"
          fill="#9CA3AF"
          stroke="#6B7280"
          strokeWidth="1"
          rx="2"
        />
        
        {/* Ladder rungs */}
        <line x1="25" y1="20" x2="25" y2="24" stroke="#6B7280" strokeWidth="1"/>
        <line x1="30" y1="20" x2="30" y2="24" stroke="#6B7280" strokeWidth="1"/>
        <line x1="35" y1="20" x2="35" y2="24" stroke="#6B7280" strokeWidth="1"/>
        <line x1="40" y1="20" x2="40" y2="24" stroke="#6B7280" strokeWidth="1"/>
        <line x1="45" y1="20" x2="45" y2="24" stroke="#6B7280" strokeWidth="1"/>
        <line x1="50" y1="20" x2="50" y2="24" stroke="#6B7280" strokeWidth="1"/>
        <line x1="55" y1="20" x2="55" y2="24" stroke="#6B7280" strokeWidth="1"/>
        <line x1="60" y1="20" x2="60" y2="24" stroke="#6B7280" strokeWidth="1"/>
        <line x1="65" y1="20" x2="65" y2="24" stroke="#6B7280" strokeWidth="1"/>
        
        {/* Emergency light */}
        <rect
          x="85"
          y="10"
          width="10"
          height="4"
          fill="#EF4444"
          stroke="#DC2626"
          strokeWidth="1"
          rx="2"
        />
        
        {/* Front wheels */}
        <circle cx="85" cy="65" r="12" fill="#374151" stroke="#1F2937" strokeWidth="2"/>
        <circle cx="85" cy="65" r="8" fill="#9CA3AF" stroke="#6B7280" strokeWidth="1"/>
        <circle cx="85" cy="65" r="4" fill="#374151"/>
        
        {/* Rear wheels */}
        <circle cx="25" cy="65" r="12" fill="#374151" stroke="#1F2937" strokeWidth="2"/>
        <circle cx="25" cy="65" r="8" fill="#9CA3AF" stroke="#6B7280" strokeWidth="1"/>
        <circle cx="25" cy="65" r="4" fill="#374151"/>
        
        <circle cx="45" cy="65" r="12" fill="#374151" stroke="#1F2937" strokeWidth="2"/>
        <circle cx="45" cy="65" r="8" fill="#9CA3AF" stroke="#6B7280" strokeWidth="1"/>
        <circle cx="45" cy="65" r="4" fill="#374151"/>
        
        {/* Cat riding on top */}
        <g transform="translate(45, 12)">
          {/* Cat body */}
          <ellipse cx="0" cy="0" rx="8" ry="6" fill="#F5E6D3" stroke="#000" strokeWidth="2"/>
          
          {/* Cat head */}
          <circle cx="0" cy="-8" r="6" fill="#F5E6D3" stroke="#000" strokeWidth="2"/>
          
          {/* Ears */}
          <path d="M -4,-12 L -6,-16 L -1,-14 Z" fill="#F5E6D3" stroke="#000" strokeWidth="2"/>
          <path d="M 4,-12 L 6,-16 L 1,-14 Z" fill="#F5E6D3" stroke="#000" strokeWidth="2"/>
          <path d="M -4,-13 L -5,-15 L -2,-14 Z" fill="#FFB6C1"/>
          <path d="M 4,-13 L 5,-15 L 2,-14 Z" fill="#FFB6C1"/>
          
          {/* Eyes (confident/mischievous) */}
          <circle cx="-2" cy="-9" r="2" fill="#FFF"/>
          <circle cx="2" cy="-9" r="2" fill="#FFF"/>
          <circle cx="-2" cy="-9" r="1.5" fill="#000"/>
          <circle cx="2" cy="-9" r="1.5" fill="#000"/>
          <circle cx="-1.5" cy="-9.5" r="0.5" fill="#FFF"/>
          <circle cx="2.5" cy="-9.5" r="0.5" fill="#FFF"/>
          
          {/* Nose */}
          <path d="M -0.5,-6 L 0.5,-6 L 0,-5 Z" fill="#FF69B4"/>
          
          {/* Mouth (confident grin) */}
          <path d="M -2,-4 Q 0,-3 2,-4" stroke="#000" strokeWidth="1.5" fill="none"/>
          <path d="M -1,-4 Q 0,-3.5 1,-4" stroke="#000" strokeWidth="1" fill="none"/>
          
          {/* Whiskers */}
          <line x1="-6" y1="-7" x2="-3" y2="-7.5" stroke="#000" strokeWidth="1"/>
          <line x1="-6" y1="-6" x2="-3" y2="-6.5" stroke="#000" strokeWidth="1"/>
          <line x1="3" y1="-7.5" x2="6" y2="-7" stroke="#000" strokeWidth="1"/>
          <line x1="3" y1="-6.5" x2="6" y2="-6" stroke="#000" strokeWidth="1"/>
          
          {/* Tail (flicking upward) */}
          <path d="M -6,2 Q -10,-2 -8,-8" stroke="#F5E6D3" strokeWidth="3" fill="none" strokeLinecap="round"/>
          
          {/* Paws gripping ladder */}
          <circle cx="-4" cy="2" r="2" fill="#F5E6D3" stroke="#000" strokeWidth="1"/>
          <circle cx="4" cy="2" r="2" fill="#F5E6D3" stroke="#000" strokeWidth="1"/>
        </g>
        
        {/* Front grille */}
        <rect
          x="102"
          y="30"
          width="8"
          height="20"
          fill="#1F2937"
          stroke="#000"
          strokeWidth="1"
          rx="1"
        />
        
        {/* Grille lines */}
        <line x1="103" y1="32" x2="109" y2="32" stroke="#4B5563" strokeWidth="1"/>
        <line x1="103" y1="35" x2="109" y2="35" stroke="#4B5563" strokeWidth="1"/>
        <line x1="103" y1="38" x2="109" y2="38" stroke="#4B5563" strokeWidth="1"/>
        <line x1="103" y1="41" x2="109" y2="41" stroke="#4B5563" strokeWidth="1"/>
        <line x1="103" y1="44" x2="109" y2="44" stroke="#4B5563" strokeWidth="1"/>
        <line x1="103" y1="47" x2="109" y2="47" stroke="#4B5563" strokeWidth="1"/>
        
        {/* Headlights */}
        <circle cx="105" cy="35" r="3" fill="#FEF3C7" stroke="#F59E0B" strokeWidth="1"/>
        <circle cx="105" cy="45" r="3" fill="#FEF3C7" stroke="#F59E0B" strokeWidth="1"/>
      </svg>
    </div>
  );
};