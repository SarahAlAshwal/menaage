const express = require('express');
const app = express();
const router = express.Router();
const transporter = require('../../email');



router.get('/',(req,res) => {
  res.render('submitYourWork');
})

router.post('/',async(req,res) => {
  // try {
  //   await transporter.sendMail({
  //     from: '" Info 👻" <menaagewebsite@gmail.com>',
  //     to: "sarahalashwal@yahoo.com",
  //     subject: "New shared work",
  //     html: `<h1>category: ${req.body.category}</h1>
  //             <h2>${req.body.title}</h2>
  //             <p>${req.body.message}</p>`,
  //     attachments: [
  //       {
  //         path: `${req.body.myfile}`
  //       }
  //     ]

  //   })
  // } catch(e) {
  //     console.log(e)
  // }
 
res.send('<h1>Thank you for sharing</h1>');
})

module.exports = router; 