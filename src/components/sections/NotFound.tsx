import React from 'react';
import { AlertCircle, HelpCircle } from 'lucide-react';

interface NotFoundProps {
  command: string;
}

export const NotFound: React.FC<NotFoundProps> = ({ command }) => {
  const suggestions = [
    { cmd: 'help', desc: 'Show all available commands' },
    { cmd: 'about', desc: 'View Sagar Swaraj Mahapatra background' },
    { cmd: 'projects', desc: 'Inspect featured systems code' },
    { cmd: 'experience', desc: 'Review professional assistantships' },
    { cmd: 'research', desc: 'Explore academic research' },
    { cmd: 'skills', desc: 'Review languages & systems stack' },
    { cmd: 'photo', desc: 'Display terminal ASCII portrait' },
    { cmd: 'contact', desc: 'Reach out directly' }
  ];

  return (
    <div className="not-found-section space-y-4 animate-fade-in my-2">
      {/* Error Message */}
      <div className="bg-terminal-hover p-4 rounded-lg border border-red-500/40">
        <div className="flex items-center space-x-3 mb-2">
          <AlertCircle className="text-red-400" size={20} />
          <div>
            <h2 className="text-red-400 font-bold text-sm sm:text-base font-mono">
              zsh: command not found: {command}
            </h2>
          </div>
        </div>

        <div className="space-y-2 text-xs font-mono">
          <p className="text-terminal-text">
            The command <span className="text-terminal-accent bg-terminal px-1.5 py-0.5 rounded">{command}</span> is not recognized in this shell session.
          </p>

          <div className="bg-terminal p-3 rounded border border-terminal-border text-terminal-muted text-[11px] space-y-0.5">
            <div>Exit Status: 127 (Command Not Found)</div>
            <div>Shell: zsh (IIT Bombay Host: New CSE CC)</div>
            <div>Session: visitor@iitb.ac.in</div>
          </div>
        </div>
      </div>

      {/* Suggestions */}
      <div className="bg-terminal-hover p-4 rounded-lg border border-terminal-border space-y-2">
        <div className="flex items-center space-x-2 text-terminal-accent text-xs font-bold">
          <HelpCircle size={14} />
          <span>Did you mean one of these?</span>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-xs">
          {suggestions.map((item, index) => (
            <div 
              key={index} 
              className="flex items-center space-x-2 p-1.5 rounded bg-terminal border border-terminal-border"
            >
              <span className="text-terminal-accent font-mono font-bold">$ {item.cmd}</span>
              <span className="text-terminal-muted text-[11px]">- {item.desc}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="text-xs text-terminal-muted text-center pt-1 font-mono">
        Type <span className="text-terminal-success font-bold">help</span> to view all commands or <span className="text-terminal-success font-bold">clear</span> to reset screen.
      </div>
    </div>
  );
};