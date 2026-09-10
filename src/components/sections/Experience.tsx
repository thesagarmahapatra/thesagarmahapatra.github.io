import React from 'react';
import { experience, ExperienceItem } from '../../data/portfolioData';
import { Briefcase, Calendar, MapPin, CheckCircle2 } from 'lucide-react';

export const Experience: React.FC = () => {
  return (
    <div className="space-y-4 animate-fade-in my-2">
      <div className="flex items-center gap-2 pb-2 border-b border-terminal-border">
        <Briefcase className="text-terminal-accent" size={18} />
        <h2 className="text-base font-bold text-terminal-accent">PROFESSIONAL EXPERIENCE & ASSISTANTSHIPS</h2>
      </div>

      <div className="space-y-4">
        {experience.map((item: ExperienceItem) => (
          <div
            key={item.id}
            className="bg-terminal-hover p-4 rounded-lg border border-terminal-border space-y-3 transition-colors hover:border-terminal-accent/50"
          >
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 pb-2 border-b border-terminal-border/60">
              <div>
                <h3 className="text-terminal-accent font-bold text-sm sm:text-base">
                  {item.role}
                </h3>
                <div className="text-xs text-terminal-text font-semibold">
                  {item.organization}
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3 text-xs text-terminal-muted">
                <span className="flex items-center gap-1">
                  <Calendar size={12} /> {item.period}
                </span>
                <span className="flex items-center gap-1">
                  <MapPin size={12} /> {item.location}
                </span>
              </div>
            </div>

            {/* Bullets */}
            <ul className="text-xs sm:text-sm text-terminal-text space-y-1.5 pl-4 list-disc marker:text-terminal-accent">
              {item.points.map((pt, i) => (
                <li key={i} className="leading-relaxed">{pt}</li>
              ))}
            </ul>

            {/* Technologies */}
            <div className="flex flex-wrap gap-1.5 pt-1">
              {item.technologies.map(tech => (
                <span
                  key={tech}
                  className="px-2 py-0.5 text-[11px] rounded bg-terminal border border-terminal-border text-terminal-muted font-mono"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
