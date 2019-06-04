const mongoose = require("mongoose");

const TrainerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  avatar: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now
  },
  skills: {
    type: String
  },
  available: {
    type: Boolean,
    default: false
  },
  geometry: {
    type: { type: String, default: "Point" },
    coordinates: { type: [Number], index: "2dsphere" }
  }
});

module.exports = Trainer = mongoose.model("trainer", TrainerSchema);
