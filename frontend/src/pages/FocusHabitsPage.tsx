import React from 'react';
import { MentalClaritySparkline } from '../components/habits/MentalClaritySparkline';
import { DailyProtocolTracker } from '../components/habits/DailyProtocolTracker';
import { ReadingListQueue } from '../components/habits/ReadingListQueue';
import { CheckSquare } from 'lucide-react';

export const FocusHabitsPage: React.FC = () => {
  return (
    <div className="flex flex-col gap-8 w-full animate-in fade-in duration-200">
      {/* Page Header */}
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <CheckSquare className="w-4 h-4 text-primary" />
            <span className="text-[11px] font-mono uppercase tracking-widest text-white/50">
              Cognitive Habit System
            </span>
          </div>
          <h1 className="font-display text-2xl md:text-4xl font-bold text-primary tracking-tight">
            Focus & Habit Tracker
          </h1>
          <p className="font-body text-xs md:text-sm text-on-surface-variant mt-1">
            Aggregate overview of operational habits, focus velocity, and knowledge intake.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <span className="font-mono text-xs text-on-surface-variant bg-[#131313] border border-white/10 px-3 py-1.5 rounded">
            T-MINUS 12 HRS
          </span>
        </div>
      </header>

      {/* Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter">
        {/* Sparkline trend spanning 12 cols */}
        <MentalClaritySparkline />

        {/* Daily Protocol Checklist 7 cols */}
        <DailyProtocolTracker />

        {/* Reading List Queue 5 cols */}
        <ReadingListQueue />
      </div>
    </div>
  );
};
