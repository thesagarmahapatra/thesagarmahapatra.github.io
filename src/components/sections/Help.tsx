import React from 'react';
import { Terminal, HelpCircle } from 'lucide-react';

interface HelpProps {
  onRunCommand?: (cmd: string) => void;
}

export const Help: React.FC<HelpProps> = ({ onRunCommand }) => {
  const commands = [
    { cmd: 'about', desc: 'Summary bio, academic rank (DR 1), and affiliations' },
    { cmd: 'projects', desc: 'Featured software & systems (VectorFFN, IronGateway, nanoTorch...)' },
    { cmd: 'man [project]', desc: 'Unix manual page for a project (e.g., man vectorffn)' },
    { cmd: 'experience', desc: 'Professional internships (BharatGen, IITB CC SysAdmin, IISc)' },
    { cmd: 'research', desc: 'Academic research (Speculative decoding, RoPE grouping, seminars)' },
    { cmd: 'skills', desc: 'Programming languages, ML inference systems, and DevOps' },
    { cmd: 'education', desc: 'Academic history at IIT Bombay and MIT Manipal' },
    { cmd: 'achievements', desc: 'Honors, GATE/JEST percentiles, Codeforces, music' },
    { cmd: 'photo', desc: 'Display colored terminal ASCII portrait with photo toggle' },
    { cmd: 'neofetch', desc: 'Display IIT Bombay Linux system summary and color blocks' },
    { cmd: 'contact', desc: 'IITB email, GitHub, LinkedIn, and lab address' },
    { cmd: 'theme [name]', desc: 'Change theme (onedark, dracula, matrix, nord, gruvbox, amber, blue, white)' },
    { cmd: 'banner', desc: 'Display initial welcome banner and portrait' },
    { cmd: 'clear', desc: 'Clear the terminal screen buffer (or Ctrl+L)' },
    { cmd: 'whoami', desc: 'Display active user and role metadata' },
    { cmd: 'date', desc: 'Print current system time and date' },
    { cmd: 'sudo', desc: 'Execute superuser command (Easter egg)' }
  ];

  return (
    <div className="space-y-3 animate-fade-in my-2">
      <div className="flex items-center gap-2 pb-2 border-b border-terminal-border">
        <HelpCircle className="text-terminal-accent" size={18} />
        <h2 className="text-base font-bold text-terminal-accent">AVAILABLE TERMINAL COMMANDS</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        {commands.map(item => (
          <div
            key={item.cmd}
            className="flex items-start justify-between gap-3 p-2.5 rounded bg-terminal-hover border border-terminal-border"
          >
            <div className="space-y-0.5">
              <button
                onClick={() => onRunCommand && onRunCommand(item.cmd.split(' ')[0])}
                className="click-cmd text-terminal-accent font-mono font-bold text-xs"
              >
                {item.cmd}
              </button>
              <div className="text-terminal-muted text-xs leading-relaxed">
                {item.desc}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="p-2.5 bg-terminal/40 border border-terminal-border rounded text-xs text-terminal-muted flex flex-wrap items-center justify-between gap-2">
        <span>💡 Tip: Press <kbd className="px-1.5 py-0.5 bg-terminal-border rounded text-terminal-text font-mono">Tab</kbd> for autocompletion, <kbd className="px-1.5 py-0.5 bg-terminal-border rounded text-terminal-text font-mono">↑</kbd>/<kbd className="px-1.5 py-0.5 bg-terminal-border rounded text-terminal-text font-mono">↓</kbd> for command history.</span>
        <span>Click any command chip to run instantly.</span>
      </div>
    </div>
  );
};