const express = require("express");
const router = express.Router();

router.use((req, res, next) => {
  if (req.query.isCleared) {
    next();
  }
  res.send("RESTRICTED ACCESS");
});

router.get("/topsecret", (req, res) => {
  res.send("THIS IS TOP SECRET");
});

router.get("/secret", (req, res) => {
  res.send("THIS IS SECRET");
});

router.get("/confidential", (req, res) => {
  res.send("THIS IS CONFIDENTIAL");
});

router.get("/fireSale", (req, res) => {
  res.send("MEMORY WIPE IN PROGRESS");
});

module.exports = router;
