import { useState, useEffect, useRef, useCallback } from 'react';

interface AnimatedAsset {
  id: number;
  type: 'firetruck' | 'helicopter';
  x: number;
  y: number;
  active: boolean;
}

export const useAnimatedAssets = (
  gameState: 'ready' | 'playing' | 'gameOver', 
  containerWidth: number,
  firetruckYPosition: number,
  helicopterYPosition?: number
) => {
  const [animatedAssets, setAnimatedAssets] = useState<AnimatedAsset[]>([]);
  const assetIdRef = useRef(0);
  const firetruckTimerRef = useRef<number>();
  const helicopterTimerRef = useRef<number>();
  const animationFrameRef = useRef<number>();

  const HELICOPTER_Y = helicopterYPosition || 120; // Above tree canopy
  const FIRETRUCK_SPEED = containerWidth / 240; // Cross screen in ~4-6 seconds
  const HELICOPTER_SPEED = containerWidth / 300; // Cross screen in ~5-7 seconds

  const spawnFiretruck = useCallback(() => {
    if (gameState !== 'playing') return;
    
    console.log('🔥 FireTruckSpawned');
    
    const firetruck: AnimatedAsset = {
      id: assetIdRef.current++,
      type: 'firetruck',
      x: containerWidth + 60, // Start from right edge
      y: firetruckYPosition, // Use dynamic Y position
      active: true
    };
    
    setAnimatedAssets(prev => [...prev, firetruck]);
    
    // Schedule next firetruck spawn (15-30 seconds)
    const nextSpawn = 15000 + Math.random() * 15000;
    firetruckTimerRef.current = window.setTimeout(spawnFiretruck, nextSpawn);
  }, [gameState, containerWidth, firetruckYPosition]);

  const spawnHelicopter = useCallback(() => {
    if (gameState !== 'playing') return;
    
    console.log('🚁 HelicopterSpawned');
    
    const helicopter: AnimatedAsset = {
      id: assetIdRef.current++,
      type: 'helicopter',
      x: -60, // Start from left edge
      y: HELICOPTER_Y,
      active: true
    };
    
    setAnimatedAssets(prev => [...prev, helicopter]);
    
    // Schedule next helicopter spawn (20-40 seconds)
    const nextSpawn = 20000 + Math.random() * 20000;
    helicopterTimerRef.current = window.setTimeout(spawnHelicopter, nextSpawn);
  }, [gameState, HELICOPTER_Y]);

  // Animation loop
  useEffect(() => {
    if (gameState !== 'playing') return;

    const animateAssets = () => {
      setAnimatedAssets(prev => {
        return prev
          .map(asset => {
            if (asset.type === 'firetruck') {
              // Move firetruck leftward
              return {
                ...asset,
                x: asset.x - FIRETRUCK_SPEED
              };
            } else if (asset.type === 'helicopter') {
              // Move helicopter rightward
              return {
                ...asset,
                x: asset.x + HELICOPTER_SPEED
              };
            }
            return asset;
          })
          .filter(asset => {
            // Remove assets that have moved off screen
            if (asset.type === 'firetruck') {
              return asset.x > -120; // Remove when fully off left side
            } else if (asset.type === 'helicopter') {
              return asset.x < containerWidth + 120; // Remove when fully off right side
            }
            return true;
          });
      });

      animationFrameRef.current = requestAnimationFrame(animateAssets);
    };

    animationFrameRef.current = requestAnimationFrame(animateAssets);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [gameState, FIRETRUCK_SPEED, HELICOPTER_SPEED, containerWidth]);

  // Start spawning when game starts
  useEffect(() => {
    if (gameState === 'playing') {
      // Initial spawn delays
      const initialFiretruckDelay = 10000 + Math.random() * 10000; // 10-20 seconds
      const initialHelicopterDelay = 15000 + Math.random() * 15000; // 15-30 seconds
      
      firetruckTimerRef.current = window.setTimeout(spawnFiretruck, initialFiretruckDelay);
      helicopterTimerRef.current = window.setTimeout(spawnHelicopter, initialHelicopterDelay);
    } else {
      // Clear timers and assets when not playing
      if (firetruckTimerRef.current) {
        clearTimeout(firetruckTimerRef.current);
      }
      if (helicopterTimerRef.current) {
        clearTimeout(helicopterTimerRef.current);
      }
      setAnimatedAssets([]);
    }

    return () => {
      if (firetruckTimerRef.current) {
        clearTimeout(firetruckTimerRef.current);
      }
      if (helicopterTimerRef.current) {
        clearTimeout(helicopterTimerRef.current);
      }
    };
  }, [gameState, spawnFiretruck, spawnHelicopter]);

  return {
    animatedAssets
  };
};