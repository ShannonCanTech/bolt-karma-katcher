import React, { useEffect, useState } from 'react';

interface LeaderboardEntry {
  score: number;
  timestamp: number;
  username?: string;
}

interface LeaderboardProps {
  currentScore?: number;
  onClose: () => void;
}

export const Leaderboard: React.FC<LeaderboardProps> = ({ currentScore, onClose }) => {
  const [scores, setScores] = useState<LeaderboardEntry[]>([]);
  const [isDevMode, setIsDevMode] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if we're in development mode (not on devvit.net)
    const hostname = window.location.hostname;
    setIsDevMode(!hostname.endsWith('devvit.net'));
    loadScores();
  }, []);

  useEffect(() => {
    if (currentScore !== undefined) {
      saveScore(currentScore);
    }
  }, [currentScore]);

  const loadScores = async () => {
    setIsLoading(true);
    try {
      // Only attempt API call if we're in production (on devvit.net)
      const hostname = window.location.hostname;
      if (hostname.endsWith('devvit.net')) {
        const response = await fetch('/api/leaderboard', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        
        if (response.ok) {
          const data = await response.json();
          setScores(data.scores || []);
          setIsLoading(false);
          return;
        }
      }
      
      // Fallback to localStorage for local development or if API fails
      console.log('Using localStorage fallback for leaderboard');
      const localScores = localStorage.getItem('karmaKatcherScores');
      if (localScores) {
        try {
          const parsedScores = JSON.parse(localScores);
          // Add default username for local scores
          const scoresWithUsername = Array.isArray(parsedScores) 
            ? parsedScores.map(score => ({
                ...score,
                username: score.username || 'Local Player'
              }))
            : [];
          setScores(scoresWithUsername);
        } catch (parseError) {
          console.error('Failed to parse local scores:', parseError);
          setScores([]);
        }
      } else {
        setScores([]);
      }
    } catch (error) {
      console.log('API not available, using localStorage fallback:', error);
      // Fallback to localStorage
      const localScores = localStorage.getItem('karmaKatcherScores');
      if (localScores) {
        try {
          const parsedScores = JSON.parse(localScores);
          // Add default username for local scores
          const scoresWithUsername = Array.isArray(parsedScores) 
            ? parsedScores.map(score => ({
                ...score,
                username: score.username || 'Local Player'
              }))
            : [];
          setScores(scoresWithUsername);
        } catch (parseError) {
          console.error('Failed to parse local scores:', parseError);
          setScores([]);
        }
      } else {
        setScores([]);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const saveScore = async (score: number) => {
    const newEntry: LeaderboardEntry = {
      score,
      timestamp: Date.now(),
      username: 'Local Player' // Default for local development
    };

    try {
      // Only attempt API call if we're in production (on devvit.net)
      const hostname = window.location.hostname;
      if (hostname.endsWith('devvit.net')) {
        const response = await fetch('/api/leaderboard', {
          method: 'POST',
          headers: { 
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ score })
        });
        
        if (response.ok) {
          loadScores(); // Reload from server
          return;
        }
      }
      
      // Fallback to localStorage
      console.log('Using localStorage fallback for score saving');
      const currentScores = [...scores, newEntry]
        .sort((a, b) => b.score - a.score)
        .slice(0, 10);
      setScores(currentScores);
      localStorage.setItem('karmaKatcherScores', JSON.stringify(currentScores));
    } catch (error) {
      console.log('API not available, using localStorage fallback:', error);
      // Fallback to localStorage
      const currentScores = [...scores, newEntry]
        .sort((a, b) => b.score - a.score)
        .slice(0, 10);
      setScores(currentScores);
      localStorage.setItem('karmaKatcherScores', JSON.stringify(currentScores));
    }
  };

  const topScores = scores
    .sort((a, b) => b.score - a.score)
    .slice(0, 10);

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 max-w-md w-full mx-4 shadow-2xl">
        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold text-purple-600 mb-2">🏆 Leaderboard</h2>
          {currentScore !== undefined && (
            <p className="text-lg text-gray-600">Your Score: <span className="font-bold text-orange-600">{currentScore}</span></p>
          )}
          {isDevMode && (
            <p className="text-sm text-amber-600 mt-2">
              ⚠️ Local mode - scores saved locally only
            </p>
          )}
        </div>
        
        <div className="space-y-2 mb-6 max-h-80 overflow-y-auto scrollbar-thin">
          {isLoading ? (
            <div className="text-center text-gray-500 py-8">
              <p>Loading scores...</p>
            </div>
          ) : topScores.length > 0 ? (
            topScores.map((entry, index) => (
              <div
                key={index}
                className={`flex justify-between items-center p-3 rounded-lg ${
                  index === 0 ? 'bg-yellow-200 text-black font-semibold border-2 border-yellow-400' :
                  index === 1 ? 'bg-gray-200 text-black font-semibold border-2 border-gray-400' :
                  index === 2 ? 'bg-orange-200 text-black font-semibold border-2 border-orange-400' :
                  'bg-white text-black font-medium border border-gray-200'
                }`}
              >
                <div className="flex items-center space-x-3 flex-1">
                  <span className="text-2xl">
                    {index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : `#${index + 1}`}
                  </span>
                  <span className="font-semibold">
                    {entry.username || 'Unknown Player'}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-xl font-bold text-purple-600">{entry.score}</span>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center text-gray-500 py-8">
              <p>No scores yet!</p>
              <p className="text-sm">Be the first to catch some cats! 🐱</p>
            </div>
          )}
        </div>
        
        <button
          onClick={onClose}
          className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-200"
        >
          Close
        </button>
      </div>
    </div>
  );
};