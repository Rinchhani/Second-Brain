import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Brain, Sparkles } from 'lucide-react';

export const PulseSynthesisOrb: React.FC = () => {
  const { generateRandomThought } = useApp();
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = () => {
    setIsGenerating(true);
    generateRandomThought();
    setTimeout(() => setIsGenerating(false), 500);
  };

  return (
    <section className="w-full max-w-3xl flex flex-col items-center gap-8 relative text-center">
      {/* Concentric Pulse Rings & Center Orb */}
      <div className="relative w-48 h-48 flex items-center justify-center">
        {/* Outer Ring */}
        <div className={`absolute inset-0 border border-primary/20 rounded-full ${isGenerating ? 'scale-110 opacity-70 transition-all duration-300' : 'pulse-ring'}`} />
        
        {/* Middle Ring */}
        <div 
          className={`absolute inset-4 border border-primary/40 rounded-full ${isGenerating ? 'scale-105 opacity-90 transition-all duration-300' : 'pulse-ring'}`}
          style={{ animationDelay: '0.4s' }}
        />
        
        {/* Center Orb Node */}
        <div className="absolute inset-8 border border-primary/70 rounded-full flex items-center justify-center bg-[#131313] z-10 shadow-[0_0_30px_rgba(255,255,255,0.15)] group cursor-pointer hover:border-white transition-all">
          <Brain className={`w-12 h-12 text-primary transition-transform ${isGenerating ? 'scale-125 text-white animate-pulse' : 'group-hover:scale-105'}`} />
        </div>
      </div>

      {/* Hero Description */}
      <div className="space-y-3 max-w-lg mx-auto">
        <h1 className="font-display text-3xl md:text-5xl font-bold text-primary tracking-tight">
          Thinking Engine
        </h1>
        <p className="font-body text-sm md:text-base text-on-surface-variant leading-relaxed">
          Initiate neural synthesis. Extract random insights from the primary vault to break cognitive loops and stimulate lateral reasoning.
        </p>
      </div>

      {/* Primary Action Button */}
      <button
        onClick={handleGenerate}
        disabled={isGenerating}
        className="bg-primary text-black font-headline font-semibold text-sm px-8 py-3.5 rounded hover:bg-white/90 active:scale-95 transition-all shadow-[0_0_20px_rgba(255,255,255,0.25)] flex items-center gap-2"
      >
        <Sparkles className={`w-4 h-4 ${isGenerating ? 'animate-spin' : ''}`} />
        <span>{isGenerating ? 'Synthesizing...' : 'Generate Thought'}</span>
      </button>
    </section>
  );
};
