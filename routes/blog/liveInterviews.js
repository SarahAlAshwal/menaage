const express = require("express");
const router = express.Router();
const LiveInterviews = require("../../models/liveInterviews");

router.get("/", async (req, res) => {
  const liveInterviews = await LiveInterviews.find().sort({
    createdAt: "desc",
  });
  res.render("liveInterviews", { liveInterviews: liveInterviews });
});

router.get("/new", (req, res) => {
  res.render("liveInterviews/new", { liveInterview: new LiveInterviews() });
});

router.get("/edit/:id", async (req, res) => {
  const liveInterview = await LiveInterviews.findById(req.params.id);
  res.render("liveInterviews/edit", { liveInterview: liveInterview });
});

router.post(
  "/",
  async (req, res, next) => {
    req.liveInterview = new LiveInterviews();
    next();
  },
  saveInterviewAndRedirict("new")
);

router.delete("/:id", async (req, res) => {
  await LiveInterviews.findByIdAndDelete(req.params.id);
  res.redirect("/liveInterviews");
});

router.put( "/:id", async (req, res, next) => {
    req.liveInterview = await LiveInterviews.findById(req.params.id);
    next();
  },
  saveInterviewAndRedirict("edit")
);

function saveInterviewAndRedirict(path) {
  return async (req, res) => {
    let liveInterview = req.liveInterview;
    liveInterview.title = req.body.title;
    liveInterview.description = req.body.description;
    liveInterview.videoUrl = req.body.videoUrl;
    liveInterview.thumbnail = req.body.thumbnail;

    try {
      liveInterview = await liveInterview.save();
      res.redirect(`/liveInterviews`);
    } catch (e) {
      console.log(e);
      res.render(`liveInterviews/${path}`, { liveInterview: liveInterview });
    }
  };
}

module.exports = router;
