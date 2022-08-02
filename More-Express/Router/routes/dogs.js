const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("ALL DOGS");
});

router.post("/", (req, res) => {
  res.send("CREATING A DOG");
});

router.get("/:id", (req, res) => {
  res.send("VIEWING A DOG");
});

router.get("/:id/edit", (req, res) => {
  res.send("EDITING A DOG");
});

module.exports = router;
