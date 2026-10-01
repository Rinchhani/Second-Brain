import React from 'react';
import { useApp } from '../../context/AppContext';
import { Check, Plus, Trash2 } from 'lucide-react';

export const DailyProtocolTracker: React.FC = () => {
  const { habits, toggleHabitDay, toggleHabitToday, deleteHabit, setIsHabitModalOpen } = useApp();

  const daysOfWeek = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];

  return (
    <section className="col-span-1 md:col-span-7 bg-[#131313] border border-white/10 rounded-xl p-6 flex flex-col justify-between">
      <div>
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="font-headline text-lg font-semibold text-primary">
              Daily Protocol
            </h3>
            <p className="text-xs text-on-surface-variant/60 font-mono">
              7-Day Execution Matrix
            </p>
          </div>

          <div className="flex gap-1.5 text-xs text-on-surface-variant font-mono">
            {daysOfWeek.map((d, i) => (
              <span 
                key={i} 
                className={`w-6 text-center font-bold ${i >= 5 ? 'text-primary/40' : 'text-primary/80'}`}
              >
                {d}
              </span>
            ))}
          </div>
        </div>

        {/* Habits Rows */}
        <div className="flex flex-col border-y border-white/5 divide-y divide-white/5">
          {habits.map((habit) => (
            <div
              key={habit.id}
              className="flex items-center justify-between py-3.5 group hover:bg-white/[0.02] px-2 -mx-2 transition-colors rounded"
            >
              {/* Left Action & Title */}
              <div className="flex items-center gap-3.5 flex-1 min-w-0 pr-2">
                <button
                  onClick={() => toggleHabitToday(habit.id)}
                  className={`w-5 h-5 rounded-sm border flex items-center justify-center transition-all active:scale-95 flex-shrink-0 ${
                    habit.completedToday
                      ? 'bg-white border-white text-black'
                      : 'border-white/30 hover:border-white text-transparent'
                  }`}
                  title={habit.completedToday ? 'Completed today' : 'Mark complete for today'}
                >
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                </button>

                <div className="flex flex-col min-w-0">
                  <span
                    className={`font-headline text-sm truncate transition-all ${
                      habit.completedToday
                        ? 'text-on-surface-variant line-through opacity-70'
                        : 'text-primary font-medium'
                    }`}
                  >
                    {habit.title}
                  </span>
                  {habit.targetInfo && (
                    <span className="text-[10px] font-mono text-white/40 truncate">
                      {habit.targetInfo}
                    </span>
                  )}
                </div>
              </div>

              {/* Right Day Matrix & Delete */}
              <div className="flex items-center gap-3 flex-shrink-0">
                <div className="flex gap-1.5">
                  {habit.history.map((isDone, dayIdx) => (
                    <button
                      key={dayIdx}
                      onClick={() => toggleHabitDay(habit.id, dayIdx)}
                      title={`Toggle Day ${daysOfWeek[dayIdx]}`}
                      className={`w-6 h-6 rounded flex items-center justify-center transition-all active:scale-90 ${
                        isDone
                          ? 'bg-white text-black shadow-[0_0_8px_rgba(255,255,255,0.4)]'
                          : 'border border-white/10 bg-transparent hover:border-white/30'
                      }`}
                    >
                      {isDone && <div className="w-1.5 h-1.5 rounded-full bg-black" />}
                    </button>
                  ))}
                </div>

                <button
                  onClick={() => deleteHabit(habit.id)}
                  className="opacity-0 group-hover:opacity-100 text-white/40 hover:text-red-400 p-1 transition-opacity"
                  title="Delete protocol"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Add Protocol Button */}
      <button
        onClick={() => setIsHabitModalOpen(true)}
        className="mt-6 w-full py-3 border border-white/10 rounded-lg text-xs font-mono tracking-wider text-on-surface-variant hover:text-primary hover:border-white/30 hover:bg-white/5 transition-all flex items-center justify-center gap-2 active:scale-98 uppercase"
      >
        <Plus className="w-4 h-4" />
        Add Protocol
      </button>
    </section>
  );
};
