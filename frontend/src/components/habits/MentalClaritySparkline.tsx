import React from 'react';
import { Activity, Sparkles } from 'lucide-react';

export const MentalClaritySparkline: React.FC = () => {
  return (
    <section className="col-span-1 md:col-span-12 bg-[#131313] border border-white/10 rounded-xl p-6 relative overflow-hidden group hover:border-white/25 transition-colors">
      <div className="absolute inset-0 bg-gradient-to-b from-white/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

      {/* Header Info */}
      <div className="flex justify-between items-start mb-6 relative z-10">
        <div>
          <div className="flex items-center gap-2">
            <Activity className="w-4 h-4 text-primary" />
            <h3 className="font-mono text-xs text-on-surface-variant uppercase tracking-widest">
              Mental Clarity Score
            </h3>
          </div>
          <div className="flex items-baseline gap-3 mt-2">
            <span className="font-display text-4xl md:text-5xl font-bold text-primary tracking-tight">
              87.4
            </span>
            <span className="font-mono text-xs text-primary/70 bg-white/5 border border-white/10 px-2 py-0.5 rounded">
              +2.1% 7D
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-[10px] font-mono text-white/40 uppercase tracking-widest hidden sm:inline-block">
            Telemetric Log
          </span>
          <div className="w-8 h-8 flex items-center justify-center rounded border border-white/10 bg-white/5 text-on-surface-variant">
            <Sparkles className="w-4 h-4 text-primary" />
          </div>
        </div>
      </div>

      {/* SVG Sparkline Curve */}
      <div className="h-28 w-full relative z-10 flex items-end">
        <svg className="w-full h-full overflow-visible" viewBox="0 0 1000 100" preserveAspectRatio="none">
          <defs>
            <linearGradient id="sparklineGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.18" />
              <stop offset="100%" stopColor="#ffffff" stopOpacity="0.0" />
            </linearGradient>
          </defs>

          {/* Grid lines */}
          <line x1="0" y1="25" x2="1000" y2="25" stroke="rgba(255,255,255,0.06)" strokeDasharray="4 4" />
          <line x1="0" y1="75" x2="1000" y2="75" stroke="rgba(255,255,255,0.06)" strokeDasharray="4 4" />

          {/* Gradient Fill under path */}
          <path
            d="M0,90 Q50,85 100,70 T200,60 T300,80 T400,40 T500,50 T600,20 T700,35 T800,10 T900,25 T1000,5 L1000,100 L0,100 Z"
            fill="url(#sparklineGrad)"
          />

          {/* Sparkline Stroke */}
          <path
            d="M0,90 Q50,85 100,70 T200,60 T300,80 T400,40 T500,50 T600,20 T700,35 T800,10 T900,25 T1000,5"
            fill="none"
            stroke="white"
            strokeWidth="2.5"
            className="drop-shadow-[0_4px_12px_rgba(255,255,255,0.4)]"
          />

          {/* Data Points */}
          <circle cx="800" cy="10" r="3.5" fill="#000000" stroke="white" strokeWidth="2" />
          <circle cx="900" cy="25" r="3.5" fill="#000000" stroke="white" strokeWidth="2" />
          <circle cx="1000" cy="5" r="4.5" fill="white" className="animate-pulse" />
        </svg>
      </div>

      <div className="flex justify-between items-center text-[10px] font-mono text-white/40 pt-2 border-t border-white/5">
        <span>T-Minus 7 Days</span>
        <span>Current Velocity: High Output</span>
        <span>Real-time Sync</span>
      </div>
    </section>
  );
};
