import { Idea, Habit, Book, ThoughtInsight, DecisionVector, RecentSynapse } from '../types';

export const INITIAL_IDEAS: Idea[] = [
  {
    id: 'idea-1',
    title: 'Neural Architecture Search Efficiency',
    description: 'Investigating methods to reduce the computational overhead of NAS by applying surrogate models and early stopping criteria based on preliminary learning curves.',
    category: 'RESEARCH',
    tags: ['AI', 'RESEARCH'],
    createdAt: '2026-08-26',
    bookmarked: false
  },
  {
    id: 'idea-2',
    title: 'Minimalist UI Pattern Library',
    description: 'Compilation of high-contrast, monochrome interface components focusing on spatial tension and typography rather than borders or shadows for separation.',
    category: 'PERSONAL',
    tags: ['DESIGN', 'ARCHITECTURE'],
    createdAt: '2026-08-25',
    bookmarked: true
  },
  {
    id: 'idea-3',
    title: 'System Migration Q3',
    description: 'Drafting the phased rollout plan for migrating legacy databases to the new distributed cluster. Need to verify latency requirements with DevOps team.',
    category: 'WORK',
    tags: ['WORK', 'INFRA'],
    createdAt: '2026-08-24',
    bookmarked: false
  },
  {
    id: 'idea-4',
    title: 'Graph-based Second Brain Memory Index',
    description: 'Constructing bi-directional links between markdown notes and active cognitive captures to build an associative knowledge graph with zero latency.',
    category: 'RESEARCH',
    tags: ['GRAPH', 'MEMORY', 'AI'],
    createdAt: '2026-08-23',
    bookmarked: true
  },
  {
    id: 'idea-5',
    title: 'Dopamine Fasting Protocol Engine',
    description: 'Designing an ambient mode switcher that throttles non-critical system notifications during deep focus blocks.',
    category: 'PERSONAL',
    tags: ['HEALTH', 'FOCUS'],
    createdAt: '2026-08-22',
    bookmarked: false
  },
  {
    id: 'idea-6',
    title: 'Monolithic vs Microservice Edge Relays',
    description: 'Comparative latency benchmarks between unified single-binary services and multi-container orchestrations in edge nodes.',
    category: 'WORK',
    tags: ['BACKEND', 'PERFORMANCE'],
    createdAt: '2026-08-21',
    bookmarked: false
  }
];

export const INITIAL_HABITS: Habit[] = [
  {
    id: 'habit-1',
    title: 'Deep Work Session (2h)',
    targetInfo: 'Morning focused block',
    completedToday: false,
    history: [true, true, true, false, false, false, false],
    streakCount: 3
  },
  {
    id: 'habit-2',
    title: 'Zone 2 Cardio (45m)',
    targetInfo: 'Heart rate 130-145 bpm',
    completedToday: true,
    history: [false, true, false, true, false, false, false],
    streakCount: 2
  },
  {
    id: 'habit-3',
    title: 'Read 20 Pages',
    targetInfo: 'Non-fiction cognitive intake',
    completedToday: false,
    history: [true, true, true, true, false, false, false],
    streakCount: 4
  },
  {
    id: 'habit-4',
    title: 'Cold Exposure & Breathwork',
    targetInfo: '3 min cold / 10 min Pranayama',
    completedToday: true,
    history: [true, true, true, true, true, false, false],
    streakCount: 5
  }
];

export const INITIAL_BOOKS: Book[] = [
  {
    id: 'book-1',
    title: 'Thinking, Fast and Slow',
    author: 'Daniel Kahneman',
    coverUrl: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=400&q=80',
    currentPage: 320,
    totalPages: 499,
    tags: ['Psychology', 'Decision Theory']
  },
  {
    id: 'book-2',
    title: 'The Design of Everyday Things',
    author: 'Don Norman',
    coverUrl: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=400&q=80',
    currentPage: 45,
    totalPages: 368,
    tags: ['Design', 'Affordances']
  },
  {
    id: 'book-3',
    title: 'Gödel, Escher, Bach',
    author: 'Douglas Hofstadter',
    coverUrl: 'https://images.unsplash.com/photo-1532012164546-f432f2e3777a?auto=format&fit=crop&w=400&q=80',
    currentPage: 180,
    totalPages: 777,
    tags: ['Philosophy', 'Systems']
  }
];

export const THOUGHT_INSIGHTS_POOL: ThoughtInsight[] = [
  {
    id: 'insight-1',
    vaultNumber: 849,
    quote: 'The constraint is the catalyst. When resources are infinite, creativity atrophies. Limit the variables to expand the possibilities.',
    tags: ['Philosophy', 'Design'],
    bookmarked: false
  },
  {
    id: 'insight-2',
    vaultNumber: 912,
    quote: 'A complex system that works is invariably found to have evolved from a simple system that worked. A complex system designed from scratch never works.',
    tags: ['Systems', 'Gall\'s Law'],
    bookmarked: true
  },
  {
    id: 'insight-3',
    vaultNumber: 407,
    quote: 'Attention is the rarest and purest form of generosity. What you attend to becomes your reality.',
    tags: ['Focus', 'Cognition'],
    bookmarked: false
  },
  {
    id: 'insight-4',
    vaultNumber: 623,
    quote: 'Simplicity is prerequisite for reliability. Premature optimization is the root of unnecessary architectural burden.',
    tags: ['Architecture', 'Discipline'],
    bookmarked: false
  },
  {
    id: 'insight-5',
    vaultNumber: 771,
    quote: 'Second-order thinking: Always ask "And then what?" when evaluating irreversible technical decisions.',
    tags: ['Decisions', 'Strategy'],
    bookmarked: false
  },
  {
    id: 'insight-6',
    vaultNumber: 529,
    quote: 'The mind is for having ideas, not holding them. Offload memory into strict external frameworks.',
    tags: ['Second Brain', 'Productivity'],
    bookmarked: true
  }
];

export const INITIAL_DECISION_VECTORS: DecisionVector[] = [
  {
    id: 'pos-1',
    type: 'positive',
    text: 'Forces deliberate resource allocation and prevents feature bloat.'
  },
  {
    id: 'pos-2',
    type: 'positive',
    text: 'Accelerates delivery by narrowing the scope of acceptable solutions.'
  },
  {
    id: 'pos-3',
    type: 'positive',
    text: 'Ensures deterministic maintenance across long-term deployments.'
  },
  {
    id: 'neg-1',
    type: 'negative',
    text: 'Risk of over-constraining, leading to brittle architecture early on.'
  },
  {
    id: 'neg-2',
    type: 'negative',
    text: 'Requires higher cognitive discipline during initial problem specification.'
  }
];

export const INITIAL_RECENT_SYNAPSES: RecentSynapse[] = [
  {
    id: 'syn-1',
    title: 'Architectural Patterns for Scalability',
    timeLabel: '10:42 AM',
    category: 'Architecture'
  },
  {
    id: 'syn-2',
    title: 'Q3 Goal Realignment Draft',
    timeLabel: 'Yesterday',
    category: 'Strategy'
  },
  {
    id: 'syn-3',
    title: 'Thoughts on "The Design of Everyday Things"',
    timeLabel: 'Mon, 14th',
    category: 'Review'
  },
  {
    id: 'syn-4',
    title: 'Memory Leaks in Web Worker Communication Pipeline',
    timeLabel: 'Aug 10',
    category: 'Debug'
  }
];
