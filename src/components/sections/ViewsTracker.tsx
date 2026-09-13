import React, { useState } from 'react';
import { Eye, Activity, Globe, RefreshCw, Server } from 'lucide-react';

export const ViewsTracker: React.FC = () => {
  const [timestamp, setTimestamp] = useState(Date.now());
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimestamp(Date.now());
    setTimeout(() => setIsRefreshing(false), 600);
  };

  return (
    <div className="p-3.5 sm:p-4 rounded bg-terminal-hover border border-terminal-border/80 space-y-3 max-w-md font-mono text-xs sm:text-sm animate-fade-in my-1 shadow-md">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-terminal-border/60 pb-2">
        <div className="flex items-center gap-2 text-terminal-accent font-bold">
          <Eye size={16} className="text-terminal-accent" />
          <span>VISITOR ANALYTICS & GLOBAL HITS</span>
        </div>
        <button
          onClick={handleRefresh}
          className="flex items-center gap-1 text-[11px] px-2 py-0.5 rounded border border-terminal-border hover:bg-terminal text-terminal-muted hover:text-terminal-text transition-colors cursor-pointer"
          title="Refresh counter"
        >
          <RefreshCw size={11} className={isRefreshing ? 'animate-spin' : ''} />
          <span>Refresh</span>
        </button>
      </div>

      {/* Main Counter Badge Display */}
      <div className="space-y-2">
        <div className="text-terminal-muted text-xs">
          Global hits recorded across all visitors and sessions:
        </div>
        <div className="py-1">
          <img
            key={timestamp}
            src={`https://hits.sh/thesagarmahapatra.github.io.svg?view=today-total&style=for-the-badge&label=GLOBAL%20HITS&color=61afef&labelColor=1e1e24&_t=${timestamp}`}
            alt="Global Hits Counter"
            className="rounded shadow border border-terminal-border/40 inline-block max-w-full"
          />
        </div>
        <div className="text-[11px] text-terminal-muted flex items-center gap-1.5">
          <Activity size={12} className="text-terminal-success flex-shrink-0" />
          <span>Format: <strong className="text-terminal-text">Today&apos;s Views / All-Time Total</strong></span>
        </div>
      </div>

      {/* Cloud & Tracking Details */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] text-terminal-muted pt-2 border-t border-terminal-border/40">
        <div className="flex items-center gap-1.5">
          <Globe size={12} className="text-terminal-accent flex-shrink-0" />
          <span className="truncate">Host: thesagarmahapatra.github.io</span>
        </div>
        <div className="flex items-center gap-1.5">
          <Server size={12} className="text-terminal-accent flex-shrink-0" />
          <span>Storage: Remote (hits.sh)</span>
        </div>
      </div>
    </div>
  );
};
