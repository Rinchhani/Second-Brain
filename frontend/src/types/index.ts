export type PageTab = 'dashboard' | 'vault' | 'habits' | 'engine';

export type IdeaCategory = 'ALL' | 'PERSONAL' | 'WORK' | 'RESEARCH' | 'DESIGN' | 'ARCHITECTURE' | 'AI' | 'INFRA';

export interface Idea {
  id: string;
  title: string;
  description: string;
  category: 'PERSONAL' | 'WORK' | 'RESEARCH';
  tags: string[];
  createdAt: string;
  bookmarked?: boolean;
}

export interface Habit {
  id: string;
  title: string;
  targetInfo: string;
  completedToday: boolean;
  history: boolean[]; // 7 days: M, T, W, T, F, S, S
  streakCount: number;
}

export interface Book {
  id: string;
  title: string;
  author: string;
  coverUrl: string;
  currentPage: number;
  totalPages: number;
  tags?: string[];
}

export interface ThoughtInsight {
  id: string;
  quote: string;
  tags: string[];
  vaultNumber: number;
  bookmarked: boolean;
}

export interface DecisionVector {
  id: string;
  type: 'positive' | 'negative';
  text: string;
}

export interface RecentSynapse {
  id: string;
  title: string;
  timeLabel: string;
  category?: string;
}
