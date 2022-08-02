const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("ALL SHELTERS");
});

router.post("/", (req, res) => {
  res.send("CREATING A SHELTER");
});

router.get("/:id", (req, res) => {
  res.send("VIEWING A SHELTER");
});

router.get("/:id/edit", (req, res) => {
  res.send("EDITING A SHELTER");
});

module.exports = router;
