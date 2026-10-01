/**
 * seed.js — Populate MongoDB Atlas with demo data
 * Run with: npm run seed  (after setting MONGODB_URI in .env)
 */

require('dotenv').config({ path: require('path').join(__dirname, '..', '..', '.env') });

const mongoose       = require('mongoose');
const connectDB      = require('./connect');
const Idea           = require('../models/Idea');
const Habit          = require('../models/Habit');
const Book           = require('../models/Book');
const Insight        = require('../models/Insight');
const DecisionVector = require('../models/DecisionVector');
const Synapse        = require('../models/Synapse');

async function seed() {
  await connectDB();

  // Clear all collections
  await Promise.all([
    Idea.deleteMany({}),
    Habit.deleteMany({}),
    Book.deleteMany({}),
    Insight.deleteMany({}),
    DecisionVector.deleteMany({}),
    Synapse.deleteMany({}),
  ]);
  console.log('🗑️  Cleared existing data');

  // ── Ideas ──────────────────────────────────────────────────────────────────
  await Idea.insertMany([
    {
      title: 'Neural Architecture Search Efficiency',
      description: 'Investigating methods to reduce the computational overhead of NAS by applying surrogate models and early stopping criteria based on preliminary learning curves.',
      category: 'RESEARCH',
      tags: ['AI', 'RESEARCH'],
      bookmarked: false
    },
    {
      title: 'Minimalist UI Pattern Library',
      description: 'Compilation of high-contrast, monochrome interface components focusing on spatial tension and typography rather than borders or shadows for separation.',
      category: 'PERSONAL',
      tags: ['DESIGN', 'ARCHITECTURE'],
      bookmarked: true
    },
    {
      title: 'System Migration Q3',
      description: 'Drafting the phased rollout plan for migrating legacy databases to the new distributed cluster. Need to verify latency requirements with DevOps team.',
      category: 'WORK',
      tags: ['WORK', 'INFRA'],
      bookmarked: false
    },
    {
      title: 'Graph-based Second Brain Memory Index',
      description: 'Constructing bi-directional links between markdown notes and active cognitive captures to build an associative knowledge graph with zero latency.',
      category: 'RESEARCH',
      tags: ['GRAPH', 'MEMORY', 'AI'],
      bookmarked: true
    },
    {
      title: 'Dopamine Fasting Protocol Engine',
      description: 'Designing an ambient mode switcher that throttles non-critical system notifications during deep focus blocks.',
      category: 'PERSONAL',
      tags: ['HEALTH', 'FOCUS'],
      bookmarked: false
    },
    {
      title: 'Monolithic vs Microservice Edge Relays',
      description: 'Comparative latency benchmarks between unified single-binary services and multi-container orchestrations in edge nodes.',
      category: 'WORK',
      tags: ['BACKEND', 'PERFORMANCE'],
      bookmarked: false
    },
  ]);

  // ── Habits ─────────────────────────────────────────────────────────────────
  await Habit.insertMany([
    { title: 'Deep Work Session (2h)',      targetInfo: 'Morning focused block',          completedToday: false, history: [true,true,true,false,false,false,false], streakCount: 3 },
    { title: 'Zone 2 Cardio (45m)',         targetInfo: 'Heart rate 130-145 bpm',         completedToday: true,  history: [false,true,false,true,false,false,false], streakCount: 2 },
    { title: 'Read 20 Pages',               targetInfo: 'Non-fiction cognitive intake',    completedToday: false, history: [true,true,true,true,false,false,false], streakCount: 4 },
    { title: 'Cold Exposure & Breathwork',  targetInfo: '3 min cold / 10 min Pranayama',  completedToday: true,  history: [true,true,true,true,true,false,false], streakCount: 5 },
  ]);

  // ── Books ──────────────────────────────────────────────────────────────────
  await Book.insertMany([
    {
      title: 'Thinking, Fast and Slow',
      author: 'Daniel Kahneman',
      coverUrl: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=400&q=80',
      currentPage: 320, totalPages: 499,
      tags: ['Psychology', 'Decision Theory']
    },
    {
      title: 'The Design of Everyday Things',
      author: 'Don Norman',
      coverUrl: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=400&q=80',
      currentPage: 45, totalPages: 368,
      tags: ['Design', 'Affordances']
    },
    {
      title: 'Gödel, Escher, Bach',
      author: 'Douglas Hofstadter',
      coverUrl: 'https://images.unsplash.com/photo-1532012164546-f432f2e3777a?auto=format&fit=crop&w=400&q=80',
      currentPage: 180, totalPages: 777,
      tags: ['Philosophy', 'Systems']
    },
  ]);

  // ── Insights ───────────────────────────────────────────────────────────────
  await Insight.insertMany([
    { vaultNumber: 849, quote: 'The constraint is the catalyst. When resources are infinite, creativity atrophies. Limit the variables to expand the possibilities.', tags: ['Philosophy', 'Design'], bookmarked: false },
    { vaultNumber: 912, quote: "A complex system that works is invariably found to have evolved from a simple system that worked. A complex system designed from scratch never works.", tags: ['Systems', "Gall's Law"], bookmarked: true },
    { vaultNumber: 407, quote: 'Attention is the rarest and purest form of generosity. What you attend to becomes your reality.', tags: ['Focus', 'Cognition'], bookmarked: false },
    { vaultNumber: 623, quote: 'Simplicity is prerequisite for reliability. Premature optimization is the root of unnecessary architectural burden.', tags: ['Architecture', 'Discipline'], bookmarked: false },
    { vaultNumber: 771, quote: 'Second-order thinking: Always ask "And then what?" when evaluating irreversible technical decisions.', tags: ['Decisions', 'Strategy'], bookmarked: false },
    { vaultNumber: 529, quote: 'The mind is for having ideas, not holding them. Offload memory into strict external frameworks.', tags: ['Second Brain', 'Productivity'], bookmarked: true },
  ]);

  // ── Decision Vectors ───────────────────────────────────────────────────────
  await DecisionVector.insertMany([
    { type: 'positive', text: 'Forces deliberate resource allocation and prevents feature bloat.' },
    { type: 'positive', text: 'Accelerates delivery by narrowing the scope of acceptable solutions.' },
    { type: 'positive', text: 'Ensures deterministic maintenance across long-term deployments.' },
    { type: 'negative', text: 'Risk of over-constraining, leading to brittle architecture early on.' },
    { type: 'negative', text: 'Requires higher cognitive discipline during initial problem specification.' },
  ]);

  // ── Synapses ───────────────────────────────────────────────────────────────
  await Synapse.insertMany([
    { title: 'Architectural Patterns for Scalability', timeLabel: '10:42 AM', category: 'Architecture' },
    { title: 'Q3 Goal Realignment Draft',              timeLabel: 'Yesterday',  category: 'Strategy' },
    { title: 'Thoughts on "The Design of Everyday Things"', timeLabel: 'Mon, 14th', category: 'Review' },
    { title: 'Memory Leaks in Web Worker Communication Pipeline', timeLabel: 'Aug 10', category: 'Debug' },
  ]);

  console.log('\n✅  Database seeded successfully!');
  console.log('   → 6 ideas');
  console.log('   → 4 habits');
  console.log('   → 3 books');
  console.log('   → 6 insights');
  console.log('   → 5 decision vectors');
  console.log('   → 4 synapses\n');

  await mongoose.disconnect();
  process.exit(0);
}

seed().catch(err => {
  console.error('Seed failed:', err);
  process.exit(1);
});
