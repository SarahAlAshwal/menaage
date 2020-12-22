const express = require('express');
const router = express.Router();
const Article = require ('../../models/article');

router.get('/', async(req,res)=>{
  const articles = await Article.find().sort({createdAt: 'desc'}); //gives all the articles
  // we can pass any object to index
  res.render('articles', {articles: articles});
})

router.get('/:id', async (req, res) => {
  const article = await Article.findOne({_id: req.params.id});

  if (article == null) res.redirect('/')
  res.render('article', {article: article});
});

module.exports = router;