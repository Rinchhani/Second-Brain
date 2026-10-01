/**
 * routes/insights.js — Thought Insights (MongoDB / Mongoose)
 */

const express = require('express');
const router = express.Router();
const Insight = require('../models/Insight');

function fmt(doc) {
  const o = doc.toObject();
  return {
    id:          o._id,
    vaultNumber: o.vaultNumber,
    quote:       o.quote,
    tags:        o.tags,
    bookmarked:  o.bookmarked,
  };
}

// GET /api/insights
router.get('/', async (req, res) => {
  try {
    const insights = await Insight.find().sort({ vaultNumber: 1 });
    res.json(insights.map(fmt));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/insights/random?exclude=id
router.get('/random', async (req, res) => {
  try {
    const { exclude } = req.query;
    const filter = exclude ? { _id: { $ne: exclude } } : {};

    const count = await Insight.countDocuments(filter);
    if (count === 0) return res.status(404).json({ error: 'No insights available' });

    const random = Math.floor(Math.random() * count);
    const insight = await Insight.findOne(filter).skip(random);
    res.json(fmt(insight));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/insights/:id
router.get('/:id', async (req, res) => {
  try {
    const insight = await Insight.findById(req.params.id);
    if (!insight) return res.status(404).json({ error: 'Insight not found' });
    res.json(fmt(insight));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/insights
router.post('/', async (req, res) => {
  try {
    const { quote, tags, vaultNumber } = req.body;
    if (!quote) return res.status(400).json({ error: 'quote is required' });

    const maxDoc = await Insight.findOne().sort({ vaultNumber: -1 });
    const nextVault = vaultNumber || ((maxDoc ? maxDoc.vaultNumber : 0) + 1);

    const insight = await Insight.create({
      quote,
      tags:        Array.isArray(tags) ? tags : [],
      vaultNumber: nextVault,
    });
    res.status(201).json(fmt(insight));
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// PATCH /api/insights/:id/bookmark — toggle
router.patch('/:id/bookmark', async (req, res) => {
  try {
    const insight = await Insight.findById(req.params.id);
    if (!insight) return res.status(404).json({ error: 'Insight not found' });

    insight.bookmarked = !insight.bookmarked;
    await insight.save();
    res.json(fmt(insight));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE /api/insights/:id
router.delete('/:id', async (req, res) => {
  try {
    const insight = await Insight.findByIdAndDelete(req.params.id);
    if (!insight) return res.status(404).json({ error: 'Insight not found' });
    res.json({ success: true, id: req.params.id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
