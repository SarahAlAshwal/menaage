const express = require('express');
const router = express.Router();
const Team = require('../models/team');

router.get('/',async(req,res) =>{
  const team = await Team.find().sort({teamId: 1})
  res.render('aboutUs',{team:team});
});


module.exports = router; 