import React, { useState } from 'react';
import { ASCII_PORTRAIT, ASCII_NAME_BANNER } from '../../data/asciiPortrait';
import { personalInfo } from '../../data/portfolioData';
import { Sparkles, Terminal, Award, BookOpen } from 'lucide-react';

interface BannerProps {
  onRunCommand?: (cmd: string) => void;
}

export const Banner: React.FC<BannerProps> = ({ onRunCommand }) => {
  const [showRealPhoto, setShowRealPhoto] = useState(false);

  const handleCmd = (cmd: string) => {
    if (onRunCommand) onRunCommand(cmd);
  };

  return (
    <div className="space-y-6 animate-fade-in my-2">
      {/* Hero Container */}
      <div className="flex flex-col lg:flex-row gap-6 items-start">
        {/* Left Column: Colored ASCII Portrait / Photo Frame */}
        <div className="flex-shrink-0 mx-auto lg:mx-0">
          <div className="ascii-photo-frame">
            <div className="flex items-center justify-between pb-2 mb-2 border-b border-terminal-border text-xs text-terminal-muted">
              <span className="flex items-center gap-1 font-semibold text-terminal-accent">
                <Sparkles size={13} /> {showRealPhoto ? 'Profile Photograph' : 'Terminal ASCII Art'}
              </span>
              <button
                onClick={() => setShowRealPhoto(!showRealPhoto)}
                className="click-cmd text-[11px] text-terminal-accent"
                title="Toggle portrait mode"
              >
                {showRealPhoto ? 'Show ASCII' : 'Show Photo'}
              </button>
            </div>

            {showRealPhoto ? (
              <div className="w-[280px] h-[340px] overflow-hidden rounded bg-black flex items-center justify-center">
                <img
                  src="./assets/Sagar_cafe.jpg"
                  alt="Sagar Swaraj Mahapatra"
                  className="w-full h-full object-cover rounded"
                  onError={(e) => {
                    // fallback if path differs
                    (e.target as HTMLImageElement).src = '/assets/Sagar_cafe.jpg';
                  }}
                />
              </div>
            ) : (
              <div
                className="ascii-photo-art"
                dangerouslySetInnerHTML={{ __html: ASCII_PORTRAIT }}
              />
            )}

            <div className="pt-2 mt-2 border-t border-terminal-border text-center text-xs text-terminal-muted">
              <span className="text-terminal-accent font-semibold">{personalInfo.name}</span>
              <div className="text-[11px] text-terminal-muted">IIT Bombay • CPI: {personalInfo.cpi}</div>
            </div>
          </div>
        </div>

        {/* Right Column: ASCII Name Banner & Bio */}
        <div className="flex-1 space-y-4">
          <pre className="ascii-banner text-terminal-accent font-mono leading-none select-none">
            {ASCII_NAME_BANNER}
          </pre>

          <div className="bg-terminal-hover p-4 rounded-lg border border-terminal-border space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="text-xl font-bold text-terminal-accent flex items-center gap-2">
                ⚡ {personalInfo.name}
              </h1>
              <span className="px-2 py-0.5 text-xs rounded bg-terminal-border text-terminal-text border border-terminal-accent/30 font-semibold">
                DR 1 in EE1 (CPI: 9.03)
              </span>
              <span className="px-2 py-0.5 text-xs rounded bg-terminal-accent/20 text-terminal-accent border border-terminal-accent/40 font-semibold">
                GATE 99+ %ile (DA & CS)
              </span>
            </div>

            <p className="text-terminal-text text-sm leading-relaxed">
              Welcome to my interactive terminal portfolio! I am a Graduate Student (M.Tech) and Systems/ML Researcher in the{' '}
              <strong className="text-terminal-accent font-semibold">Machine Learning Lab, CSE</strong> at{' '}
              <strong className="text-terminal-accent font-semibold">IIT Bombay</strong>, affiliated with{' '}
              <strong className="text-terminal-accent font-semibold">BharatGen</strong>.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-terminal-muted pt-1">
              <div className="flex items-center gap-1.5">
                <Terminal size={14} className="text-terminal-accent" />
                <span>SysAdmin: Campus Mail & CC (New CSE Bldg)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <BookOpen size={14} className="text-terminal-accent" />
                <span>Focus: LLM Inference Runtimes & C++ SIMD</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Award size={14} className="text-terminal-accent" />
                <span>Codeforces: Expert ({personalInfo.codeforcesRating})</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Sparkles size={14} className="text-terminal-accent" />
                <span>JEST AIR 58 • IISc Interview Calls</span>
              </div>
            </div>

            <div className="pt-3 border-t border-terminal-border/60">
              <div className="text-xs text-terminal-muted mb-2">
                Type <span className="text-terminal-success font-mono font-bold">help</span> or click any command below:
              </div>
              <div className="flex flex-wrap gap-2 text-xs">
                {['about', 'projects', 'experience', 'research', 'skills', 'education', 'achievements', 'photo', 'neofetch', 'contact'].map(cmd => (
                  <button
                    key={cmd}
                    onClick={() => handleCmd(cmd)}
                    className="click-cmd text-terminal-accent hover:border-terminal-accent"
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
