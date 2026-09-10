import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Terminal as TerminalIcon, Volume2, VolumeX, Palette, Maximize2, Minimize2 } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { useSound } from '../hooks/useSound';
import { CommandProcessor } from './CommandProcessor';
import { Banner } from './sections/Banner';

interface TerminalEntry {
  id: string;
  command?: string;
  output?: React.ReactNode;
}

export const Terminal: React.FC = () => {
  const [entries, setEntries] = useState<TerminalEntry[]>([]);
  const [input, setInput] = useState('');
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [isMaximized, setIsMaximized] = useState(false);

  const terminalRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const { theme, toggleTheme } = useTheme();
  const { playBell, playKeypress } = useSound();

  const commandsList = [
    'help', 'about', 'whoami', 'projects', 'man', 'experience', 
    'research', 'skills', 'education', 'achievements', 'photo', 
    'ascii', 'portrait', 'neofetch', 'contact', 'email', 'socials', 
    'theme', 'clear', 'banner', 'date', 'sudo'
  ];

  // Initialize with the Welcome Banner
  useEffect(() => {
    setEntries([
      {
        id: 'init-banner',
        command: '',
        output: <Banner onRunCommand={runCommand} />
      }
    ]);
  }, []);

  // Auto-scroll to bottom when entries change
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTo({
        top: terminalRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }
  }, [entries]);

  // Keep focus on input
  useEffect(() => {
    inputRef.current?.focus();
  }, [entries, isMaximized]);

  const runCommand = useCallback((cmdString: string) => {
    const trimmed = cmdString.trim();
    if (!trimmed) {
      // Empty enter pressed: add empty prompt line
      setEntries(prev => [
        ...prev,
        { id: `empty-${Date.now()}`, command: '', output: null }
      ]);
      return;
    }

    if (soundEnabled) playBell();

    const parts = trimmed.split(/\s+/);
    const command = parts[0].toLowerCase();
    const args = parts.slice(1);

    // Save to history
    setCommandHistory(prev => [...prev, trimmed]);
    setHistoryIndex(-1);

    if (command === 'clear' || command === 'cls') {
      setEntries([]);
      setInput('');
      return;
    }

    if (command === 'logout' || command === 'exit') {
      setEntries(prev => [
        ...prev,
        {
          id: `cmd-${Date.now()}`,
          command: trimmed,
          output: (
            <div className="text-terminal-warning text-xs font-mono my-1">
              Session closed. Restarting terminal...
            </div>
          )
        }
      ]);
      setTimeout(() => {
        setEntries([
          {
            id: `restart-${Date.now()}`,
            command: '',
            output: <Banner onRunCommand={runCommand} />
          }
        ]);
      }, 1000);
      setInput('');
      return;
    }

    // Append command and its output inline into the terminal buffer
    setEntries(prev => [
      ...prev,
      {
        id: `cmd-${Date.now()}`,
        command: trimmed,
        output: (
          <CommandProcessor
            command={command}
            args={args}
            commandHistory={commandHistory}
            onRunCommand={runCommand}
          />
        )
      }
    ]);

    setInput('');
  }, [soundEnabled, commandHistory]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    runCommand(input);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (soundEnabled && e.key.length === 1 && !e.ctrlKey && !e.metaKey) {
      playKeypress();
    }

    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandHistory.length > 0 && historyIndex < commandHistory.length - 1) {
        const nextIdx = historyIndex + 1;
        setHistoryIndex(nextIdx);
        setInput(commandHistory[commandHistory.length - 1 - nextIdx]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex > 0) {
        const nextIdx = historyIndex - 1;
        setHistoryIndex(nextIdx);
        setInput(commandHistory[commandHistory.length - 1 - nextIdx]);
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setInput('');
      }
    } else if (e.key === 'Tab') {
      e.preventDefault();
      const current = input.trim().toLowerCase();
      if (!current) {
        setInput('help');
        return;
      }

      const [firstPart, ...rest] = current.split(' ');
      const matches = commandsList.filter(c => c.startsWith(firstPart));
      if (matches.length === 1) {
        setInput(rest.length > 0 ? `${matches[0]} ${rest.join(' ')}` : matches[0]);
      } else if (matches.length > 1) {
        let prefix = matches[0];
        for (let i = 1; i < matches.length; i++) {
          let j = 0;
          while (j < prefix.length && j < matches[i].length && prefix[j] === matches[i][j]) {
            j++;
          }
          prefix = prefix.substring(0, j);
        }
        if (prefix.length > firstPart.length) {
          setInput(rest.length > 0 ? `${prefix} ${rest.join(' ')}` : prefix);
        }
      }
    } else if (e.ctrlKey && e.key === 'l') {
      e.preventDefault();
      setEntries([]);
      setInput('');
    }
  };

  const handleWindowClick = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    const isInteractive = target.closest('button, a, input, textarea, select, [role="button"]');
    if (!isInteractive && inputRef.current) {
      inputRef.current.focus();
    }
  };

  const handleReset = () => {
    setEntries([
      {
        id: `reset-${Date.now()}`,
        command: '',
        output: <Banner onRunCommand={runCommand} />
      }
    ]);
    setInput('');
    setCommandHistory([]);
  };

  const handleClear = () => {
    setEntries([]);
    setInput('');
  };

  const handleMaximize = () => {
    setIsMaximized(prev => !prev);
    try {
      if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen?.().catch(() => {});
      } else {
        document.exitFullscreen?.().catch(() => {});
      }
    } catch (e) {}
  };

  return (
    <div 
      className={`terminal-container flex flex-col bg-terminal text-terminal-text font-mono select-text transition-all ${
        isMaximized 
          ? 'fixed inset-0 z-50 w-screen h-screen m-0 rounded-none border-none' 
          : 'h-full'
      }`}
      onClick={handleWindowClick}
    >
      {/* Top Window Bar */}
      <div className="terminal-header flex items-center justify-between px-3 py-2 bg-terminal-header border-b border-terminal-border select-none flex-shrink-0">
        <div className="flex items-center space-x-2">
          {/* macOS controls */}
          <div className="flex space-x-1.5 mr-2">
            <button
              onClick={handleReset}
              className="w-3 h-3 rounded-full bg-[#ff5f56] hover:opacity-80 transition-opacity cursor-pointer"
              title="Reset Terminal Session"
            />
            <button
              onClick={handleClear}
              className="w-3 h-3 rounded-full bg-[#ffbd2e] hover:opacity-80 transition-opacity cursor-pointer"
              title="Clear Buffer (Ctrl+L)"
            />
            <button
              onClick={handleMaximize}
              className="w-3 h-3 rounded-full bg-[#27c93f] hover:opacity-80 transition-opacity cursor-pointer"
              title={isMaximized ? "Restore Window Size" : "Maximize Terminal / Fullscreen"}
            />
          </div>

          <div className="flex items-center gap-1.5 text-xs text-terminal-muted font-semibold">
            <TerminalIcon size={14} className="text-terminal-accent" />
            <span className="text-terminal-text font-bold">sagar@iitb-cse</span>
            <span>:</span>
            <span className="text-terminal-accent">~</span>
            <span className="hidden sm:inline text-terminal-muted text-[11px]">(zsh)</span>
          </div>
        </div>

        <div className="flex items-center space-x-3 text-xs">
          {/* Dedicated Theme Switcher in Header */}
          <button
            onClick={toggleTheme}
            className="hover:bg-terminal-hover px-2 py-0.5 rounded text-terminal-muted hover:text-terminal-text transition-colors flex items-center gap-1.5 cursor-pointer border border-terminal-border/50"
            title="Click to cycle theme (or type: theme [name])"
          >
            <Palette size={12} className="text-terminal-accent" />
            <span className="text-[11px] font-mono">theme: <strong className="text-terminal-accent">{theme}</strong></span>
          </button>

          <button
            onClick={() => setSoundEnabled(!soundEnabled)}
            className="p-1 hover:bg-terminal-hover rounded text-terminal-muted hover:text-terminal-text transition-colors cursor-pointer"
            title={soundEnabled ? 'Mute audio' : 'Enable sound'}
          >
            {soundEnabled ? <Volume2 size={14} className="text-terminal-accent" /> : <VolumeX size={14} />}
          </button>
        </div>
      </div>

      {/* Terminal Stream: Output + Inline Active Prompt */}
      <div 
        ref={terminalRef}
        className="terminal-output flex-1 p-3 sm:p-4 overflow-y-auto scrollbar-thin space-y-2"
      >
        {entries.map(entry => (
          <div key={entry.id} className="terminal-entry space-y-1">
            {/* Command history line */}
            {entry.command !== undefined && entry.command !== '' && (
              <div className="flex items-center space-x-2 text-xs sm:text-sm font-mono text-terminal-accent font-bold">
                <span>sagar@iitb-cse:~$</span>
                <span className="text-terminal-text font-normal">{entry.command}</span>
              </div>
            )}

            {/* Empty command line */}
            {entry.command === '' && entry.id !== 'init-banner' && (
              <div className="text-xs sm:text-sm font-mono text-terminal-accent font-bold">
                <span>sagar@iitb-cse:~$</span>
              </div>
            )}

            {/* Output */}
            {entry.output && (
              <div className="terminal-result text-xs sm:text-sm">
                {entry.output}
              </div>
            )}
          </div>
        ))}

        {/* The Native Active Prompt Line */}
        <form onSubmit={handleSubmit} className="terminal-active-line flex items-center space-x-2 pt-1">
          <span className="text-terminal-accent font-bold text-xs sm:text-sm flex-shrink-0 select-none">
            sagar@iitb-cse:~$
          </span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 bg-transparent border-none outline-none text-terminal-text caret-terminal-accent font-mono text-xs sm:text-sm p-0 m-0 focus:ring-0 focus:outline-none"
            autoFocus
            autoComplete="off"
            autoCapitalize="off"
            spellCheck="false"
            aria-label="Active terminal command line"
          />
        </form>
      </div>
    </div>
  );
};