const express = require("express");
const app = express();
const mongoose = require('mongoose');
const nodemailer = require('nodemailer');
const Article = require ('./models/article');


app.use(express.static(__dirname + '/views/'));

app.set('view engine', 'ejs');
app.use(express.urlencoded({extended: false}));

//connect to mlab database

mongoose.connect("mongodb+srv://menaUser:menaage123@cluster0.osql0.mongodb.net/mena-age?retryWrites=true&w=majority",{ useNewUrlParser: true ,  useUnifiedTopology: true, useCreateIndex: true});
mongoose.connection.once('open', ()=> {
  console.log('connected to the database');
})

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com', 
  port: 587,
  secure: false,
  auth: {
    user: 'menaagewebsite@gmail.com',
    pass: 'menaage1234'
  },
})





app.get('/', async (req, res) => {
  res.render('home');
  
})

app.get('/speakUp', (req,res) => {
  res.render('speakUp');
});

app.post('/speakUp', async(req,res) => {

    try {
      await transporter.sendMail({
        from: '" Info 👻" <menaagewebsite@gmail.com>',
        to: "sarahalashwal@yahoo.com",
        subject: "New Story",
        html: `<h1>${req.body.title}</h1>
                <p>${req.body.message}</p>`
      })
    } catch(e) {
        console.log(e)
    }

  res.send('<h1>Thank you for sharing</h1>');
});

app.get('/contactus', (req,res) => {
  res.render('contactus');
})

app.get('/articles', async(req,res)=>{
  const articles = await Article.find().sort({createdAt: 'desc'}); //gives all the articles
  // we can pass any object to index
  res.render('articles', {articles: articles});
})

app.get('/articles/:id', async (req, res) => {
  const article = await Article.findOne({_id: req.params.id});

  if (article == null) res.redirect('/')
  res.render('article', {article: article});
})
// app.use('/articles', articleRouter);
app.listen(8000, ()=> console.log('app listening on port 8000'));
