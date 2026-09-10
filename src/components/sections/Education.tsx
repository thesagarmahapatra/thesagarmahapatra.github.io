import React from 'react';
import { education, EducationItem } from '../../data/portfolioData';
import { GraduationCap, Calendar, Award } from 'lucide-react';

export const Education: React.FC = () => {
  return (
    <div className="space-y-4 animate-fade-in my-2">
      <div className="flex items-center gap-2 pb-2 border-b border-terminal-border">
        <GraduationCap className="text-terminal-accent" size={18} />
        <h2 className="text-base font-bold text-terminal-accent">ACADEMIC BACKGROUND & DEGREES</h2>
      </div>

      <div className="space-y-4">
        {education.map((item: EducationItem, idx) => (
          <div
            key={idx}
            className="bg-terminal-hover p-4 rounded-lg border border-terminal-border space-y-3"
          >
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 pb-2 border-b border-terminal-border/60">
              <div>
                <h3 className="text-terminal-accent font-bold text-sm sm:text-base">
                  {item.institution}
                </h3>
                <div className="text-xs text-terminal-text font-semibold">
                  {item.degree} • {item.specialization}
                </div>
              </div>

              <div className="text-xs text-terminal-muted flex items-center gap-1">
                <Calendar size={12} /> {item.period}
              </div>
            </div>

            <div className="text-xs font-semibold text-terminal-success">
              {item.standing}
            </div>

            <div className="text-xs text-terminal-muted">
              <strong>Department:</strong> {item.department}
            </div>

            <ul className="text-xs sm:text-sm text-terminal-text space-y-1 pl-4 list-disc marker:text-terminal-accent">
              {item.details.map((detail, i) => (
                <li key={i} className="leading-relaxed">{detail}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};
