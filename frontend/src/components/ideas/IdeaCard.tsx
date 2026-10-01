import React, { useState } from 'react';
import { Idea } from '../../types';
import { useApp } from '../../context/AppContext';
import { Bookmark, Trash2, MoreVertical } from 'lucide-react';

interface IdeaCardProps {
  idea: Idea;
}

export const IdeaCard: React.FC<IdeaCardProps> = ({ idea }) => {
  const { toggleBookmarkIdea, deleteIdea } = useApp();
  const [showMenu, setShowMenu] = useState(false);

  return (
    <article className="card-base p-6 rounded-[4px] flex flex-col justify-between group relative min-h-[240px]">
      <div>
        {/* Header */}
        <div className="flex justify-between items-start gap-2 mb-3">
          <h3 className="font-headline text-base font-semibold text-primary line-clamp-2 leading-snug group-hover:text-white transition-colors">
            {idea.title}
          </h3>

          <div className="relative flex-shrink-0">
            <button
              onClick={() => setShowMenu(!showMenu)}
              className="p-1 rounded text-on-surface-variant hover:text-primary transition-colors"
              title="More options"
            >
              <MoreVertical className="w-4 h-4" />
            </button>

            {/* Context Dropdown Menu */}
            {showMenu && (
              <div 
                className="absolute right-0 top-6 w-36 bg-[#181818] border border-white/15 rounded shadow-2xl py-1 z-20"
                onMouseLeave={() => setShowMenu(false)}
              >
                <button
                  onClick={() => {
                    toggleBookmarkIdea(idea.id);
                    setShowMenu(false);
                  }}
                  className="w-full px-3 py-1.5 text-xs text-left font-mono text-on-surface hover:bg-white/10 flex items-center gap-2"
                >
                  <Bookmark className={`w-3.5 h-3.5 ${idea.bookmarked ? 'fill-white text-white' : ''}`} />
                  <span>{idea.bookmarked ? 'Unpin' : 'Bookmark'}</span>
                </button>
                <button
                  onClick={() => {
                    deleteIdea(idea.id);
                    setShowMenu(false);
                  }}
                  className="w-full px-3 py-1.5 text-xs text-left font-mono text-red-400 hover:bg-red-500/10 flex items-center gap-2"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Delete</span>
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Content */}
        <p className="font-body text-xs md:text-sm text-on-surface-variant line-clamp-3 leading-relaxed">
          {idea.description}
        </p>
      </div>

      {/* Footer Tags & Metadata */}
      <div className="pt-4 mt-4 border-t border-white/5 flex items-center justify-between gap-2">
        <div className="flex flex-wrap gap-1.5">
          {idea.tags.map((tag) => (
            <span
              key={tag}
              className="text-[10px] font-mono tracking-wider text-white/50 bg-white/5 px-2 py-0.5 rounded-[2px] border border-white/5"
            >
              #{tag}
            </span>
          ))}
        </div>

        {idea.bookmarked && (
          <span title="Bookmarked">
            <Bookmark className="w-3.5 h-3.5 fill-white text-white" />
          </span>
        )}
      </div>
    </article>
  );
};
