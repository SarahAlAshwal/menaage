const express = require("express");
const app = express();
const mongoose = require('mongoose');
app.use(express.static(__dirname + '/views/'));
const nodemailer = require('nodemailer');
app.set('view engine', 'ejs');
app.use(express.urlencoded({extended: false}));

//mongoose.connect('mongodb://localhost/blog', { useNewUrlParser: true ,  useUnifiedTopology: true, useCreateIndex: true});

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


// app.use('/articles', articleRouter);
app.listen(8000, ()=> console.log('app listening on port 8000'));
