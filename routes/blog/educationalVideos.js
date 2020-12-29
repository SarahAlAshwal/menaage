const express = require("express");
const { model } = require("mongoose");
const router = express.Router();
const EducationalVideos = require("../../models/educationalVideos");

router.get("/", async (req, res) => {
  const educationalVideos = await EducationalVideos.find().sort({
    createdAt: "desc",
  });
  res.render("educationalVideos", {
    educationalVideos: educationalVideos,
  });
});

router.get("/new", (req, res) => {
  res.render("educationalVideos/new", {
    educationalVideo: new EducationalVideos(),
  });
});

router.get("/edit/:id", async (req, res) => {
  const educationalVideo = await EducationalVideos.findById(req.params.id);
  res.render("educationalVideos/edit", {
    educationalVideo: educationalVideo,
  });
});

router.post(
  "/",
  async (req, res, next) => {
    req.educationalVideo = new EducationalVideos();
    next();
  },
  saveeducationalVideoAndRedirict("new")
);

router.put(
  "/:id",
  async (req, res, next) => {
    req.educationalVideo = await EducationalVideos.findById(req.params.id);
    next();
  },
  saveeducationalVideoAndRedirict("edit")
);

router.delete("/:id", async (req, res) => {
  await EducationalVideos.findByIdAndDelete(req.params.id);
  res.redirect("/educationalVideos");
});

function saveeducationalVideoAndRedirict(path) {
  return async (req, res) => {
    let educationalVideo = req.educationalVideo;
    educationalVideo.title = req.body.title;
    educationalVideo.description = req.body.description;
    educationalVideo.videoUrl = req.body.videoUrl;

    try {
      educationalVideo = await educationalVideo.save();
      res.redirect(`/educationalVideos`);
    } catch (e) {
      console.log(e);
      res.render(`educationalVideos/${path}`, {
        educationalVideo: educationalVideo,
      });
    }
  };
}

module.exports = router;
