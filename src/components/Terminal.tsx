import React, { useState, useRef, useEffect } from 'react';
import { ChevronRight, Terminal as TerminalIcon, Volume2, VolumeX, RotateCcw, Minus } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { useSound } from '../hooks/useSound';
import { TypingAnimation } from './TypingAnimation';

interface TerminalProps {
  onCommand: (command: string, args: string[]) => void;
  output: React.ReactNode[];
  isProcessing: boolean;
  onClear?: () => void;
  onReset?: () => void;
}

export const Terminal: React.FC<TerminalProps> = ({ 
  onCommand, 
  output, 
  isProcessing,
  onClear,
  onReset
}) => {
  const [input, setInput] = useState('');
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const inputRef = useRef<HTMLInputElement>(null);
  const outputRef = useRef<HTMLDivElement>(null);
  const { theme, toggleTheme } = useTheme();
  const { playBell, playKeypress } = useSound();

  const commandsList = [
    'help', 'about', 'whoami', 'projects', 'man', 'experience', 
    'research', 'skills', 'education', 'achievements', 'photo', 
    'ascii', 'portrait', 'neofetch', 'contact', 'email', 'socials', 
    'theme', 'clear', 'banner', 'date', 'sudo'
  ];

  useEffect(() => {
    if (outputRef.current) {
      outputRef.current.scrollTo({
        top: outputRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }
  }, [output]);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const runCmdString = (cmdString: string) => {
    if (!cmdString.trim()) return;
    if (soundEnabled) playBell();

    const [command, ...args] = cmdString.trim().split(' ');
    setCommandHistory(prev => [...prev, cmdString]);
    setHistoryIndex(-1);
    onCommand(command.toLowerCase(), args);
    setInput('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    runCmdString(input);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (soundEnabled && e.key.length === 1) playKeypress();

    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandHistory.length > 0 && historyIndex < commandHistory.length - 1) {
        const newIndex = historyIndex + 1;
        setHistoryIndex(newIndex);
        setInput(commandHistory[commandHistory.length - 1 - newIndex]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        setInput(commandHistory[commandHistory.length - 1 - newIndex]);
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setInput('');
      }
    } else if (e.key === 'Tab') {
      e.preventDefault();

      const currentInput = input.trim().toLowerCase();
      if (!currentInput) {
        setInput('help');
        return;
      }

      const [commandPart] = currentInput.split(' ');
      const matches = commandsList.filter(cmd => cmd.startsWith(commandPart));

      if (matches.length === 1) {
        const [_, ...rest] = input.split(' ');
        setInput(rest.length > 0 ? `${matches[0]} ${rest.join(' ')}` : matches[0]);
      } else if (matches.length > 1) {
        let commonPrefix = matches[0];
        for (let i = 1; i < matches.length; i++) {
          let j = 0;
          while (j < commonPrefix.length && 
                 j < matches[i].length && 
                 commonPrefix[j] === matches[i][j]) {
            j++;
          }
          commonPrefix = commonPrefix.substring(0, j);
        }

        if (commonPrefix.length > commandPart.length) {
          const [_, ...rest] = input.split(' ');
          setInput(rest.length > 0 ? `${commonPrefix} ${rest.join(' ')}` : commonPrefix);
        }
      }
    } else if (e.ctrlKey && e.key === 'l') {
      e.preventDefault();
      if (onClear) onClear();
    }
  };

  const handleFocus = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    const isInteractiveElement = target.closest('form, input, textarea, button, a, [role="button"]');
    
    if (!isInteractiveElement && inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <div className="terminal-container h-full flex flex-col bg-terminal text-terminal-text font-mono">
      {/* Terminal Header */}
      <div className="terminal-header flex items-center justify-between px-3 py-2 bg-terminal-header border-b border-terminal-border select-none">
        <div className="flex items-center space-x-2">
          {/* macOS window control dots */}
          <div className="flex space-x-1.5 mr-2">
            <button
              onClick={onReset}
              className="w-3 h-3 rounded-full bg-[#ff5f56] hover:opacity-80 transition-opacity flex items-center justify-center group"
              title="Reset Terminal Session"
            />
            <button
              onClick={onClear}
              className="w-3 h-3 rounded-full bg-[#ffbd2e] hover:opacity-80 transition-opacity flex items-center justify-center group"
              title="Clear Terminal (Ctrl+L)"
            />
            <button
              onClick={toggleTheme}
              className="w-3 h-3 rounded-full bg-[#27c93f] hover:opacity-80 transition-opacity flex items-center justify-center group"
              title="Toggle Theme"
            />
          </div>

          <div className="flex items-center gap-1.5 text-xs text-terminal-muted font-semibold">
            <TerminalIcon size={14} className="text-terminal-accent" />
            <span className="text-terminal-text">sagar@iitb-cse</span>
            <span>:</span>
            <span className="text-terminal-accent">~</span>
            <span className="hidden sm:inline text-terminal-muted">(zsh)</span>
          </div>
        </div>

        <div className="flex items-center space-x-3 text-xs">
          <span className="hidden sm:inline text-terminal-muted text-[11px]">
            Theme: <strong className="text-terminal-accent">{theme}</strong>
          </span>

          <button
            onClick={() => setSoundEnabled(!soundEnabled)}
            className="p-1 hover:bg-terminal-hover rounded text-terminal-muted hover:text-terminal-text transition-colors flex items-center gap-1"
            aria-label={soundEnabled ? 'Disable audio feedback' : 'Enable audio feedback'}
            title={soundEnabled ? 'Mute audio' : 'Enable sound'}
          >
            {soundEnabled ? <Volume2 size={14} className="text-terminal-accent" /> : <VolumeX size={14} />}
          </button>
        </div>
      </div>

      {/* Terminal Output Stream */}
      <div 
        ref={outputRef}
        className="terminal-output flex-1 p-4 overflow-y-auto scrollbar-thin scrollbar-track-terminal scrollbar-thumb-terminal-accent"
        onClick={handleFocus}
        role="log"
        aria-live="polite"
        aria-label="Terminal output"
      >
        {output.map((line, index) => (
          <div key={index} className="mb-2">
            {line}
          </div>
        ))}
        
        {isProcessing && (
          <div className="flex items-center space-x-2 my-2 text-terminal-accent text-xs">
            <TypingAnimation text="Executing command..." />
            <div className="loading-dots">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        )}
      </div>

      {/* Terminal Input Prompt */}
      <form onSubmit={handleSubmit} className="terminal-input px-4 py-3 border-t border-terminal-border bg-terminal-header/40"> 
        <div className="flex items-center space-x-2">
          <span className="text-terminal-accent font-bold text-xs sm:text-sm flex-shrink-0">
            sagar@iitb-cse:~$
          </span>
          <ChevronRight size={15} className="text-terminal-accent flex-shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 bg-transparent outline-none text-terminal-text caret-terminal-accent border-none focus:ring-0 focus:outline-none font-mono text-xs sm:text-sm"
            placeholder="Type 'help' or click any command..."
            autoComplete="off"
            spellCheck="false"
            aria-label="Command input prompt"
          />
        </div> 
      </form>
    </div>
  );
};