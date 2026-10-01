import React from 'react';
import { useApp } from '../../context/AppContext';
import { BookOpen, Plus, Trash2 } from 'lucide-react';

export const ReadingListQueue: React.FC = () => {
  const { books, updateBookProgress, deleteBook, setIsBookModalOpen } = useApp();

  return (
    <section className="col-span-1 md:col-span-5 bg-[#131313] border border-white/10 rounded-xl p-6 flex flex-col justify-between">
      <div>
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="font-headline text-lg font-semibold text-primary flex items-center gap-2">
              Active Queue
            </h3>
            <p className="text-xs text-on-surface-variant/60 font-mono">
              Literature & Cognitive Intake
            </p>
          </div>
          <BookOpen className="w-5 h-5 text-on-surface-variant" />
        </div>

        {/* Book Items List */}
        <div className="flex flex-col gap-5">
          {books.map((book) => {
            const percent = Math.round((book.currentPage / book.totalPages) * 100);

            return (
              <div key={book.id} className="flex gap-4 group relative">
                {/* Book Cover Thumbnail */}
                <div className="w-16 h-24 bg-surface-variant rounded flex-shrink-0 overflow-hidden border border-white/10 shadow-lg relative">
                  <img
                    src={book.coverUrl}
                    alt={book.title}
                    className="w-full h-full object-cover grayscale opacity-75 group-hover:opacity-100 transition-opacity"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
                </div>

                {/* Book Details */}
                <div className="flex flex-col justify-between py-0.5 flex-1 min-w-0">
                  <div>
                    <div className="flex items-start justify-between gap-1">
                      <h4 className="font-headline text-sm font-semibold text-primary leading-tight line-clamp-2">
                        {book.title}
                      </h4>
                      <button
                        onClick={() => deleteBook(book.id)}
                        className="opacity-0 group-hover:opacity-100 text-white/40 hover:text-red-400 p-0.5 transition-opacity flex-shrink-0"
                        title="Remove book"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <p className="font-mono text-xs text-on-surface-variant mt-1 truncate">
                      {book.author}
                    </p>
                  </div>

                  {/* Progress info & interactive slider */}
                  <div className="w-full mt-2">
                    <div className="flex justify-between font-mono text-[11px] text-on-surface-variant mb-1">
                      <span className="text-primary font-medium">{percent}%</span>
                      <span>
                        {book.currentPage} / {book.totalPages}p
                      </span>
                    </div>

                    {/* Progress Bar with quick increment buttons */}
                    <div className="flex items-center gap-2">
                      <div className="h-1.5 flex-1 bg-white/10 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-white rounded-full transition-all duration-300 shadow-[0_0_8px_rgba(255,255,255,0.6)]"
                          style={{ width: `${percent}%` }}
                        />
                      </div>
                      <button
                        onClick={() => updateBookProgress(book.id, Math.min(book.totalPages, book.currentPage + 10))}
                        className="text-[10px] font-mono px-1.5 py-0.5 bg-white/5 hover:bg-white/20 text-white/70 hover:text-white rounded border border-white/10"
                        title="Read +10 pages"
                      >
                        +10p
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Add Book Button */}
      <button
        onClick={() => setIsBookModalOpen(true)}
        className="mt-6 w-full py-3 border border-white/10 rounded-lg text-xs font-mono tracking-wider text-on-surface-variant hover:text-primary hover:border-white/30 hover:bg-white/5 transition-all flex items-center justify-center gap-2 active:scale-98 uppercase"
      >
        <Plus className="w-4 h-4" />
        Add Literature
      </button>
    </section>
  );
};
