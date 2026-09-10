import React, { useState } from 'react';
import { personalInfo } from '../../data/portfolioData';
import { Mail, Github, Linkedin, Terminal, MapPin, Send, CheckCircle } from 'lucide-react';

export const Contact: React.FC = () => {
  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');

  const handleSendEmail = (e: React.FormEvent) => {
    e.preventDefault();
    const mailtoUrl = `mailto:${personalInfo.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailtoUrl;
  };

  return (
    <div className="space-y-4 animate-fade-in my-2">
      <div className="flex items-center gap-2 pb-2 border-b border-terminal-border">
        <Mail className="text-terminal-accent" size={18} />
        <h2 className="text-base font-bold text-terminal-accent">GET IN TOUCH & CONNECT</h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Contact Links & Affiliation */}
        <div className="bg-terminal-hover p-5 rounded-lg border border-terminal-border space-y-4">
          <h3 className="text-terminal-accent font-bold text-sm">Direct Contact Channels</h3>

          <div className="space-y-3 text-xs sm:text-sm">
            <div className="flex items-center gap-3">
              <Mail className="text-terminal-accent flex-shrink-0" size={16} />
              <div>
                <div className="text-terminal-muted text-[11px]">IIT Bombay Email</div>
                <a href={`mailto:${personalInfo.email}`} className="text-terminal-accent hover:underline font-mono">
                  {personalInfo.email}
                </a>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Github className="text-terminal-accent flex-shrink-0" size={16} />
              <div>
                <div className="text-terminal-muted text-[11px]">GitHub Profile</div>
                <a href={personalInfo.github} target="_blank" rel="noopener noreferrer" className="text-terminal-accent hover:underline font-mono">
                  github.com/{personalInfo.githubUser} ↗
                </a>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Linkedin className="text-terminal-accent flex-shrink-0" size={16} />
              <div>
                <div className="text-terminal-muted text-[11px]">LinkedIn</div>
                <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer" className="text-terminal-accent hover:underline font-mono">
                  linkedin.com/in/sagar-mahapatra ↗
                </a>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Terminal className="text-terminal-accent flex-shrink-0" size={16} />
              <div>
                <div className="text-terminal-muted text-[11px]">Codeforces</div>
                <a href={personalInfo.codeforces} target="_blank" rel="noopener noreferrer" className="text-terminal-accent hover:underline font-mono">
                  codeforces.com/profile/{personalInfo.codeforcesHandle} ↗ (1628 Expert)
                </a>
              </div>
            </div>
          </div>

          <div className="pt-3 border-t border-terminal-border/60 text-xs text-terminal-muted space-y-1">
            <div className="flex items-start gap-2">
              <MapPin size={14} className="text-terminal-accent mt-0.5 flex-shrink-0" />
              <span>
                <strong>Research Lab:</strong> Machine Learning Lab, Dept. of Computer Science & Engineering / Computer Centre, New CSE Building, IIT Bombay, Powai, Mumbai 400076, India
              </span>
            </div>
          </div>
        </div>

        {/* Quick Email Launcher Form */}
        <div className="bg-terminal-hover p-5 rounded-lg border border-terminal-border space-y-3">
          <h3 className="text-terminal-accent font-bold text-sm flex items-center gap-2">
            <Send size={15} /> Compose Quick Email
          </h3>
          <p className="text-xs text-terminal-muted">
            Launches your default email client directly addressed to {personalInfo.email}.
          </p>

          <form onSubmit={handleSendEmail} className="space-y-3 text-xs">
            <div>
              <label className="block text-terminal-muted mb-1 font-mono">Subject:</label>
              <input
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="Collaboration / Research Inquiry / Academic Discussion"
                className="w-full px-3 py-2 rounded bg-terminal border border-terminal-border text-terminal-text focus:border-terminal-accent font-mono text-xs"
                required
              />
            </div>

            <div>
              <label className="block text-terminal-muted mb-1 font-mono">Message:</label>
              <textarea
                value={body}
                onChange={(e) => setBody(e.target.value)}
                rows={4}
                placeholder="Hi Sagar, I would like to connect regarding..."
                className="w-full px-3 py-2 rounded bg-terminal border border-terminal-border text-terminal-text focus:border-terminal-accent font-mono text-xs"
                required
              />
            </div>

            <button
              type="submit"
              className="px-4 py-2 rounded bg-terminal-accent text-terminal-bg font-bold hover:opacity-90 flex items-center gap-1.5 transition-opacity"
            >
              <Send size={13} /> Open Email Client
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};