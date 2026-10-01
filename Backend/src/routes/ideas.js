/**
 * routes/ideas.js — Ideas Vault CRUD (MongoDB / Mongoose)
 */

const express = require('express');
const router = express.Router();
const Idea = require('../models/Idea');

// Helper to shape the response
function fmt(doc) {
  const o = doc.toObject();
  return {
    id:          o._id,
    title:       o.title,
    description: o.description,
    category:    o.category,
    tags:        o.tags,
    createdAt:   o.createdAt ? o.createdAt.toISOString().split('T')[0] : '',
    bookmarked:  o.bookmarked,
  };
}

// GET /api/ideas?category=WORK&search=query
router.get('/', async (req, res) => {
  try {
    const { category, search } = req.query;
    const filter = {};

    if (category && category !== 'ALL') filter.category = category;

    if (search) {
      filter.$or = [
        { title:       { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { tags:        { $regex: search, $options: 'i' } },
      ];
    }

    const ideas = await Idea.find(filter).sort({ createdAt: -1 });
    res.json(ideas.map(fmt));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/ideas/:id
router.get('/:id', async (req, res) => {
  try {
    const idea = await Idea.findById(req.params.id);
    if (!idea) return res.status(404).json({ error: 'Idea not found' });
    res.json(fmt(idea));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/ideas
router.post('/', async (req, res) => {
  try {
    const { title, description, category, tags } = req.body;
    if (!title) return res.status(400).json({ error: 'title is required' });

    const idea = await Idea.create({
      title,
      description: description || '',
      category:    category || 'PERSONAL',
      tags:        Array.isArray(tags) ? tags : [],
    });
    res.status(201).json(fmt(idea));
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// PATCH /api/ideas/:id
router.patch('/:id', async (req, res) => {
  try {
    const { title, description, category, tags } = req.body;
    const update = {};
    if (title       !== undefined) update.title       = title;
    if (description !== undefined) update.description = description;
    if (category    !== undefined) update.category    = category;
    if (tags        !== undefined) update.tags        = Array.isArray(tags) ? tags : [];

    const idea = await Idea.findByIdAndUpdate(req.params.id, update, { new: true, runValidators: true });
    if (!idea) return res.status(404).json({ error: 'Idea not found' });
    res.json(fmt(idea));
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// PATCH /api/ideas/:id/bookmark — toggle
router.patch('/:id/bookmark', async (req, res) => {
  try {
    const idea = await Idea.findById(req.params.id);
    if (!idea) return res.status(404).json({ error: 'Idea not found' });

    idea.bookmarked = !idea.bookmarked;
    await idea.save();
    res.json(fmt(idea));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE /api/ideas/:id
router.delete('/:id', async (req, res) => {
  try {
    const idea = await Idea.findByIdAndDelete(req.params.id);
    if (!idea) return res.status(404).json({ error: 'Idea not found' });
    res.json({ success: true, id: req.params.id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
