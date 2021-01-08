const nodemailer = require('nodemailer');
const e = require('express');
require('dotenv').config();

const EMAIL = process.env.EMAIL;
const PASS = process.env.EMAIL_PASSWORD;



const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com', 
  port: 587,
  secure: false,
  auth: {
    user: EMAIL,
    pass: PASS
  },
});

module.exports = transporter;