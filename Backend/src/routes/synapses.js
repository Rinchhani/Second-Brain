/**
 * routes/synapses.js — Recent Synapses activity feed (MongoDB / Mongoose)
 */

const express = require('express');
const router = express.Router();
const Synapse = require('../models/Synapse');

function formatTimeLabel(date) {
  const now = new Date();
  const diff = now - date;

  if (diff < 60_000)      return 'Just now';
  if (diff < 3_600_000)   return `${Math.floor(diff / 60_000)}m ago`;
  if (diff < 86_400_000)  return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  if (diff < 172_800_000) return 'Yesterday';
  return date.toLocaleDateString('en-US', { weekday: 'short', day: 'numeric' });
}

function fmt(doc) {
  const o = doc.toObject();
  return {
    id:        o._id,
    title:     o.title,
    timeLabel: o.timeLabel,
    category:  o.category,
    createdAt: o.createdAt,
  };
}

// GET /api/synapses?limit=8
router.get('/', async (req, res) => {
  try {
    const limit = parseInt(req.query.limit || '8', 10);
    const synapses = await Synapse.find().sort({ createdAt: -1 }).limit(limit);
    res.json(synapses.map(fmt));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/synapses
router.post('/', async (req, res) => {
  try {
    const { title, category } = req.body;
    if (!title) return res.status(400).json({ error: 'title is required' });

    const now = new Date();
    const synapse = await Synapse.create({
      title,
      category:  category || 'Note',
      timeLabel: formatTimeLabel(now),
    });

    // Prune: keep only 50 most recent
    const oldest = await Synapse.find().sort({ createdAt: -1 }).skip(50);
    if (oldest.length > 0) {
      await Synapse.deleteMany({ _id: { $in: oldest.map(s => s._id) } });
    }

    res.status(201).json(fmt(synapse));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE /api/synapses/:id
router.delete('/:id', async (req, res) => {
  try {
    const synapse = await Synapse.findByIdAndDelete(req.params.id);
    if (!synapse) return res.status(404).json({ error: 'Synapse not found' });
    res.json({ success: true, id: req.params.id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
