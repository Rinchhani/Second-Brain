/**
 * routes/books.js — Books CRUD + progress (MongoDB / Mongoose)
 */

const express = require('express');
const router = express.Router();
const Book = require('../models/Book');

function fmt(doc) {
  const o = doc.toObject();
  return {
    id:          o._id,
    title:       o.title,
    author:      o.author,
    coverUrl:    o.coverUrl,
    currentPage: o.currentPage,
    totalPages:  o.totalPages,
    tags:        o.tags,
  };
}

// GET /api/books
router.get('/', async (req, res) => {
  try {
    const books = await Book.find().sort({ createdAt: 1 });
    res.json(books.map(fmt));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/books/:id
router.get('/:id', async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ error: 'Book not found' });
    res.json(fmt(book));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/books
router.post('/', async (req, res) => {
  try {
    const { title, author, coverUrl, currentPage, totalPages, tags } = req.body;
    if (!title)      return res.status(400).json({ error: 'title is required' });
    if (!totalPages) return res.status(400).json({ error: 'totalPages is required' });

    const book = await Book.create({
      title,
      author:      author      || '',
      coverUrl:    coverUrl    || '',
      currentPage: Math.min(currentPage || 0, totalPages),
      totalPages,
      tags:        Array.isArray(tags) ? tags : [],
    });
    res.status(201).json(fmt(book));
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// PATCH /api/books/:id — general update
router.patch('/:id', async (req, res) => {
  try {
    const { title, author, coverUrl, tags } = req.body;
    const update = {};
    if (title    !== undefined) update.title    = title;
    if (author   !== undefined) update.author   = author;
    if (coverUrl !== undefined) update.coverUrl = coverUrl;
    if (tags     !== undefined) update.tags     = Array.isArray(tags) ? tags : [];

    const book = await Book.findByIdAndUpdate(req.params.id, update, { new: true, runValidators: true });
    if (!book) return res.status(404).json({ error: 'Book not found' });
    res.json(fmt(book));
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// PATCH /api/books/:id/progress — update reading progress
router.patch('/:id/progress', async (req, res) => {
  try {
    const { currentPage } = req.body;
    if (currentPage === undefined || typeof currentPage !== 'number') {
      return res.status(400).json({ error: 'currentPage (number) is required' });
    }

    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ error: 'Book not found' });

    book.currentPage = Math.min(Math.max(0, currentPage), book.totalPages);
    await book.save();
    res.json(fmt(book));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE /api/books/:id
router.delete('/:id', async (req, res) => {
  try {
    const book = await Book.findByIdAndDelete(req.params.id);
    if (!book) return res.status(404).json({ error: 'Book not found' });
    res.json({ success: true, id: req.params.id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
