const mongoose = require('mongoose');

const HabitSchema = new mongoose.Schema(
  {
    title:          { type: String, required: true, trim: true },
    targetInfo:     { type: String, default: '' },
    completedToday: { type: Boolean, default: false },
    history:        { type: [Boolean], default: [false, false, false, false, false, false, false] },
    streakCount:    { type: Number, default: 0, min: 0 },
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

module.exports = mongoose.model('Habit', HabitSchema);
