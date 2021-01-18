const mongoose = require("mongoose");

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
    type: Buffer,
    required: true
  },
  thumbnailType:{
    type: String,
    required: true
  }
});

liveInterviewsSchema.virtual('thumbnailPath').get(function() {
  if (this.thumbnail != null && this.thumbnailType != null) {
    return `data:${this.thumbnailType};charset=utf-8;base64,${this.thumbnail.toString('base64')}`
  }
})

module.exports = mongoose.model("LiveInterviews", liveInterviewsSchema); 
