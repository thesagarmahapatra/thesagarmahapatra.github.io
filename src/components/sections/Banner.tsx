import React from 'react';
import { ASCII_PORTRAIT } from '../../data/asciiPortrait';
import { personalInfo } from '../../data/portfolioData';
import { Terminal, Award, BookOpen, MapPin, Building2, Cpu } from 'lucide-react';

interface BannerProps {
  onRunCommand?: (cmd: string) => void;
}

export const Banner: React.FC<BannerProps> = ({ onRunCommand }) => {
  const handleCmd = (cmd: string) => {
    if (onRunCommand) onRunCommand(cmd);
  };

  return (
    <div className="space-y-3 animate-fade-in my-1 font-mono">
      <div className="flex flex-col md:flex-row gap-4 items-start">
        {/* Left Column: Compact Colored ASCII Portrait */}
        <div className="flex-shrink-0 mx-auto md:mx-0">
          <div className="ascii-photo-frame">
            <div
              className="ascii-photo-art select-text"
              dangerouslySetInnerHTML={{ __html: ASCII_PORTRAIT }}
            />
            <div className="pt-1.5 mt-1 border-t border-terminal-border text-center text-[11px] text-terminal-muted leading-tight">
              <strong className="text-terminal-accent">{personalInfo.name}</strong>
              <div className="text-[10px] text-terminal-muted">IIT Bombay • Powai, Mumbai</div>
            </div>
          </div>
        </div>

        {/* Right Column: Work, College, Research Focus, Codeforces, Location */}
        <div className="flex-1 space-y-2.5">
          <div className="bg-terminal-hover p-3.5 rounded border border-terminal-border space-y-2.5">
            {/* Header with Title & Context Badges */}
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="text-base sm:text-lg font-bold text-terminal-accent flex items-center gap-1.5">
                ⚡ {personalInfo.name}
              </h1>
              <span className="px-2 py-0.5 text-[11px] rounded bg-terminal-border text-terminal-text border border-terminal-border font-semibold">
                IIT Bombay
              </span>
              <span className="px-2 py-0.5 text-[11px] rounded bg-terminal-accent/15 text-terminal-accent border border-terminal-accent/30 font-semibold">
                EE
              </span>
              <span className="px-2 py-0.5 text-[11px] rounded bg-terminal-accent/15 text-terminal-accent border border-terminal-accent/30 font-semibold">
                CSE
              </span>
              <span className="px-2 py-0.5 text-[11px] rounded bg-terminal-accent/15 text-terminal-accent border border-terminal-accent/30 font-semibold">
                AI
              </span>
              <span className="px-2 py-0.5 text-[11px] rounded bg-terminal-accent/15 text-terminal-accent border border-terminal-accent/30 font-semibold">
                BharatGen
              </span>
            </div>

            {/* Profile Bio */}
            <p className="text-terminal-text text-xs sm:text-sm leading-relaxed">
              Graduate Student (M.Tech) & Systems/ML Researcher in the{' '}
              <strong className="text-terminal-accent font-semibold">Machine Learning Lab, Dept. of Computer Science & Engineering</strong> at{' '}
              <strong className="text-terminal-accent font-semibold">IIT Bombay</strong>, affiliated with{' '}
              <strong className="text-terminal-accent font-semibold">BharatGen</strong> (MeitY). Focused on LLM inference acceleration, speculative decoding (EAGLE/MTP), and Enterprise Campus Servers (HPC/Mail).
            </p>

            {/* Core Work, College, Research, Codeforces, Location details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-terminal-muted pt-0.5">
              <div className="flex items-center gap-1.5">
                <Terminal size={13} className="text-terminal-accent flex-shrink-0" />
                <span>Work: AI Engineer Intern (BharatGen) • SysAdmin (Computer Centre)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Building2 size={13} className="text-terminal-accent flex-shrink-0" />
                <span>Department: Electrical Engineering</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Cpu size={13} className="text-terminal-accent flex-shrink-0" />
                <span>Research: High-Performance LLM Runtimes & C++ SIMD</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Award size={13} className="text-terminal-accent flex-shrink-0" />
                <span>Codeforces: {personalInfo.codeforcesRating}</span>
              </div>
              <div className="flex items-center gap-1.5 sm:col-span-2">
                <MapPin size={13} className="text-terminal-accent flex-shrink-0" />
                <span>Location: New CSE Building, IIT Bombay, Powai, Mumbai 400076</span>
              </div>
            </div>

            {/* Interactive Commands Bar */}
            <div className="pt-2 border-t border-terminal-border/60">
              <div className="text-[11px] text-terminal-muted mb-1.5">
                Type <span className="text-terminal-success font-bold">help</span> or click any command to execute:
              </div>
              <div className="flex flex-wrap gap-1.5 text-xs">
                {['about', 'projects', 'experience', 'research', 'sudo', 'vi', 'skills', 'education', 'achievements', 'photo', 'neofetch', 'contact'].map(cmd => (
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
