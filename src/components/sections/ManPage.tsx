import React from 'react';
import { Project } from '../../data/portfolioData';
import { ExternalLink, Terminal } from 'lucide-react';

interface ManPageProps {
  project: Project;
}

export const ManPage: React.FC<ManPageProps> = ({ project }) => {
  const dateStr = 'September 2026';

  return (
    <div className="bg-terminal-hover p-5 rounded-lg border border-terminal-border font-mono text-xs sm:text-sm space-y-4 animate-fade-in my-2">
      {/* Header */}
      <div className="flex justify-between items-center text-terminal-muted border-b border-terminal-border pb-2">
        <span>{project.id.toUpperCase()}(1)</span>
        <span>Sagar Swaraj Mahapatra Manual</span>
        <span>{project.id.toUpperCase()}(1)</span>
      </div>

      {/* NAME */}
      <div className="space-y-1">
        <div className="text-terminal-accent font-bold">NAME</div>
        <div className="pl-4 text-terminal-text">
          {project.id} - {project.name}
        </div>
      </div>

      {/* SYNOPSIS */}
      <div className="space-y-1">
        <div className="text-terminal-accent font-bold">SYNOPSIS</div>
        <div className="pl-4 text-terminal-text">
          <span className="text-terminal-success">{project.id}</span> [--options] [target-architecture]
        </div>
      </div>

      {/* DESCRIPTION */}
      <div className="space-y-1">
        <div className="text-terminal-accent font-bold">DESCRIPTION</div>
        <div className="pl-4 text-terminal-text leading-relaxed whitespace-pre-line">
          {project.details}
        </div>
      </div>

      {/* KEY HIGHLIGHTS */}
      <div className="space-y-1">
        <div className="text-terminal-accent font-bold">KEY FEATURES & ENGINEERING</div>
        <div className="pl-4 space-y-1 text-terminal-text">
          {project.highlights.map((h, i) => (
            <div key={i} className="flex items-start gap-2">
              <span className="text-terminal-accent">•</span>
              <span>{h}</span>
            </div>
          ))}
        </div>
      </div>

      {/* TECHNOLOGIES */}
      <div className="space-y-1">
        <div className="text-terminal-accent font-bold">STACK & DEPENDENCIES</div>
        <div className="pl-4 flex flex-wrap gap-2 pt-1">
          {project.technologies.map(tech => (
            <span
              key={tech}
              className="px-2 py-0.5 text-xs rounded bg-terminal border border-terminal-border text-terminal-accent"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      {/* REPOSITORY & LINKS */}
      {project.github && (
        <div className="space-y-1">
          <div className="text-terminal-accent font-bold">SOURCE CODE & REPOSITORY</div>
          <div className="pl-4">
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-terminal-accent hover:underline inline-flex items-center gap-1.5"
            >
              <ExternalLink size={13} /> {project.github}
            </a>
          </div>
        </div>
      )}

      {/* FOOTER */}
      <div className="flex justify-between items-center text-terminal-muted border-t border-terminal-border pt-2 text-xs">
        <span>IIT Bombay Systems/ML</span>
        <span>{dateStr}</span>
        <span>{project.id.toUpperCase()}(1)</span>
      </div>
    </div>
  );
};