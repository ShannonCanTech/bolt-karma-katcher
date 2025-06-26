import React from 'react';

interface GameOverScreenProps {
  score: number;
  reason: 'timeUp' | 'tooManyMisses';
  onRestart: () => void;
  onShowLeaderboard: () => void;
}

export const GameOverScreen: React.FC<GameOverScreenProps> = ({ 
  score, 
  reason, 
  onRestart, 
  onShowLeaderboard 
}) => {
  const getMessage = () => {
    if (reason === 'timeUp') {
      return "Time's Up!";
    } else {
      return "Too Many Missed Cats!";
    }
  };

  const getEmoji = () => {
    if (score >= 20) return "🏆";
    if (score >= 15) return "🎉";
    if (score >= 10) return "😸";
    if (score >= 5) return "😺";
    return "😿";
  };

  const getScoreMessage = () => {
    if (score >= 20) return "Legendary Cat Catcher!";
    if (score >= 15) return "Master Cat Whisperer!";
    if (score >= 10) return "Excellent Cat Handler!";
    if (score >= 5) return "Good Cat Friend!";
    return "Keep Practicing!";
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-8 max-w-md w-full mx-4 shadow-2xl text-center">
        <div className="text-6xl mb-4">{getEmoji()}</div>
        
        <h2 className="text-3xl font-bold text-red-600 mb-2">{getMessage()}</h2>
        
        <div className="mb-6">
          <div className="text-5xl font-bold text-orange-600 mb-2">{score}</div>
          <div className="text-lg text-gray-600 mb-2">Cats Caught</div>
          <div className="text-xl font-semibold text-purple-600">{getScoreMessage()}</div>
        </div>
        
        <div className="space-y-3">
          <button
            onClick={onRestart}
            className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-200"
          >
            🐱 Play Again
          </button>
          
          <button
            onClick={onShowLeaderboard}
            className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-200"
          >
            🏆 View Leaderboard
          </button>
        </div>
        
        <div className="mt-6 text-sm text-gray-500">
          <p>💡 Tip: Click the tree faster to get more cats!</p>
          <p>Use ← → arrow keys to move the net</p>
        </div>
      </div>
    </div>
  );
};