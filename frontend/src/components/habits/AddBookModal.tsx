import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Modal } from '../ui/Modal';
import { Plus } from 'lucide-react';

export const AddBookModal: React.FC = () => {
  const { isBookModalOpen, setIsBookModalOpen, addBook } = useApp();
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [totalPages, setTotalPages] = useState<number | string>(300);
  const [coverUrl, setCoverUrl] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !author.trim()) return;

    const fallbackCover = 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=400&q=80';

    addBook({
      title: title.trim(),
      author: author.trim(),
      totalPages: Number(totalPages) || 200,
      currentPage: 0,
      coverUrl: coverUrl.trim() || fallbackCover,
      tags: ['Literature']
    });

    setTitle('');
    setAuthor('');
    setTotalPages(300);
    setCoverUrl('');
    setIsBookModalOpen(false);
  };

  return (
    <Modal
      isOpen={isBookModalOpen}
      onClose={() => setIsBookModalOpen(false)}
      title="Queue Literature"
      subtitle="Add book or long-form research to reading intake list"
    >
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div>
          <label className="block text-xs font-mono uppercase tracking-wider text-white/60 mb-1.5">
            Book / Title
          </label>
          <input
            type="text"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. Antifragile: Things That Gain from Disorder"
            className="w-full bg-black/60 border border-white/10 rounded px-3 py-2 text-sm text-primary placeholder:text-white/30 focus:outline-none focus:border-white/40 focus:ring-1 focus:ring-white/30 font-headline"
          />
        </div>

        <div>
          <label className="block text-xs font-mono uppercase tracking-wider text-white/60 mb-1.5">
            Author
          </label>
          <input
            type="text"
            required
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            placeholder="e.g. Nassim Nicholas Taleb"
            className="w-full bg-black/60 border border-white/10 rounded px-3 py-2 text-sm text-primary placeholder:text-white/30 focus:outline-none focus:border-white/40 focus:ring-1 focus:ring-white/30 font-body"
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-white/60 mb-1.5">
              Total Page Count
            </label>
            <input
              type="number"
              min="1"
              required
              value={totalPages}
              onChange={(e) => setTotalPages(e.target.value)}
              className="w-full bg-black/60 border border-white/10 rounded px-3 py-2 text-sm font-mono text-primary placeholder:text-white/30 focus:outline-none focus:border-white/40"
            />
          </div>

          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-white/60 mb-1.5">
              Cover Image URL (Optional)
            </label>
            <input
              type="url"
              value={coverUrl}
              onChange={(e) => setCoverUrl(e.target.value)}
              placeholder="https://..."
              className="w-full bg-black/60 border border-white/10 rounded px-3 py-2 text-xs font-mono text-primary placeholder:text-white/30 focus:outline-none focus:border-white/40"
            />
          </div>
        </div>

        <div className="flex justify-end gap-2.5 pt-3 border-t border-white/10 mt-2">
          <button
            type="button"
            onClick={() => setIsBookModalOpen(false)}
            className="px-4 py-2 text-xs font-mono text-white/60 hover:text-white transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-5 py-2 bg-primary text-black font-semibold text-xs font-mono rounded hover:bg-white/90 active:scale-95 transition-all flex items-center gap-1.5"
          >
            <Plus className="w-3.5 h-3.5" />
            Queue Book
          </button>
        </div>
      </form>
    </Modal>
  );
};
