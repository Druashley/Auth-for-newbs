const express = require("express");

const router = express.Router();

router.get("/", (req, res) => {
  res.json({
    message: "Locked",
  });
});

router.post("/signup", (req, res) => {
  console.log(req.body);
  res.json({
    message: "Signed up",
  });
});

module.exports = router;
