import React from 'react';
import { skillCategories, SkillCategory } from '../../data/portfolioData';
import { Cpu } from 'lucide-react';

export const Skills: React.FC = () => {
  return (
    <div className="space-y-3 animate-fade-in my-2 font-mono">
      <div className="flex items-center gap-2 pb-2 border-b border-terminal-border">
        <Cpu className="text-terminal-accent" size={16} />
        <h2 className="text-xs sm:text-sm font-bold text-terminal-accent uppercase tracking-wider">
          Technical Skills & Toolchain
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {skillCategories.map((cat: SkillCategory, idx) => (
          <div
            key={idx}
            className="bg-terminal-hover p-3 rounded-lg border border-terminal-border space-y-2.5 flex flex-col"
          >
            <h3 className="text-terminal-accent font-bold text-xs flex items-center gap-1.5 uppercase tracking-wide border-b border-terminal-border/60 pb-1.5">
              {cat.category}
            </h3>

            <div className="flex flex-wrap gap-1.5 flex-1">
              {cat.items.map((item, i) => (
                <span
                  key={i}
                  className="px-2 py-1 rounded text-xs bg-terminal/75 border border-terminal-border text-terminal-text hover:border-terminal-accent/60 transition-colors inline-flex items-center gap-1"
                >
                  {item.icon && <span className="text-[11px]">{item.icon}</span>}
                  <span>{item.name}</span>
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};