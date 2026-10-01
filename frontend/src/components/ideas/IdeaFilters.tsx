import React from 'react';
import { useApp } from '../../context/AppContext';
import { IdeaCategory } from '../../types';

export const IdeaFilters: React.FC = () => {
  const { selectedCategory, setSelectedCategory } = useApp();

  const categories: IdeaCategory[] = ['ALL', 'PERSONAL', 'WORK', 'RESEARCH'];

  return (
    <section className="flex flex-wrap gap-2.5">
      {categories.map((cat) => {
        const isActive = selectedCategory === cat;
        return (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-1.5 font-mono text-xs tracking-wider rounded-[2px] transition-all active:scale-95 duration-150 ${
              isActive
                ? 'bg-primary text-black font-bold shadow-[0_0_12px_rgba(255,255,255,0.3)]'
                : 'bg-[#111111] border border-white/15 text-white/60 hover:border-white/40 hover:text-white'
            }`}
          >
            {cat}
          </button>
        );
      })}
    </section>
  );
};
