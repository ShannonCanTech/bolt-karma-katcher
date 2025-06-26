import React, { useState, useEffect } from 'react';

interface TreeProps {
  isShaking: boolean;
  onClick: () => void;
}

interface PeekingCat {
  id: number;
  x: number;
  y: number;
  variant: number;
  visible: boolean;
}

export const Tree: React.FC<TreeProps> = ({ isShaking, onClick }) => {
  const [peekingCats, setPeekingCats] = useState<PeekingCat[]>([]);

  // Initialize peeking cats
  useEffect(() => {
    const cats: PeekingCat[] = [
      { id: 1, x: 80, y: 90, variant: 0, visible: false },
      { id: 2, x: 120, y: 100, variant: 1, visible: false },
      { id: 3, x: 100, y: 120, variant: 2, visible: false },
      { id: 4, x: 90, y: 140, variant: 0, visible: false },
      { id: 5, x: 110, y: 150, variant: 1, visible: false },
    ];
    setPeekingCats(cats);
  }, []);

  // Random peek-a-boo effect
  useEffect(() => {
    const interval = setInterval(() => {
      setPeekingCats(prev => 
        prev.map(cat => ({
          ...cat,
          visible: Math.random() < 0.15 // 15% chance to be visible
        }))
      );
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const getCatVariant = (variant: number, x: number, y: number) => {
    const colors = [
      { body: '#F5E6D3', stripes: '#8B7355' }, // Tabby
      { body: '#FFFFFF', stripes: '#D3D3D3' }, // White
      { body: '#2F2F2F', stripes: '#1A1A1A' }, // Black
    ];
    const color = colors[variant % colors.length];

    return (
      <g key={`cat-${x}-${y}`} transform={`translate(${x}, ${y})`}>
        {/* Cat head peeking */}
        <ellipse cx="0" cy="0" rx="8" ry="6" fill={color.body} stroke="#000" strokeWidth="1"/>
        
        {/* Ears */}
        <path d="M -5,-5 L -8,-10 L -2,-8 Z" fill={color.body} stroke="#000" strokeWidth="1"/>
        <path d="M 5,-5 L 8,-10 L 2,-8 Z" fill={color.body} stroke="#000" strokeWidth="1"/>
        <path d="M -5,-6 L -6,-8 L -4,-7 Z" fill="#FFB6C1"/>
        <path d="M 5,-6 L 6,-8 L 4,-7 Z" fill="#FFB6C1"/>
        
        {/* Eyes */}
        <circle cx="-2" cy="-1" r="2" fill="#FFF"/>
        <circle cx="2" cy="-1" r="2" fill="#FFF"/>
        <circle cx="-2" cy="-1" r="1.5" fill="#000"/>
        <circle cx="2" cy="-1" r="1.5" fill="#000"/>
        <circle cx="-1.5" cy="-1.5" r="0.5" fill="#FFF"/>
        <circle cx="2.5" cy="-1.5" r="0.5" fill="#FFF"/>
        
        {/* Nose */}
        <path d="M -0.5,1.5 L 0.5,1.5 L 0,2.5 Z" fill="#FF69B4"/>
        
        {/* Mouth */}
        <path d="M -2,3.5 Q 0,4.5 2,3.5" stroke="#000" strokeWidth="0.8" fill="none"/>
        
        {/* Whiskers */}
        <line x1="-8" y1="1" x2="-5" y2="0.5" stroke="#000" strokeWidth="0.5"/>
        <line x1="-8" y1="2" x2="-5" y2="1.5" stroke="#000" strokeWidth="0.5"/>
        <line x1="5" y1="0.5" x2="8" y2="1" stroke="#000" strokeWidth="0.5"/>
        <line x1="5" y1="1.5" x2="8" y2="2" stroke="#000" strokeWidth="0.5"/>
        
        {/* Stripes for tabby cats */}
        {variant === 0 && (
          <>
            <path d="M -4,-4 Q 0,-3 4,-4" stroke={color.stripes} strokeWidth="0.8" fill="none"/>
            <path d="M -3,-1 Q 0,0 3,-1" stroke={color.stripes} strokeWidth="0.8" fill="none"/>
          </>
        )}
      </g>
    );
  };

  return (
    <div 
      className={`cursor-pointer transition-transform duration-200 ${isShaking ? 'animate-shake' : ''}`}
      onClick={onClick}
    >
      <svg
        width="200"
        height="300"
        viewBox="0 0 200 300"
        className="drop-shadow-lg"
      >
        {/* Tree trunk */}
        <rect
          x="85"
          y="200"
          width="30"
          height="100"
          fill="#8B4513"
          stroke="#654321"
          strokeWidth="2"
          rx="5"
        />
        
        {/* Tree trunk texture */}
        <line x1="88" y1="210" x2="88" y2="290" stroke="#654321" strokeWidth="1"/>
        <line x1="97" y1="215" x2="97" y2="285" stroke="#654321" strokeWidth="1"/>
        <line x1="103" y1="215" x2="103" y2="285" stroke="#654321" strokeWidth="1"/>
        <line x1="112" y1="210" x2="112" y2="290" stroke="#654321" strokeWidth="1"/>
        
        {/* Trunk knots */}
        <ellipse cx="92" cy="230" rx="2" ry="1" fill="#654321"/>
        <ellipse cx="108" cy="250" rx="2" ry="1.5" fill="#654321"/>
        <ellipse cx="95" cy="270" rx="1.5" ry="1" fill="#654321"/>
        
        {/* Tree foliage - bottom layer */}
        <circle
          cx="100"
          cy="180"
          r="60"
          fill="#228B22"
          stroke="#006400"
          strokeWidth="2"
        />
        
        {/* Tree foliage - middle layer */}
        <circle
          cx="100"
          cy="140"
          r="50"
          fill="#32CD32"
          stroke="#228B22"
          strokeWidth="2"
        />
        
        {/* Tree foliage - top layer */}
        <circle
          cx="100"
          cy="100"
          r="40"
          fill="#90EE90"
          stroke="#32CD32"
          strokeWidth="2"
        />
        
        {/* Tree highlights */}
        <ellipse
          cx="85"
          cy="90"
          rx="15"
          ry="12"
          fill="#ADFF2F"
          opacity="0.7"
        />
        <ellipse
          cx="115"
          cy="130"
          rx="12"
          ry="10"
          fill="#ADFF2F"
          opacity="0.7"
        />
        
        {/* Peeking cats */}
        {peekingCats.map(cat => 
          cat.visible && getCatVariant(cat.variant, cat.x, cat.y)
        )}
        
        {/* Cute face on tree */}
        <circle cx="90" cy="160" r="3" fill="#000" />
        <circle cx="110" cy="160" r="3" fill="#000" />
        <path
          d="M 95 170 Q 100 175 105 170"
          stroke="#000"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
};