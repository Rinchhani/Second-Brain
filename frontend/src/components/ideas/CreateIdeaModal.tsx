import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Modal } from '../ui/Modal';
import { Plus } from 'lucide-react';

export const CreateIdeaModal: React.FC = () => {
  const { isIdeaModalOpen, setIsIdeaModalOpen, addIdea } = useApp();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState<'PERSONAL' | 'WORK' | 'RESEARCH'>('RESEARCH');
  const [tagsInput, setTagsInput] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) return;

    const tags = tagsInput
      .split(/[\s,]+/)
      .map(t => t.replace(/^#/, '').toUpperCase().trim())
      .filter(Boolean);

    addIdea({
      title: title.trim(),
      description: description.trim(),
      category,
      tags: tags.length > 0 ? tags : [category]
    });

    // Reset and close
    setTitle('');
    setDescription('');
    setTagsInput('');
    setIsIdeaModalOpen(false);
  };

  return (
    <Modal
      isOpen={isIdeaModalOpen}
      onClose={() => setIsIdeaModalOpen(false)}
      title="Capture Idea Synapse"
      subtitle="Commit raw thought into Obsidian Ideas Vault"
    >
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div>
          <label className="block text-xs font-mono uppercase tracking-wider text-white/60 mb-1.5">
            Idea Title
          </label>
          <input
            type="text"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. Cognitive Load Minimization in UI"
            className="w-full bg-black/60 border border-white/10 rounded px-3 py-2 text-sm text-primary placeholder:text-white/30 focus:outline-none focus:border-white/40 focus:ring-1 focus:ring-white/30 font-headline"
          />
        </div>

        <div>
          <label className="block text-xs font-mono uppercase tracking-wider text-white/60 mb-1.5">
            Category Scope
          </label>
          <div className="grid grid-cols-3 gap-2">
            {(['RESEARCH', 'WORK', 'PERSONAL'] as const).map((cat) => (
              <button
                type="button"
                key={cat}
                onClick={() => setCategory(cat)}
                className={`py-2 px-3 text-xs font-mono rounded border transition-all ${
                  category === cat
                    ? 'bg-white text-black font-bold border-white'
                    : 'bg-white/5 border-white/10 text-white/60 hover:border-white/20'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-xs font-mono uppercase tracking-wider text-white/60 mb-1.5">
            Cognitive Body / Description
          </label>
          <textarea
            required
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Detailed hypothesis, references, architectural implications..."
            className="w-full bg-black/60 border border-white/10 rounded px-3 py-2 text-sm text-primary placeholder:text-white/30 focus:outline-none focus:border-white/40 focus:ring-1 focus:ring-white/30 font-body resize-none"
          />
        </div>

        <div>
          <label className="block text-xs font-mono uppercase tracking-wider text-white/60 mb-1.5">
            Tags (Space or comma separated)
          </label>
          <input
            type="text"
            value={tagsInput}
            onChange={(e) => setTagsInput(e.target.value)}
            placeholder="AI, DESIGN, ARCHITECTURE, SYSTEMS"
            className="w-full bg-black/60 border border-white/10 rounded px-3 py-2 text-xs font-mono text-primary placeholder:text-white/30 focus:outline-none focus:border-white/40 font-mono uppercase"
          />
        </div>

        <div className="flex justify-end gap-2.5 pt-3 border-t border-white/10 mt-2">
          <button
            type="button"
            onClick={() => setIsIdeaModalOpen(false)}
            className="px-4 py-2 text-xs font-mono text-white/60 hover:text-white transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-5 py-2 bg-primary text-black font-semibold text-xs font-mono rounded hover:bg-white/90 active:scale-95 transition-all flex items-center gap-1.5"
          >
            <Plus className="w-3.5 h-3.5" />
            Commit to Vault
          </button>
        </div>
      </form>
    </Modal>
  );
};
