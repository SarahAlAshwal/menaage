const express = require('express');
const router = express.Router();
const transporter = require('../email');


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