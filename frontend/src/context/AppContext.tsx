import React, { createContext, useContext, useState, useEffect } from 'react';
import { PageTab, Idea, Habit, Book, ThoughtInsight, DecisionVector, RecentSynapse, IdeaCategory } from '../types';
import { 
  INITIAL_IDEAS, 
  INITIAL_HABITS, 
  INITIAL_BOOKS, 
  THOUGHT_INSIGHTS_POOL, 
  INITIAL_DECISION_VECTORS, 
  INITIAL_RECENT_SYNAPSES 
} from '../data/initialData';

interface AppContextType {
  activeTab: PageTab;
  setActiveTab: (tab: PageTab) => void;
  
  // Ideas state
  ideas: Idea[];
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedCategory: IdeaCategory;
  setSelectedCategory: (cat: IdeaCategory) => void;
  addIdea: (idea: Omit<Idea, 'id' | 'createdAt'>) => void;
  deleteIdea: (id: string) => void;
  toggleBookmarkIdea: (id: string) => void;

  // Habits state
  habits: Habit[];
  toggleHabitDay: (habitId: string, dayIndex: number) => void;
  toggleHabitToday: (habitId: string) => void;
  addHabit: (title: string, targetInfo: string) => void;
  deleteHabit: (id: string) => void;

  // Books state
  books: Book[];
  addBook: (book: Omit<Book, 'id'>) => void;
  updateBookProgress: (id: string, currentPage: number) => void;
  deleteBook: (id: string) => void;

  // Engine state
  currentInsight: ThoughtInsight;
  generateRandomThought: () => void;
  toggleBookmarkInsight: () => void;
  decisionVectors: DecisionVector[];
  addDecisionVector: (type: 'positive' | 'negative', text: string) => void;
  deleteDecisionVector: (id: string) => void;

  // Synapses
  recentSynapses: RecentSynapse[];
  addRecentSynapse: (title: string, category?: string) => void;

  // Modals
  isIdeaModalOpen: boolean;
  setIsIdeaModalOpen: (open: boolean) => void;
  isHabitModalOpen: boolean;
  setIsHabitModalOpen: (open: boolean) => void;
  isBookModalOpen: boolean;
  setIsBookModalOpen: (open: boolean) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const LOCAL_STORAGE_KEYS = {
  IDEAS: 'monolith_ideas_v1',
  HABITS: 'monolith_habits_v1',
  BOOKS: 'monolith_books_v1',
  DECISIONS: 'monolith_decisions_v1',
  SYNAPSES: 'monolith_synapses_v1',
};

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeTab, setActiveTab] = useState<PageTab>('dashboard');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<IdeaCategory>('ALL');

  // Modals
  const [isIdeaModalOpen, setIsIdeaModalOpen] = useState(false);
  const [isHabitModalOpen, setIsHabitModalOpen] = useState(false);
  const [isBookModalOpen, setIsBookModalOpen] = useState(false);

  // Ideas state
  const [ideas, setIdeas] = useState<Idea[]>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEYS.IDEAS);
      return saved ? JSON.parse(saved) : INITIAL_IDEAS;
    } catch {
      return INITIAL_IDEAS;
    }
  });

  // Habits state
  const [habits, setHabits] = useState<Habit[]>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEYS.HABITS);
      return saved ? JSON.parse(saved) : INITIAL_HABITS;
    } catch {
      return INITIAL_HABITS;
    }
  });

  // Books state
  const [books, setBooks] = useState<Book[]>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEYS.BOOKS);
      return saved ? JSON.parse(saved) : INITIAL_BOOKS;
    } catch {
      return INITIAL_BOOKS;
    }
  });

  // Insights state
  const [currentInsight, setCurrentInsight] = useState<ThoughtInsight>(THOUGHT_INSIGHTS_POOL[0]);

  // Decision Vectors state
  const [decisionVectors, setDecisionVectors] = useState<DecisionVector[]>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEYS.DECISIONS);
      return saved ? JSON.parse(saved) : INITIAL_DECISION_VECTORS;
    } catch {
      return INITIAL_DECISION_VECTORS;
    }
  });

  // Recent Synapses state
  const [recentSynapses, setRecentSynapses] = useState<RecentSynapse[]>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEYS.SYNAPSES);
      return saved ? JSON.parse(saved) : INITIAL_RECENT_SYNAPSES;
    } catch {
      return INITIAL_RECENT_SYNAPSES;
    }
  });

  // Persist to LocalStorage
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEYS.IDEAS, JSON.stringify(ideas));
  }, [ideas]);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEYS.HABITS, JSON.stringify(habits));
  }, [habits]);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEYS.BOOKS, JSON.stringify(books));
  }, [books]);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEYS.DECISIONS, JSON.stringify(decisionVectors));
  }, [decisionVectors]);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEYS.SYNAPSES, JSON.stringify(recentSynapses));
  }, [recentSynapses]);

  // Idea handlers
  const addIdea = (newIdeaData: Omit<Idea, 'id' | 'createdAt'>) => {
    const newIdea: Idea = {
      ...newIdeaData,
      id: `idea-${Date.now()}`,
      createdAt: new Date().toISOString().split('T')[0],
      bookmarked: false
    };
    setIdeas(prev => [newIdea, ...prev]);
    addRecentSynapse(newIdea.title, 'Idea Captured');
  };

  const deleteIdea = (id: string) => {
    setIdeas(prev => prev.filter(i => i.id !== id));
  };

  const toggleBookmarkIdea = (id: string) => {
    setIdeas(prev => prev.map(i => i.id === id ? { ...i, bookmarked: !i.bookmarked } : i));
  };

  // Habit handlers
  const toggleHabitDay = (habitId: string, dayIndex: number) => {
    setHabits(prev => prev.map(habit => {
      if (habit.id === habitId) {
        const newHistory = [...habit.history];
        newHistory[dayIndex] = !newHistory[dayIndex];
        const count = newHistory.filter(Boolean).length;
        return {
          ...habit,
          history: newHistory,
          completedToday: dayIndex === 6 ? newHistory[dayIndex] : habit.completedToday,
          streakCount: count
        };
      }
      return habit;
    }));
  };

  const toggleHabitToday = (habitId: string) => {
    setHabits(prev => prev.map(habit => {
      if (habit.id === habitId) {
        const updatedCompleted = !habit.completedToday;
        const newHistory = [...habit.history];
        newHistory[newHistory.length - 1] = updatedCompleted;
        return {
          ...habit,
          completedToday: updatedCompleted,
          history: newHistory,
          streakCount: habit.streakCount + (updatedCompleted ? 1 : -1)
        };
      }
      return habit;
    }));
  };

  const addHabit = (title: string, targetInfo: string) => {
    const newHabit: Habit = {
      id: `habit-${Date.now()}`,
      title,
      targetInfo,
      completedToday: false,
      history: [false, false, false, false, false, false, false],
      streakCount: 0
    };
    setHabits(prev => [...prev, newHabit]);
    addRecentSynapse(`New Protocol: ${title}`, 'Protocol');
  };

  const deleteHabit = (id: string) => {
    setHabits(prev => prev.filter(h => h.id !== id));
  };

  // Book handlers
  const addBook = (newBookData: Omit<Book, 'id'>) => {
    const newBook: Book = {
      ...newBookData,
      id: `book-${Date.now()}`
    };
    setBooks(prev => [...prev, newBook]);
    addRecentSynapse(`Reading Queue: ${newBook.title}`, 'Reading');
  };

  const updateBookProgress = (id: string, currentPage: number) => {
    setBooks(prev => prev.map(b => b.id === id ? { ...b, currentPage: Math.min(currentPage, b.totalPages) } : b));
  };

  const deleteBook = (id: string) => {
    setBooks(prev => prev.filter(b => b.id !== id));
  };

  // Engine handlers
  const generateRandomThought = () => {
    const available = THOUGHT_INSIGHTS_POOL.filter(i => i.id !== currentInsight.id);
    const randomIndex = Math.floor(Math.random() * available.length);
    const selected = available[randomIndex] || THOUGHT_INSIGHTS_POOL[0];
    setCurrentInsight(selected);
  };

  const toggleBookmarkInsight = () => {
    setCurrentInsight(prev => ({ ...prev, bookmarked: !prev.bookmarked }));
  };

  const addDecisionVector = (type: 'positive' | 'negative', text: string) => {
    const newVector: DecisionVector = {
      id: `vec-${Date.now()}`,
      type,
      text
    };
    setDecisionVectors(prev => [...prev, newVector]);
  };

  const deleteDecisionVector = (id: string) => {
    setDecisionVectors(prev => prev.filter(v => v.id !== id));
  };

  const addRecentSynapse = (title: string, category: string = 'Note') => {
    const newSyn: RecentSynapse = {
      id: `syn-${Date.now()}`,
      title,
      timeLabel: 'Just now',
      category
    };
    setRecentSynapses(prev => [newSyn, ...prev.slice(0, 7)]);
  };

  return (
    <AppContext.Provider
      value={{
        activeTab,
        setActiveTab,
        ideas,
        searchQuery,
        setSearchQuery,
        selectedCategory,
        setSelectedCategory,
        addIdea,
        deleteIdea,
        toggleBookmarkIdea,
        habits,
        toggleHabitDay,
        toggleHabitToday,
        addHabit,
        deleteHabit,
        books,
        addBook,
        updateBookProgress,
        deleteBook,
        currentInsight,
        generateRandomThought,
        toggleBookmarkInsight,
        decisionVectors,
        addDecisionVector,
        deleteDecisionVector,
        recentSynapses,
        addRecentSynapse,
        isIdeaModalOpen,
        setIsIdeaModalOpen,
        isHabitModalOpen,
        setIsHabitModalOpen,
        isBookModalOpen,
        setIsBookModalOpen,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
