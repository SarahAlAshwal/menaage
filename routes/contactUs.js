const express = require('express');
const router = express.Router();
const transporter = require('../email');


router.get('/',(req,res) => {
  res.render('contactus');
})

router.post('/',async(req,res) => {
  try {
    await transporter.sendMail({
      from: '" Info 👻" <menaagewebsite@gmail.com>',
      to: "sarahalashwal@yahoo.com",
      subject: "New contact us message ",
      html: `<h4>Sender:</h4>
              <p>${req.body.email}</p>
              <h1>${req.body.subject}</h1>
              <p>${req.body.message}</p>`
              
    })
  } catch(e) {
      console.log(e)
  }

res.send('<h1>Thank you. We will get back to you soon </h1>');
})

module.exports = router; 