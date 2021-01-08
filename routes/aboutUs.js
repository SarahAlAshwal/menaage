const express = require('express');
const router = express.Router();
const Team = require('../models/team');
const Details = require('../models/details');

router.get('/',async(req,res) =>{
  const team = await Team.find().sort({teamId: 1})
  const details = await Details.find()
  res.render('aboutUs',{team:team, details: details[0]});
});


module.exports = router; 