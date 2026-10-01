const mongoose = require('mongoose');

const SynapseSchema = new mongoose.Schema(
  {
    title:     { type: String, required: true, trim: true },
    timeLabel: { type: String, default: 'Just now' },
    category:  { type: String, default: 'Note', trim: true },
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

module.exports = mongoose.model('Synapse', SynapseSchema);
