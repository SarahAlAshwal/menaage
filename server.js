const express = require("express");
//const articleRouter = require('./routes/articles');
const app = express();
const mongoose = require('mongoose');

//mongoose.connect('mongodb://localhost/blog', { useNewUrlParser: true ,  useUnifiedTopology: true, useCreateIndex: true});


app.set('view engine', 'ejs');
app.use(express.urlencoded({extended: false}));


app.get('/', async (req, res) => {
  // const articles = await Article.find().sort({createdAt: 'desc'}); //gives all the articles
  // // we can pass any object to index
  // res.render('articles/index', {articles: articles});
})

// app.use('/articles', articleRouter);
app.listen(8000, ()=> console.log('app listening on port 8000'));
