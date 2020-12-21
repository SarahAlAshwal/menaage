const mongoose = require ('mongoose');
const slugify = require('slugify');

const articleSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  details: {
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now 
  },
  category: {
    type: String
  }

});

  articleSchema.pre('validate', function (next) {
    if (this.title) {
      this.slug = slugify(this.title, {lower: true, strict: true})
    }

    next();
  })

module.exports = mongoose.model('Article', articleSchema)//export table article with its schema 