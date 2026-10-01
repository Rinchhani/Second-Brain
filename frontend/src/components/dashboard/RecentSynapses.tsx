import React from 'react';
import { useApp } from '../../context/AppContext';
import { FileText, ArrowUpRight } from 'lucide-react';

export const RecentSynapses: React.FC = () => {
  const { recentSynapses, setActiveTab } = useApp();

  return (
    <section className="col-span-1 md:col-span-12 glass-card rounded-xl p-6">
      <div className="flex justify-between items-center mb-6 border-b border-white/5 pb-4">
        <div>
          <h2 className="font-headline text-sm font-semibold text-on-surface-variant uppercase tracking-widest">
            Recent Synapses
          </h2>
          <p className="text-xs text-on-surface-variant/60 font-mono mt-0.5">Live cognitive stream</p>
        </div>
        <button 
          onClick={() => setActiveTab('vault')}
          className="font-mono text-xs text-primary hover:underline flex items-center gap-1 group"
        >
          <span>View Vault</span>
          <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </button>
      </div>

      <div className="flex flex-col gap-0 divide-y divide-white/5">
        {recentSynapses.map((synapse) => (
          <div
            key={synapse.id}
            onClick={() => setActiveTab('vault')}
            className="flex items-center justify-between py-3.5 group hover:bg-white/5 px-4 -mx-4 rounded-md transition-colors cursor-pointer"
          >
            <div className="flex items-center gap-3.5">
              <div className="w-8 h-8 rounded bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0 group-hover:border-white/30 transition-colors">
                <FileText className="w-4 h-4 text-on-surface-variant group-hover:text-primary transition-colors" />
              </div>
              <div className="flex flex-col">
                <span className="font-headline text-sm text-primary group-hover:translate-x-0.5 transition-transform">
                  {synapse.title}
                </span>
                {synapse.category && (
                  <span className="text-[10px] font-mono text-white/40 uppercase tracking-wider">
                    {synapse.category}
                  </span>
                )}
              </div>
            </div>
            <span className="font-mono text-xs text-on-surface-variant flex-shrink-0">
              {synapse.timeLabel}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
};
