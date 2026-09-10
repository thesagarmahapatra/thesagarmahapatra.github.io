import React, { useState, useEffect } from 'react';
import { Wifi, Clock, Terminal as TerminalIcon } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

export const StatusBar: React.FC = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [uptime, setUptime] = useState(0);
  const { theme } = useTheme();

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
      setUptime(prev => prev + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatUptime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="status-bar bg-terminal-header text-terminal-text px-4 py-1.5 text-xs font-mono border-t border-terminal-border select-none">
      <div className="flex items-center justify-between">
        {/* Left side - System info */}
        <div className="flex items-center space-x-3 sm:space-x-4">
          <div className="flex items-center space-x-1">
            <span className="text-terminal-accent font-semibold">sagar</span>
            <span className="text-terminal-muted">:</span>
            <span className="text-terminal-text">~$</span>
          </div>

          <div className="hidden md:flex items-center space-x-1 text-terminal-muted">
            <span>host:</span>
            <span className="text-terminal-text">IIT Bombay CC (New CSE)</span>
          </div>
          
          <div className="flex items-center space-x-1">
            <span className="text-terminal-muted">theme:</span>
            <span className="text-terminal-accent font-semibold">{theme}</span>
          </div>

          <div className="hidden sm:flex items-center space-x-1">
            <span className="text-terminal-muted">uptime:</span>
            <span className="text-terminal-text">{formatUptime(uptime)}</span>
          </div>
        </div>

        {/* Right side - Status indicators */}
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-1.5 text-terminal-success">
            <Wifi size={13} />
            <span className="hidden sm:inline text-[11px]">ONLINE (main)</span>
          </div>

          <div className="flex items-center space-x-1 text-terminal-muted">
            <Clock size={13} />
            <span className="text-[11px]">{currentTime.toLocaleTimeString()}</span>
          </div>
        </div>
      </div>
    </div>
  );
};