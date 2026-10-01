const mongoose = require('mongoose');

const BookSchema = new mongoose.Schema(
  {
    title:       { type: String, required: true, trim: true },
    author:      { type: String, default: '', trim: true },
    coverUrl:    { type: String, default: '' },
    currentPage: { type: Number, default: 0, min: 0 },
    totalPages:  { type: Number, required: true, min: 1 },
    tags:        { type: [String], default: [] },
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

module.exports = mongoose.model('Book', BookSchema);
