const mongoose = require('mongoose');

const InsightSchema = new mongoose.Schema(
  {
    vaultNumber: { type: Number, required: true },
    quote:       { type: String, required: true, trim: true },
    tags:        { type: [String], default: [] },
    bookmarked:  { type: Boolean, default: false },
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

module.exports = mongoose.model('Insight', InsightSchema);
