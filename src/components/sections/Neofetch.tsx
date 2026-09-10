import React from 'react';
import { ASCII_IITB_LOGO } from '../../data/asciiPortrait';
import { personalInfo } from '../../data/portfolioData';

export const Neofetch: React.FC = () => {
  const colorBlocks = [
    '#282828', '#fb4934', '#b8bb26', '#fabd2f',
    '#83a598', '#d3869b', '#8ec07c', '#ebdbb2'
  ];

  return (
    <div className="bg-terminal-hover p-5 rounded-lg border border-terminal-border font-mono text-xs sm:text-sm animate-fade-in my-2">
      <div className="flex flex-col md:flex-row gap-6 items-start">
        {/* Left: ASCII Art Logo */}
        <div className="text-terminal-accent select-none whitespace-pre leading-snug">
          {ASCII_IITB_LOGO}
        </div>

        {/* Right: System Info */}
        <div className="space-y-1.5 flex-1">
          <div className="text-terminal-accent font-bold text-sm">
            sagar
          </div>
          <div className="text-terminal-muted border-b border-terminal-border pb-1">
            -----------------------------------
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-[140px_1fr] gap-x-2 gap-y-1 text-xs">
            <span className="text-terminal-accent font-semibold">OS:</span>
            <span className="text-terminal-text">IIT Bombay Linux 6.8.0-sysadmin</span>

            <span className="text-terminal-accent font-semibold">Host:</span>
            <span className="text-terminal-text">Computer Centre (New CSE Building)</span>

            <span className="text-terminal-accent font-semibold">Researcher:</span>
            <span className="text-terminal-text">{personalInfo.name}</span>

            <span className="text-terminal-accent font-semibold">Role:</span>
            <span className="text-terminal-text">{personalInfo.title}</span>

            <span className="text-terminal-accent font-semibold">Academic Lab:</span>
            <span className="text-terminal-text">Machine Learning Lab, CSE / BharatGen</span>

            <span className="text-terminal-accent font-semibold">CPI / Rank:</span>
            <span className="text-terminal-success font-semibold">{personalInfo.cpi} • {personalInfo.rank}</span>

            <span className="text-terminal-accent font-semibold">National Exam:</span>
            <span className="text-terminal-text">GATE 99+ %ile (DA & CS) • JEST AIR 58</span>

            <span className="text-terminal-accent font-semibold">Shell:</span>
            <span className="text-terminal-text">zsh 5.9 (x86_64-apple-darwin / linux-gnu)</span>

            <span className="text-terminal-accent font-semibold">Editor:</span>
            <span className="text-terminal-text">Neovim / VS Code</span>

            <span className="text-terminal-accent font-semibold">IITB Mail:</span>
            <span className="text-terminal-text">
              <a href={`mailto:${personalInfo.email}`} className="text-terminal-accent hover:underline">
                {personalInfo.email}
              </a>
            </span>

            <span className="text-terminal-accent font-semibold">GitHub:</span>
            <span className="text-terminal-text">
              <a href={personalInfo.github} target="_blank" rel="noopener noreferrer" className="text-terminal-accent hover:underline">
                github.com/{personalInfo.githubUser}
              </a>
            </span>
          </div>

          {/* Color palette blocks */}
          <div className="flex gap-1.5 pt-3">
            {colorBlocks.map((c, idx) => (
              <div
                key={idx}
                className="w-5 h-3 rounded-sm shadow-sm"
                style={{ backgroundColor: c }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
