const express = require("express");
const router = express.Router();
const LiveInterviews = require("../../models/liveInterviews");

router.get("/", async (req, res) => {
  const liveInterviews = await LiveInterviews.find().sort({
    createdAt: "desc",
  });
  res.render("liveInterviews", { liveInterviews: liveInterviews });
});


module.exports = router;
