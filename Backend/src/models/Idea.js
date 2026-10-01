const mongoose = require('mongoose');

const IdeaSchema = new mongoose.Schema(
  {
    title:       { type: String, required: true, trim: true },
    description: { type: String, default: '' },
    category:    { type: String, enum: ['PERSONAL', 'WORK', 'RESEARCH'], default: 'PERSONAL' },
    tags:        { type: [String], default: [] },
    bookmarked:  { type: Boolean, default: false },
  },
  {
    timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' },
    toJSON:     { virtuals: true },
    toObject:   { virtuals: true }
  }
);

// Text index for search
IdeaSchema.index({ title: 'text', description: 'text', tags: 'text' });

module.exports = mongoose.model('Idea', IdeaSchema);
