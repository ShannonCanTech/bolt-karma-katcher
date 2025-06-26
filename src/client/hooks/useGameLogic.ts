import { useState, useEffect, useCallback, useRef } from 'react';

interface FallingCat {
  id: number;
  x: number;
  y: number;
  variant: number;
  speed: number;
  isRunningAway: boolean;
  isFalling: boolean;
  isCaught?: boolean;
}

interface FallingLeaf {
  id: number;
  x: number;
  y: number;
  color: string;
  rotation: number;
  speed: number;
}

export const useGameLogic = () => {
  const [gameState, setGameState] = useState<'ready' | 'playing' | 'gameOver'>('ready');
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const [missedCats, setMissedCats] = useState(0);
  const [netPosition, setNetPosition] = useState(400);
  const [isTreeShaking, setIsTreeShaking] = useState(false);
  const [fallingCats, setFallingCats] = useState<FallingCat[]>([]);
  const [fallingLeaves, setFallingLeaves] = useState<FallingLeaf[]>([]);
  const [shakeCount, setShakeCount] = useState(0);
  const [gameOverReason, setGameOverReason] = useState<'timeUp' | 'tooManyMisses'>('timeUp');
  const [containerWidth, setContainerWidth] = useState(500);
  const [containerHeight, setContainerHeight] = useState(600);
  const [caughtCatIds, setCaughtCatIds] = useState<number[]>([]);
  
  const gameLoopRef = useRef<number>();
  const timerRef = useRef<number>();
  const catIdRef = useRef(0);
  const leafIdRef = useRef(0);

  const GAME_DURATION = 60;
  const MAX_MISSES = 3;
  const NET_SPEED = 25;
  const GRAVITY = 0.3;
  const INITIAL_FALL_SPEED = 1;
  const CAT_WIDTH = 50;
  const HALF_CAT = CAT_WIDTH / 2;
  const EDGE_BUFFER = 10;

  // Dynamic ground level based on container height
  const GROUND_LEVEL = containerHeight - 80;
  const TREE_Y_POSITION = containerHeight * 0.4; // Tree at 40% from top
  const FIRETRUCK_Y_POSITION = GROUND_LEVEL - 40; // FireTruck just above ground

  // Get actual container dimensions on mount and resize
  useEffect(() => {
    const updateContainerDimensions = () => {
      const gameContainer = document.querySelector('[data-game-container]') as HTMLElement;
      if (gameContainer) {
        const actualWidth = gameContainer.offsetWidth || Math.min(window.innerWidth, 500);
        const actualHeight = gameContainer.offsetHeight || window.innerHeight;
        
        setContainerWidth(actualWidth);
        setContainerHeight(actualHeight);
        setNetPosition(actualWidth / 2);
      }
    };

    updateContainerDimensions();
    window.addEventListener('resize', updateContainerDimensions);
    
    return () => window.removeEventListener('resize', updateContainerDimensions);
  }, []);

  // Safe random X position generator
  const getSafeRandomCatX = useCallback(() => {
    const minX = HALF_CAT + EDGE_BUFFER;
    const maxX = containerWidth - HALF_CAT - EDGE_BUFFER;
    return Math.floor(Math.random() * (maxX - minX + 1)) + minX;
  }, [containerWidth]);

  // Safe random leaf X position generator
  const getSafeRandomLeafX = useCallback(() => {
    const minX = 20;
    const maxX = containerWidth - 20;
    return Math.floor(Math.random() * (maxX - minX + 1)) + minX;
  }, [containerWidth]);

  const startGame = useCallback(() => {
    setGameState('playing');
    setScore(0);
    setTimeLeft(GAME_DURATION);
    setMissedCats(0);
    setNetPosition(containerWidth / 2);
    setFallingCats([]);
    setFallingLeaves([]);
    setShakeCount(0);
    setCaughtCatIds([]);
    catIdRef.current = 0;
    leafIdRef.current = 0;
  }, [containerWidth]);

  const endGame = useCallback((reason: 'timeUp' | 'tooManyMisses') => {
    setGameState('gameOver');
    setGameOverReason(reason);
    if (gameLoopRef.current) {
      cancelAnimationFrame(gameLoopRef.current);
    }
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
  }, []);

  const shakeTree = useCallback(() => {
    if (gameState !== 'playing') return;
    
    setIsTreeShaking(true);
    setTimeout(() => setIsTreeShaking(false), 200);
    
    const newShakeCount = shakeCount + 1;
    setShakeCount(newShakeCount);
    
    // Drop leaves across actual container width
    const numLeaves = Math.floor(Math.random() * 8) + 6;
    const newLeaves: FallingLeaf[] = [];
    const leafColors = ['green', 'yellow', 'orange', 'red', 'brown'];
    
    for (let i = 0; i < numLeaves; i++) {
      const leafX = getSafeRandomLeafX();
      
      const leaf: FallingLeaf = {
        id: leafIdRef.current++,
        x: leafX,
        y: 60 + Math.random() * 140,
        color: leafColors[Math.floor(Math.random() * leafColors.length)],
        rotation: Math.random() * 360,
        speed: 1.2 + Math.random() * 2.8
      };
      newLeaves.push(leaf);
    }
    
    setFallingLeaves(prev => [...prev, ...newLeaves]);
    
    // Drop cat every 2-4 shakes
    const shouldDropCat = newShakeCount % (2 + Math.floor(Math.random() * 3)) === 0;
    
    if (shouldDropCat) {
      const catX = getSafeRandomCatX();
      const cat: FallingCat = {
        id: catIdRef.current++,
        x: catX,
        y: -50, // REVERTED: Cats fall from top of screen again
        variant: Math.floor(Math.random() * 6),
        speed: INITIAL_FALL_SPEED,
        isRunningAway: false,
        isFalling: true,
        isCaught: false
      };
      setFallingCats(prev => [...prev, cat]);
    }
  }, [gameState, shakeCount, getSafeRandomCatX, getSafeRandomLeafX]);

  const moveNet = useCallback((direction: 'left' | 'right') => {
    if (gameState !== 'playing') return;
    
    setNetPosition(prev => {
      const newPos = direction === 'left' ? prev - NET_SPEED : prev + NET_SPEED;
      return Math.max(60, Math.min(containerWidth - 60, newPos));
    });
  }, [gameState, containerWidth]);

  // Game loop with proper scaling
  useEffect(() => {
    if (gameState !== 'playing') return;

    const gameLoop = () => {
      setFallingCats(prev => {
        const updated = prev.map(cat => {
          if (cat.isRunningAway) {
            // Running cats move horizontally away from center
            const direction = cat.x < containerWidth / 2 ? -1 : 1;
            return {
              ...cat,
              x: cat.x + (direction * 4),
              y: GROUND_LEVEL - 30 // Keep on ground level
            };
          } else if (cat.isFalling && !cat.isCaught) {
            // Apply gravity to falling cats
            const newSpeed = cat.speed + GRAVITY;
            const newY = cat.y + newSpeed;
            
            return {
              ...cat,
              y: newY,
              speed: newSpeed
            };
          }
          return cat;
        });

        // Check for catches and misses
        const remaining: FallingCat[] = [];
        let caughtCount = 0;
        let missedCount = 0;
        const newCaughtIds: number[] = [];

        updated.forEach(cat => {
          if (cat.isRunningAway) {
            // Remove cats that have run off screen
            if (cat.x > -100 && cat.x < containerWidth + 100) {
              remaining.push(cat);
            }
          } else if (cat.isCaught) {
            // Keep caught cats for animation duration
            remaining.push(cat);
          } else if (cat.y >= GROUND_LEVEL - 60) {
            const netLeft = netPosition - 60;
            const netRight = netPosition + 60;
            
            if (cat.x >= netLeft && cat.x <= netRight && cat.y >= GROUND_LEVEL - 100) {
              // Caught in net!
              const caughtCat = {
                ...cat,
                isCaught: true,
                isFalling: false
              };
              remaining.push(caughtCat);
              caughtCount++;
              newCaughtIds.push(cat.id);
              
              // Remove caught cat after animation
              setTimeout(() => {
                setFallingCats(prev => prev.filter(c => c.id !== cat.id));
                setCaughtCatIds(prev => prev.filter(id => id !== cat.id));
              }, 400);
            } else {
              // Missed! Cat hits ground and runs away
              const runningCat = {
                ...cat,
                y: GROUND_LEVEL - 30,
                isRunningAway: true,
                isFalling: false,
                speed: 0
              };
              remaining.push(runningCat);
              missedCount++;
            }
          } else {
            // Still falling
            remaining.push(cat);
          }
        });

        if (caughtCount > 0) {
          setScore(prev => prev + caughtCount);
          setCaughtCatIds(prev => [...prev, ...newCaughtIds]);
        }
        
        if (missedCount > 0) {
          setMissedCats(prev => {
            const newMissed = prev + missedCount;
            if (newMissed >= MAX_MISSES) {
              endGame('tooManyMisses');
            }
            return newMissed;
          });
        }

        return remaining;
      });

      // Update falling leaves with proper ground detection
      setFallingLeaves(prev => {
        return prev
          .map(leaf => ({
            ...leaf,
            y: leaf.y + leaf.speed,
            rotation: leaf.rotation + 4,
            x: leaf.x + Math.sin(leaf.y * 0.015) * 2.5
          }))
          .filter(leaf => leaf.y < GROUND_LEVEL + 50); // Remove leaves that reach ground
      });

      gameLoopRef.current = requestAnimationFrame(gameLoop);
    };

    gameLoopRef.current = requestAnimationFrame(gameLoop);

    return () => {
      if (gameLoopRef.current) {
        cancelAnimationFrame(gameLoopRef.current);
      }
    };
  }, [gameState, netPosition, endGame, containerWidth, GROUND_LEVEL]);

  // Timer
  useEffect(() => {
    if (gameState !== 'playing') return;

    timerRef.current = window.setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          endGame('timeUp');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [gameState, endGame]);

  // Keyboard controls
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        moveNet('left');
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        moveNet('right');
      } else if (e.key === ' ' || e.key === 'Enter') {
        e.preventDefault();
        if (gameState === 'ready') {
          startGame();
        } else if (gameState === 'playing') {
          shakeTree();
        }
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [gameState, moveNet, startGame, shakeTree]);

  return {
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
    treeYPosition: TREE_Y_POSITION,
    firetruckYPosition: FIRETRUCK_Y_POSITION,
    groundLevel: GROUND_LEVEL,
    startGame,
    endGame,
    shakeTree,
    moveNet
  };
};