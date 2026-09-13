import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Play, RotateCcw, Trophy, ArrowUp, ArrowDown, ArrowLeft, ArrowRight } from 'lucide-react';

interface Position {
  x: number;
  y: number;
}

type Direction = 'UP' | 'DOWN' | 'LEFT' | 'RIGHT';

const GRID_WIDTH = 20;
const GRID_HEIGHT = 14;
const INITIAL_SPEED = 140;

const OPPOSITES: Record<Direction, Direction> = {
  UP: 'DOWN',
  DOWN: 'UP',
  LEFT: 'RIGHT',
  RIGHT: 'LEFT',
};

const MOVES: Record<Direction, Position> = {
  UP: { x: 0, y: -1 },
  DOWN: { x: 0, y: 1 },
  LEFT: { x: -1, y: 0 },
  RIGHT: { x: 1, y: 0 },
};

export const SnakeGame: React.FC = () => {
  // Game state
  const [snake, setSnake] = useState<Position[]>([
    { x: 8, y: 7 },
    { x: 7, y: 7 },
    { x: 6, y: 7 },
  ]);
  const [food, setFood] = useState<Position>({ x: 14, y: 7 });
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(() => {
    return parseInt(localStorage.getItem('terminal_snake_highscore') || '0', 10);
  });
  const [hasStarted, setHasStarted] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  // Mutable refs for rock-solid loop synchronization
  const snakeRef = useRef<Position[]>([
    { x: 8, y: 7 },
    { x: 7, y: 7 },
    { x: 6, y: 7 },
  ]);
  const currentDirRef = useRef<Direction>('RIGHT');
  const dirQueueRef = useRef<Direction[]>([]);
  const foodRef = useRef<Position>({ x: 14, y: 7 });
  const hasStartedRef = useRef(false);
  const gameOverRef = useRef(false);
  const isPausedRef = useRef(false);

  // Sync refs with state
  hasStartedRef.current = hasStarted;
  gameOverRef.current = gameOver;
  isPausedRef.current = isPaused;

  // Sound generator
  const playBeep = useCallback((frequency = 440, duration = 0.08) => {
    try {
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.type = 'square';
      osc.frequency.value = frequency;
      gain.gain.setValueAtTime(0.08, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + duration);
      osc.start(audioCtx.currentTime);
      osc.stop(audioCtx.currentTime + duration);
    } catch {
      // Audio not supported
    }
  }, []);

  // Generate random food not on snake
  const generateFood = useCallback((currentSnake: Position[]): Position => {
    let newFood: Position;
    while (true) {
      newFood = {
        x: Math.floor(Math.random() * GRID_WIDTH),
        y: Math.floor(Math.random() * GRID_HEIGHT),
      };
      const onSnake = currentSnake.some(s => s.x === newFood.x && s.y === newFood.y);
      if (!onSnake) break;
    }
    return newFood;
  }, []);

  const resetGame = useCallback(() => {
    const initialSnake = [
      { x: 8, y: 7 },
      { x: 7, y: 7 },
      { x: 6, y: 7 },
    ];
    const initialFood = generateFood(initialSnake);

    snakeRef.current = initialSnake;
    currentDirRef.current = 'RIGHT';
    dirQueueRef.current = [];
    foodRef.current = initialFood;

    setSnake(initialSnake);
    setFood(initialFood);
    setScore(0);
    setGameOver(false);
    setIsPaused(false);
    setHasStarted(false);
    playBeep(520, 0.1);
  }, [generateFood, playBeep]);

  const queueDirection = useCallback((newDir: Direction) => {
    if (gameOverRef.current) return;

    if (!hasStartedRef.current) {
      setHasStarted(true);
      hasStartedRef.current = true;
    }

    if (isPausedRef.current) return;

    const lastPlannedDir = dirQueueRef.current.length > 0
      ? dirQueueRef.current[dirQueueRef.current.length - 1]
      : currentDirRef.current;

    // Disallow reversing directly into oneself
    if (newDir !== lastPlannedDir && newDir !== OPPOSITES[lastPlannedDir]) {
      if (dirQueueRef.current.length < 3) {
        dirQueueRef.current.push(newDir);
      }
    }
  }, []);

  // Key event listener with CAPTURE phase to prevent terminal input interception
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Arrow keys, WASD, Space, R
      const gameKeys = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'w', 'W', 's', 'S', 'a', 'A', 'd', 'D', ' ', 'r', 'R'];
      
      if (gameKeys.includes(e.key)) {
        // Prevent terminal scrolling or typing command history
        e.preventDefault();
        e.stopPropagation();
      }

      if (e.key === 'r' || e.key === 'R') {
        resetGame();
        return;
      }

      if (e.key === ' ' || e.key === 'p' || e.key === 'P') {
        if (!hasStartedRef.current) {
          setHasStarted(true);
          return;
        }
        setIsPaused(prev => !prev);
        return;
      }

      switch (e.key) {
        case 'ArrowUp':
        case 'w':
        case 'W':
          queueDirection('UP');
          break;
        case 'ArrowDown':
        case 's':
        case 'S':
          queueDirection('DOWN');
          break;
        case 'ArrowLeft':
        case 'a':
        case 'A':
          queueDirection('LEFT');
          break;
        case 'ArrowRight':
        case 'd':
        case 'D':
          queueDirection('RIGHT');
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown, { capture: true });
    return () => window.removeEventListener('keydown', handleKeyDown, { capture: true });
  }, [queueDirection, resetGame]);

  // Main game tick loop
  useEffect(() => {
    if (!hasStarted || gameOver || isPaused) return;

    const currentSpeed = Math.max(75, INITIAL_SPEED - Math.floor(score / 5) * 8);

    const intervalId = setInterval(() => {
      // Dequeue next direction if available
      if (dirQueueRef.current.length > 0) {
        currentDirRef.current = dirQueueRef.current.shift()!;
      }

      const move = MOVES[currentDirRef.current];
      const prevSnake = snakeRef.current;
      const head = { ...prevSnake[0] };

      let nextX = head.x + move.x;
      let nextY = head.y + move.y;

      // Wrap around walls (classic retro arcade style)
      if (nextX < 0) nextX = GRID_WIDTH - 1;
      if (nextX >= GRID_WIDTH) nextX = 0;
      if (nextY < 0) nextY = GRID_HEIGHT - 1;
      if (nextY >= GRID_HEIGHT) nextY = 0;

      const newHead: Position = { x: nextX, y: nextY };
      const currentFood = foodRef.current;
      const isEating = newHead.x === currentFood.x && newHead.y === currentFood.y;

      // Self collision: tail moves forward unless eating
      const bodyToCheck = isEating ? prevSnake : prevSnake.slice(0, -1);
      const isSelfCollision = bodyToCheck.some(seg => seg.x === newHead.x && seg.y === newHead.y);

      if (isSelfCollision) {
        setGameOver(true);
        playBeep(180, 0.3);
        return;
      }

      // Grow or move
      const updatedSnake = [newHead, ...prevSnake];

      if (isEating) {
        playBeep(780, 0.1);
        const newFood = generateFood(updatedSnake);
        foodRef.current = newFood;
        setFood(newFood);

        setScore(prevScore => {
          const newScore = prevScore + 1;
          if (newScore > highScore) {
            setHighScore(newScore);
            localStorage.setItem('terminal_snake_highscore', newScore.toString());
          }
          return newScore;
        });
      } else {
        updatedSnake.pop();
      }

      snakeRef.current = updatedSnake;
      setSnake(updatedSnake);
    }, currentSpeed);

    return () => clearInterval(intervalId);
  }, [hasStarted, gameOver, isPaused, score, highScore, generateFood, playBeep]);

  return (
    <div 
      className="p-3 sm:p-4 rounded bg-terminal-hover border border-terminal-border space-y-3 font-mono text-xs max-w-lg animate-fade-in my-2 outline-none shadow-lg select-none"
    >
      {/* Title & Scoreboard */}
      <div className="flex items-center justify-between border-b border-terminal-border/60 pb-2">
        <div className="flex items-center gap-2">
          <span className="text-base">🐍</span>
          <span className="text-terminal-accent font-bold text-sm">TERMINAL SNAKE</span>
        </div>
        <div className="flex items-center gap-3 sm:gap-4 text-xs">
          <div>Score: <strong className="text-terminal-accent">{score}</strong></div>
          <div>Length: <strong className="text-terminal-success">{snake.length}</strong></div>
          <div className="flex items-center gap-1 text-terminal-warning">
            <Trophy size={13} />
            <span>High: {highScore}</span>
          </div>
        </div>
      </div>

      {/* Grid Canvas */}
      <div className="relative bg-terminal border-2 border-terminal-border rounded p-1 mx-auto">
        <div 
          className="grid gap-[2px]"
          style={{
            gridTemplateColumns: `repeat(${GRID_WIDTH}, minmax(0, 1fr))`,
            width: '100%',
            maxWidth: '380px',
            aspectRatio: `${GRID_WIDTH} / ${GRID_HEIGHT}`,
          }}
        >
          {Array.from({ length: GRID_HEIGHT * GRID_WIDTH }).map((_, idx) => {
            const x = idx % GRID_WIDTH;
            const y = Math.floor(idx / GRID_WIDTH);
            const isHead = snake[0]?.x === x && snake[0]?.y === y;
            const isBody = snake.slice(1).some(s => s.x === x && s.y === y);
            const isFood = food.x === x && food.y === y;

            return (
              <div
                key={idx}
                className={`rounded-[2px] transition-all flex items-center justify-center text-[10px] leading-none ${
                  isHead
                    ? 'bg-terminal-accent text-terminal-bg font-bold shadow-md ring-1 ring-terminal-accent'
                    : isBody
                    ? 'bg-terminal-success text-terminal-bg font-bold shadow-xs'
                    : isFood
                    ? 'bg-terminal-warning text-terminal-bg animate-pulse font-bold'
                    : 'bg-terminal-hover/40'
                }`}
              >
                {isHead ? '●' : isBody ? '■' : isFood ? '★' : ''}
              </div>
            );
          })}
        </div>

        {/* Start Overlay */}
        {!hasStarted && !gameOver && (
          <div className="absolute inset-0 bg-terminal/85 backdrop-blur-xs flex flex-col items-center justify-center gap-2 rounded text-center animate-fade-in p-2">
            <div className="text-terminal-accent font-bold text-sm">READY TO PLAY?</div>
            <div className="text-terminal-muted text-[11px]">Walls wrap around. Eat ★ to grow!</div>
            <button
              onClick={() => {
                setHasStarted(true);
                hasStartedRef.current = true;
              }}
              className="mt-1 px-3 py-1 bg-terminal-accent text-terminal-bg font-bold rounded text-xs hover:opacity-90 transition-opacity flex items-center gap-1.5 cursor-pointer shadow-md"
            >
              <Play size={12} />
              <span>Press Arrow Key to Start</span>
            </button>
          </div>
        )}

        {/* Game Over Overlay */}
        {gameOver && (
          <div className="absolute inset-0 bg-terminal/90 backdrop-blur-xs flex flex-col items-center justify-center gap-2 rounded text-center animate-fade-in p-2">
            <div className="text-terminal-error font-bold text-sm sm:text-base tracking-wider">GAME OVER</div>
            <div className="text-xs text-terminal-muted">Final Score: <strong className="text-terminal-text">{score}</strong></div>
            <button
              onClick={resetGame}
              className="mt-1 px-3 py-1 bg-terminal-accent text-terminal-bg font-bold rounded text-xs hover:opacity-90 transition-opacity flex items-center gap-1.5 cursor-pointer shadow-md"
            >
              <RotateCcw size={12} />
              <span>Press R to Restart</span>
            </button>
          </div>
        )}

        {/* Paused Overlay */}
        {isPaused && !gameOver && hasStarted && (
          <div className="absolute inset-0 bg-terminal/80 backdrop-blur-xs flex flex-col items-center justify-center rounded text-center">
            <div className="text-terminal-warning font-bold text-sm">PAUSED</div>
            <div className="text-[11px] text-terminal-muted">Press Space to Resume</div>
          </div>
        )}
      </div>

      {/* Touch D-Pad for Mobile */}
      <div className="flex flex-col items-center gap-1 sm:hidden pt-1">
        <button
          onClick={() => queueDirection('UP')}
          className="w-11 h-9 rounded bg-terminal border border-terminal-border flex items-center justify-center text-terminal-accent active:bg-terminal-hover cursor-pointer"
          aria-label="Up"
        >
          <ArrowUp size={16} />
        </button>
        <div className="flex gap-4">
          <button
            onClick={() => queueDirection('LEFT')}
            className="w-11 h-9 rounded bg-terminal border border-terminal-border flex items-center justify-center text-terminal-accent active:bg-terminal-hover cursor-pointer"
            aria-label="Left"
          >
            <ArrowLeft size={16} />
          </button>
          <button
            onClick={() => queueDirection('DOWN')}
            className="w-11 h-9 rounded bg-terminal border border-terminal-border flex items-center justify-center text-terminal-accent active:bg-terminal-hover cursor-pointer"
            aria-label="Down"
          >
            <ArrowDown size={16} />
          </button>
          <button
            onClick={() => queueDirection('RIGHT')}
            className="w-11 h-9 rounded bg-terminal border border-terminal-border flex items-center justify-center text-terminal-accent active:bg-terminal-hover cursor-pointer"
            aria-label="Right"
          >
            <ArrowRight size={16} />
          </button>
        </div>
      </div>

      {/* Instructions & Controls footer */}
      <div className="flex flex-wrap items-center justify-between gap-2 text-[11px] text-terminal-muted pt-1 border-t border-terminal-border/50">
        <div className="hidden sm:block">
          Controls: <kbd className="px-1 py-0.5 bg-terminal-border rounded text-terminal-text">↑</kbd> <kbd className="px-1 py-0.5 bg-terminal-border rounded text-terminal-text">↓</kbd> <kbd className="px-1 py-0.5 bg-terminal-border rounded text-terminal-text">←</kbd> <kbd className="px-1 py-0.5 bg-terminal-border rounded text-terminal-text">→</kbd> or <kbd className="px-1 py-0.5 bg-terminal-border rounded text-terminal-text">WASD</kbd>
        </div>
        <div className="flex items-center gap-2 ml-auto">
          <button
            onClick={() => setIsPaused(p => !p)}
            className="hover:text-terminal-text transition-colors cursor-pointer"
          >
            {isPaused ? 'Resume' : 'Pause'} [Space]
          </button>
          <span>•</span>
          <button
            onClick={resetGame}
            className="hover:text-terminal-text transition-colors cursor-pointer"
          >
            Restart [R]
          </button>
        </div>
      </div>
    </div>
  );
};
