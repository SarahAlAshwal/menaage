const mongoose = require('mongoose')
const { text } = require('body-parser')

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
    type: String
  },
  position: {
    type: String
  },
  details: {
    type: String,
  }
})


module.exports = mongoose.model('Team', teamSchema)
