const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TrainerProfileSchema = new Schema({
  trainer: {
    type: Schema.Types.ObjectId,
    ref: "trainer"
  },
  location: {
    type: String
  },
  status: {
    type: String
  },
  skills: {
    type: [String],
    required: true
  },
  bio: {
    type: String
  },
  social: {
    youtube: {
      type: String
    },
    twitter: {
      type: String
    },
    facebook: {
      type: String
    },
    linkedin: {
      type: String
    },
    instagram: {
      type: String
    }
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = TrainerProfile = mongoose.model(
  "trainerprofile",
  TrainerProfileSchema
);
