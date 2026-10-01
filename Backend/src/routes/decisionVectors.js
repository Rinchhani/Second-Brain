/**
 * routes/decisionVectors.js — Decision Vectors (MongoDB / Mongoose)
 */

const express = require('express');
const router = express.Router();
const DecisionVector = require('../models/DecisionVector');

function fmt(doc) {
  const o = doc.toObject();
  return { id: o._id, type: o.type, text: o.text };
}

// GET /api/decision-vectors
router.get('/', async (req, res) => {
  try {
    const vectors = await DecisionVector.find().sort({ createdAt: 1 });
    res.json(vectors.map(fmt));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/decision-vectors/:id
router.get('/:id', async (req, res) => {
  try {
    const v = await DecisionVector.findById(req.params.id);
    if (!v) return res.status(404).json({ error: 'Decision vector not found' });
    res.json(fmt(v));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/decision-vectors
router.post('/', async (req, res) => {
  try {
    const { type, text } = req.body;
    if (!type || !['positive', 'negative'].includes(type)) {
      return res.status(400).json({ error: 'type must be "positive" or "negative"' });
    }
    if (!text) return res.status(400).json({ error: 'text is required' });

    const v = await DecisionVector.create({ type, text });
    res.status(201).json(fmt(v));
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// PATCH /api/decision-vectors/:id
router.patch('/:id', async (req, res) => {
  try {
    const { text } = req.body;
    if (!text) return res.status(400).json({ error: 'text is required' });

    const v = await DecisionVector.findByIdAndUpdate(req.params.id, { text }, { new: true });
    if (!v) return res.status(404).json({ error: 'Decision vector not found' });
    res.json(fmt(v));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE /api/decision-vectors/:id
router.delete('/:id', async (req, res) => {
  try {
    const v = await DecisionVector.findByIdAndDelete(req.params.id);
    if (!v) return res.status(404).json({ error: 'Decision vector not found' });
    res.json({ success: true, id: req.params.id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
