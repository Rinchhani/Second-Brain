import React from 'react';
import { useApp } from '../../context/AppContext';
import { Sparkles, Bookmark } from 'lucide-react';

export const InsightCard: React.FC = () => {
  const { currentInsight, toggleBookmarkInsight } = useApp();

  return (
    <section className="w-full max-w-2xl glass-card rounded-xl p-8 flex flex-col gap-6 relative overflow-hidden group hover:border-white/30 transition-all">
      {/* Left Active Glow Line */}
      <div className="absolute top-0 left-0 w-1 h-full bg-primary opacity-0 group-hover:opacity-100 transition-opacity" />

      {/* Header */}
      <div className="flex justify-between items-start">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-on-surface-variant" />
          <span className="font-mono text-xs text-on-surface-variant uppercase tracking-widest">
            Vault Insight #{currentInsight.vaultNumber}
          </span>
        </div>

        <button
          onClick={toggleBookmarkInsight}
          className="text-on-surface-variant hover:text-primary transition-colors p-1 rounded hover:bg-white/5"
          title="Bookmark Insight"
        >
          <Bookmark className={`w-4 h-4 ${currentInsight.bookmarked ? 'fill-white text-white' : ''}`} />
        </button>
      </div>

      {/* Quote Body */}
      <p className="font-headline text-lg md:text-xl text-primary font-medium leading-relaxed tracking-tight">
        "{currentInsight.quote}"
      </p>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 pt-2">
        {currentInsight.tags.map((tag) => (
          <span
            key={tag}
            className="px-3 py-1 bg-surface-container-high rounded text-on-surface text-xs font-mono border border-white/5"
          >
            {tag}
          </span>
        ))}
      </div>
    </section>
  );
};
