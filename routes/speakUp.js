const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');


const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com', 
  port: 587,
  secure: false,
  auth: {
    user: 'menaagewebsite@gmail.com',
    pass: 'menaage1234'
  },
})

router.get('/',(req,res) => {
  res.render('speakUp');
})

router.post('/',async(req,res) => {
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
})

module.exports = router; 