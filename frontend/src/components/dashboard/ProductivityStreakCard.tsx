import React from 'react';
import { Flame, TrendingUp } from 'lucide-react';

export const ProductivityStreakCard: React.FC = () => {
  return (
    <section className="col-span-1 md:col-span-4 glass-card rounded-xl p-8 flex flex-col justify-between min-h-[320px]">
      <div>
        <div className="flex items-center justify-between">
          <h2 className="font-headline text-lg font-medium text-on-surface-variant flex items-center gap-2">
            <Flame className="w-4 h-4 text-primary" />
            Streak
          </h2>
          <span className="font-mono text-[10px] text-white/50 bg-white/5 px-2 py-0.5 rounded border border-white/10 flex items-center gap-1">
            <TrendingUp className="w-3 h-3 text-primary" /> +2.1% 7D
          </span>
        </div>
        <p className="text-xs text-on-surface-variant/70 mt-1">
          Continuous cognitive engagement & daily protocols.
        </p>
      </div>

      <div className="my-6">
        <div className="flex items-baseline gap-2">
          <span className="font-display text-5xl font-bold text-primary tracking-tight">
            12
          </span>
          <span className="font-headline text-lg text-on-surface-variant font-medium">
            Days
          </span>
        </div>
        <p className="text-[11px] font-mono text-white/50 mt-1">
          Target: 30-Day Cognitive Horizon
        </p>

        {/* Milestone Progress Bar */}
        <div className="w-full bg-surface-container-highest h-1.5 mt-4 rounded-full overflow-hidden border border-white/5">
          <div 
            className="bg-primary h-full rounded-full transition-all duration-700 shadow-[0_0_10px_rgba(255,255,255,0.5)]"
            style={{ width: '60%' }}
          />
        </div>
        <div className="flex justify-between items-center text-[10px] font-mono text-white/40 mt-1.5">
          <span>Day 1</span>
          <span>Day 30</span>
        </div>
      </div>

      <div className="pt-3 border-t border-white/5 flex justify-between items-center text-xs font-mono text-white/60">
        <span>Daily Consistency</span>
        <span className="text-primary font-semibold">100% Active</span>
      </div>
    </section>
  );
};
