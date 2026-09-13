import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Play, RotateCcw, Trophy, X, ArrowUp, ArrowDown, ArrowLeft, ArrowRight } from 'lucide-react';

interface Position {
  x: number;
  y: number;
}

const GRID_WIDTH = 18;
const GRID_HEIGHT = 14;
const INITIAL_SPEED = 140;

export const SnakeGame: React.FC = () => {
  const [snake, setSnake] = useState<Position[]>([
    { x: 8, y: 7 },
    { x: 7, y: 7 },
    { x: 6, y: 7 },
  ]);
  const [direction, setDirection] = useState<'UP' | 'DOWN' | 'LEFT' | 'RIGHT'>('RIGHT');
  const [nextDirection, setNextDirection] = useState<'UP' | 'DOWN' | 'LEFT' | 'RIGHT'>('RIGHT');
  const [food, setFood] = useState<Position>({ x: 12, y: 7 });
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(() => {
    return parseInt(localStorage.getItem('terminal_snake_highscore') || '0', 10);
  });
  const [gameOver, setGameOver] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);

  const gameRef = useRef<HTMLDivElement>(null);

  // Play audio blip
  const playBeep = useCallback((frequency = 440, duration = 0.08) => {
    try {
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.type = 'square';
      osc.frequency.value = frequency;
      gain.gain.setValueAtTime(0.1, audioCtx.currentTime);
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
    setSnake(initialSnake);
    setDirection('RIGHT');
    setNextDirection('RIGHT');
    setFood(generateFood(initialSnake));
    setScore(0);
    setGameOver(false);
    setIsPaused(false);
    setIsPlaying(true);
    playBeep(520, 0.1);
  }, [generateFood, playBeep]);

  // Handle keyboard inputs
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Prevent page scrolling with arrow keys
      if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', ' '].includes(e.key)) {
        e.preventDefault();
      }

      if (e.key === 'r' || e.key === 'R') {
        resetGame();
        return;
      }

      if (e.key === ' ' || e.key === 'p' || e.key === 'P') {
        setIsPaused(prev => !prev);
        return;
      }

      if (gameOver || isPaused) return;

      switch (e.key) {
        case 'ArrowUp':
        case 'w':
        case 'W':
          if (direction !== 'DOWN') setNextDirection('UP');
          break;
        case 'ArrowDown':
        case 's':
        case 'S':
          if (direction !== 'UP') setNextDirection('DOWN');
          break;
        case 'ArrowLeft':
        case 'a':
        case 'A':
          if (direction !== 'RIGHT') setNextDirection('LEFT');
          break;
        case 'ArrowRight':
        case 'd':
        case 'D':
          if (direction !== 'LEFT') setNextDirection('RIGHT');
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [direction, gameOver, isPaused, resetGame]);

  // Main game loop
  useEffect(() => {
    if (gameOver || isPaused || !isPlaying) return;

    const currentSpeed = Math.max(70, INITIAL_SPEED - Math.floor(score / 5) * 8);

    const timer = setInterval(() => {
      setDirection(nextDirection);

      setSnake(prevSnake => {
        const head = { ...prevSnake[0] };

        switch (nextDirection) {
          case 'UP':
            head.y -= 1;
            break;
          case 'DOWN':
            head.y += 1;
            break;
          case 'LEFT':
            head.x -= 1;
            break;
          case 'RIGHT':
            head.x += 1;
            break;
        }

        // Wall collision
        if (head.x < 0 || head.x >= GRID_WIDTH || head.y < 0 || head.y >= GRID_HEIGHT) {
          setGameOver(true);
          playBeep(220, 0.3);
          return prevSnake;
        }

        // Self collision
        if (prevSnake.some(seg => seg.x === head.x && seg.y === head.y)) {
          setGameOver(true);
          playBeep(220, 0.3);
          return prevSnake;
        }

        const newSnake = [head, ...prevSnake];

        // Food collision
        if (head.x === food.x && head.y === food.y) {
          playBeep(780, 0.1);
          setScore(s => {
            const newScore = s + 1;
            if (newScore > highScore) {
              setHighScore(newScore);
              localStorage.setItem('terminal_snake_highscore', newScore.toString());
            }
            return newScore;
          });
          setFood(generateFood(newSnake));
        } else {
          newSnake.pop();
        }

        return newSnake;
      });
    }, currentSpeed);

    return () => clearInterval(timer);
  }, [nextDirection, food, gameOver, isPaused, isPlaying, score, highScore, generateFood, playBeep]);

  const handleTouchDir = (dir: 'UP' | 'DOWN' | 'LEFT' | 'RIGHT') => {
    if (gameOver || isPaused) return;
    if (dir === 'UP' && direction !== 'DOWN') setNextDirection('UP');
    if (dir === 'DOWN' && direction !== 'UP') setNextDirection('DOWN');
    if (dir === 'LEFT' && direction !== 'RIGHT') setNextDirection('LEFT');
    if (dir === 'RIGHT' && direction !== 'LEFT') setNextDirection('RIGHT');
  };

  return (
    <div 
      ref={gameRef}
      tabIndex={0}
      className="p-3 sm:p-4 rounded bg-terminal-hover border border-terminal-border space-y-3 font-mono text-xs max-w-lg animate-fade-in my-2 outline-none shadow-lg"
    >
      {/* Title & Scoreboard */}
      <div className="flex items-center justify-between border-b border-terminal-border/60 pb-2">
        <div className="flex items-center gap-2">
          <span className="text-base">🐍</span>
          <span className="text-terminal-accent font-bold text-sm">TERMINAL SNAKE</span>
        </div>
        <div className="flex items-center gap-4 text-xs">
          <div>Score: <strong className="text-terminal-accent">{score}</strong></div>
          <div className="flex items-center gap-1 text-terminal-warning">
            <Trophy size={13} />
            <span>High: {highScore}</span>
          </div>
        </div>
      </div>

      {/* Grid Canvas */}
      <div className="relative bg-terminal border-2 border-terminal-border rounded p-1 mx-auto select-none">
        <div 
          className="grid gap-[2px]"
          style={{
            gridTemplateColumns: `repeat(${GRID_WIDTH}, minmax(0, 1fr))`,
            width: '100%',
            maxWidth: '340px',
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
                className={`rounded-[2px] transition-colors flex items-center justify-center text-[10px] ${
                  isHead
                    ? 'bg-terminal-accent text-terminal-bg font-bold shadow-sm'
                    : isBody
                    ? 'bg-terminal-success/80'
                    : isFood
                    ? 'bg-terminal-warning animate-pulse'
                    : 'bg-terminal-hover/40'
                }`}
              >
                {isHead ? '•' : isFood ? '★' : ''}
              </div>
            );
          })}
        </div>

        {/* Game Over Overlay */}
        {gameOver && (
          <div className="absolute inset-0 bg-terminal/90 backdrop-blur-xs flex flex-col items-center justify-center gap-2 rounded text-center animate-fade-in">
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
        {isPaused && !gameOver && (
          <div className="absolute inset-0 bg-terminal/80 backdrop-blur-xs flex flex-col items-center justify-center rounded text-center">
            <div className="text-terminal-warning font-bold text-sm">PAUSED</div>
            <div className="text-[11px] text-terminal-muted">Press Space to Resume</div>
          </div>
        )}
      </div>

      {/* Touch D-Pad for Mobile */}
      <div className="flex flex-col items-center gap-1 sm:hidden pt-1">
        <button
          onClick={() => handleTouchDir('UP')}
          className="w-11 h-9 rounded bg-terminal border border-terminal-border flex items-center justify-center text-terminal-accent active:bg-terminal-hover"
          aria-label="Up"
        >
          <ArrowUp size={16} />
        </button>
        <div className="flex gap-4">
          <button
            onClick={() => handleTouchDir('LEFT')}
            className="w-11 h-9 rounded bg-terminal border border-terminal-border flex items-center justify-center text-terminal-accent active:bg-terminal-hover"
            aria-label="Left"
          >
            <ArrowLeft size={16} />
          </button>
          <button
            onClick={() => handleTouchDir('DOWN')}
            className="w-11 h-9 rounded bg-terminal border border-terminal-border flex items-center justify-center text-terminal-accent active:bg-terminal-hover"
            aria-label="Down"
          >
            <ArrowDown size={16} />
          </button>
          <button
            onClick={() => handleTouchDir('RIGHT')}
            className="w-11 h-9 rounded bg-terminal border border-terminal-border flex items-center justify-center text-terminal-accent active:bg-terminal-hover"
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
            className="hover:text-terminal-text transition-colors"
          >
            {isPaused ? 'Resume' : 'Pause'} [Space]
          </button>
          <span>•</span>
          <button
            onClick={resetGame}
            className="hover:text-terminal-text transition-colors"
          >
            Restart [R]
          </button>
        </div>
      </div>
    </div>
  );
};
