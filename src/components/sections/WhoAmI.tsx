import React from 'react';
import { personalInfo } from '../../data/portfolioData';
import { User, Award, BookOpen, Terminal, MapPin, Mail, ExternalLink, Cpu } from 'lucide-react';

interface WhoAmIProps {
  onRunCommand?: (cmd: string) => void;
}

export const WhoAmI: React.FC<WhoAmIProps> = ({ onRunCommand }) => {
  return (
    <div className="space-y-6 animate-fade-in my-2">
      <div className="bg-terminal-hover p-5 rounded-lg border border-terminal-border space-y-4">
        {/* Header Title */}
        <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-terminal-border">
          <div className="flex items-center gap-2">
            <User className="text-terminal-accent" size={20} />
            <h2 className="text-lg font-bold text-terminal-accent">{personalInfo.name}</h2>
          </div>
          <span className="px-2.5 py-1 text-xs rounded bg-terminal-accent/15 text-terminal-accent border border-terminal-accent/30 font-semibold">
            IIT Bombay • Systems & ML Researcher
          </span>
        </div>

        {/* Lead Bio */}
        <div className="text-sm text-terminal-text space-y-3 leading-relaxed">
          <p>
            I am a Graduate Student (M.Tech) and Systems/ML Researcher in the{' '}
            <strong className="text-terminal-accent font-semibold">Machine Learning Lab, Dept. of Computer Science & Engineering (CSE)</strong> at{' '}
            <strong className="text-terminal-accent font-semibold">IIT Bombay</strong>, affiliated with{' '}
            <strong className="text-terminal-accent font-semibold">BharatGen</strong> (National Mission on AI, MeitY).
          </p>

          <p>
            <strong>Research & Systems Infrastructure:</strong> My core focus lies at the intersection of high-performance deep learning systems and enterprise-grade computing infrastructure. In the <strong>Machine Learning Lab</strong>, I work on high-throughput LLM inference acceleration — specializing in speculative decoding, multi-token prediction (MTP), and KV-cache compression. Concurrently, as a System Administrator at the <strong>Computer Centre (CC)</strong> in the New CSE Building, I architect and maintain mission-critical infrastructure, including Enterprise Campus Servers (HPC/Mail) safeguarding 20,000+ accounts, sub-millisecond Redis rate-limiting/telemetry daemons, and compute nodes.
          </p>

          <p>
            <strong>Academic Background & Honors:</strong> On the academic side, I hold <strong>Department Rank 1 (DR 1)</strong> in Communication Systems and Machine Learning with a{' '}
            <strong>CPI of 9.03 / 10.0</strong> at IIT Bombay. Nationally, I qualified in the <strong>99+ percentile in GATE</strong> in both Data Science & AI (DA) and Computer Science & IT (CS), and secured <strong>AIR 58 in JEST</strong> (Computer Science) with interview calls from IISc Bangalore (CSA & CDS).
          </p>
        </div>

        {/* Quick Details Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
          <div className="p-3 rounded bg-terminal/60 border border-terminal-border/80 space-y-1.5 text-xs">
            <div className="flex items-center gap-1.5 text-terminal-accent font-semibold">
              <Cpu size={14} /> Core Research Focus
            </div>
            <p className="text-terminal-muted leading-relaxed">
              • High-Performance LLM Inference Runtimes (C++17, ARM NEON SIMD)<br />
              • Speculative Decoding & Multi-Token Prediction (MTP) with BharatGen<br />
              • Structural RoPE Modifications via Semantic Grouping (Zoho collaboration)
            </p>
          </div>

          <div className="p-3 rounded bg-terminal/60 border border-terminal-border/80 space-y-1.5 text-xs">
            <div className="flex items-center gap-1.5 text-terminal-accent font-semibold">
              <Terminal size={14} /> Enterprise Campus Servers (HPC/Mail)
            </div>
            <p className="text-terminal-muted leading-relaxed">
              • Enterprise Campus Servers (HPC/Mail) safeguarding 20,000+ accounts<br />
              • Sub-millisecond Redis Rate-Limiting & telemetry streaming daemons<br />
              • ClamAV, SpamAssassin, SLURM cluster node configuration
            </p>
          </div>
        </div>

        {/* Footer Meta & Quick Action Links */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-terminal-border/80 text-xs text-terminal-muted">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <MapPin size={13} className="text-terminal-accent" /> New CSE Building, IIT Bombay
            </span>
            <a
              href={`mailto:${personalInfo.email}`}
              className="flex items-center gap-1 text-terminal-accent hover:underline"
            >
              <Mail size={13} /> {personalInfo.email}
            </a>
          </div>

          <div className="flex items-center gap-2">
            {onRunCommand && (
              <>
                <button
                  onClick={() => onRunCommand('projects')}
                  className="click-cmd text-terminal-accent"
                >
                  view projects →
                </button>
                <button
                  onClick={() => onRunCommand('experience')}
                  className="click-cmd text-terminal-accent"
                >
                  view experience →
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};