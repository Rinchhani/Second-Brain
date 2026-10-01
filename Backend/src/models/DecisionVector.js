const mongoose = require('mongoose');

const DecisionVectorSchema = new mongoose.Schema(
  {
    type: { type: String, enum: ['positive', 'negative'], required: true },
    text: { type: String, required: true, trim: true },
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

module.exports = mongoose.model('DecisionVector', DecisionVectorSchema);
