import React from 'react';
import { FileText, ExternalLink } from 'lucide-react';
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

      case 'classic':
      case 'classicview':
      case 'homepage':
      case 'doc':
      case 'cv':
      case 'webpage':
        return (
          <div className="p-3.5 rounded bg-terminal-hover border border-terminal-border/80 space-y-2.5 max-w-xl font-mono text-xs sm:text-sm">
            <div className="flex items-center gap-2 text-terminal-accent font-bold">
              <FileText size={16} />
              <span>Sagar Mahapatra — Academic Homepage (Classic Document View)</span>
            </div>
            <p className="text-terminal-text leading-relaxed">
              Prefer a classic document view? Visit:
            </p>
            <div className="p-2 rounded bg-terminal/70 border border-terminal-border">
              <a
                href="https://homepages.iitb.ac.in/~24m1076/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-terminal-accent underline font-semibold hover:text-terminal-text flex items-center gap-1.5 break-all"
              >
                <span>https://homepages.iitb.ac.in/~24m1076/</span>
                <ExternalLink size={13} className="flex-shrink-0" />
              </a>
            </div>
            <div className="text-[11px] text-terminal-muted">
              Redirects to Sagar&apos;s formal academic webpage at IIT Bombay featuring a conventional CV layout, publications, and background.
            </div>
          </div>
        );

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
        const sudoArg = args[0]?.toLowerCase();
        // sudo vscode / sudo code → editor troll payoff
        if (sudoArg === 'vscode' || sudoArg === 'code') {
          try {
            window.open('https://youtu.be/gFx-NjTw3sM?si=nioz-MGmr-Lc6ogG&t=111', '_blank', 'noopener,noreferrer');
          } catch {
            // ignore popup blocker
          }
          return (
            <div className="text-terminal-text font-mono text-xs sm:text-sm space-y-1 my-1">
              <div className="text-terminal-muted">
                [sudo] password for visitor: **********
              </div>
              <div className="text-terminal-success font-semibold">⚡ [sudo] root privileges granted. Launching vscode...</div>
              {/* use prompting, not typing */}
              <div className="text-terminal-muted text-[11px] italic mt-1">
                hint: use prompting, not typing.
              </div>
            </div>
          );
        }
        // default sudo → sysad warning
        return (
          <div className="text-terminal-accent font-mono text-xs sm:text-sm space-y-1 my-1">
            <div className="text-terminal-muted">
              [sudo] password for visitor: **********
            </div>
            <div className="text-terminal-error font-semibold">
              visitor is not in the sudoers file.
            </div>
            <div className="text-terminal-warning text-xs">
              This incident will be reported to the IITB Computer Center SysAds.
            </div>
          </div>
        );
      }

      /* ── Editor troll chain: vim → nvim → nano → vscode → sudo vscode ── */
      case 'vi':
      case 'vim':
        return (
          <div className="text-terminal-text font-mono text-xs sm:text-sm space-y-1 my-1">
            <div className="text-terminal-error">zsh: command not found: vim</div>
            <div className="text-terminal-muted">
              vim is not installed on this system. Maybe try{' '}
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
      case 'code':
        return (
          <div className="text-terminal-text font-mono text-xs sm:text-sm space-y-1 my-1">
            <div className="text-terminal-error font-semibold">E: sudo access required for vscode</div>
            <div className="text-terminal-muted">
              Try: <span className="text-terminal-accent font-bold">sudo vscode</span>
            </div>
          </div>
        );

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