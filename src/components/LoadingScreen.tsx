import React, { useState, useEffect } from 'react';

export const LoadingScreen: React.FC = () => {
  const [stage, setStage] = useState(0);
  const [progress, setProgress] = useState(0);
  const [bootText, setBootText] = useState<string[]>([]);

  const bootSequence = [
    'Initializing IIT Bombay kernel environment...',
    'Loading Machine Learning Lab & BharatGen modules...',
    'Mounting high-performance compute nodes & filesystems...',
    'Verifying Postfix & Redis telemetry subsystems...',
    'Compiling ARM64 SIMD & speculative decoding cache...',
    'Terminal ready!'
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        const next = prev + 25;
        return Math.min(next, 100);
      });
    }, 180);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const textInterval = setInterval(() => {
      if (stage < bootSequence.length) {
        setBootText(prev => [...prev, bootSequence[stage]]);
        setStage(prev => prev + 1);
      }
    }, 160);

    return () => clearInterval(textInterval);
  }, [stage]);

  return (
    <div className="min-h-screen bg-terminal text-terminal-text flex items-center justify-center p-4">
      <div className="text-center w-full max-w-xl">
        {/* Boot Sequence */}
        <div className="mb-6 text-left bg-terminal-hover p-5 rounded-lg border border-terminal-border">
          <div className="text-terminal-accent mb-3 font-bold font-mono text-sm">
            sagar:~$ boot --verbose --session=visitor
          </div>
          <div className="space-y-1 text-xs font-mono">
            {bootText.map((text, index) => (
              <div key={index} className="flex items-center space-x-2">
                <span className="text-terminal-success font-bold">✓</span>
                <span className="text-terminal-text">{text}</span>
                {index === bootText.length - 1 && (
                  <span className="animate-pulse text-terminal-accent font-bold">_</span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-4">
          <div className="flex items-center justify-between mb-1 text-xs font-mono">
            <span className="text-terminal-muted">System Boot Sequence</span>
            <span className="text-terminal-accent font-bold">{Math.round(progress)}%</span>
          </div>
          <div className="w-full bg-terminal-border rounded-full h-2 overflow-hidden">
            <div 
              className="h-full bg-terminal-accent transition-all duration-200 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* System Info */}
        <div className="text-xs text-terminal-muted space-y-0.5 font-mono">
          <div className="text-terminal-accent font-semibold">Sagar Swaraj Mahapatra | IIT Bombay</div>
          <div>Machine Learning Lab, CSE & Computer Centre</div>
        </div>
      </div>
    </div>
  );
};
