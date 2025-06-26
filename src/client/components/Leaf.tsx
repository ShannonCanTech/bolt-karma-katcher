import React from 'react';

interface LeafProps {
  x: number;
  y: number;
  color: string;
  rotation: number;
}

export const Leaf: React.FC<LeafProps> = ({ x, y, color, rotation }) => {
  const getLeafColor = (colorName: string) => {
    const colors: Record<string, { main: string; accent: string; vein: string }> = {
      green: { main: '#7CB342', accent: '#8BC34A', vein: '#558B2F' },
      yellow: { main: '#FFD54F', accent: '#FFEB3B', vein: '#F57F17' },
      orange: { main: '#FF8A65', accent: '#FFAB40', vein: '#E64A19' },
      red: { main: '#E57373', accent: '#EF5350', vein: '#C62828' },
      brown: { main: '#A1887F', accent: '#BCAAA4', vein: '#5D4037' },
    };
    return colors[colorName] || colors.green;
  };

  const leafColor = getLeafColor(color);

  return (
    <div
      className="absolute animate-float"
      style={{ 
        left: x, 
        top: y, 
        transform: `translate(-50%, -50%) rotate(${rotation}deg)`,
        animationDuration: `${2 + Math.random() * 2}s`
      }}
    >
      <svg
        width="25"
        height="30"
        viewBox="0 0 25 30"
        className="drop-shadow-sm"
      >
        {/* Main leaf shape */}
        <path
          d="M 12.5 2 Q 20 8 18 15 Q 16 22 12.5 28 Q 9 22 7 15 Q 5 8 12.5 2"
          fill={leafColor.main}
          stroke="#000"
          strokeWidth="2"
        />
        
        {/* Leaf highlight */}
        <path
          d="M 12.5 4 Q 17 8 16 13 Q 15 18 12.5 22 Q 10 18 9 13 Q 8 8 12.5 4"
          fill={leafColor.accent}
          opacity="0.7"
        />
        
        {/* Central vein */}
        <line
          x1="12.5"
          y1="2"
          x2="12.5"
          y2="28"
          stroke={leafColor.vein}
          strokeWidth="2"
        />
        
        {/* Side veins */}
        <g stroke={leafColor.vein} strokeWidth="1" opacity="0.8">
          <line x1="12.5" y1="8" x2="9" y2="10" />
          <line x1="12.5" y1="8" x2="16" y2="10" />
          <line x1="12.5" y1="12" x2="8" y2="14" />
          <line x1="12.5" y1="12" x2="17" y2="14" />
          <line x1="12.5" y1="16" x2="9" y2="18" />
          <line x1="12.5" y1="16" x2="16" y2="18" />
          <line x1="12.5" y1="20" x2="10" y2="22" />
          <line x1="12.5" y1="20" x2="15" y2="22" />
        </g>
        
        {/* Leaf stem */}
        <line
          x1="12.5"
          y1="28"
          x2="12.5"
          y2="32"
          stroke="#654321"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
};