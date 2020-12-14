const express = require("express");
//const articleRouter = require('./routes/articles');
const app = express();
const mongoose = require('mongoose');
app.use(express.static(__dirname + '/views/'));

//mongoose.connect('mongodb://localhost/blog', { useNewUrlParser: true ,  useUnifiedTopology: true, useCreateIndex: true});


app.set('view engine', 'ejs');
app.use(express.urlencoded({extended: false}));


app.get('/', async (req, res) => {
  // const articles = await Article.find().sort({createdAt: 'desc'}); //gives all the articles
  // // we can pass any object to index
  // res.render('articles/index', {articles: articles});
  res.render('home');
})

app.get('/speakUp', (req,res) => {
  res.render('speakUp');
})

// app.use('/articles', articleRouter);
app.listen(8000, ()=> console.log('app listening on port 8000'));
