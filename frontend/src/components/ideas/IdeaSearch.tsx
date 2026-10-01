import React from 'react';
import { useApp } from '../../context/AppContext';
import { Search, X } from 'lucide-react';

export const IdeaSearch: React.FC = () => {
  const { searchQuery, setSearchQuery } = useApp();

  return (
    <div className="w-full md:w-[380px] relative">
      <Search className="w-4 h-4 text-on-surface-variant/70 absolute left-3.5 top-1/2 -translate-y-1/2" />
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Search parameters or tags..."
        className="w-full bg-[#111111] border border-white/10 text-primary font-body text-xs md:text-sm py-2.5 pl-10 pr-9 rounded focus:outline-none focus:border-white/40 focus:ring-1 focus:ring-white/30 transition-all placeholder:text-on-surface-variant/40"
      />
      {searchQuery && (
        <button
          onClick={() => setSearchQuery('')}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      )}
    </div>
  );
};
