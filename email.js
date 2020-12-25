const nodemailer = require('nodemailer');
const e = require('express');


const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com', 
  port: 587,
  secure: false,
  auth: {
    user: 'menaagewebsite@gmail.com',
    pass: 'menaage1234'
  },
});

module.exports = transporter;