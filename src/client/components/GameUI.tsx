import React from 'react';

interface GameUIProps {
  score: number;
  timeLeft: number;
  missedCats: number;
  gameState: 'playing' | 'gameOver' | 'ready';
}

export const GameUI: React.FC<GameUIProps> = ({ score, timeLeft, missedCats, gameState }) => {
  return (
    <div className="absolute top-4 left-4 right-4 z-10">
      <div className="flex justify-between items-center bg-white/90 backdrop-blur-sm rounded-lg p-4 shadow-lg">
        <div className="flex items-center space-x-6">
          <div className="text-center">
            <div className="text-2xl font-bold text-orange-600">{score}</div>
            <div className="text-sm text-gray-600">Cats Caught</div>
          </div>
          
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">{timeLeft}s</div>
            <div className="text-sm text-gray-600">Time Left</div>
          </div>
          
          <div className="text-center">
            <div className="text-2xl font-bold text-red-600">{missedCats}/3</div>
            <div className="text-sm text-gray-600">Missed</div>
          </div>
        </div>
        
        <div className="text-right">
          <div className="text-lg font-semibold text-purple-600">Karma Katcher</div>
          <div className="text-sm text-gray-500">
            {gameState === 'playing' ? 'Click tree to shake!' : 
             gameState === 'ready' ? 'Ready to play!' : 'Game Over!'}
          </div>
        </div>
      </div>
    </div>
  );
};