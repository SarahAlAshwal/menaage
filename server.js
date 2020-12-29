const express = require("express");
const methodOverride= require('method-override');
const app = express();
const mongoose = require('mongoose');

// routes
const speakUPRouter = require('./routes/speakUp');
const articlesRouter = require('./routes/blog/articles');
const liveInterviewsRouter = require('./routes/blog/liveInterviews');
const educationalVideosRouter = require('./routes/blog/educationalVideos');
const aboutUsRouter = require('./routes/aboutUs');
const contactUs = require('./routes/contactUs');
const submitYourWork = require('./routes/getInvolved/submitYourWrok');



app.use(express.static(__dirname + '/views/'));

app.set('view engine', 'ejs');
app.use(express.urlencoded({extended: false}));
app.use(methodOverride('_method'));


//to start the db sudo service mongod start
mongoose.connect('mongodb://localhost/mena', { useNewUrlParser: true ,  useUnifiedTopology: true, useCreateIndex: true});

mongoose.connection.once('open', ()=> {
  console.log('connected to the database');
})


app.get('/', async (req, res) => {
  res.render('home');
  
})



app.use('/speakUp', speakUPRouter);
app.use('/articles', articlesRouter);
app.use('/liveInterviews',liveInterviewsRouter);
app.use('/educationalVideos', educationalVideosRouter);
app.use('/aboutUs', aboutUsRouter);
app.use('/submitYourWork', submitYourWork);
app.use('/contactUs', contactUs);

app.listen(8000, ()=> console.log('app listening on port 8000'));
