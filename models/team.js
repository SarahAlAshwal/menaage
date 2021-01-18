const mongoose = require('mongoose');

const teamSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  teamId: {
    type: Number,
    required: true
  },
  image: {
    type: Buffer,
    required: true
  },
  imageType:{
    type: String,
    required: true
  },
  position: {
    type: String
  },
  details: {
    type: String,
  }
});

teamSchema.virtual('imagePath').get(function() {
  if (this.image != null && this.imageType != null) {
    return `data:${this.imageType};charset=utf-8;base64,${this.image.toString('base64')}`
  }
});

module.exports = mongoose.model('Team', teamSchema)
