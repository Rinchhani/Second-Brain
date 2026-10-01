import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Modal } from '../ui/Modal';
import { Plus } from 'lucide-react';

export const AddHabitModal: React.FC = () => {
  const { isHabitModalOpen, setIsHabitModalOpen, addHabit } = useApp();
  const [title, setTitle] = useState('');
  const [targetInfo, setTargetInfo] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    addHabit(title.trim(), targetInfo.trim() || 'Daily Protocol');
    setTitle('');
    setTargetInfo('');
    setIsHabitModalOpen(false);
  };

  return (
    <Modal
      isOpen={isHabitModalOpen}
      onClose={() => setIsHabitModalOpen(false)}
      title="Add Daily Protocol"
      subtitle="Register an operational routine for cognitive tracking"
    >
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div>
          <label className="block text-xs font-mono uppercase tracking-wider text-white/60 mb-1.5">
            Protocol Name
          </label>
          <input
            type="text"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. Morning Cold Shower (3m)"
            className="w-full bg-black/60 border border-white/10 rounded px-3 py-2 text-sm text-primary placeholder:text-white/30 focus:outline-none focus:border-white/40 focus:ring-1 focus:ring-white/30 font-headline"
          />
        </div>

        <div>
          <label className="block text-xs font-mono uppercase tracking-wider text-white/60 mb-1.5">
            Target / Parameters
          </label>
          <input
            type="text"
            value={targetInfo}
            onChange={(e) => setTargetInfo(e.target.value)}
            placeholder="e.g. Focus block before 10 AM / Heart rate > 120"
            className="w-full bg-black/60 border border-white/10 rounded px-3 py-2 text-sm text-primary placeholder:text-white/30 focus:outline-none focus:border-white/40 focus:ring-1 focus:ring-white/30 font-body"
          />
        </div>

        <div className="flex justify-end gap-2.5 pt-3 border-t border-white/10 mt-2">
          <button
            type="button"
            onClick={() => setIsHabitModalOpen(false)}
            className="px-4 py-2 text-xs font-mono text-white/60 hover:text-white transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-5 py-2 bg-primary text-black font-semibold text-xs font-mono rounded hover:bg-white/90 active:scale-95 transition-all flex items-center gap-1.5"
          >
            <Plus className="w-3.5 h-3.5" />
            Initialize Protocol
          </button>
        </div>
      </form>
    </Modal>
  );
};
