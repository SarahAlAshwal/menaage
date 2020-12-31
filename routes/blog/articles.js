const express = require('express');
const router = express.Router();
const Article = require ('../../models/article');

router.get('/', async(req,res)=>{
  const articles = await Article.find().sort({createdAt: 'desc'}); //gives all the articles
  // we can pass any object to index
  res.render('articles', {articles: articles});
})


router.get('/:slug', async (req, res) => {
  const article = await Article.findOne({ slug: req.params.slug })
  if (article == null) res.redirect('/')
  res.render('articles/show', { article: article })
})



module.exports = router;