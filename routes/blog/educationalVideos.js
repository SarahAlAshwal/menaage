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

module.exports = router;
