const express = require('express');
const app = express();
const router = express.Router();
const transporter = require('../../email');
const multer = require("multer");
const fs = require('fs');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, `${__dirname}/attachment/`)
  },
  filename: function (req, file, cb) {
   const parts = file.mimetype.split('/');
   cb(null, `${file.fieldname}-${Date.now()}.${parts[1]}`);
  }
})

const upload = multer({storage})



router.get('/',(req,res) => {
  res.render('submitYourWork');
})

router.post('/',upload.single("myfile"), async(req,res) => {
  try {
    await transporter.sendMail({
      from: '" Info 👻" <menaagewebsite@gmail.com>',
      to: "sarahalashwal@yahoo.com",
      subject: "New shared work",
      html: `<h1>category: ${req.body.category}</h1>
              <h2>title: ${req.body.title}</h2>
              <h3>Email: ${req.body.email}</h3>
              <p>${req.body.message}</p>`,
      attachments: {
        path: `${__dirname}/attachment/${req.file.filename}`
      }
    })
  } catch(e) {
      console.log(e)
  }
fs.unlink(`${__dirname}/attachment/${req.file.filename}`, (err) => {
  if (err) {
      throw err;
  }

  console.log("File is deleted.");
});
res.send('<h1>Thank you for sharing</h1>');
})

module.exports = router; 