import React from 'react';
import { projects } from '../data/portfolioData';
import { useTheme, ThemeMode } from '../contexts/ThemeContext';
import { Banner } from './sections/Banner';
import { WhoAmI } from './sections/WhoAmI';
import { Projects } from './sections/Projects';
import { ManPage } from './sections/ManPage';
import { Experience } from './sections/Experience';
import { Research } from './sections/Research';
import { Skills } from './sections/Skills';
import { Education } from './sections/Education';
import { Achievements } from './sections/Achievements';
import { Neofetch } from './sections/Neofetch';
import { Photo } from './sections/Photo';
import { Contact } from './sections/Contact';
import { Help } from './sections/Help';
import { NotFound } from './sections/NotFound';

interface CommandProcessorProps {
  command: string;
  args: string[];
  commandHistory: string[];
  onRunCommand?: (cmd: string) => void;
}

export const CommandProcessor: React.FC<CommandProcessorProps> = ({ 
  command, 
  args, 
  commandHistory,
  onRunCommand
}) => {
  const { theme, setTheme, availableThemes } = useTheme();

  const renderCommand = () => {
    switch (command) {
      case 'help':
      case 'h':
      case '?':
        return <Help onRunCommand={onRunCommand} />;

      case 'banner':
      case 'welcome':
      case 'start':
        return <Banner onRunCommand={onRunCommand} />;

      case 'whoami':
      case 'about':
      case 'bio':
        return <WhoAmI onRunCommand={onRunCommand} />;

      case 'photo':
      case 'ascii':
      case 'portrait':
      case 'avatar':
        return <Photo />;

      case 'projects':
      case 'ls':
      case 'project':
        return <Projects onRunCommand={onRunCommand} />;

      case 'man': {
        if (args.length > 0) {
          const query = args[0].toLowerCase();
          const project = projects.find(
            p => p.id === query || p.id.includes(query) || p.name.toLowerCase().includes(query)
          );
          if (project) {
            return <ManPage project={project} />;
          }
        }
        return (
          <div className="text-terminal-error text-xs sm:text-sm space-y-1 font-mono">
            <div>man: No manual entry for '{args[0] || 'undefined'}'</div>
            <div className="text-terminal-muted text-xs">
              Available manuals: {projects.map(p => p.id).join(', ')}
            </div>
            <div className="text-terminal-muted text-xs">
              Example: <span className="text-terminal-accent font-bold">man vectorffn</span>
            </div>
          </div>
        );
      }

      case 'experience':
      case 'exp':
      case 'work':
      case 'internships':
        return <Experience />;

      case 'research':
      case 'publications':
      case 'papers':
        return <Research />;

      case 'skills':
      case 'skill':
      case 'stack':
        return <Skills />;

      case 'education':
      case 'edu':
      case 'degrees':
      case 'academic':
        return <Education />;

      case 'achievements':
      case 'awards':
      case 'honors':
      case 'ranks':
        return <Achievements />;

      case 'neofetch':
      case 'fetch':
      case 'sys':
      case 'system':
        return <Neofetch />;

      case 'contact':
      case 'email':
      case 'mail':
      case 'socials':
        return <Contact />;

      case 'theme': {
        if (args.length > 0) {
          const requested = args[0].toLowerCase() as ThemeMode;
          if (availableThemes.includes(requested)) {
            setTheme(requested);
            return (
              <div className="text-terminal-success text-xs sm:text-sm font-mono space-y-1">
                <div>✔ Switched theme to: <strong>{requested}</strong></div>
                <div className="text-terminal-muted text-xs">
                  Available themes: {availableThemes.join(', ')}
                </div>
              </div>
            );
          } else {
            return (
              <div className="text-terminal-error text-xs sm:text-sm font-mono space-y-1">
                <div>Invalid theme: '{requested}'</div>
                <div className="text-terminal-muted text-xs">
                  Available themes: {availableThemes.join(', ')}
                </div>
              </div>
            );
          }
        } else {
          return (
            <div className="text-terminal-text text-xs sm:text-sm font-mono space-y-2 bg-terminal-hover p-3 rounded border border-terminal-border">
              <div className="text-terminal-accent font-bold">CURRENT THEME: {theme}</div>
              <div className="text-terminal-muted">
                Usage: <span className="text-terminal-accent font-mono">theme [name]</span>
              </div>
              <div className="flex flex-wrap gap-2 pt-1">
                {availableThemes.map(t => (
                  <button
                    key={t}
                    onClick={() => setTheme(t)}
                    className={`click-cmd text-xs ${t === theme ? 'border-terminal-accent text-terminal-accent font-bold' : ''}`}
                  >
                    {t} {t === theme ? '(active)' : ''}
                  </button>
                ))}
              </div>
            </div>
          );
        }
      }

      case 'date':
      case 'time':
        return (
          <div className="text-terminal-text font-mono text-xs sm:text-sm">
            {new Date().toString()}
          </div>
        );

      case 'echo':
        return (
          <div className="text-terminal-text font-mono text-xs sm:text-sm">
            {args.join(' ')}
          </div>
        );

      case 'sudo': {
        try {
          window.open('https://youtu.be/gFx-NjTw3sM?si=nioz-MGmr-Lc6ogG&t=111', '_blank', 'noopener,noreferrer');
        } catch {
          // ignore popup blocker
        }
        return (
          <div className="text-terminal-accent font-mono text-xs sm:text-sm space-y-1 my-1">
            <div className="text-terminal-muted">
              [sudo] password for visitor: **********
            </div>
            <div className="text-terminal-success font-semibold flex items-center gap-1.5">
              <span>⚡</span> [sudo] root privileges granted.
            </div>
          </div>
        );
      }

      /* ── Editor troll chain: vi → vim → nvim → nano → vscode → sudo ── */
      case 'vi':
        return (
          <div className="text-terminal-text font-mono text-xs sm:text-sm space-y-1 my-1">
            <div className="text-terminal-error">zsh: command not found: vi</div>
            <div className="text-terminal-muted">
              vi is not installed on this system. Maybe try{' '}
              <span className="text-terminal-accent font-bold cursor-pointer hover:underline" onClick={() => onRunCommand?.('vim')}>vim</span>?
            </div>
          </div>
        );

      case 'vim':
        return (
          <div className="text-terminal-text font-mono text-xs sm:text-sm space-y-1 my-1">
            <div className="text-terminal-error">zsh: command not found: vim</div>
            <div className="text-terminal-muted">
              You don't have vim either. Perhaps try{' '}
              <span className="text-terminal-accent font-bold cursor-pointer hover:underline" onClick={() => onRunCommand?.('nvim')}>nvim</span>?
            </div>
          </div>
        );

      case 'nvim':
      case 'neovim':
        return (
          <div className="text-terminal-text font-mono text-xs sm:text-sm space-y-1 my-1">
            <div className="text-terminal-error">zsh: command not found: nvim</div>
            <div className="text-terminal-muted">
              Neovim isn't installed either. You could try{' '}
              <span className="text-terminal-accent font-bold cursor-pointer hover:underline" onClick={() => onRunCommand?.('nano')}>nano</span>?
            </div>
          </div>
        );

      case 'nano':
        return (
          <div className="text-terminal-text font-mono text-xs sm:text-sm space-y-1 my-1">
            <div className="text-terminal-error">zsh: command not found: nano</div>
            <div className="text-terminal-muted">
              You don't have nano either. Surely you have{' '}
              <span className="text-terminal-accent font-bold cursor-pointer hover:underline" onClick={() => onRunCommand?.('vscode')}>vscode</span>?
            </div>
          </div>
        );

      case 'vscode':
      case 'code': {
        try {
          window.open('https://youtu.be/gFx-NjTw3sM?si=nioz-MGmr-Lc6ogG&t=111', '_blank', 'noopener,noreferrer');
        } catch {
          // ignore popup blocker
        }
        return (
          <div className="text-terminal-text font-mono text-xs sm:text-sm space-y-1 my-1">
            <div className="text-terminal-error font-semibold">E: sudo access required for vscode</div>
            <div className="text-terminal-success">⚡ [sudo] root privileges granted. Launching...</div>
            {/* use prompting, not typing */}
            <div className="text-terminal-muted text-[11px] italic mt-1">
              hint: use prompting, not typing.
            </div>
          </div>
        );
      }

      case 'clear':
      case 'cls':
        return null;

      default:
        return <NotFound command={command} />;
    }
  };

  return (
    <div className="command-output my-2">
      {renderCommand()}
    </div>
  );
};