/**
 * routes/dashboard.js — Aggregated stats (MongoDB / Mongoose)
 */

const express = require('express');
const router = express.Router();
const Idea           = require('../models/Idea');
const Habit          = require('../models/Habit');
const Book           = require('../models/Book');
const Insight        = require('../models/Insight');
const Synapse        = require('../models/Synapse');

// GET /api/dashboard/stats
router.get('/stats', async (req, res) => {
  try {
    const [
      ideaCount,
      bookmarkCount,
      habitCount,
      completedToday,
      insightCount,
      synapseCount,
      books,
      habits,
    ] = await Promise.all([
      Idea.countDocuments(),
      Idea.countDocuments({ bookmarked: true }),
      Habit.countDocuments(),
      Habit.countDocuments({ completedToday: true }),
      Insight.countDocuments(),
      Synapse.countDocuments(),
      Book.find(),
      Habit.find(),
    ]);

    const maxStreak = habits.reduce((max, h) => Math.max(max, h.streakCount), 0);

    const booksInProgress = books.filter(b => b.currentPage > 0 && b.currentPage < b.totalPages).length;

    const avgProgress = books.length > 0
      ? Math.round(books.reduce((sum, b) => sum + (b.currentPage / b.totalPages) * 100, 0) / books.length)
      : 0;

    res.json({
      ideas:    { total: ideaCount,   bookmarked: bookmarkCount },
      habits:   { total: habitCount,  completedToday, maxStreak },
      books:    { total: books.length, inProgress: booksInProgress, averageProgressPercent: avgProgress },
      insights: { total: insightCount },
      synapses: { total: synapseCount },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
