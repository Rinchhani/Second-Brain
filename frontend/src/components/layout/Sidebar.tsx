import React from 'react';
import { useApp } from '../../context/AppContext';
import { PageTab } from '../../types';
import { 
  LayoutDashboard, 
  Archive, 
  CheckSquare, 
  Cpu, 
  Settings, 
  User,
  Sparkles
} from 'lucide-react';

interface NavItem {
  id: PageTab;
  label: string;
  icon: React.ElementType;
}

export const Sidebar: React.FC = () => {
  const { activeTab, setActiveTab } = useApp();

  const navItems: NavItem[] = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'vault', label: 'Ideas Vault', icon: Archive },
    { id: 'habits', label: 'Focus & Habits', icon: CheckSquare },
    { id: 'engine', label: 'Thinking Engine', icon: Cpu },
  ];

  return (
    <aside className="hidden md:flex flex-col h-screen w-64 fixed left-0 top-0 border-r border-white/10 bg-[#111111] z-40">
      {/* Operator Header Profile */}
      <div className="flex items-center gap-3.5 p-6 border-b border-white/5">
        <div className="w-10 h-10 rounded-full bg-surface-container overflow-hidden border border-white/20 flex items-center justify-center relative">
          <User className="w-5 h-5 text-primary" />
        </div>
        <div className="flex flex-col overflow-hidden">
          <div className="flex items-center gap-1.5">
            <h2 className="font-headline font-semibold text-primary text-[15px] tracking-tight">
              Intelligence
            </h2>
            <Sparkles className="w-3 h-3 text-white/70" />
          </div>
          <p className="font-mono text-[11px] text-on-surface-variant">Tier 01 Operator</p>
          <div className="text-[10px] uppercase tracking-widest text-primary/60 mt-1 flex items-center gap-1.5 font-mono">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span>
            <span>Sync Active</span>
          </div>
        </div>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 py-6 px-3 flex flex-col gap-1.5">
        <div className="px-3 pb-2 text-[10px] uppercase font-mono tracking-wider text-white/40">
          Navigation
        </div>
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;

          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex items-center gap-3.5 py-3 px-3.5 text-sm rounded-md transition-all text-left group ${
                isActive
                  ? 'border-l-2 border-primary bg-white/10 text-primary font-semibold'
                  : 'text-on-surface-variant hover:text-primary hover:bg-white/5'
              }`}
            >
              <Icon className={`w-4 h-4 transition-transform group-hover:scale-110 ${
                isActive ? 'text-primary' : 'text-on-surface-variant group-hover:text-primary'
              }`} />
              <span className="font-headline tracking-wide">{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Footer System Info / Settings */}
      <div className="p-4 border-t border-white/5 flex flex-col gap-2">
        <div className="px-3 py-2 bg-black/40 border border-white/5 rounded text-xs font-mono text-white/50 flex justify-between items-center">
          <span>STATUS</span>
          <span className="text-white font-medium">OPTIMAL 94%</span>
        </div>
        <button 
          onClick={() => setActiveTab('engine')}
          className="flex items-center gap-3 py-2 px-3 text-xs text-on-surface-variant hover:text-primary transition-colors rounded hover:bg-white/5"
        >
          <Settings className="w-4 h-4" />
          <span className="font-mono">Engine Config</span>
        </button>
      </div>
    </aside>
  );
};
