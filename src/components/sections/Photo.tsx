import React, { useState } from 'react';
import { ASCII_PORTRAIT } from '../../data/asciiPortrait';
import { personalInfo } from '../../data/portfolioData';
import { Image as ImageIcon, Sparkles } from 'lucide-react';

export const Photo: React.FC = () => {
  const [showPhoto, setShowPhoto] = useState(false);

  return (
    <div className="space-y-3 animate-fade-in my-2">
      <div className="flex items-center justify-between pb-2 border-b border-terminal-border">
        <div className="flex items-center gap-2">
          <Sparkles className="text-terminal-accent" size={18} />
          <h2 className="text-base font-bold text-terminal-accent">
            {showPhoto ? 'PORTRAIT PHOTOGRAPH' : 'TERMINAL ASCII ART PORTRAIT'}
          </h2>
        </div>

        <button
          onClick={() => setShowPhoto(!showPhoto)}
          className="click-cmd text-xs text-terminal-accent flex items-center gap-1"
        >
          <ImageIcon size={13} /> {showPhoto ? 'Switch to ASCII Art' : 'Switch to High-Res Photo'}
        </button>
      </div>

      <div className="flex justify-center p-4 bg-terminal-hover rounded-lg border border-terminal-border">
        <div className="ascii-photo-frame">
          <div className="flex items-center justify-between pb-2 mb-2 border-b border-terminal-border text-xs text-terminal-muted">
            <span className="text-terminal-accent font-semibold">
              {showPhoto ? '📷 Photograph View' : '🎨 Colored ANSI/HTML ASCII Rendering'}
            </span>
            <span className="text-terminal-muted">IIT Bombay</span>
          </div>

          {showPhoto ? (
            <div className="max-w-[380px] max-h-[460px] overflow-hidden rounded bg-black flex items-center justify-center">
              <img
                src="./assets/Sagar_cafe.jpg"
                alt={personalInfo.name}
                className="w-full h-auto object-cover rounded"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = '/assets/Sagar_cafe.jpg';
                }}
              />
            </div>
          ) : (
            <div
              className="ascii-photo-art"
              dangerouslySetInnerHTML={{ __html: ASCII_PORTRAIT }}
            />
          )}

          <div className="pt-2 mt-2 border-t border-terminal-border text-center text-xs text-terminal-muted">
            <strong className="text-terminal-accent">{personalInfo.name}</strong> — {personalInfo.title}
          </div>
        </div>
      </div>
    </div>
  );
};
