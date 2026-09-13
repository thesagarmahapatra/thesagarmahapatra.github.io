import React, { useState, useEffect } from 'react';
import { FileText, ExternalLink, X, ChevronDown, ChevronUp } from 'lucide-react';

interface ClassicViewNoticeProps {
  homepageUrl?: string;
}

export const ClassicViewNotice: React.FC<ClassicViewNoticeProps> = ({
  homepageUrl = 'https://homepages.iitb.ac.in/~24m1076/'
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false); // Default to sleek floating pill
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    // Show after initial page load with a smooth slide-in
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 600);
    return () => clearTimeout(timer);
  }, []);

  if (isDismissed) {
    // Even when dismissed, keep a tiny discreet floating pill toggle in corner
    return (
      <aside aria-label="Classic document view toggle" className="fixed top-12 right-3 sm:right-5 z-30 transition-all duration-300">
        <button
          onClick={() => setIsDismissed(false)}
          className="flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-mono rounded-full bg-terminal-header/90 text-terminal-accent border border-terminal-border/80 hover:border-terminal-accent shadow-md backdrop-blur-sm cursor-pointer transition-all hover:scale-105"
          title="Prefer a classic document view? Click to restore"
        >
          <FileText size={12} />
          <span>Classic View</span>
        </button>
      </aside>
    );
  }

  return (
    <aside
      aria-label="Classic document view notice"
      className={`fixed top-12 right-3 sm:right-5 z-30 font-mono transition-all duration-500 ease-out ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'
      }`}
    >
      {isExpanded ? (
        /* Expanded Card View (when toggled open) */
        <div className="max-w-[340px] sm:max-w-[380px] w-[calc(100vw-24px)] bg-terminal-header/95 backdrop-blur-md border border-terminal-accent/50 rounded-lg shadow-2xl p-3 sm:p-3.5 space-y-2.5 animate-fade-in ring-1 ring-terminal-accent/20">
          <div className="flex items-center justify-between border-b border-terminal-border pb-1.5">
            <div className="flex items-center gap-1.5 text-xs font-bold text-terminal-accent">
              <FileText size={14} className="text-terminal-accent animate-pulse" />
              <span>HR / Recruiter Notice</span>
            </div>
            <div className="flex items-center gap-1 text-terminal-muted">
              <button
                onClick={() => setIsExpanded(false)}
                className="p-1 hover:bg-terminal-hover rounded hover:text-terminal-text transition-colors cursor-pointer"
                title="Minimize to pill"
                aria-label="Minimize to pill"
              >
                <ChevronUp size={14} />
              </button>
              <button
                onClick={() => setIsDismissed(true)}
                className="p-1 hover:bg-terminal-hover rounded hover:text-terminal-text transition-colors cursor-pointer"
                title="Dismiss notice"
                aria-label="Dismiss notice"
              >
                <X size={14} />
              </button>
            </div>
          </div>

          <div className="space-y-1.5 text-xs text-terminal-text">
            <div className="font-semibold text-terminal-accent text-[13px]">
              Prefer a classic document view?
            </div>
            <div className="text-terminal-muted text-[11px] leading-relaxed">
              If you prefer a clean, non-terminal academic portfolio & CV, visit Sagar&apos;s IIT Bombay homepage:
            </div>
            <div className="bg-terminal/70 p-1.5 rounded border border-terminal-border/70 text-[11px] break-all text-terminal-accent select-all">
              {homepageUrl}
            </div>
          </div>

          <div className="flex items-center justify-between gap-2 pt-1">
            <a
              href={homepageUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded bg-terminal-accent text-terminal-bg hover:opacity-90 transition-opacity shadow-sm cursor-pointer"
            >
              <span>Visit Academic Site</span>
              <ExternalLink size={12} />
            </a>
            <button
              onClick={() => setIsExpanded(false)}
              className="px-2.5 py-1.5 text-xs font-semibold rounded border border-terminal-border hover:bg-terminal-hover text-terminal-muted hover:text-terminal-text transition-colors cursor-pointer"
            >
              Minimize
            </button>
          </div>
        </div>
      ) : (
        /* The Sleek Floating Pill (Default View) */
        <div className="flex items-center gap-2 bg-terminal-header/95 backdrop-blur-md border border-terminal-accent/60 rounded-full shadow-2xl py-1.5 px-3 sm:px-3.5 text-xs ring-1 ring-terminal-accent/20 animate-fade-in hover:border-terminal-accent transition-all">
          <FileText size={14} className="text-terminal-accent flex-shrink-0" />
          
          <span className="text-terminal-text text-[11px] sm:text-xs font-semibold hidden md:inline">
            Prefer a classic document view?
          </span>
          
          <span className="text-terminal-muted text-[11px] hidden lg:inline">
            Visit:
          </span>

          <a
            href={homepageUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-terminal-accent text-terminal-bg font-bold text-[11px] sm:text-xs hover:opacity-90 transition-all shadow-sm cursor-pointer whitespace-nowrap"
            title={`Visit ${homepageUrl}`}
          >
            <span>Academic Site</span>
            <ExternalLink size={11} />
          </a>

          <div className="h-3.5 w-px bg-terminal-border mx-0.5" />

          {/* Toggle to expand for more info */}
          <button
            onClick={() => setIsExpanded(true)}
            className="p-1 hover:bg-terminal-hover rounded-full text-terminal-muted hover:text-terminal-text transition-colors cursor-pointer"
            title="Expand for details"
            aria-label="Expand for details"
          >
            <ChevronDown size={13} />
          </button>

          {/* Dismiss button */}
          <button
            onClick={() => setIsDismissed(true)}
            className="p-1 hover:bg-terminal-hover rounded-full text-terminal-muted hover:text-terminal-text transition-colors cursor-pointer"
            title="Dismiss pill"
            aria-label="Dismiss pill"
          >
            <X size={13} />
          </button>
        </div>
      )}
    </aside>
  );
};
