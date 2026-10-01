import React from 'react';
import { useApp } from '../../context/AppContext';
import { Lightbulb, CheckSquare, BookOpen, GitFork } from 'lucide-react';

export const QuickProtocols: React.FC = () => {
  const { 
    setIsIdeaModalOpen, 
    setIsHabitModalOpen, 
    setIsBookModalOpen, 
    setActiveTab 
  } = useApp();

  const protocols = [
    {
      id: 'idea',
      label: 'New Idea',
      description: 'Capture cognitive note',
      icon: Lightbulb,
      onClick: () => setIsIdeaModalOpen(true)
    },
    {
      id: 'habit',
      label: 'Log Habit',
      description: 'Check daily protocol',
      icon: CheckSquare,
      onClick: () => setIsHabitModalOpen(true)
    },
    {
      id: 'reading',
      label: 'Add Reading',
      description: 'Queue literature item',
      icon: BookOpen,
      onClick: () => setIsBookModalOpen(true)
    },
    {
      id: 'decisions',
      label: 'Decisions',
      description: 'Neural matrix vector',
      icon: GitFork,
      onClick: () => setActiveTab('engine')
    },
  ];

  return (
    <section className="col-span-1 md:col-span-12 glass-card rounded-xl p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="font-headline text-sm font-semibold text-on-surface-variant uppercase tracking-widest">
            Quick Protocols
          </h2>
          <p className="text-xs text-on-surface-variant/60 font-mono mt-0.5">Rapid cognitive intake commands</p>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {protocols.map((p) => {
          const Icon = p.icon;
          return (
            <button
              key={p.id}
              onClick={p.onClick}
              className="bg-surface-container/60 hover:bg-surface-bright border border-white/5 hover:border-white/20 transition-all rounded-lg p-5 flex flex-col items-center justify-center gap-2.5 active:scale-95 duration-150 group text-center"
            >
              <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:scale-110 group-hover:border-white/30 transition-all">
                <Icon className="w-5 h-5 text-primary" />
              </div>
              <span className="font-headline text-sm font-semibold text-primary tracking-tight">
                {p.label}
              </span>
              <span className="font-mono text-[11px] text-on-surface-variant/70">
                {p.description}
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
};
