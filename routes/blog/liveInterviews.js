const express = require("express");
const router = express.Router();
const LiveInterviews = require("../../models/liveInterviews");

router.get("/", async (req, res) => {
  const liveInterviews = await LiveInterviews.find().sort({
    createdAt: "desc",
  });
  res.render("liveInterviews/index", { liveInterviews: liveInterviews });
});

router.get("/new", (req, res) => {
  res.render("liveInterviews/new", { liveInterview: new LiveInterviews() });
});

router.get("/:id", (res, req) => {
  res.send(req.params.id);
});

router.post("/", async (req, res) => {
  let liveInterview = new LiveInterviews({
    title: req.body.title,
    description: req.body.description,
    videoUrl: req.body.videoUrl,
    thumbnail: req.body.thumbnail,
  });
  try {
    liveInterview = await liveInterview.save();
    res.redirect(`/liveInterviews/${liveInterview.id}`);
  } catch (e) {
    console.log(e);
    res.render("liveInterviews/new", { liveInterview: liveInterview });
  }
});

module.exports = router;
