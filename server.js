const express = require("express");
const app = express();
const mongoose = require('mongoose');

// routes
const speakUPRouter = require('./routes/speakUp');
const articlesRouter = require('./routes/blog/articles');
const aboutUsRouter = require('./routes/aboutUs');



app.use(express.static(__dirname + '/views/'));

app.set('view engine', 'ejs');
app.use(express.urlencoded({extended: false}));

//connect to mlab database

//mongoose.connect("mongodb+srv://menaUser:menaage123@cluster0.osql0.mongodb.net/mena-age?retryWrites=true&w=majority",{ useNewUrlParser: true ,  useUnifiedTopology: true, useCreateIndex: true});

//to start the db sudo service mongod start
mongoose.connect('mongodb://localhost/mena', { useNewUrlParser: true ,  useUnifiedTopology: true, useCreateIndex: true});

mongoose.connection.once('open', ()=> {
  console.log('connected to the database');
})


app.get('/', async (req, res) => {
  res.render('home');
  
})

app.get('/contactus', (req,res) => {
  res.render('contactus');
})



app.use('/speakUp', speakUPRouter);
app.use('/articles', articlesRouter);
app.use('/aboutUs', aboutUsRouter);

app.listen(8000, ()=> console.log('app listening on port 8000'));
