import React from 'react';
import { useApp } from '../context/AppContext';
import { IdeaSearch } from '../components/ideas/IdeaSearch';
import { IdeaFilters } from '../components/ideas/IdeaFilters';
import { IdeaCard } from '../components/ideas/IdeaCard';
import { Plus, Archive } from 'lucide-react';

export const IdeasVaultPage: React.FC = () => {
  const { ideas, searchQuery, selectedCategory, setIsIdeaModalOpen } = useApp();

  // Filter ideas based on search query and category
  const filteredIdeas = ideas.filter((idea) => {
    const matchesCategory = selectedCategory === 'ALL' || idea.category === selectedCategory;
    const matchesSearch = 
      idea.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      idea.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      idea.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesCategory && matchesSearch;
  });

  return (
    <div className="flex flex-col gap-8 w-full animate-in fade-in duration-200">
      {/* Header & Search Bar */}
      <section className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-white/10 pb-6">
        <div className="flex flex-col gap-1 w-full md:w-auto">
          <div className="flex items-center gap-2 mb-1">
            <Archive className="w-4 h-4 text-primary" />
            <span className="text-[11px] font-mono uppercase tracking-widest text-white/50">
              Cognitive Repository
            </span>
          </div>
          <h1 className="font-display text-2xl md:text-4xl font-bold text-primary tracking-tight">
            Ideas Vault
          </h1>
          <p className="font-body text-xs md:text-sm text-on-surface-variant">
            Cognitive capture and retrieval system.
          </p>
        </div>

        <IdeaSearch />
      </section>

      {/* Category Filters */}
      <div className="flex justify-between items-center flex-wrap gap-4">
        <IdeaFilters />
        <span className="font-mono text-xs text-white/40">
          Showing {filteredIdeas.length} of {ideas.length} Entries
        </span>
      </div>

      {/* Ideas Grid */}
      {filteredIdeas.length > 0 ? (
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter">
          {filteredIdeas.map((idea) => (
            <IdeaCard key={idea.id} idea={idea} />
          ))}
        </section>
      ) : (
        <div className="w-full py-20 flex flex-col items-center justify-center text-center border border-dashed border-white/10 rounded-xl bg-[#111111]/40">
          <Archive className="w-10 h-10 text-white/30 mb-3" />
          <h3 className="font-headline text-base font-semibold text-primary">No Synapses Found</h3>
          <p className="font-body text-xs text-on-surface-variant max-w-sm mt-1 mb-4">
            No entries match your search criteria or category filter. Capture a new thought below.
          </p>
          <button
            onClick={() => setIsIdeaModalOpen(true)}
            className="px-4 py-2 bg-primary text-black font-semibold text-xs font-mono rounded hover:bg-white/90 transition-all flex items-center gap-1.5"
          >
            <Plus className="w-3.5 h-3.5" />
            Capture New Idea
          </button>
        </div>
      )}

      {/* Floating Action Button (FAB) */}
      <button
        onClick={() => setIsIdeaModalOpen(true)}
        className="fixed bottom-24 md:bottom-10 right-6 md:right-10 w-14 h-14 bg-primary text-black rounded-full flex items-center justify-center hover:scale-105 active:scale-95 transition-all shadow-[0_0_25px_rgba(255,255,255,0.35)] z-40 group"
        title="Capture Idea"
      >
        <Plus className="w-6 h-6 stroke-[2.5] group-hover:rotate-90 transition-transform duration-200" />
      </button>
    </div>
  );
};
