import React, { useState } from 'react';
import { projects, Project } from '../../data/portfolioData';
import { FolderGit2, ExternalLink, BookOpen, Terminal } from 'lucide-react';

interface ProjectsProps {
  onRunCommand?: (cmd: string) => void;
}

export const Projects: React.FC<ProjectsProps> = ({ onRunCommand }) => {
  const [filter, setFilter] = useState<'all' | 'systems' | 'ai' | 'infrastructure' | 'crypto'>('all');

  const filteredProjects = filter === 'all' 
    ? projects 
    : projects.filter(p => p.category === filter);

  return (
    <div className="space-y-4 animate-fade-in my-2">
      <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-terminal-border">
        <div className="flex items-center gap-2">
          <FolderGit2 className="text-terminal-accent" size={18} />
          <h2 className="text-base font-bold text-terminal-accent">FEATURED ENGINEERING & RESEARCH PROJECTS</h2>
        </div>
        <div className="flex flex-wrap gap-1.5 text-xs">
          {(['all', 'systems', 'ai', 'infrastructure', 'crypto'] as const).map(cat => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-2.5 py-0.5 rounded text-xs transition-all ${
                filter === cat
                  ? 'bg-terminal-accent/25 text-terminal-accent border border-terminal-accent font-bold ring-1 ring-terminal-accent shadow-sm'
                  : 'bg-terminal-hover text-terminal-muted border border-terminal-border hover:text-terminal-accent hover:border-terminal-accent/50'
              }`}
            >
              {cat.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {filteredProjects.map((project: Project) => (
          <div
            key={project.id}
            className="bg-terminal-hover p-4 rounded-lg border border-terminal-border space-y-3 transition-all hover:border-terminal-accent/60"
          >
            {/* Title & Badge */}
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <span className="text-terminal-accent font-bold text-sm sm:text-base">
                  {project.name}
                </span>
                {project.badge && (
                  <span className="px-2 py-0.5 text-[11px] rounded bg-terminal-border text-terminal-text border border-terminal-border/80 font-mono">
                    {project.badge}
                  </span>
                )}
              </div>

              <div className="flex items-center gap-2 text-xs">
                {onRunCommand && (
                  <button
                    onClick={() => onRunCommand(`man ${project.id}`)}
                    className="click-cmd text-terminal-accent flex items-center gap-1"
                    title={`View manual for ${project.name}`}
                  >
                    <BookOpen size={12} /> man {project.id}
                  </button>
                )}
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="click-cmd text-terminal-accent flex items-center gap-1 hover:underline"
                  >
                    <ExternalLink size={12} /> GitHub ↗
                  </a>
                )}
              </div>
            </div>

            {/* Short Description */}
            <p className="text-xs sm:text-sm text-terminal-text leading-relaxed">
              {project.shortDesc}
            </p>

            {/* Key highlights bullet points */}
            <ul className="text-xs text-terminal-muted space-y-1 pl-4 list-disc marker:text-terminal-accent">
              {project.highlights.map((h, i) => (
                <li key={i}>{h}</li>
              ))}
            </ul>

            {/* Technologies list */}
            <div className="flex flex-wrap gap-1.5 pt-1">
              {project.technologies.map(tech => (
                <span
                  key={tech}
                  className="px-2 py-0.5 text-[11px] rounded bg-terminal/70 border border-terminal-border text-terminal-text font-mono"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="p-3 bg-terminal/40 border border-terminal-border rounded text-xs text-terminal-muted flex items-center justify-between">
        <span>Tip: Type <span className="text-terminal-accent font-mono font-bold">man [project-name]</span> (e.g. <span className="text-terminal-success font-mono">man vectorffn</span>) for technical deep-dives.</span>
        <a
          href="https://github.com/thesagarmahapatra?tab=repositories"
          target="_blank"
          rel="noopener noreferrer"
          className="text-terminal-accent hover:underline flex items-center gap-1"
        >
          View 30+ repositories on GitHub ↗
        </a>
      </div>
    </div>
  );
};
