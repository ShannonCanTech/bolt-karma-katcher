import React, { useState } from 'react';
import { navigateTo } from '@devvit/client';
import boltBadge from '../../assets/bolt-badge.png';
import { Tree } from './components/Tree';
import { Cat } from './components/Cat';
import { Net } from './components/Net';
import { Leaf } from './components/Leaf';
import { FireTruck } from './components/FireTruck';
import { Helicopter } from './components/Helicopter';
import { GameUI } from './components/GameUI';
import { GameOverScreen } from './components/GameOverScreen';
import { Leaderboard } from './components/Leaderboard';
import { useGameLogic } from './hooks/useGameLogic';
import { useAnimatedAssets } from './hooks/useAnimatedAssets';

export const KarmaKatcher: React.FC = () => {
  const [showLeaderboard, setShowLeaderboard] = useState(false);
  
  const {
    gameState,
    score,
    timeLeft,
    missedCats,
    netPosition,
    isTreeShaking,
    fallingCats,
    fallingLeaves,
    gameOverReason,
    containerWidth,
    containerHeight,
    caughtCatIds,
    treeYPosition,
    firetruckYPosition,
    groundLevel,
    startGame,
    shakeTree,
  } = useGameLogic();

  const { animatedAssets } = useAnimatedAssets(
    gameState, 
    containerWidth, 
    firetruckYPosition,
    120 // Helicopter Y position above tree
  );

  const handleRestart = () => {
    startGame();
  };

  const handleShowLeaderboard = () => {
    setShowLeaderboard(true);
  };

  const handleCloseLeaderboard = () => {
    setShowLeaderboard(false);
  };

  return (
    <div 
      className="relative w-full h-screen bg-gradient-to-b from-sky-300 via-sky-200 to-green-200 overflow-hidden max-w-[500px] mx-auto"
      data-game-container
      style={{ maxWidth: '500px' }}
    >
      {/* Background elements */}
      <div className="absolute inset-0">
        {/* Clouds - positioned relative to container width */}
        <div 
          className="absolute top-10 w-20 h-12 bg-white rounded-full opacity-70 shadow-lg"
          style={{ left: `${Math.min(20, containerWidth * 0.05)}px` }}
        ></div>
        <div 
          className="absolute top-16 w-16 h-8 bg-white rounded-full opacity-70 shadow-lg"
          style={{ left: `${Math.min(16, containerWidth * 0.04)}px` }}
        ></div>
        <div 
          className="absolute top-20 w-24 h-14 bg-white rounded-full opacity-70 shadow-lg"
          style={{ right: `${Math.min(32, containerWidth * 0.08)}px` }}
        ></div>
        <div 
          className="absolute top-24 w-20 h-10 bg-white rounded-full opacity-70 shadow-lg"
          style={{ right: `${Math.min(28, containerWidth * 0.07)}px` }}
        ></div>
        
        {/* Additional fluffy clouds */}
        <div 
          className="absolute top-32 w-18 h-10 bg-white rounded-full opacity-60 shadow-md"
          style={{ left: `${containerWidth * 0.33}px` }}
        ></div>
        <div 
          className="absolute top-40 w-22 h-12 bg-white rounded-full opacity-65 shadow-md"
          style={{ right: `${containerWidth * 0.25}px` }}
        ></div>
        
        {/* Sun */}
        <div className="absolute top-8 right-8 w-16 h-16 bg-yellow-300 rounded-full shadow-lg">
          <div className="absolute inset-2 bg-yellow-400 rounded-full"></div>
          <div className="absolute inset-3 bg-yellow-200 rounded-full opacity-50"></div>
        </div>
        
        {/* Sun rays */}
        <div className="absolute top-4 right-12 w-1 h-6 bg-yellow-300 rounded-full transform rotate-45"></div>
        <div className="absolute top-6 right-4 w-6 h-1 bg-yellow-300 rounded-full"></div>
        <div className="absolute top-12 right-2 w-1 h-6 bg-yellow-300 rounded-full transform -rotate-45"></div>
        <div className="absolute top-20 right-4 w-6 h-1 bg-yellow-300 rounded-full"></div>
        
        {/* Ground elements - positioned relative to ground level */}
        <div 
          className="absolute left-0 right-0 h-32 bg-gradient-to-t from-green-400 to-green-200"
          style={{ bottom: 0 }}
        ></div>
        
        {/* Enhanced grass tufts - positioned relative to ground level */}
        <div 
          className="absolute w-4 h-12 bg-green-500 rounded-t-full transform rotate-12 shadow-sm"
          style={{ 
            left: `${Math.min(10, containerWidth * 0.02)}px`,
            bottom: `${32}px`
          }}
        ></div>
        <div 
          className="absolute w-3 h-8 bg-green-600 rounded-t-full transform -rotate-6 shadow-sm"
          style={{ 
            left: `${Math.min(16, containerWidth * 0.04)}px`,
            bottom: `${24}px`
          }}
        ></div>
        <div 
          className="absolute w-5 h-14 bg-green-500 rounded-t-full transform rotate-8 shadow-sm"
          style={{ 
            left: `${containerWidth * 0.1}px`,
            bottom: `${40}px`
          }}
        ></div>
        <div 
          className="absolute w-4 h-10 bg-green-600 rounded-t-full transform -rotate-12 shadow-sm"
          style={{ 
            left: `${containerWidth * 0.15}px`,
            bottom: `${48}px`
          }}
        ></div>
        <div 
          className="absolute w-3 h-9 bg-green-500 rounded-t-full transform rotate-15 shadow-sm"
          style={{ 
            left: `${containerWidth * 0.2}px`,
            bottom: `${32}px`
          }}
        ></div>
        <div 
          className="absolute w-4 h-11 bg-green-600 rounded-t-full transform -rotate-8 shadow-sm"
          style={{ 
            left: `${containerWidth * 0.25}px`,
            bottom: `${24}px`
          }}
        ></div>
        
        {/* Right side grass */}
        <div 
          className="absolute w-5 h-13 bg-green-500 rounded-t-full transform rotate-8 shadow-sm"
          style={{ 
            right: `${Math.min(20, containerWidth * 0.05)}px`,
            bottom: `${40}px`
          }}
        ></div>
        <div 
          className="absolute w-3 h-9 bg-green-600 rounded-t-full transform -rotate-12 shadow-sm"
          style={{ 
            right: `${Math.min(32, containerWidth * 0.08)}px`,
            bottom: `${32}px`
          }}
        ></div>
        <div 
          className="absolute w-4 h-11 bg-green-500 rounded-t-full transform rotate-15 shadow-sm"
          style={{ 
            right: `${containerWidth * 0.15}px`,
            bottom: `${48}px`
          }}
        ></div>
        <div 
          className="absolute w-3 h-8 bg-green-600 rounded-t-full transform -rotate-8 shadow-sm"
          style={{ 
            right: `${containerWidth * 0.2}px`,
            bottom: `${24}px`
          }}
        ></div>
        <div 
          className="absolute w-5 h-12 bg-green-500 rounded-t-full transform rotate-10 shadow-sm"
          style={{ 
            right: `${containerWidth * 0.25}px`,
            bottom: `${36}px`
          }}
        ></div>
        <div 
          className="absolute w-4 h-10 bg-green-600 rounded-t-full transform -rotate-5 shadow-sm"
          style={{ 
            right: `${containerWidth * 0.3}px`,
            bottom: `${28}px`
          }}
        ></div>
        
        {/* Center grass around tree area */}
        <div 
          className="absolute w-4 h-11 bg-green-500 rounded-t-full transform rotate-15 shadow-sm"
          style={{ 
            left: `${containerWidth * 0.33}px`,
            bottom: `${32}px`
          }}
        ></div>
        <div 
          className="absolute w-3 h-8 bg-green-600 rounded-t-full transform -rotate-8 shadow-sm"
          style={{ 
            right: `${containerWidth * 0.33}px`,
            bottom: `${24}px`
          }}
        ></div>
        <div 
          className="absolute w-5 h-13 bg-green-500 rounded-t-full transform rotate-12 shadow-sm"
          style={{ 
            left: `${containerWidth * 0.4}px`,
            bottom: `${40}px`
          }}
        ></div>
        <div 
          className="absolute w-4 h-9 bg-green-600 rounded-t-full transform -rotate-10 shadow-sm"
          style={{ 
            right: `${containerWidth * 0.4}px`,
            bottom: `${28}px`
          }}
        ></div>
      </div>

      {/* Game UI */}
      <GameUI 
        score={score}
        timeLeft={timeLeft}
        missedCats={missedCats}
        gameState={gameState}
      />

      {/* Game elements */}
      <div className="absolute inset-0 flex items-center justify-center">
        {/* Tree - positioned dynamically based on container dimensions */}
        <div 
          className="absolute" 
          style={{ 
            left: `${containerWidth / 2}px`, 
            top: `${treeYPosition}px`, 
            transform: 'translateX(-50%)' 
          }}
        >
          <Tree isShaking={isTreeShaking} onClick={shakeTree} />
        </div>

        {/* Falling leaves - positioned within actual container bounds */}
        {fallingLeaves.map(leaf => (
          <Leaf
            key={leaf.id}
            x={leaf.x}
            y={leaf.y}
            color={leaf.color}
            rotation={leaf.rotation}
          />
        ))}

        {/* Falling cats - properly constrained to container with catch animation */}
        {fallingCats.map(cat => (
          <Cat
            key={cat.id}
            x={cat.x}
            y={cat.y}
            variant={cat.variant}
            isRunningAway={cat.isRunningAway}
            isFalling={!cat.isRunningAway && !cat.isCaught}
            isCaught={caughtCatIds.includes(cat.id)}
          />
        ))}

        {/* Animated Assets - Fire Trucks and Helicopters */}
        {animatedAssets.map(asset => {
          if (asset.type === 'firetruck') {
            return (
              <FireTruck
                key={asset.id}
                x={asset.x}
                y={asset.y}
              />
            );
          } else if (asset.type === 'helicopter') {
            return (
              <Helicopter
                key={asset.id}
                x={asset.x}
                y={asset.y}
              />
            );
          }
          return null;
        })}

        {/* Net - positioned within container bounds */}
        <Net x={netPosition} />
      </div>

      {/* Start screen */}
      {gameState === 'ready' && (
        <div className="absolute inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-40">
          <div className="bg-white rounded-xl p-8 max-w-md w-full mx-4 shadow-2xl text-center">
            <div className="text-6xl mb-4">🐱</div>
            <h1 className="text-4xl font-bold text-purple-600 mb-4">Karma Katcher</h1>
            <p className="text-lg text-gray-600 mb-6">
              Click the tree to shake it and catch falling meme cats with your net!
            </p>
            <div className="text-sm text-gray-500 mb-6 space-y-1">
              <p>🖱️ Click tree to shake and drop cats</p>
              <p>⬅️➡️ Use arrow keys to move net</p>
              <p>🎯 Catch cats before they hit the ground</p>
              <p>⏰ You have 60 seconds</p>
              <p>❌ Don't miss more than 3 cats!</p>
              <p>🍃 Watch for peek-a-boo cats in the tree!</p>
              <p>🚁🔥 Look out for special visitors!</p>
            </div>
            <button
              onClick={startGame}
              className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-4 px-6 rounded-lg transition-colors duration-200 text-xl"
            >
              🚀 Start Game
            </button>
            <button
              onClick={handleShowLeaderboard}
              className="w-full mt-3 bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-200"
            >
              🏆 View Leaderboard
            </button>
          </div>
        </div>
      )}

      {/* Game over screen */}
      {gameState === 'gameOver' && (
        <GameOverScreen
          score={score}
          reason={gameOverReason}
          onRestart={handleRestart}
          onShowLeaderboard={handleShowLeaderboard}
        />
      )}

      {/* Leaderboard */}
      {showLeaderboard && (
        <Leaderboard
          currentScore={gameState === 'gameOver' ? score : undefined}
          onClose={handleCloseLeaderboard}
        />
      )}
            <div
        className="absolute top-2 right-0 sm:right-4 md:right-6 z-50 cursor-pointer"
        onClick={() => navigateTo('https://bolt.new')}
      >
        <img
          src={boltBadge}
          alt="Built with Bolt.new badge"
          className="w-16 h-16 sm:w-16 sm:h-16 rounded-full shadow-lg"
        />
      </div>
    </div>
  );
};