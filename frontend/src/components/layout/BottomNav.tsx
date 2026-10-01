import React from 'react';
import { useApp } from '../../context/AppContext';
import { PageTab } from '../../types';
import { LayoutDashboard, Archive, CheckSquare, Cpu } from 'lucide-react';

export const BottomNav: React.FC = () => {
  const { activeTab, setActiveTab } = useApp();

  const navTabs: { id: PageTab; label: string; icon: React.ElementType }[] = [
    { id: 'dashboard', label: 'Dash', icon: LayoutDashboard },
    { id: 'vault', label: 'Vault', icon: Archive },
    { id: 'habits', label: 'Focus', icon: CheckSquare },
    { id: 'engine', label: 'Engine', icon: Cpu },
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 w-full flex justify-around items-center h-18 px-4 pb-safe bg-[#0e0e0e]/95 border-t border-white/10 backdrop-blur-2xl z-50">
      {navTabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = activeTab === tab.id;

        return (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex flex-col items-center justify-center py-2 px-3 transition-all relative ${
              isActive
                ? 'text-primary scale-105'
                : 'text-on-surface-variant/50 hover:text-on-surface-variant'
            }`}
          >
            <Icon className="w-5 h-5 mb-1" />
            <span className="font-mono text-[10px] tracking-wider uppercase font-semibold">
              {tab.label}
            </span>
            {isActive && (
              <span className="absolute bottom-1 w-1.5 h-1.5 bg-white rounded-full shadow-[0_0_6px_rgba(255,255,255,0.8)]" />
            )}
          </button>
        );
      })}
    </nav>
  );
};
