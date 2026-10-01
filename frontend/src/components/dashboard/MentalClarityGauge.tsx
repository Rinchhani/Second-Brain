import React, { useState } from 'react';
import { Activity, RefreshCw } from 'lucide-react';

export const MentalClarityGauge: React.FC = () => {
  const [score, setScore] = useState(94);
  const [isCalibrating, setIsCalibrating] = useState(false);

  // SVG Gauge calculations
  // Circumference = 2 * PI * 45 = 282.74
  const radius = 45;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  const handleRecalibrate = () => {
    setIsCalibrating(true);
    setTimeout(() => {
      const delta = (Math.random() * 4 - 2); // ±2%
      const newScore = Math.min(99, Math.max(80, Math.round((score + delta) * 10) / 10));
      setScore(newScore);
      setIsCalibrating(false);
    }, 600);
  };

  return (
    <section className="col-span-1 md:col-span-8 glass-card rounded-xl p-8 flex flex-col items-center justify-center relative overflow-hidden min-h-[320px]">
      {/* Background Dot Matrix Texture */}
      <div 
        className="absolute inset-0 opacity-10 pointer-events-none" 
        style={{
          backgroundImage: 'radial-gradient(circle at center, #ffffff 1px, transparent 1px)',
          backgroundSize: '20px 20px'
        }}
      />

      {/* Card Header */}
      <div className="w-full flex justify-between items-start absolute top-6 left-8 right-8 pr-16">
        <div>
          <h2 className="font-headline text-lg font-medium text-on-surface-variant flex items-center gap-2">
            <Activity className="w-4 h-4 text-primary" />
            Mental Clarity
          </h2>
          <p className="text-xs text-on-surface-variant/60 font-mono mt-0.5">Biometric & focus telemetry</p>
        </div>

        <button
          onClick={handleRecalibrate}
          title="Recalibrate Clarity"
          className="text-on-surface-variant hover:text-primary p-1.5 rounded hover:bg-white/5 transition-all"
        >
          <RefreshCw className={`w-4 h-4 ${isCalibrating ? 'animate-spin text-primary' : ''}`} />
        </button>
      </div>

      {/* Circular Progress Gauge */}
      <div className="relative flex items-center justify-center mt-8">
        <svg className="w-48 h-48 transform -rotate-90" viewBox="0 0 100 100">
          {/* Background Track */}
          <circle
            cx="50"
            cy="50"
            r={radius}
            fill="none"
            stroke="#222222"
            strokeWidth="5"
          />
          {/* Active Glowing Gauge */}
          <circle
            className="transition-all duration-1000 ease-out"
            cx="50"
            cy="50"
            r={radius}
            fill="none"
            stroke="#ffffff"
            strokeWidth="5"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
          />
        </svg>

        {/* Center Readout */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <span className="font-display text-4xl md:text-5xl font-bold text-primary text-glow">
            {score}<span className="text-2xl font-light text-primary/70">%</span>
          </span>
          <span className="font-mono text-[11px] text-primary-fixed-dim uppercase tracking-widest mt-1.5 px-2.5 py-0.5 bg-white/5 rounded border border-white/10">
            {score >= 90 ? 'Optimal' : score >= 75 ? 'Focused' : 'Degraded'}
          </span>
        </div>
      </div>
    </section>
  );
};
