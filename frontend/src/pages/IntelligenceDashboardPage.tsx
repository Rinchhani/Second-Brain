import React from 'react';
import { MentalClarityGauge } from '../components/dashboard/MentalClarityGauge';
import { ProductivityStreakCard } from '../components/dashboard/ProductivityStreakCard';
import { QuickProtocols } from '../components/dashboard/QuickProtocols';
import { RecentSynapses } from '../components/dashboard/RecentSynapses';
import { ShieldCheck } from 'lucide-react';

export const IntelligenceDashboardPage: React.FC = () => {
  return (
    <div className="flex flex-col gap-8 w-full animate-in fade-in duration-200">
      {/* Top Page Header */}
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
            <span className="text-[11px] font-mono uppercase tracking-widest text-white/50">
              Live Neural Telemetry
            </span>
          </div>
          <h1 className="font-display text-2xl md:text-4xl font-bold text-primary tracking-tight">
            Intelligence Dashboard
          </h1>
          <p className="font-body text-xs md:text-sm text-on-surface-variant mt-1">
            Aggregate overview of operational focus, biometric clarity, and knowledge intake.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 bg-[#111111] border border-white/10 px-3 py-1.5 rounded text-xs font-mono text-on-surface-variant">
            <ShieldCheck className="w-3.5 h-3.5 text-primary" />
            <span>OPERATOR TIER 01</span>
          </div>
        </div>
      </header>

      {/* Bento Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter">
        <MentalClarityGauge />
        <ProductivityStreakCard />
        <QuickProtocols />
        <RecentSynapses />
      </div>
    </div>
  );
};
