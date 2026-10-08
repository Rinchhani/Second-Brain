import React from 'react';
import { useApp } from '../../context/AppContext';
import { Cpu, User } from 'lucide-react';

export const Header: React.FC = () => {
  const { activeTab, setActiveTab } = useApp();

  return (
    <header className="fixed top-0 w-full z-40 bg-[#0e0e0e]/90 border-b border-white/10 backdrop-blur-xl md:hidden">
      <div className="flex justify-between items-center px-4 h-16 w-full max-w-7xl mx-auto">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-surface-container overflow-hidden border border-white/20 flex items-center justify-center">
            <User className="w-4 h-4 text-primary" />
          </div>
          <div className="flex flex-col">
          <span className="font-headline text-lg font-bold tracking-tighter text-primary">
              Obsidian
            </span>
          </div>
        </div>

        <button
          onClick={() => setActiveTab('engine')}
          className={`font-mono text-xs font-semibold px-3 py-1.5 rounded border transition-all active:scale-95 flex items-center gap-1.5 ${
            activeTab === 'engine'
              ? 'bg-white text-black border-white shadow-[0_0_15px_rgba(255,255,255,0.3)]'
              : 'border-white/20 text-primary bg-white/5 hover:bg-white/10'
          }`}
        >
          <Cpu className="w-3.5 h-3.5" />
          <span>ENGINE</span>
        </button>
      </div>
    </header>
  );
};
