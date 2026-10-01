import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { GitFork, PlusCircle, MinusCircle, Check, X, Plus, Trash2 } from 'lucide-react';

export const DecisionMatrix: React.FC = () => {
  const { decisionVectors, addDecisionVector, deleteDecisionVector } = useApp();
  const [positiveInput, setPositiveInput] = useState('');
  const [isAddingPos, setIsAddingPos] = useState(false);
  const [negativeInput, setNegativeInput] = useState('');
  const [isAddingNeg, setIsAddingNeg] = useState(false);

  const positiveVectors = decisionVectors.filter(v => v.type === 'positive');
  const negativeVectors = decisionVectors.filter(v => v.type === 'negative');

  const handleAddPositive = (e: React.FormEvent) => {
    e.preventDefault();
    if (!positiveInput.trim()) return;
    addDecisionVector('positive', positiveInput.trim());
    setPositiveInput('');
    setIsAddingPos(false);
  };

  const handleAddNegative = (e: React.FormEvent) => {
    e.preventDefault();
    if (!negativeInput.trim()) return;
    addDecisionVector('negative', negativeInput.trim());
    setNegativeInput('');
    setIsAddingNeg(false);
  };

  return (
    <section className="w-full max-w-5xl mt-12 flex flex-col gap-6">
      {/* Header */}
      <div className="flex items-center gap-3 border-b border-white/10 pb-4">
        <GitFork className="w-5 h-5 text-primary" />
        <div>
          <h2 className="font-headline text-xl md:text-2xl font-bold text-primary">
            Decision Matrix
          </h2>
          <p className="text-xs text-on-surface-variant font-mono">
            Bipolar Vector Evaluation Framework
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-gutter">
        {/* Pros / Positive Vectors Column */}
        <div className="bg-[#111111] border border-white/10 rounded-lg p-6 flex flex-col justify-between">
          <div>
            <h3 className="font-headline text-xs font-semibold text-primary uppercase tracking-wider flex items-center gap-2 mb-4 pb-3 border-b border-white/5">
              <PlusCircle className="w-4 h-4 text-primary" />
              <span>Positive Vectors</span>
            </h3>

            <ul className="space-y-3 divide-y divide-white/5">
              {positiveVectors.map((v) => (
                <li key={v.id} className="flex items-start justify-between gap-3 text-xs md:text-sm text-on-surface-variant pt-3 first:pt-0 group">
                  <div className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                    <span>{v.text}</span>
                  </div>
                  <button
                    onClick={() => deleteDecisionVector(v.id)}
                    className="opacity-0 group-hover:opacity-100 text-white/30 hover:text-red-400 p-0.5 transition-opacity"
                    title="Remove vector"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Add Vector Action */}
          <div className="mt-6 pt-3 border-t border-white/5">
            {isAddingPos ? (
              <form onSubmit={handleAddPositive} className="flex flex-col gap-2">
                <input
                  type="text"
                  autoFocus
                  value={positiveInput}
                  onChange={(e) => setPositiveInput(e.target.value)}
                  placeholder="Enter positive vector..."
                  className="w-full bg-black/60 border border-white/20 rounded px-3 py-1.5 text-xs text-primary focus:outline-none focus:border-white/50"
                />
                <div className="flex gap-2 justify-end">
                  <button
                    type="button"
                    onClick={() => setIsAddingPos(false)}
                    className="text-[11px] font-mono text-white/50 hover:text-white px-2 py-1"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="text-[11px] font-mono bg-white text-black font-semibold px-3 py-1 rounded hover:bg-white/90"
                  >
                    Add
                  </button>
                </div>
              </form>
            ) : (
              <button
                onClick={() => setIsAddingPos(true)}
                className="font-mono text-xs text-on-surface-variant hover:text-primary transition-colors flex items-center gap-1.5 active:scale-95"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Positive Vector</span>
              </button>
            )}
          </div>
        </div>

        {/* Cons / Negative Vectors Column */}
        <div className="bg-[#111111] border border-white/10 rounded-lg p-6 flex flex-col justify-between">
          <div>
            <h3 className="font-headline text-xs font-semibold text-primary uppercase tracking-wider flex items-center gap-2 mb-4 pb-3 border-b border-white/5">
              <MinusCircle className="w-4 h-4 text-red-400" />
              <span>Negative Vectors</span>
            </h3>

            <ul className="space-y-3 divide-y divide-white/5">
              {negativeVectors.map((v) => (
                <li key={v.id} className="flex items-start justify-between gap-3 text-xs md:text-sm text-on-surface-variant pt-3 first:pt-0 group">
                  <div className="flex items-start gap-2.5">
                    <X className="w-4 h-4 text-red-400/80 mt-0.5 flex-shrink-0" />
                    <span>{v.text}</span>
                  </div>
                  <button
                    onClick={() => deleteDecisionVector(v.id)}
                    className="opacity-0 group-hover:opacity-100 text-white/30 hover:text-red-400 p-0.5 transition-opacity"
                    title="Remove vector"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Add Vector Action */}
          <div className="mt-6 pt-3 border-t border-white/5">
            {isAddingNeg ? (
              <form onSubmit={handleAddNegative} className="flex flex-col gap-2">
                <input
                  type="text"
                  autoFocus
                  value={negativeInput}
                  onChange={(e) => setNegativeInput(e.target.value)}
                  placeholder="Enter negative risk/vector..."
                  className="w-full bg-black/60 border border-white/20 rounded px-3 py-1.5 text-xs text-primary focus:outline-none focus:border-white/50"
                />
                <div className="flex gap-2 justify-end">
                  <button
                    type="button"
                    onClick={() => setIsAddingNeg(false)}
                    className="text-[11px] font-mono text-white/50 hover:text-white px-2 py-1"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="text-[11px] font-mono bg-white text-black font-semibold px-3 py-1 rounded hover:bg-white/90"
                  >
                    Add
                  </button>
                </div>
              </form>
            ) : (
              <button
                onClick={() => setIsAddingNeg(true)}
                className="font-mono text-xs text-on-surface-variant hover:text-primary transition-colors flex items-center gap-1.5 active:scale-95"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Negative Vector</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
