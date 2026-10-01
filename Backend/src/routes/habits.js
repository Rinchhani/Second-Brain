/**
 * routes/habits.js — Focus Habits CRUD (MongoDB / Mongoose)
 */

const express = require('express');
const router = express.Router();
const Habit = require('../models/Habit');

function fmt(doc) {
  const o = doc.toObject();
  return {
    id:             o._id,
    title:          o.title,
    targetInfo:     o.targetInfo,
    completedToday: o.completedToday,
    history:        o.history,
    streakCount:    o.streakCount,
  };
}

// GET /api/habits
router.get('/', async (req, res) => {
  try {
    const habits = await Habit.find().sort({ createdAt: 1 });
    res.json(habits.map(fmt));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/habits/:id
router.get('/:id', async (req, res) => {
  try {
    const habit = await Habit.findById(req.params.id);
    if (!habit) return res.status(404).json({ error: 'Habit not found' });
    res.json(fmt(habit));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/habits
router.post('/', async (req, res) => {
  try {
    const { title, targetInfo } = req.body;
    if (!title) return res.status(400).json({ error: 'title is required' });

    const habit = await Habit.create({ title, targetInfo: targetInfo || '' });
    res.status(201).json(fmt(habit));
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// PATCH /api/habits/:id — update title / targetInfo
router.patch('/:id', async (req, res) => {
  try {
    const { title, targetInfo } = req.body;
    const update = {};
    if (title      !== undefined) update.title      = title;
    if (targetInfo !== undefined) update.targetInfo = targetInfo;

    const habit = await Habit.findByIdAndUpdate(req.params.id, update, { new: true, runValidators: true });
    if (!habit) return res.status(404).json({ error: 'Habit not found' });
    res.json(fmt(habit));
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// PATCH /api/habits/:id/today — toggle completedToday
router.patch('/:id/today', async (req, res) => {
  try {
    const habit = await Habit.findById(req.params.id);
    if (!habit) return res.status(404).json({ error: 'Habit not found' });

    habit.completedToday = !habit.completedToday;
    const history = [...habit.history];
    history[history.length - 1] = habit.completedToday;
    habit.history = history;
    habit.streakCount = Math.max(0, habit.streakCount + (habit.completedToday ? 1 : -1));

    await habit.save();
    res.json(fmt(habit));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PATCH /api/habits/:id/day/:dayIndex — toggle a specific day (0-6)
router.patch('/:id/day/:dayIndex', async (req, res) => {
  try {
    const idx = parseInt(req.params.dayIndex, 10);
    if (isNaN(idx) || idx < 0 || idx > 6) {
      return res.status(400).json({ error: 'dayIndex must be 0–6' });
    }

    const habit = await Habit.findById(req.params.id);
    if (!habit) return res.status(404).json({ error: 'Habit not found' });

    const history = [...habit.history];
    history[idx] = !history[idx];
    habit.history = history;
    habit.streakCount = history.filter(Boolean).length;
    if (idx === 6) habit.completedToday = history[idx];

    await habit.save();
    res.json(fmt(habit));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE /api/habits/:id
router.delete('/:id', async (req, res) => {
  try {
    const habit = await Habit.findByIdAndDelete(req.params.id);
    if (!habit) return res.status(404).json({ error: 'Habit not found' });
    res.json({ success: true, id: req.params.id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
