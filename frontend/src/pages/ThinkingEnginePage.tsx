import React from 'react';
import { PulseSynthesisOrb } from '../components/engine/PulseSynthesisOrb';
import { InsightCard } from '../components/engine/InsightCard';
import { DecisionMatrix } from '../components/engine/DecisionMatrix';

export const ThinkingEnginePage: React.FC = () => {
  return (
    <div className="w-full flex flex-col items-center pt-6 md:pt-10 pb-16 gap-12 animate-in fade-in duration-200">
      {/* Central Pulsing Synthesis Orb */}
      <PulseSynthesisOrb />

      {/* Insight Output Card */}
      <InsightCard />

      {/* Decision Matrix Section */}
      <DecisionMatrix />
    </div>
  );
};
