import React from 'react';
import { achievements, AchievementItem } from '../../data/portfolioData';
import { Trophy, ExternalLink } from 'lucide-react';

export const Achievements: React.FC = () => {
  return (
    <div className="space-y-4 animate-fade-in my-2">
      <div className="flex items-center gap-2 pb-2 border-b border-terminal-border">
        <Trophy className="text-terminal-accent" size={18} />
        <h2 className="text-base font-bold text-terminal-accent">HONORS, AWARDS & ACADEMIC ACHIEVEMENTS</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {achievements.map((item: AchievementItem, idx) => (
          <div
            key={idx}
            className="bg-terminal-hover p-4 rounded-lg border border-terminal-border space-y-2 hover:border-terminal-accent/50 transition-colors"
          >
            <div className="flex items-start justify-between gap-2">
              <span className="font-bold text-sm text-terminal-accent">
                {item.title}
              </span>
              <span className="px-2 py-0.5 text-[11px] rounded bg-terminal-border text-terminal-text font-semibold font-mono">
                {item.badge}
              </span>
            </div>

            <p className="text-xs sm:text-sm text-terminal-text leading-relaxed">
              {item.description}
            </p>

            {item.link && (
              <div className="pt-1">
                <a
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-terminal-accent hover:underline inline-flex items-center gap-1 font-mono"
                >
                  <ExternalLink size={12} /> {item.linkText || 'View Profile ↗'}
                </a>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
