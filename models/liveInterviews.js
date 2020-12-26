const mongoose = require("mongoose");
// const slugify = require("slugify");

const liveInterviewsSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  videoUrl: {
    type: String,
    required: true,
  },
  thumbnail: {
    type: String,
  }
});

module.exports = mongoose.model("LiveInterviews", liveInterviewsSchema); 
