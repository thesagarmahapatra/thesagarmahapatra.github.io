import React, { useState } from 'react';
import { ASCII_PORTRAIT } from '../../data/asciiPortrait';
import { personalInfo } from '../../data/portfolioData';
import { Sparkles, Terminal, Award, BookOpen, User, Image as ImageIcon } from 'lucide-react';

interface BannerProps {
  onRunCommand?: (cmd: string) => void;
}

export const Banner: React.FC<BannerProps> = ({ onRunCommand }) => {
  const [showRealPhoto, setShowRealPhoto] = useState(false);

  const handleCmd = (cmd: string) => {
    if (onRunCommand) onRunCommand(cmd);
  };

  return (
    <div className="space-y-3 animate-fade-in my-1 font-mono">
      {/* Container */}
      <div className="flex flex-col md:flex-row gap-4 items-start">
        {/* Left Column: Compact Colored ASCII Portrait / Photo Frame */}
        <div className="flex-shrink-0 mx-auto md:mx-0">
          <div className="ascii-photo-frame">
            <div className="flex items-center justify-between pb-1.5 mb-1.5 border-b border-terminal-border text-[11px] text-terminal-muted">
              <span className="flex items-center gap-1 font-semibold text-terminal-accent">
                <Sparkles size={11} /> {showRealPhoto ? 'Photo' : 'ASCII Art'}
              </span>
              <button
                onClick={() => setShowRealPhoto(!showRealPhoto)}
                className="click-cmd text-[10px] text-terminal-accent px-1.5 py-0.5"
                title="Toggle portrait mode"
              >
                {showRealPhoto ? 'view ascii' : 'view photo'}
              </button>
            </div>

            {showRealPhoto ? (
              <div className="w-[218px] h-[245px] overflow-hidden rounded bg-black flex items-center justify-center">
                <img
                  src="./assets/Sagar_cafe.jpg"
                  alt="Sagar Swaraj Mahapatra"
                  className="w-full h-full object-cover rounded"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = '/assets/Sagar_cafe.jpg';
                  }}
                />
              </div>
            ) : (
              <div
                className="ascii-photo-art select-text"
                dangerouslySetInnerHTML={{ __html: ASCII_PORTRAIT }}
              />
            )}

            <div className="pt-1.5 mt-1.5 border-t border-terminal-border text-center text-[11px] text-terminal-muted leading-tight">
              <strong className="text-terminal-accent">{personalInfo.name}</strong>
              <div className="text-[10px] text-terminal-muted">IIT Bombay (EE1) • CPI: {personalInfo.cpi}</div>
            </div>
          </div>
        </div>

        {/* Right Column: Compact Bio & Command Launcher */}
        <div className="flex-1 space-y-2.5">
          <div className="bg-terminal-hover p-3.5 rounded border border-terminal-border space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="text-base sm:text-lg font-bold text-terminal-accent flex items-center gap-1.5">
                ⚡ {personalInfo.name}
              </h1>
              <span className="px-1.5 py-0.5 text-[10px] rounded bg-terminal-border text-terminal-text border border-terminal-accent/30 font-semibold">
                DR 1 (CPI: 9.03)
              </span>
              <span className="px-1.5 py-0.5 text-[10px] rounded bg-terminal-accent/15 text-terminal-accent border border-terminal-accent/30 font-semibold">
                GATE 99+ %ile
              </span>
            </div>

            <p className="text-terminal-text text-xs sm:text-sm leading-relaxed">
              Graduate Student (M.Tech) & Systems/ML Researcher in the{' '}
              <strong className="text-terminal-accent font-semibold">Machine Learning Lab, CSE</strong> at{' '}
              <strong className="text-terminal-accent font-semibold">IIT Bombay</strong>, affiliated with{' '}
              <strong className="text-terminal-accent font-semibold">BharatGen</strong>. Researching high-performance LLM inference acceleration, speculative decoding (EAGLE/MTP), and campus mail infrastructure.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-xs text-terminal-muted pt-0.5">
              <div className="flex items-center gap-1.5">
                <Terminal size={13} className="text-terminal-accent flex-shrink-0" />
                <span>SysAdmin: Campus Mail (New CSE Bldg)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <BookOpen size={13} className="text-terminal-accent flex-shrink-0" />
                <span>Focus: LLM Inference Runtimes & C++ SIMD</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Award size={13} className="text-terminal-accent flex-shrink-0" />
                <span>Codeforces: {personalInfo.codeforcesRating}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Sparkles size={13} className="text-terminal-accent flex-shrink-0" />
                <span>JEST AIR 58 (CS)</span>
              </div>
            </div>

            <div className="pt-2 border-t border-terminal-border/60">
              <div className="text-[11px] text-terminal-muted mb-1.5">
                Type <span className="text-terminal-success font-bold">help</span> or click any command to execute:
              </div>
              <div className="flex flex-wrap gap-1.5 text-xs">
                {['about', 'projects', 'experience', 'research', 'skills', 'education', 'achievements', 'photo', 'neofetch', 'contact'].map(cmd => (
                  <button
                    key={cmd}
                    onClick={() => handleCmd(cmd)}
                    className="click-cmd text-terminal-accent hover:border-terminal-accent text-xs"
                  >
                    {cmd}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
