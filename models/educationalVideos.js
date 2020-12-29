const mongoose = require("mongoose");

const educationalVideosSchema = new mongoose.Schema({
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
  },
});

educationalVideosSchema.pre("validate", function (next) {
  if (this.videoUrl) {
    const start = this.videoUrl.indexOf("=");
    let vID = "";
    if (this.videoUrl.includes("&")) {
      const end = this.videoUrl.indexOf("&");
      vID = this.videoUrl.slice(start + 1, end);
    } else {
      vID = this.videoUrl.substr(start + 1);
    }

    this.thumbnail = `https://img.youtube.com/vi/${vID}/mqdefault.jpg`;
  }

  next();
});

module.exports = mongoose.model("EducationalVideos", educationalVideosSchema);
