import React from 'react';
import { skillCategories, SkillCategory } from '../../data/portfolioData';
import { Cpu, Award } from 'lucide-react';

export const Skills: React.FC = () => {
  return (
    <div className="space-y-4 animate-fade-in my-2">
      <div className="flex items-center gap-2 pb-2 border-b border-terminal-border">
        <Cpu className="text-terminal-accent" size={18} />
        <h2 className="text-base font-bold text-terminal-accent">TECHNICAL SKILLS & DOMAIN EXPERTISE</h2>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {skillCategories.map((cat: SkillCategory, idx) => (
          <div
            key={idx}
            className="bg-terminal-hover p-4 rounded-lg border border-terminal-border space-y-3"
          >
            <h3 className="text-terminal-accent font-bold text-sm flex items-center gap-2">
              {cat.category}
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {cat.items.map((item, i) => (
                <div
                  key={i}
                  className="p-2.5 rounded bg-terminal/70 border border-terminal-border space-y-1.5"
                >
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-semibold text-terminal-text flex items-center gap-1.5">
                      {item.icon && <span>{item.icon}</span>}
                      {item.name}
                    </span>
                    <span className="text-terminal-muted font-mono">{item.level}%</span>
                  </div>

                  {/* Progress Bar */}
                  <div className="w-full bg-terminal-border/60 h-1.5 rounded-full overflow-hidden">
                    <div
                      className="bg-terminal-accent h-full rounded-full transition-all duration-500"
                      style={{ width: `${item.level}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};